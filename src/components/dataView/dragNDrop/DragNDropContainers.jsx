import SingleDragNDropItem from "./SingleDragNDropItem";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { onDragEnd } from "./DragNDropUtils";
import "./DragNDropContainers.css";

const DragNDropContainers = ({
  emailCols,
  listCols,
  aggCols,
  groupByCols,
  numericCols,
}) => {
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="container">
          <Droppable droppableId="EmailCols">
            {(provided) => (
              <div
                className="col-container email-cols"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <div className="col-name">Email Columns</div>

                {emailCols.map((emailCol, index) => (
                  <SingleDragNDropItem
                    colName={emailCol}
                    index={index}
                    colType={"email"}
                    numericCols={numericCols}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="ListCols">
            {(provided) => (
              <div
                className="col-container list-cols"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <div className="col-name"> List Columns </div>

                {listCols.map((listCol, index) => (
                  <SingleDragNDropItem
                    colName={listCol}
                    index={index}
                    colType={"list"}
                    numericCols={numericCols}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="GroupByCols">
            {(provided) => (
              <div
                className="col-container groupBy-cols"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <div className="col-name"> Group-by Columns </div>

                {groupByCols.map((groupByCol, index) => (
                  <SingleDragNDropItem
                    colName={groupByCol}
                    index={index}
                    colType={"groupBy"}
                    numericCols={numericCols}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          <Droppable droppableId="AggCols">
            {(provided) => (
              <div
                className="col-container agg-cols"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <div className="col-name"> Aggregation Columns </div>

                {aggCols.map((aggCol, index) => (
                  <SingleDragNDropItem
                    colName={aggCol}
                    index={index}
                    colType={"agg"}
                    numericCols={numericCols}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </>
  );
};

export default DragNDropContainers;
