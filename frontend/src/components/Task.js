import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import Icon from "@material-ui/core/Icon";
import Form from "./Form";
import { editTask, deleteTask } from "../actions";
import { connect } from "react-redux";
import Button from "./Button";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useSpring, animated } from 'react-spring';

  const TaskContainer = styled.div`
    margin: 0 0 8px 0;
    position: relative;
    max-width: 100%;
    word-wrap: break-word;
  `;
  const TaskCard = styled.div`
    color: #FFFFFF;
    background-color: #1B1E23;
    border: 1px solid darkorange;
    border-radius: 3px;
    width: 90%;
    margin: 5px 0px 8px 14px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  `;
  const TaskContent = styled.div`
    align-self: center;
  `;
  const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 10px;
  `;
  const EditButton = styled(Icon)`
    opacity: 0.5;
    ${TaskContainer}:hover & {
      cursor: pointer;
    }
    &:hover {
      opacity: 0.8;
    }
  `;

  const DeleteButton = styled(Icon)`
    opacity: 0.5;
    ${TaskContainer}:hover & {
      cursor: pointer;
    }
    &:hover {
      opacity: 0.8;
    }
  `;

  const Task = React.memo(({ content, id, columnID, userID, priority, index, dispatch }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [taskContent, setTaskContent] = useState(content);

    const props = useSpring({
      opacity: 1,
      from: { opacity: 0 },
      config: { duration: 400 }
    });

  const closeForm = e => {
    console.log("clicked");
    setIsEditing(false);
  };

  const handleChange = e => {
    setTaskContent(e.target.value);
  };

  const saveTask = e => {
    e.preventDefault();
    const task = {
      id,
      content,
      columnID,
      userID,
      priority
    }
    dispatch(editTask(task));
    setIsEditing(false);
  };

  const handleDeleteTask = () => {
    dispatch(deleteTask({id, columnID}));
  };

  const submit = id => {
    confirmAlert({
      title: 'Alert!',
      message: 'Are you sure you want to delete this task ?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => handleDeleteTask(id)
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

  const renderEditForm = () => {
    return (
      <Form content={taskContent} onChange={handleChange} closeForm={closeForm}>
        <Button onClick={saveTask}>Save</Button>
      </Form>
    );
  };

  const renderTask = () => {
    return (
      <animated.div style={props}>
      <Draggable draggableId={id} index={index}>
        {provided => (
          <TaskContainer
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            onDoubleClick={() => setIsEditing(true)}
          >
            <TaskCard>
              <TaskContent>
                <h3>{content}</h3>
              </TaskContent>
                <ButtonsContainer>
                <EditButton
                  fontSize="small"
                  onMouseDown={() => setIsEditing(true)}
                >
                  edit
                </EditButton>
                <DeleteButton fontSize="small" onMouseDown={submit}>
                  delete
                </DeleteButton>
              </ButtonsContainer>
            </TaskCard>
          </TaskContainer>
        )}
      </Draggable>
      </animated.div>
    );
  };
  return isEditing ? renderEditForm() : renderTask();
});

export default connect()(Task);
