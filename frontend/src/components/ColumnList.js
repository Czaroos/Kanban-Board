import React from 'react';
import Column from './Column';
import Create from './Create';
import { connect } from 'react-redux';
import styled from "styled-components";
var randomColor = require('randomcolor');

const ColumnsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Line = styled.div`
    margin-bottom: 30px;
    height: 5px;
    width: 318px;
    background-color: ${randomColor()};
`


const ColumnList = ({columns, indexX}) => {
    const filteredColumns = columns.filter(column => column.indexX === indexX)
    const sortedColumns = filteredColumns.sort((colA, colB) => {
        if(colA.indexY > colB.indexY) return 1
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
        <Create type={'isSwimlane'}/>  
      </ColumnsContainer>
    )
}

const mapStateToProps = state => ({
    columns: state.columns
  });

  export default connect(mapStateToProps)(ColumnList)