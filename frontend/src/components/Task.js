import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import Icon from "@material-ui/core/Icon";
import Form from "./Form";
import { editTask, deleteTask } from "../actions";
import { connect } from "react-redux";
import Button from "./Button";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useSpring, animated } from "react-spring";
import { CardContent, Typography, Card } from "@material-ui/core";
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';

const TaskContainer = styled.div`
  margin: 0 0 8px 0;
  position: relative;
  max-width: 100%;
  word-wrap: break-word;
`;

const EditButton = styled(Icon)`
  position: absolute;
  display: none;
  right: 5px;
  top: 5px;
  opacity: 0.5;
  ${TaskContainer}:hover & {
    display: block;
    cursor: pointer;
  }
  &:hover {
    opacity: 0.8;
  }
`;

const StyledTask = styled(Card)`
  && {
    background-color: inherit;
    border: 1px solid #ccc;
    -webkit-box-shadow: 1px 1px 3px 1px rgba(255, 255, 255, 0.1);
    -moz-box-shadow: 1px 1px 3px 1px rgba(255, 255, 255, 0.1);
    box-shadow: 1px 1px 3px 1px rgba(255, 255, 255, 0.1);
    color: white;
    padding-right: 16px;
        
    &:active {
      border: 1px solid rgba(1, 11, 15);
      background-color: rgba(0, 0, 0, 0.3);
    }
  
    &:hover {
      border: 1px solid rgba(1, 11, 15);
      background-color: rgba(0, 0, 0, 0.2);
    }
  }
`;

const DeleteButton = styled(Icon)`
  position: absolute;
  display: none;
  right: 5px;
  bottom: 5px;
  opacity: 0.5;
  ${TaskContainer}:hover & {
    display: block;
    cursor: pointer;
  }
  &:hover {
    opacity: 0.8;
  }
`;

const HighPriorityIcon = styled(PriorityHighIcon)`
  position: absolute;
  right: 5px;
  top: 5px;
  color: red;


  ${TaskContainer}:hover & {
    opacity: 0;
  }
`

const Task = React.memo(
  ({ content, id, columnID, userID, priority, index, dispatch }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [taskContent, setTaskContent] = useState(content);

    const props = useSpring({
      opacity: 1,
      from: { opacity: 0 },
      config: { duration: 400 },
    });

    const closeForm = (e) => {
      setIsEditing(false);
    };

    const handleChange = (e) => {
      setTaskContent(e.target.value);
    };

    const saveTask = (e) => {
      e.preventDefault();
      if (taskContent.trim().length !== 0) {
        const task = {
          id,
          content: taskContent,
          columnID,
          userID,
          priority,
        };
        dispatch(editTask(task));
      }
      setIsEditing(false);
    };

    const handleDeleteTask = () => {
      dispatch(deleteTask({ id, columnID }));
    };

    const submitTaskDelete = () => {
      confirmAlert({
        title: "Alert!",
        message: "Are you sure you want to delete this task ?",
        buttons: [
          {
            label: "Yes",
            onClick: () => handleDeleteTask(),
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

    const renderEditForm = () => {
      return (
        <Form
          content={taskContent}
          onChange={handleChange}
          closeForm={closeForm}
        >
          <Button onClick={saveTask}>Save</Button>
        </Form>
      );
    };

    const renderTask = () => {
      return (
        <animated.div style={props}>
          <Draggable draggableId={id} index={index}>
            {(provided) => (
              <TaskContainer
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                onDoubleClick={() => setIsEditing(true)}
              >
                <StyledTask>
                  {priority === "high" ? <HighPriorityIcon
                  fontSize="small"/> : null}
                  <EditButton
                    fontSize="small"
                    onMouseDown={() => setIsEditing(true)}
                  >
                    edit
                  </EditButton>
                  <DeleteButton fontSize="small" onMouseDown={submitTaskDelete}>
                    delete
                  </DeleteButton>
                  <CardContent>
                    <Typography>{content}</Typography>
                  </CardContent>
                </StyledTask>
              </TaskContainer>
            )}
          </Draggable>
        </animated.div>
      );
    };
    return isEditing ? renderEditForm() : renderTask();
  }
);

export default connect()(Task);
