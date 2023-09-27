import { createSlice } from "@reduxjs/toolkit";

export const getAggregationTypeSlice = createSlice({
  name: "getAggregationType",
  initialState: {},
  reducers: {
    getAggregationType(state, action) {
      // Update only the specified key within the state object

      state[action.payload.key] = action.payload.value;
    },
  },
});

export const { getAggregationType } = getAggregationTypeSlice.actions;
export default getAggregationTypeSlice.reducer;
