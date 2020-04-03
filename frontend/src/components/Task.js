import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import Icon from "@material-ui/core/Icon";
import Form from "./Form";
import { editTask, deleteTask } from "../actions";
import { connect } from "react-redux";
import Button from "./Button";
import { useSpring, animated } from 'react-spring';

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

  const Task = React.memo(({ content, id, columnID, index, dispatch }) => {
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
    dispatch(editTask(id, columnID, taskContent));
    setIsEditing(false);
  };

  const handleDeleteTask = () => {
    dispatch(deleteTask({id, columnID}));
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
            <Card>
              <EditButton
                fontSize="small"
                onMouseDown={() => setIsEditing(true)}
              >
                edit
              </EditButton>
              <DeleteButton fontSize="small" onMouseDown={handleDeleteTask}>
                delete
              </DeleteButton>
              <CardContent>
                <Typography>{content}</Typography>
              </CardContent>
            </Card>
          </TaskContainer>
        )}
      </Draggable>
      </animated.div>
    );
  };
  return isEditing ? renderEditForm() : renderTask();
});

export default connect()(Task);
