import React, { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import Icon from "@material-ui/core/Icon";
import Form from "./Form";
import { editTask, deleteTask } from "../actions";
import { connect } from "react-redux";
import Button from "./Button";
import { confirmAlert } from "react-confirm-alert";
import "./styles/react-confirm-alert.css";
import { useSpring, animated } from "react-spring";
import { Typography, Card } from "@material-ui/core";
import PriorityHighIcon from "@material-ui/icons/PriorityHigh";
import User from "./User";
import BlockOutlinedIcon from "@material-ui/icons/BlockOutlined";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import LockOpenOutlinedIcon from "@material-ui/icons/LockOpenOutlined";

const TaskContainer = styled.div`
  margin: 0 0 8px 0;
  position: relative;
  max-width: 100%;
  word-wrap: break-word;
`;

const LockOpenIcon = styled(LockOpenOutlinedIcon)`
  && {
    position: absolute;
    display: none;
    right: 2px;
    bottom: 25px;
    opacity: 0.5;
    ${TaskContainer}:hover & {
      display: block;
      cursor: pointer;
    }
    &:hover {
      opacity: 0.8;
    }
  }
`;

const BlockIcon = styled(BlockOutlinedIcon)`
  && {
    font-size: 5.1rem;
    opacity: 0.8;
    position: absolute;
    right: 115px;
    top: -3px;
  }
`;

const LockIcon = styled(LockOutlinedIcon)`
  && {
    position: absolute;
    display: none;
    right: 2px;
    bottom: 25px;
    opacity: 0.5;
    ${TaskContainer}:hover & {
      display: block;
      cursor: pointer;
    }
    &:hover {
      opacity: 0.8;
    }
  }
`;

const EditButton = styled(Icon)`
  position: absolute;
  display: none;
  right: 1px;
  top: 2px;
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
    padding: 8px 16px 2px 8px;

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
  right: 2px;
  bottom: 1px;
  opacity: 0.5;
  ${TaskContainer}:hover & {
    display: block;
    cursor: pointer;
  }
  &:hover {
    opacity: 0.8;
  }
`;

const Users = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 90%;
  min-height: 32px;
  margin-top: 2px;
`;

const HighPriorityIcon = styled(PriorityHighIcon)`
  position: absolute;
  right: -2px;
  top: 3px;
  opacity: 0.9;
  ${TaskContainer}:hover & {
    opacity: 0;
  }
`;

const Task = ({
  content,
  id,
  columnID,
  userID,
  priority,
  index,
  dispatch,
  users,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [taskContent, setTaskContent] = useState(content);
  const [isLocked, setIsLocked] = useState(false);

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
      <Form content={taskContent} onChange={handleChange} closeForm={closeForm}>
        <Button onClick={saveTask}>Save</Button>
      </Form>
    );
  };

  const renderTask = () => {
    return (
      <animated.div style={props}>
        {isLocked ? (
          <Draggable draggableId={id} index={index} isDragDisabled={true}>
            {(provided) => (
              <TaskContainer
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                onDoubleClick={() => setIsEditing(true)}
              >
                <StyledTask
                  style={{
                    opacity: 0.3,
                    borderTop: "2px solid red",
                    cursor: "auto",
                  }}
                >
                   {priority === "normal" ? (
                    <HighPriorityIcon style={{ fontSize: "1.4rem" }} />
                  ) : priority === "high" ? (
                    <HighPriorityIcon
                      style={{ color: "orange", fontSize: "1.7rem" }}
                    />
                  ) : (
                    <HighPriorityIcon
                      style={{ color: "red", fontSize: "2rem"}}
                    />
                  )}
                  <BlockIcon />
                  <LockOpenIcon
                    fontSize="small"
                    onClick={() => setIsLocked(false)}
                  />
                  <EditButton
                    fontSize="small"
                    onMouseDown={() => setIsEditing(true)}
                  >
                    edit
                  </EditButton>
                  <DeleteButton fontSize="small" onMouseDown={submitTaskDelete}>
                    delete
                  </DeleteButton>
                  <Typography>{content}</Typography>
                  <Droppable
                    droppableId={id}
                    direction="horizontal"
                    type="user"
                  >
                    {(provided) => (
                      <Users
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        {users.map((user, index) => (
                          <User
                            _id={user._id}
                            name={user.name}
                            userLimit={user.userLimit}
                            index={index}
                            key={user._id}
                            color={user.color}
                            isDragDisabled={true}
                            droppableId={id}
                          />
                        ))}
                        {provided.placeholder}
                      </Users>
                    )}
                  </Droppable>
                </StyledTask>
              </TaskContainer>
            )}
          </Draggable>
        ) : (
          <Draggable draggableId={id} index={index}>
            {(provided) => (
              <TaskContainer
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                onDoubleClick={() => setIsEditing(true)}
              >
                <StyledTask>
                  {priority === "normal" ? (
                    <HighPriorityIcon style={{ fontSize: "1.4rem" }} />
                  ) : priority === "high" ? (
                    <HighPriorityIcon
                      style={{ color: "orange", fontSize: "1.7rem" }}
                    />
                  ) : (
                    <HighPriorityIcon
                      style={{ color: "red", fontSize: "2rem" }}
                    />
                  )}
                  <LockIcon
                    fontSize="small"
                    onClick={() => setIsLocked(true)}
                  />
                  <EditButton
                    fontSize="small"
                    onMouseDown={() => setIsEditing(true)}
                  >
                    edit
                  </EditButton>
                  <DeleteButton fontSize="small" onMouseDown={submitTaskDelete}>
                    delete
                  </DeleteButton>
                  <Typography>{content}</Typography>
                  <Droppable
                    droppableId={id}
                    direction="horizontal"
                    type="user"
                  >
                    {(provided) => (
                      <Users
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        {users.map((user, index) => (
                          <User
                            _id={user._id}
                            name={user.name}
                            userLimit={user.userLimit}
                            index={index}
                            key={user._id}
                            color={user.color}
                            isDragDisabled={true}
                            droppableId={id}
                          />
                        ))}
                        {provided.placeholder}
                      </Users>
                    )}
                  </Droppable>
                </StyledTask>
              </TaskContainer>
            )}
          </Draggable>
        )}
      </animated.div>
    );
  };
  return isEditing ? renderEditForm() : renderTask();
};

export default connect()(Task);
