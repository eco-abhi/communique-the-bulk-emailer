import { createSlice } from "@reduxjs/toolkit";

export const getNumColNamesSlice = createSlice({
  name: "getNumColNames",
  initialState: [],
  reducers: {
    getNumColumnNames(state, action) {
      state.push(action.payload.data["numeric-cols"]);
    },
  },
});

export const { getNumColumnNames } = getNumColNamesSlice.actions;
export default getNumColNamesSlice.reducer;
