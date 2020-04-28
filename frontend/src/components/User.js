import React from "react";
import { connect } from "react-redux";
import { Draggable } from "react-beautiful-dnd";
import Avatar from "@material-ui/core/Avatar";
import styled from "styled-components";

const SmallAvatar = styled(Avatar)`
  && {
    height: 30px;
    width: 30px;
    margin-right: 5px;
    border: 1px solid black;
    font-weight: 500;
  }
`;

const User = ({ _id, name, index, color }) => {
  return (
    <Draggable draggableId={_id} index={index} type="user">
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <SmallAvatar style={{ backgroundColor: color }} alt={name}>
            {name[0].toUpperCase()}
          </SmallAvatar>
        </div>
      )}
    </Draggable>
  );
};

export default connect()(User);
