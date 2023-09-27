import { createSlice } from "@reduxjs/toolkit";

export const errorsInEmailAndSubjectInputsSlice = createSlice({
  name: "getErrors",
  initialState: {
    emailAddressError: false,
    ccError: false,
    bccError: false,
    subjectError: false,
  },
  reducers: {
    // Update the state using spread operator
    setEmailAddressError(state, action) {
      state.emailAddressError = action.payload;
    },
    setCCError(state, action) {
      state.ccError = action.payload;
    },
    setBCCError(state, action) {
      state.bccError = action.payload;
    },
    setSubjectError(state, action) {
      state.subjectError = action.payload;
    },
  },
});

export const {
  setEmailAddressError,
  setCCError,
  setBCCError,
  setSubjectError,
} = errorsInEmailAndSubjectInputsSlice.actions;
export default errorsInEmailAndSubjectInputsSlice.reducer;
