import { createSlice } from "@reduxjs/toolkit";

// Function to remove duplicates from an array
function removeDuplicates(array) {
  return [...new Set(array)];
}

const initialState = {
  eMail: [],
  nonEmail: [],
  numeric: [],
  agg: [],
  groupBy: [],
};

export const getColSetSlice = createSlice({
  name: "getColSet",
  initialState: initialState,
  reducers: {
    getColSet(state, action) {
      state.eMail = [...action.payload.data["email-cols"]];
      state.nonEmail = [...action.payload.data["non-email-cols"]];
      state.numeric = [...action.payload.data["numeric-cols"]];
    },
    updateColSet(state, action) {
      // Update the state using spread operator
      state.nonEmail = removeDuplicates([...action.payload.nonEmail]);
      state.agg = removeDuplicates([...action.payload.agg]);
      state.groupBy = removeDuplicates([...action.payload.groupBy]);
    },
  },
});

export const { getColSet, updateColSet } = getColSetSlice.actions;
export default getColSetSlice.reducer;
