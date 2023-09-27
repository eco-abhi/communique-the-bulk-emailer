######################################################################
# Import Libraries
######################################################################

from flask import (
    Flask,
    render_template,
    Blueprint,
    request,
    redirect,
    send_file,
    flash,
    jsonify,
    url_for,
    make_response,
    after_this_request,
    session
)
from flask_cors import CORS
from werkzeug.utils import secure_filename
from utils.modules import *
from utils.variables import unallowed_extns_in_outlook, email_validation_pattern
import json
import pandas as pd
import numpy as np
import os
import warnings
warnings.simplefilter(action='ignore')


######################################################################
# Get root
######################################################################
root = os.path.abspath(os.path.join(os.path.dirname(__file__), ''))

##################################################################################################
# Initializing app
##################################################################################################

app = Flask(__name__, static_folder="static")
app.config["UPLOAD_FOLDER"] = os.path.join(root, "data")
app.config["SECRET_KEY"] = "ThisIs"
app.config["ALLOWED_EXTENSIONS"] = ["xlsx", "csv"]
app.config["MAX_CONTENT_LENGTH"] = 50 * 1024 * 1024  # 50MB max-limit.
CORS(app, origins="http://localhost:5173")  # Allow requests from this origin

##################################################################################################
# Clear data directory

clear_data_directory()

##################################################################################################
# Allowed file size

# @app.errorhandler(413)
# def too_large(e):

#     ''' Checks for file size '''

#     return "File is too large", 413

##################################################################################################
# Routes


@app.route('/')
def index():
    pass


