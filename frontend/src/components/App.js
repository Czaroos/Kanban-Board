import React, { PureComponent } from "react";
import Column from "./Column";
import { connect } from "react-redux";
import Create from "./Create";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { sort } from "../actions";
import styled from "styled-components";
import { fetchColumns, dragStateSave } from '../actions/columnActions';

const ColumnsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

class App extends PureComponent {

  componentDidMount() {
    this.props.fetchColumns();
  }

  onDragEnd = result => {
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
      )

    this.props.dragStateSave(columns)
  };

  render() {
    const { columns } = this.props;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable
            droppableId="all-columns"
            direction="horizontal"
            type="column"
          >
            {provided => (
              <ColumnsContainer {...provided.droppableProps} ref={provided.innerRef}>
                {columns.map((column) => (
                  <Column
                    id={column.id}
                    key={column.id}
                    title={column.title}
                    tasks={column.tasks}
                    index={column.index}
                    limit={column.limit}
                  />
                ))}
                {provided.placeholder}
                <Create isColumn/>
              </ColumnsContainer>
            )}
          </Droppable>
      </DragDropContext>
    );
  }
}

const mapStateToProps = state => ({
  columns: state.columns
});

const mapDispatchToProps = {fetchColumns, sort, dragStateSave}

export default connect(mapStateToProps, mapDispatchToProps)(App);
