##################################################################################################
# Import libraries

import os
import re
import glob
import pandas as pd
from pandas.api.types import is_string_dtype
from utils.variables import *
import boto3
import io
from random import randint
import numpy as np
from datetime import datetime

from pandas.api.types import is_string_dtype
from pandas.api.types import is_numeric_dtype

from werkzeug.utils import secure_filename


s3_client = boto3.client('s3',
                            region_name = 'us-east-2',
                            aws_access_key_id = 'AKIAXOWD7TNVKBQZHRGQ',
                            aws_secret_access_key = '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')


bucket_name = 'sca-pushdata-dwh'                            

##################################################################################################
# Clear data directory  
def clear_data_directory()->None:

    ''' Removes old data files '''

    files = glob.glob("data/*")

    for f in files:
        os.remove(f)


def _random_with_N_digits(n):
    range_start = 10**(n-1)
    range_end = (10**n)-1
    return randint(range_start, range_end)        

def validate_email(email):
    return re.match(email_validation_pattern, email)

def save_file(request, app_name):

    file = request.files['file']

    filename = secure_filename(file.filename)

    # Save file
    file.save(os.path.join(app_name.config['UPLOAD_FOLDER'], filename))  

    return filename    


def s3_upload_status_failed(upload_status:str):
    return upload_status!="success"

def push_to_s3_bucket(file_name:str, df:pd.DataFrame):

    filename = f"mailer_tool/{file_name[:file_name.rfind('.')]}_{str(datetime.today().strftime('%Y-%m-%d %H-%M-%S'))}.csv"

    with io.StringIO() as csv_buffer:

        df.to_csv(csv_buffer, index=False)

        response = s3_client.put_object(Bucket=bucket_name, Key=filename, Body=csv_buffer.getvalue())

        status = response.get("ResponseMetadata", {}).get("HTTPStatusCode")

        if status == 200:
            return "success", filename
        else:
            return "fail", filename


def read_file_from_s3(filename:str):

    obj = s3_client.get_object(Bucket= bucket_name, Key= filename) 
                          
    if ".csv" in filename:  # Read csv
        return pd.read_csv(obj['Body'])

    elif '.xlsx' in filename: # Read excel
        return pd.read_excel(io.BytesIO(obj['Body'].read()))
        
##################################################################################################
# Read in the loaded data  

def read_file(filename:str, config:str)->pd.DataFrame:

    """ Reads in the uploaded file """

    if ".csv" in filename:  # Read csv
        df = pd.read_csv(os.path.join(config, filename))

    elif '.xlsx' in filename: # Read excel
        df = pd.read_excel(os.path.join(config, filename))

    # Remove special character
    df.columns = df.columns.str.replace('[#,@,&]', '') 

    # Remove whitespace
    df.rename(columns=lambda x: x.strip(), inplace=True)      

    # Drop duplicate rows and columns with all NAs
    df.drop_duplicates(inplace=True)  
    df.dropna(axis=1, how='all', inplace=True)      
    
    return df

##################################################################################################
# Check if the loaded file has allowed extensions 

def allowed_file_extn_for_primary_dataset(filename:str, config)->bool:

    ''' Checks for xlsx and csv extension '''

    if not "." in filename:
        return False

    ext = filename.rsplit(".", 1)[1]

    return ext.lower() in config

##################################################################################################
# Check if the headers are absent in the first row 

def unnamed_columns_present(col_list:list)->bool:

    ''' Checks for unamed columns '''

    return len([col for col in col_list if 'unnamed:' in col.lower()]) > 0

##################################################################################################
# Check if the dataset has duplicate columns 

def duplicate_columns_present(col_list:list) -> bool:

    ''' Checks for duplicate columns '''

    return sum(col_list.duplicated()) > 0

##################################################################################################
# Check if the email attribute/s is/are present

def email_column_not_present(df:pd.DataFrame) -> bool: 

    ''' 
        Returns True if email attributes are not present '''

    email_attributes_list = []

    for col in df.columns:

        # Check if column is string and contains email addresses       using np.issubdtype instead of is_string_dtype because it's not working
        if not np.issubdtype(df[col].dtype, np.number) and df[col].str.contains(email_validation_pattern, regex=True).sum(skipna=True):  
                email_attributes_list.append(col)          

    return not len(email_attributes_list) > 0

##################################################################################################
# Check if the email attribute/s is/are present

def get_numeric_and_string_columns(df:pd.DataFrame)->dict:
    numeric_cols = df.select_dtypes(include=['number']).columns.tolist()
    string_cols = df.select_dtypes(include=['object']).columns.tolist()
    return {'numeric-cols':numeric_cols, 'string-cols':string_cols}

