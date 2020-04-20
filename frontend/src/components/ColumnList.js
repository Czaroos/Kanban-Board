import React from 'react';
import Column from './Column';
import Create from './Create';
import { connect } from 'react-redux';
import styled from "styled-components";

const ColumnsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;


const ColumnList = ({columns, indexX}) => {
    const filteredColumns = columns.filter(column => column.indexX === indexX)
    const sortedColumns = filteredColumns.sort((colA, colB) => {
        if(colA.indexY > colB.indexY) return 1
        else return -1
    })

    return (
        <ColumnsContainer>
        {sortedColumns.map((column) => (
          <Column
            id={column.id}
            key={column.id}
            title={column.title}
            tasks={column.tasks}
            index={column.index}
            limit={column.limit}
          />
        ))}
        <Create isColumn/>  
      </ColumnsContainer>
    )
}

const mapStateToProps = state => ({
    columns: state.columns
  });

  export default connect(mapStateToProps)(ColumnList)