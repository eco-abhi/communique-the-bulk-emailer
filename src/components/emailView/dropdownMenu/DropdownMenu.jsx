import React, { useState } from "react";
import { useSelector } from "react-redux";
import StringListWithSearch from "./StringListWithSearch";
import "./DropdownMenu.css"; // You can create your own CSS for styling

const DropdownMenu = ({
  inputType,
  positionTop,
  positionLeft,
  onItemSelect,
}) => {
  const colSet = useSelector((state) => state.getColSet);

  // Create a new object with the desired key renaming
  let newColSet = {};

  if (inputType === "email") {
    newColSet = {
      eMail: colSet.eMail,
    };
  } else if (inputType === "subject") {
    newColSet = {
      groupBy: colSet.groupBy,
    };
  } else {
    newColSet = {
      agg: colSet.agg,
      eMail: colSet.eMail,
      groupBy: colSet.groupBy,
      list: [
        ...new Set([
          ...colSet.nonEmail,
          ...colSet.numeric,
          ...colSet.agg,
          ...colSet.eMail,
        ]),
      ],
    };
  }

  const handleItemClicked = (category, item) => {
    if (onItemSelect) {
      onItemSelect(category, item);
    }
  };

  return (
    <div>
      <StringListWithSearch
        colSet={newColSet}
        positionTop={positionTop}
        positionLeft={positionLeft}
        onItemClick={handleItemClicked}
      />
    </div>
  );
};

export default DropdownMenu;
