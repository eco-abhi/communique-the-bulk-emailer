import { Draggable } from "react-beautiful-dnd";
import "./SingleDragNDropItem.css";
import { useDispatch } from "react-redux";
import { getAggregationType } from "../../../redux/slices/getAggregationTypeSlice";

const SingleDragNDropItem = ({ colName, index, colType, numericCols }) => {
  const dispatch = useDispatch();

  const renderDropdown = () => {
    const dropdownOptions = {
      email: ["", "CC", "BCC"],
      agg: ["SUM", "AVG", "COUNT", "MEDIAN"],
      list: ["", "LOWER", "UPPER"],
      groupBy: ["", "LOWER", "UPPER"],
    };

    const options = dropdownOptions[colType] || [];

    const handleOnSelect = (colName, option) => {
      dispatch(getAggregationType({ key: colName, value: option }));
    };

    return (
      <select
        style={{ flex: 1, marginTop: "7%", marginBottom: "7%" }}
        onChange={(e) => handleOnSelect(colName, e.target.value)}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  };

  return (
    <Draggable
      draggableId={colName}
      index={index}
      key={colName}
      isDragDisabled={colType === "email"}
    >
      {(provided) => (
        <div
          className={`dragNDrop-single-item ${colType}`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="colName" style={{ flex: 1 }}>
            {colName}
          </div>{" "}
          {/* Text on the left */}
          {colType === "agg" ? renderDropdown() : ""}
          <div className="dataTypeLabel">
            {numericCols.includes(colName) ? (
              <img src="../../../src/assets/123.png" alt="" />
            ) : (
              <img src="../../../src/assets/abc.png" alt="" />
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default SingleDragNDropItem;
