import { createSlice } from "@reduxjs/toolkit";

export const userSelectedEmailTypeSlice = createSlice({
  name: "userSelectedEmailType",
  initialState: "",
  reducers: {
    getSelectedEmailType(state, action) {
      return action.payload;
    },
  },
});

export const { getSelectedEmailType } = userSelectedEmailTypeSlice.actions;
export default userSelectedEmailTypeSlice.reducer;
