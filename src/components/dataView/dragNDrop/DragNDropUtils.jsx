import { store } from "../../../redux/store";
import { updateColSet } from "../../../redux/slices/getColSetSlice";

export const onDragEnd = (result) => {
  // Access the Redux store state
  const state = store.getState();

  // Access specific state variables
  const nonEmailCols = [...state.getColSet.nonEmail];
  const numericCols = [...state.getColSet.numeric];
  const aggCols = [...state.getColSet.agg];
  const groupByCols = [...state.getColSet.groupBy];

  const { source, destination } = result;

  if (!destination) return;

  if (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  )
    return;

  if (
    destination.droppableId === "AggCols" &&
    numericCols.includes(result.draggableId)
  ) {
    if (source.droppableId === "ListCols") {
      nonEmailCols.splice(source.index, 1);
    } else if (source.droppableId === "GroupByCols") {
      groupByCols.splice(source.index, 1);
    }
    aggCols.splice(destination.index, 0, result.draggableId);
  }

  if (destination.droppableId === "GroupByCols") {
    if (source.droppableId === "ListCols") {
      nonEmailCols.splice(source.index, 1);
    } else if (source.droppableId === "AggCols") {
      aggCols.splice(source.index, 1);
    }
    groupByCols.splice(destination.index, 0, result.draggableId);
  }

  if (destination.droppableId === "ListCols") {
    if (source.droppableId === "AggCols") {
      aggCols.splice(source.index, 1);
    } else if (source.droppableId === "GroupByCols") {
      groupByCols.splice(source.index, 1);
    }
    nonEmailCols.splice(destination.index, 0, result.draggableId);
  }

  store.dispatch(
    updateColSet({
      nonEmail: nonEmailCols,
      agg: aggCols,
      groupBy: groupByCols,
    })
  );
};