# Upload file route
@app.route('/upload', methods=['POST', 'GET'])
def upload_primary_file():

    if request.method == 'POST':
        # Clear data directory
        clear_data_directory()

        # Initialize response object
        resp = {'upload-error': "false",
                'read-error': "false",
                'warning': "",
                'error-message': "",
                'username': "",
                'data': {'dataset': "",
                         'non-email-cols':  [],
                         'email-cols': [],
                         's3-filename': "",
                         'no-of-rows': 0,
                         "rows-with-missing-values": 0,
                         "email-cols-with-errors": [],
                         'numeric-cols': [],
                         'string-cols': [],
                         'row-indices-with-errors-in-email-cols': []
                         }
                }

        #############################################################
        # No file was uploaded

        # If no file was uploaded
        if 'file' not in request.files:
            resp['upload-error'] = 'true'
            resp['error-message'] = 'No file was uploaded'
            resp = jsonify(resp)
            return resp, 400

        #############################################################
        # A file was uploaded
        file_upload_success = False
        no_of_errors = 0   # Keeps a count of errors

        # print('request is', request.get_json())

        # No error - a file was uploaded
        file = request.files['file']
        filename = secure_filename(file.filename)

        # Check if the file has the allowed extensions
        # Check for csv and xlsx extensions
        if allowed_file_extn_for_primary_dataset(filename, app.config["ALLOWED_EXTENSIONS"]):
            # Save file in the data dir and get the file name
            filename = save_file(request, app)
            file_upload_success = True

        else:
            resp['error-message'] = f'File type is not allowed for {file.filename}'
            resp = jsonify(resp)
            return resp, 415

        ############################################
        # Check for errors in the loaded source file

        ''' Error i)
            1- Check for empty headers
            2- Check for duplicate columns
            3- Check for absent email attributes '''

        # Read in the file's first five rows
        df = read_file(filename, app.config["UPLOAD_FOLDER"])

        # Pass the file name to the current session
        s3_upload_status, modified_filename = push_to_s3_bucket(filename, df)

        # Delete data in the server
        clear_data_directory()

        df_columns = df.columns

        # Conditions to check for the file itegrity with error statements as values and functions as keys                 # Error i)
        conds_for_file_integrity_with_error_statement = {unnamed_columns_present(df_columns): "Headers not found",        # Check for empty headers
                                                         # Check for duplicate columns
                                                         duplicate_columns_present(df_columns): "Duplicate columns present",
                                                         email_column_not_present(df): "Email attribute not found",
                                                         s3_upload_status_failed(s3_upload_status): "File upload failed"}      # Check for absent email attributes

        # Error conditions and retuen statements
        error_conditions_list, error_values_list = list(conds_for_file_integrity_with_error_statement.keys(
        )), list(conds_for_file_integrity_with_error_statement.values())

        if any(error_conditions_list):         # if any error found

            ''' Found errors in the loaded file '''

            # Stop code execution and throw error
            resp['read-error'] = "true"
            resp['error-message'] = error_values_list[error_conditions_list.index(
                True)]
            no_of_errors += 1

        ############################################

        # Email attributes are present
        # Check for errors in email attributes
        else:

            # Get list of email columns from function and ask the user if it's correct and categorize for primary and cc subsequently
            email_attr_list = list_of_email_columns(df)

            # Replace commas with semicolons in email attributes
            for col in email_attr_list:
                df[col] = df[col].replace(",", ";")

            errors_in_email_dict = []

            # Returns boolean as well as list of errored email attributes
            if errors_in_email_columns(df, email_attr_list)[0]:
                # This attribute/s has/ve missing values. Do you wish to continue                                                                     # The missing and errored values will be ignored
                errors_in_email_dict = errors_in_email_columns(df, email_attr_list)[
                    1]

        ############################################
        # Jsonify the POST message

        if file_upload_success and bool(no_of_errors):
            resp['upload-status'] = 'success'
            resp = jsonify(resp)
            return resp, 206

        elif file_upload_success and not (bool(no_of_errors)):

            # Send a warning for missing email attributes
            if len(errors_in_email_dict):
                resp['warning'] = "One or more email attributes have missing values. Do you wish to continue?\nThe rows with missing values will be omitted if you continue."

            # Add email and other attributes
            # Attribute array excluding email attrs
            resp['data']['non-email-cols'] = [col for col in df_columns if col not in email_attr_list]
            # Email attribute names
            resp['data']['email-cols'] = email_attr_list
            resp['data']['dataset'] = json.loads(
                df.to_json(orient="split"))  # Add df.head() to data

            # S3 bucket file name
            resp['data']['s3-filename'] = modified_filename
            resp['data']['no-of-rows'] = str(df.shape[0]),  # No of rows
            resp['data']['rows-with-missing-values'] = df[df.isnull().any(axis=1)
                                                          ].index.tolist(),  # Rows with missing values
            # Add df.head() to data
            resp['data']['email-cols-with-errors'] = errors_in_email_dict
            resp['data']['row-indices-with-errors-in-email-cols'] = errors_in_email_columns(
                df, email_attr_list)[2]
            resp['data']['numeric-cols'] = get_numeric_and_string_columns(df)[
                'numeric-cols']
            resp['data']['string-cols'] = get_numeric_and_string_columns(df)[
                'string-cols']

            resp = jsonify(resp)
            return resp, 201

        else:
            resp['error-message'] = "Some unexpected error occured"
            resp = jsonify(resp)
            return resp, 400

# Groupby attrs


@app.route('/email-preview', methods=['POST'])
def email_preview():
    """ 

        Get data and user selections from the UI 
        and genereate a report to create a preview for 
        the email on the UI

    """

    if request.method == 'POST':
        # Get JSON data from the request
        data = request.get_json()

        # Process the data as needed
        # For example, you can access data['eMail'], data['nonEmail'], etc.

        # Generate a response
        response_data = {
            'message': 'Data received successfully',
            'data': data  # You can send back any data you want
        }

        return jsonify(response_data), 200


@app.route('/cont-to-questionnaire', methods=['POST'])
def group_by_attrs():
    """ 
        Get and analyze group-by columns for any errors:

        1- check for nulls in all the columns
        2- check if groupby-calc-column is numeric

    And send group-by dataframe in response if everything checks out         

    """

    # Get request data with group-by selected attributes
    group_by_object_POST = json.loads(request.data)

    # Get the original dataframe saved in the session
    df = read_file_from_s3(group_by_object_POST['modified_filename'])

    # Jsonify the response dataset
    resp = jsonify(check_group_by_attr_errors(df, group_by_object_POST))

    # Send response to client
    return resp


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8085, debug=True, threaded=True)
