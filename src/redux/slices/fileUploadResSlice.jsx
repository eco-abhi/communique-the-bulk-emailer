import { createSlice } from "@reduxjs/toolkit";

export const fileUploadResSlice = createSlice({
  name: "fileUploadRes",
  initialState: [{ "read-error": "true" }],
  reducers: {
    getResponse(state, action) {
      return [action.payload];
    },
    resetResponse(state) {
      return [{ "read-error": "true" }];
    },
  },
});

export const { getResponse, resetResponse } = fileUploadResSlice.actions;
export default fileUploadResSlice.reducer;
