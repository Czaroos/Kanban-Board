import React, { useState } from "react";
import Task from "./Task";
import Create from "./Create";
import { Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { connect } from "react-redux";
import { editColumn, deleteColumn, dragStateSave } from "../actions";
import Icon from "@material-ui/core/Icon";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import AllInclusiveIcon from "@material-ui/icons/AllInclusive";

const ColumnContainer = styled.div`
  color: white;
  border: 1px solid rgba(1, 11, 15, 0.3);
  -webkit-box-shadow: 1px 1px 3px 1px rgba(1, 11, 15, 0.3);
  -moz-box-shadow: 1px 1px 3px 1px rgba(1, 11, 15, 0.3);
  box-shadow: 1px 1px 3px 1px rgba(1, 11, 15, 0.3);
  border-radius: 3px;
  background-color: rgba(0,0,0,0.1);
  width: 300px;
  height: 100%;
  margin-right: 12px;
  padding: 8px;

  &:active {
    border: 1px solid rgba(0, 0, 0);
    background-color: rgba(0,0,0,0.3)
    }

  &:hover {
    border: 1px solid rgba(0, 0, 0);
    background-color: rgba(0,0,0,0.2)
    }

  .
`;

const StyledInput = styled.input`
  width: 50%;
  background-color: inherit;
  border: none;
  outline-color: #ff8948;
  border-radius: 3px;
  margin-bottom: 3px;
  padding: 5px;
`;

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DeleteButton = styled(Icon)`
  cursor: pointer;
  margin-left: 10px;
  opacity: 0.5;
  &:hover {
    opacity: 0.8;
  }
`;

const ColumnTitle = styled.h3`
  cursor: text;
  text-transform: uppercase;
  &:hover {
    opacity: 0.5;
  }
`;

const Limit = styled.h3`
  margin-left: 10px;
  min-width: 24px;
  min-height: 28.8px;
  cursor: text;
  text-transform: uppercase;
  &:hover {
    opacity: 0.5;
  }
`;

const ColumnList = ({ title, tasks, limit, id, index, dispatch, columns }) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingLimit, setIsEditingLimit] = useState(false);
  const [columnTitle, setColumnTitle] = useState(title);
  const [columnLimit, setColumnLimit] = useState(limit);

  const renderEditInput = () => {
    if (isEditingTitle)
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
    if (isEditingLimit)
      return (
        <form onSubmit={handleFinishEditing}>
          <StyledInput
            type="text"
            value={columnLimit}
            onChange={handleChange}
            autoFocus
            onFocus={handleFocus}
            onBlur={handleFinishEditing}
          />
        </form>
      );
  };

  const handleFocus = (e) => {
    e.target.select();
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (isEditingTitle) setColumnTitle(e.target.value);
    if (isEditingLimit) setColumnLimit(e.target.value);
  };

  const handleFinishEditing = () => {
    setIsEditingTitle(false);
    setIsEditingLimit(false);
    const column = {
      id,
      title: columnTitle,
      limit: columnLimit,
      tasks,
      index,
    };
    dispatch(editColumn(column));
  };

  const handleDeleteColumn = () => {
    dispatch(deleteColumn(id));
    const filteredColumns = columns.filter((column) => column.id !== id);
    
    dispatch(dragStateSave(filteredColumns.map((col, index) => {
      col.index = index;
      return col
    })));
  };

  const submitColumnDelete = () => {
    confirmAlert({
      title: "Alert!",
      message: "Are you sure you want to delete this column ?",
      buttons: [
        {
          label: "Yes",
          onClick: () => handleDeleteColumn(),
        },
        {
          label: "No",
          onClick: () => {
            return null;
          },
        },
      ],
      closeOnEscape: true,
      closeOnClickOutside: true,
    });
  };

  return (
    <Draggable key={id} draggableId={id} index={index}>
      {(provided) => (
        <ColumnContainer
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
        >
          {isEditingTitle || isEditingLimit ? (
            renderEditInput()
          ) : (
            <TitleContainer>
              <Limit onClick={() => setIsEditingLimit(true)}>
                {limit <= -9999 ? (
                  <AllInclusiveIcon />
                ) : limit === 0 ? (
                  "MAX"
                ) : (
                  limit
                )}
              </Limit>
              <ColumnTitle onClick={() => setIsEditingTitle(true)}>
                {columnTitle}
              </ColumnTitle>
              <DeleteButton onClick={submitColumnDelete}>delete</DeleteButton>
            </TitleContainer>
          )}
          <Droppable droppableId={id}>
            {(provided) => (
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

const mapStateToProps = (state) => ({
  columns: state.columns,
});

export default connect(mapStateToProps)(ColumnList);
