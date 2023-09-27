import { createSlice } from "@reduxjs/toolkit";

export const fileDetailsSlice = createSlice({
  name: "getFileDetails",
  initialState: { filename: "", filesize: "" },
  reducers: {
    getFileDetails(state, action) {
      state[action.payload.key] = action.payload.value;
    },
  },
});

export const { getFileDetails } = fileDetailsSlice.actions;
export default fileDetailsSlice.reducer;
