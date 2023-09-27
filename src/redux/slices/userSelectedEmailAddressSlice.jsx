import { createSlice } from "@reduxjs/toolkit";

export const userSelectedEmailAddressSlice = createSlice({
  name: "userSelectedEmailAddress",
  initialState: null,
  reducers: {
    getSelectedEmailAddress(state, action) {
      return action.payload;
    },
  },
});

export const { getSelectedEmailAddress } =
  userSelectedEmailAddressSlice.actions;
export default userSelectedEmailAddressSlice.reducer;
