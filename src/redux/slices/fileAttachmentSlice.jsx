import { createSlice } from "@reduxjs/toolkit";
import { AiOutlineConsoleSql } from "react-icons/ai";

// Custom function to check if two objects are equal
function areObjectsEqual(objA, objB) {
  return objA.name === objB.name;
}

export const fileAttachmentSlice = createSlice({
  name: "fileAttachment",
  initialState: [],
  reducers: {
    addAttachment: (state, action) => {
      const uniqueItems = action.payload.filter((item) => {
        return !state.some((existingItem) =>
          areObjectsEqual(existingItem, item)
        );
      });

      if (uniqueItems.length > 0) {
        state = [...state, ...uniqueItems];
      } else {
        alert("No unique items to add");
      }

      return state;
    },
    removeAttachment: (state, action) => {
      const fileToRemove = action.payload;
      return state.filter((file) => !areObjectsEqual(file, fileToRemove));
    },
  },
});

export const { addAttachment, removeAttachment } = fileAttachmentSlice.actions;
export default fileAttachmentSlice.reducer;
