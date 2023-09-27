import { createSlice } from "@reduxjs/toolkit";

export const userSelectedGroupByColsSlice = createSlice({
  name: "userSelectGroupByCol",
  initialState: [],
  reducers: {
    addColumn(state, action) {
      state.push(action.payload);
    },
    removeColumn(state, action) {
      state.push(action.payload);
    },
    initalColSet(state, action) {
      return action.payload;
    },
  },
});

export const { addColumn, removeColumn, initalColSet } =
  userSelectedGroupByColsSlice.actions;
export default userSelectedGroupByColsSlice.reducer;