##################################################################################################
# Get a list of all email attributes 
def list_of_email_columns(df:pd.DataFrame)->list:

    ''' Returns a list of email attributes '''

    email_attributes_list = []

    for col in df.columns:

        # Check if column is string and contains email addresses       using np.issubdtype instead of is_string_dtype because it's not working
        if not np.issubdtype(df[col].dtype, np.number) and df[col].str.contains(email_validation_pattern, regex=True).sum(skipna=True):  
                email_attributes_list.append(col)       

    if len(email_attributes_list):

        return email_attributes_list


                 
##################################################################################################
# Check for errors like mising email addresses or NAs in the email attribuite/s

def errors_in_email_columns(df: pd.DataFrame, email_attributes_list: list) -> list:
    ''' Checks for errors like missing email addresses or NAs '''

    df_nrows = df.shape[0]

    res = False
    cols_with_errors = []
    row_indices_with_errors = []

    for col in email_attributes_list:
        # Missing values in email columns
        invalid_email_indices = df[df[col].apply(lambda x: not validate_email(x))].index.tolist()

        if len(invalid_email_indices) > 0:
            cols_with_errors.append(col)
            row_indices_with_errors.extend(invalid_email_indices)
            res = True

    return [res, cols_with_errors, row_indices_with_errors]      


##################################################################################################
# Check for unallowed extension in attachments   

def invalid_attachments_extn(filename: str, unallowed_extns_in_outlook:list)->bool: 

    ''' Checks for unallowed extensions in attachment files '''

    if not "." in filename:
        return False

    ext = filename.rsplit(".", 1)[1]

    return ext.lower() in unallowed_extns_in_outlook


##################################################################################################
# Check for unallowed extension in attachments   

""" selected_groupby_arr may contain multiple values 
    group_by_attr_contains_nulls can only have a single value 
    selected_li_arr contain multiple values 
"""


def check_group_by_attr_errors(df: pd.DataFrame, attr_post_obj: dict) -> dict:

    """ Get and analyze group-by attrs for any errors:
    
        1- check for nulls in all the attrs
        2- check if groupby-calc-attr is numeric

    """      

    group_by_condition_is_favorable = True  
    group_by_attrs_analysis = {}

    #################################################################
    # Analyze selected group_by_attr
    group_by_attrs = attr_post_obj['selected_groupby_arr']

    # Contains nulls?
    group_by_attrs_contain_nulls = {}
    for col in group_by_attrs:

        res_bool = str(df[col].isna().sum() > 0).lower()

        if not res_bool:
            group_by_condition_is_favorable = False

        group_by_attrs_contain_nulls[col] = res_bool

    group_by_attrs_analysis['group_by_attrs_contain_nulls'] = group_by_attrs_contain_nulls

    #################################################################
    # Analyze selected group_by_calc_attr
    group_by_calc_attr = attr_post_obj['selected_groupby_calc_arr'][0]

    # Check if column is of numeric type
    if is_numeric_dtype(df[group_by_calc_attr]):
        group_by_attrs_analysis['group_by_attr_calc_is_numeric_type'] = 'true'

    else:

        try:
            df[group_by_calc_attr] = pd.to_numeric(df[group_by_calc_attr]).fillna(0).astype('float')
        
        except:
            group_by_condition_is_favorable = False
            group_by_attrs_analysis['group_by_attr_calc_is_numeric_type'] = 'false'


    #################################################################
    # Analyze selected group_by_calc_attr_li
    li_attrs = attr_post_obj['selected_li_arr']

    # Contains nulls?
    li_attrs_contain_nulls = {}
    for col in li_attrs:

        res_bool_2 = str(df[col].isna().sum() > 0).lower()

        if not res_bool_2:
            group_by_condition_is_favorable = False

        li_attrs_contain_nulls[col] = res_bool_2

    # Try converting the values to float
    group_by_attrs_analysis['li_attrs_contain_nulls'] = group_by_attrs_contain_nulls

    if group_by_condition_is_favorable:

        user_selected_aggregation_type = attr_post_obj['selected_groupby_calc_agg_attr_arr'].lower()
        user_selected_calculation_attribute = attr_post_obj['selected_groupby_calc_arr']
        user_selected_groupby_attributes = attr_post_obj['selected_groupby_arr']

        if user_selected_aggregation_type == 'sum':
            df.groupby(user_selected_groupby_attributes)[user_selected_calculation_attribute].transform('sum')


        elif user_selected_aggregation_type == 'avg':
            df.groupby(user_selected_groupby_attributes)[user_selected_calculation_attribute].transform('avg')           


        # elif 
        # return [group_by_attrs_analysis, ]

    return group_by_attrs_analysis



##################################################################################################
##################################################################################################
##################################################################################################
