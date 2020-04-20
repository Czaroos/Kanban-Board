import React, { PureComponent } from "react";
import { connect } from "react-redux";
import Create from "./Create";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { sort } from "../actions";
import styled from "styled-components";
import { fetchColumns, dragStateSave } from "../actions/columnActions";
import Swimlane from "./Swimlane";

const ColumnsContainerRow = styled.div`
  display: flex;
  flex-direction: column;
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

  getIndecesY = () => {
    const { columns } = this.props;
    let indecesY = new Set();
    columns.forEach((column) => indecesY.add(column.indexY));

    return Array.from(indecesY);
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <ColumnsContainerRow>
          {this.getIndecesY().map((indexY, index) =>
            index === 0 ? (
              <Swimlane indexY={indexY} key={indexY} createColumn />
            ) : (
              <Swimlane indexY={indexY} key={indexY} />
            )
          )}
          <Create type={"isSwimlane"} />
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
