import { configureStore } from "@reduxjs/toolkit";
import fileUploadResSlice from "./slices/fileUploadResSlice";
import getColSetSlice from "./slices/getColSetSlice";
import getAggregationTypeSlice from "./slices/getAggregationTypeSlice";
import fileDetailsSlice from "./slices/fileDetailsSlice";
import getSelectedEmailTypeSlice from "./slices/userSelectedEmailTypeSlice";
import getSelectedEmailAddressSlice from "./slices/userSelectedEmailAddressSlice";
import fileAttachmentSlice from "./slices/fileAttachmentSlice";
import errorsInEmailAndSubjectInputsSlice from "./slices/errorsInEmailAndSubjectInputsSlice";

export const store = configureStore({
  reducer: {
    fileUploadResponse: fileUploadResSlice,
    getColSet: getColSetSlice,
    getAggregationType: getAggregationTypeSlice,
    getFileDetails: fileDetailsSlice,
    getSelectedEmailType: getSelectedEmailTypeSlice,
    getSelectedEmailAddress: getSelectedEmailAddressSlice,
    fileAttachment: fileAttachmentSlice,
    errorsInEmailAndSubjectInputs: errorsInEmailAndSubjectInputsSlice,
  },
});
