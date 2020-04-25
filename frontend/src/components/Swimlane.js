import React from "react";
import Column from "./Column";
import { connect } from "react-redux";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const ColumnsContainerRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: 30px;
`;

const Line = styled.div`
  width: 96%;
  height: 1px;
`;

const Swimlane = ({ columns, indexY, color }) => {
  const filteredColumns = columns.filter((column) => column.indexY === indexY);
  const sortedColumns = filteredColumns.sort((colA, colB) => {
    if (colA.indexX > colB.indexX) return 1;
    else return -1;
  });

  return indexY === 0 ? (
    <ColumnsContainerRow>
      {sortedColumns.map((column, index) => (
        <div key={index}>
          <Line style={{ backgroundColor: color }} />
          <Column
            id={column.id}
            key={column.id}
            title={column.title}
            tasks={column.tasks}
            index={column.index}
            limit={column.limit}
            indexX={column.indexX}
            indexY={column.indexY}
          />
        </div>
      ))}
    </ColumnsContainerRow>
  ) : (
    <Draggable key={indexY} draggableId={String(indexY)} index={indexY}>
      {(provided) => (
        <ColumnsContainerRow
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          {sortedColumns.map((column, index) =>
            column.indexY > 0 ? (
              <div {...provided.dragHandleProps} key={index}>
                <Line style={{ backgroundColor: color }} />
                <Column
                  id={column.id}
                  key={column.id}
                  title={column.title}
                  tasks={column.tasks}
                  index={column.index}
                  limit={column.limit}
                  indexX={column.indexX}
                  indexY={column.indexY}
                />
              </div>
            ) : null
          )}
        </ColumnsContainerRow>
      )}
    </Draggable>
  );
};

const mapStateToProps = (state) => ({
  columns: state.columns,
});

export default connect(mapStateToProps)(Swimlane);
