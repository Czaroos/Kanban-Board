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
import LimitError from "./LimitError";

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

const StyledInputTitle = styled.input`
  width: 80%;
  background-color: inherit;
  border: none;
  outline: none;
  border-bottom: 2px solid #03a8f45e;
  margin-bottom: 5px;
  margin-left: 23px;
  font-size: 1.4rem;
  text-align: center;
  padding: 5px;
  color: white;
`;

const StyledInputLimit = styled.input`
  width: 8%;
  background-color: inherit;
  border: none;
  outline: none;
  border-bottom: 2px solid #03a8f45e;
  margin-bottom: 5px;
  margin-left: 0px;
  text-size: 1.4rem;
  text-align: center;
  padding: 5px;
  color: white;
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
  margin-bottom: 5px;
  margin-right: 10px;
  cursor: text;
  text-transform: uppercase;
  &:hover {
    opacity: 0.5;
  }
`;

const ColumnList = ({ title, tasks, limit, id, index, dispatch, columns }) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingLimit, setIsEditingLimit] = useState(false);

  const renderEditInput = (value) => {
    return isEditingTitle ? (
      <form onSubmit={handleFinishEditing}>
        <StyledInputTitle
          type="text"
          onChange={handleChange}
          value={value}
          autoFocus
          onFocus={handleFocus}
          onBlur={closeForm}
        />
      </form>
    ) : (
      <form onSubmit={handleFinishEditing}>
        <StyledInputLimit
          type="text"
          onChange={handleChange}
          value={value}
          autoFocus
          onFocus={handleFocus}
          onBlur={closeForm}
        />
      </form>
    );
  };

  const closeForm = () => {
    setIsEditingTitle(false);
    setIsEditingLimit(false);
  };

  const handleFocus = (e) => {
    e.target.select();
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (isEditingTitle) title = e.target.value;
    if (isEditingLimit) limit = e.target.value;
  };

  const handleFinishEditing = () => {
    let validatedColumnLimit = limit;

    if (!/[0-9]/.test(validatedColumnLimit)) {
      validatedColumnLimit = -99999;
    }

    setIsEditingTitle(false);
    setIsEditingLimit(false);

    if (title.trim().length !== 0) {
      const column = {
        id,
        title: title,
        limit: validatedColumnLimit,
        tasks,
        index,
      };
      dispatch(editColumn(column));
    }
  };

  const handleDeleteColumn = () => {
    dispatch(deleteColumn(id));
    const filteredColumns = columns.filter((column) => column.id !== id);

    dispatch(
      dragStateSave(
        filteredColumns.map((col, index) => {
          col.index = index;
          return col;
        })
      )
    );
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
                ) : limit <= 0 ? (
                  <LimitError/>
                ) : (
                  limit
                )}
              </Limit>
              <ColumnTitle onClick={() => setIsEditingTitle(true)}>
                {title}
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
