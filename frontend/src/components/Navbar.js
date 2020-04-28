import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import User from "./User";
import { Droppable } from "react-beautiful-dnd";
import * as _ from "lodash";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 20px;
  margin-bottom: 20px;
  width: 20%;
`;

// when creating a user remember to always create it 'userLimit' times
const Navbar = ({ users }) => {
  const uniqueUsers = _.uniqBy(users, "name");

  return (
    <Droppable droppableId="users" direction="horizontal" type="user">
      {(provided) => (
        <Container {...provided.droppableProps} ref={provided.innerRef}>
          {uniqueUsers.map((user, index) => (
            <User
              _id={user._id}
              name={user.name}
              index={index}
              key={user._id}
              color={user.color}
            />
          ))}
          {provided.placeholder}
        </Container>
      )}
    </Droppable>
  );
};

export default connect()(Navbar);
