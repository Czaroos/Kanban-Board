import React, { PureComponent } from "react";
import Column from "./Column";
import { connect } from "react-redux";
import Create from "./Create";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { sort } from "../actions";
import styled from "styled-components";
import { fetchColumns, dragStateSave } from "../actions/columnActions";
import ColumnList from "./ColumnList";

const ColumnsContainerRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

class App extends PureComponent {
  componentDidMount() {
    this.props.fetchColumns();
  }

  onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;
    const { columns } = this.props;

    if (!destination) {
      return;
    }

    this.props.sort(
      source.droppableId,
      destination.droppableId,
      source.index,
      destination.index,
      draggableId,
      type
    );

    this.props.dragStateSave(columns);
  };

  getIndecesX = () => {
    const { columns } = this.props;
    let indecesX = new Set();
    columns.forEach(column => indecesX.add(column.indexX))

    return Array.from(indecesX);
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <ColumnsContainerRow>
          {this.getIndecesX().map(indexX => (
          <ColumnList indexX={indexX} key={indexX}/>
          ))}
        </ColumnsContainerRow>
      </DragDropContext>
    );
  }
}

const mapStateToProps = (state) => ({
  columns: state.columns,
});

const mapDispatchToProps = { fetchColumns, sort, dragStateSave };

export default connect(mapStateToProps, mapDispatchToProps)(App);
