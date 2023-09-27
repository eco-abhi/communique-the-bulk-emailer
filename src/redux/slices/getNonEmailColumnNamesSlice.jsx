import { createSlice } from "@reduxjs/toolkit";

export const getNonEmailColNamesSlice = createSlice({
  name: "getNonEmailColNames",
  initialState: [],
  reducers: {
    getNonEmailColumnNames(state, action) {
      state.push(action.payload.data["non-email-cols"]);
    },
  },
});

export const { getNonEmailColumnNames } = getNonEmailColNamesSlice.actions;
export default getNonEmailColNamesSlice.reducer;
