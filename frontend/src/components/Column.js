import React, { useState } from "react";
import Task from "./Task";
import Create from "./Create";
import { Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { connect } from "react-redux";
import { editColumn, deleteColumn, dragStateSave } from "../actions";
import Icon from "@material-ui/core/Icon";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const ColumnContainer = styled.div`
  border: 2px solid orange;
  border-radius: 3px;
  background-color: #282c34;
  width: 300px;
  height: 100%;
  padding: 8px;
  margin: 5px 20px 15px 0px;
`;

const StyledInput = styled.input`
  width: 96%;
  border: none;
  outline-color: #ff8948;
  border-radius: 3px;
  margin-bottom: 3px;
  padding: 5px;
`;

const TitleContainer = styled.div`
  color: #FFFFFF;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DeleteButton = styled(Icon)`
  cursor: pointer;
  margin-left: 5px;
  opacity: 0.5;
  &:hover {
    opacity: 0.8;
  }
`;

const ColumnTitle = styled.h4`
  font-size: 150%;
  cursor: text;
  text-transform: uppercase;
  &:hover {
    opacity: 0.5;
  }
`;

const ColumnList = ({ title, tasks, limit, id, index, dispatch, columns }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [columnTitle, setColumnTitle] = useState(title);

  const renderEditInput = () => {
    return (
      <form onSubmit={handleFinishEditing}>
        <StyledInput
          type="text"
          value={columnTitle}
          onChange={handleChange}
          autoFocus
          onFocus={handleFocus}
          onBlur={handleFinishEditing}
        />
      </form>
    );
  };

  const handleFocus = e => {
    e.target.select();
  };

  const handleChange = e => {
    e.preventDefault();
    setColumnTitle(e.target.value);
  };

  const handleFinishEditing = () => {
    setIsEditing(false);
    const column = {
      id,
      title,
      limit,
      tasks,
      index
    }
    dispatch(editColumn(column));
  };

    const handleDeleteColumn = () => {
    dispatch(deleteColumn(id));
    const filteredColumns = columns.filter(column => column.id !== id)
    dispatch(dragStateSave(filteredColumns))
  };
  const submit = id => {
    confirmAlert({
      title: 'Alert!',
      message: 'Are you sure you want to delete this column ?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => handleDeleteColumn()
        },
        {
          label: 'No',
          onClick: () => {return null}
        }
      ],
      closeOnEscape: true,
      closeOnClickOutside: true,
    });
  };

  return (
    <Draggable key={id} draggableId={id} index={index}>
      {provided => (
        <ColumnContainer
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
        >
          {isEditing ? (
            renderEditInput()
          ) : (
            <TitleContainer>
              {limit >= 0 ? limit : "LIMIT REACHED"}
              <ColumnTitle onClick={() => setIsEditing(true)}>
                {columnTitle}
              </ColumnTitle>
              <DeleteButton onClick={submit}>delete</DeleteButton>
            </TitleContainer>
          )}
          <Droppable droppableId={id}>
            {provided => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {tasks.map((task, index) => (
                  <Task
                    id={task.id}
                    index={index}
                    key={task.id}
                    content={task.content}
                    columnID={task.columnID}
                    userID={task.userID}
                    priority={task.priority}
                  />
                ))}
                {provided.placeholder}
                <Create columnID={id} />
              </div>
            )}
          </Droppable>
        </ColumnContainer>
      )}
    </Draggable>
  );
};

const mapStateToProps = state => ({
  columns: state.columns
})

export default connect(mapStateToProps)(ColumnList);
