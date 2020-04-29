import React, { PureComponent } from "react";
import { connect } from "react-redux";
import Create from "./Create";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { sort } from "../actions";
import styled from "styled-components";
import { fetchColumns, dragStateSave } from "../actions/columnActions";
import { fetchUsers } from "../actions/userActions";
import Swimlane from "./Swimlane";
import Navbar from './Navbar';
var randomColor = require("randomcolor");

const ColumnsContainerColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const FirstRow = styled.div`
  display: flex;
  flex-direction: row;
`;

class App extends PureComponent {
  componentDidMount() {
    this.props.fetchColumns();
    this.props.fetchUsers();
  }

  onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;
    const { columns } = this.props

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

  getSwimlanesNames = () => {
    const { columns } = this.props;
    let swimlaneNames = [];
    columns.forEach((column) =>
      column.indexY > 0 && column.indexX === 0
        ? swimlaneNames.push(column.title)
        : null
    );

    return swimlaneNames.sort((a, b) => (a.indexY > b.indexY ? 1 : 0));
  };

  //todo: kolor zapisuje sie do bazy ????
  render() {
    const { columns, users } = this.props;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Navbar users={users}/>
        <FirstRow key={0}>
          <Swimlane indexY={0} key={0} color={randomColor()} />
          {columns.length > 0 ? (
            <Create
              type={"isColumn"}
              indexX={this.getHighestIndexX()}
              swimlanesNames={this.getSwimlanesNames()}
            />
          ) : (
            <Create type={"isColumn"} indexX={0} noColumns />
          )}
        </FirstRow>
        <Droppable droppableId="swimlanes" type="swimlane">
          {(provided) => (
            <ColumnsContainerColumn
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <div>
                {this.getIndecesY().map((indexY, index) =>
                  index === 0 ? null : (
                    <Swimlane
                      indexY={indexY}
                      key={indexY}
                      color={randomColor()}
                    />
                  )
                )}
                {provided.placeholder}
                {columns.length > 0 ? (
                  <Create
                    type={"isSwimlane"}
                    indexY={this.getHighestIndexY()}
                    indexX={this.getHighestIndexX()}
                  />
                ) : null}
              </div>
            </ColumnsContainerColumn>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

const mapStateToProps = (state) => ({
  columns: state.columns,
  users: state.users
});

const mapDispatchToProps = { fetchColumns, sort, dragStateSave, fetchUsers };

export default connect(mapStateToProps, mapDispatchToProps)(App);
