import React, { PureComponent } from "react";
import { connect } from "react-redux";
import Create from "./Create";
import { DragDropContext } from "react-beautiful-dnd";
import { sort } from "../actions";
import styled from "styled-components";
import { fetchColumns, dragStateSave } from "../actions/columnActions";
import Swimlane from "./Swimlane";
var randomColor = require("randomcolor");

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

  getHighestIndexY = () => {
    const { columns } = this.props;
    const indecesY = new Set();
    columns.forEach((column) => indecesY.add(column.indexY));
    const indecesYArr = Array.from(indecesY).sort().reverse(); // first element must be highest value

    return indecesYArr[0] + 1;
  };

  getHighestIndexX = () => {
    const { columns } = this.props;
    const indecesX = new Set();
    columns.forEach((column) => indecesX.add(column.indexX));
    const indecesXArr = Array.from(indecesX).sort().reverse(); // first element must be highest value

    return indecesXArr[0] + 1;
  };

  render() {
    const { columns } = this.props;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <ColumnsContainerRow>
          {columns.length !== 0 ? (
            <div>
              {this.getIndecesY().map((indexY, index) =>
                index === 0 ? (
                  <Swimlane
                    indexY={indexY}
                    key={indexY}
                    color={randomColor()}
                    createColumn
                  />
                ) : (
                  <Swimlane
                    indexY={indexY}
                    key={indexY}
                    color={randomColor()}
                  />
                )
              )}
              <Create
                type={"isSwimlane"}
                indexY={this.getHighestIndexY()}
                indexX={this.getHighestIndexX()}
              />
            </div>
          ) : (
            <Create type={"isColumn"} indexX={0} noColumns />
          )}
          {}
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
