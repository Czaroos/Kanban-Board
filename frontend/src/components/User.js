import React from "react";
import { connect } from "react-redux";
import { Draggable } from "react-beautiful-dnd";
import Avatar from "@material-ui/core/Avatar";
import styled from "styled-components";
import CloseIcon from '@material-ui/icons/Close';

const UserBox = styled.div`
    position: relative;
    height: 35px;
    width: 35px;
`;

const SmallAvatar = styled(Avatar)`
  && {
    height: 30px;
    width: 30px;
    margin-right: 5px;
    border: 1px solid black;
    font-weight: 500;
  }
`;

const SmallCloseIcon = styled(CloseIcon)`
  && {
    position: absolute;
    display: none;
    top: -5px;
    right: -4px;
    color: white;
    height: 12px;
    width: 12px;
    opacity: 0.8;
    ${UserBox}:hover & {
        display: block;
        cursor: pointer;
    }
  }
`;

const User = ({ _id, name, index, color, isDragDisabled}) => {
  return (
    <Draggable draggableId={_id} index={index} type="user" isDragDisabled={isDragDisabled}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
            <UserBox>
            <SmallCloseIcon/>
          <SmallAvatar style={{ backgroundColor: color }} alt={name}>
            {name[0].toUpperCase()}
          </SmallAvatar>
          </UserBox>
        </div>
      )}
    </Draggable>
  );
};

export default connect()(User);
