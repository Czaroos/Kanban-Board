import React from 'react';
import Column from './Column';
import Create from './Create';
import { connect } from 'react-redux';
import styled from "styled-components";
var randomColor = require('randomcolor');

const ColumnsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

const Line = styled.div`
    margin-bottom: 30px;
    height: 5px;
    width: 318px;
    background-color: ${randomColor()};
`


const Swimlane = ({columns, indexY, createColumn}) => {
    const filteredColumns = columns.filter(column => column.indexY === indexY)
    const sortedColumns = filteredColumns.sort((colA, colB) => {
        if(colA.indexX > colB.indexX) return 1
        else return -1
    })

    return (
        <ColumnsContainer>
        {sortedColumns.map((column) => (
            <div>
          <Column
            id={column.id}
            key={column.id}
            title={column.title}
            tasks={column.tasks}
            index={column.index}
            limit={column.limit}
          />
          <Line/>
          </div>
        ))}
        {createColumn ? <Create type={'isColumn'}/> : null}
      </ColumnsContainer>
    )
}

const mapStateToProps = state => ({
    columns: state.columns
  });

  export default connect(mapStateToProps)(Swimlane)