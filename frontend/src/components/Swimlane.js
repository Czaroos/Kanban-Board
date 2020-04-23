import React from "react";
import Column from "./Column";
import Create from "./Create";
import { connect } from "react-redux";
import styled from "styled-components";

const ColumnsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

const Line = styled.div`
  align-self: flex-start;
  width: 96%;
  height: 1px;
`;

const getHighestIndexX = (columns) => {
  let indecesX = new Set();
  columns.forEach((column) => indecesX.add(column.indexX));
  let indecesXArr = Array.from(indecesX).sort().reverse(); // first element must be highest value

  return indecesXArr[0] + 1;
};

const getSwimlanesNames = (columns) => {
  let swimlaneNames = [];
  columns.forEach((column) =>
    column.indexY > 0 && column.indexX === 0
      ? swimlaneNames.push(column.title)
      : null
  );

  return swimlaneNames.sort((a, b) => (a.indexY > b.indexY ? 1 : 0));
};

const Swimlane = ({ columns, indexY, createColumn, color }) => {
  const filteredColumns = columns.filter((column) => column.indexY === indexY);
  const sortedColumns = filteredColumns.sort((colA, colB) => {
    if (colA.indexX > colB.indexX) return 1;
    else return -1;
  });

  return (
    <ColumnsContainer>
      {sortedColumns.map((column) => (
        <div>
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
      {createColumn ? (
        <Create
          type={"isColumn"}
          indexX={getHighestIndexX(columns)}
          swimlanesNames={getSwimlanesNames(columns)}
        />
      ) : null}
    </ColumnsContainer>
  );
};

const mapStateToProps = (state) => ({
  columns: state.columns,
});

export default connect(mapStateToProps)(Swimlane);
