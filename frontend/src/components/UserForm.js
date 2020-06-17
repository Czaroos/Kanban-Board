import React from "react";
import Button from "./Button";
import { connect } from "react-redux";
import { addUser, fetchUsers } from "../actions";
import OpenForm from "./OpenForm";
import styled from "styled-components";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import CloseSharpIcon from "@material-ui/icons/CloseSharp";

var randomColor = require("randomcolor");

const ContainerRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
`;

const StyledTextArea = styled(TextareaAutosize)`
  border-radius: 3px;
  color: #eee;
  resize: none;
  overflow: hidden;
  outline: none;
  background-color: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(1, 11, 15);
  margin: 0px 15px 10px 0px;
  padding: 6px;

  ::placeholder {
    color: #eee;
    font-size: 0.7rem;
  }
`;

const CloseIcon = styled(CloseSharpIcon)`
  && {
    cursor: pointer;
    font-size: 2rem;
    align-self: stretch;
    margin-left: 20px;
    margin-top: 3px;
    opacity: 0.8;
    &:hover {
      opacity: 0.5;
    }
  }
`;

class UserForm extends React.PureComponent {
  state = {
    formOpen: false,
    name: "",
    limit: "",
  };

  handleOpenForm = () => {
    this.setState({
      formOpen: true,
    });
  };

  handleCloseForm = () => {
    this.setState({
      formOpen: false,
    });
  };

  handleNameChange = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  handleLimitChange = (e) => {
    this.setState({
      limit: e.target.value,
    });
  };

  handleAddUser = async () => {
    const { name, limit } = this.state;
    const { users } = this.props;

    const alreadyAddedUser = users.find((user) => name === user.name);
    var color = alreadyAddedUser
      ? alreadyAddedUser.color
      : randomColor({ luminosity: "dark" });

    const isNumber = /[0-9]/.test(limit);

    if (name && limit) {
      this.setState({
        name: "",
        limit: "",
        formOpen: false,
      });

      const wipLimit = isNumber && limit < 30 && limit > 0 ? limit : 30;
      if (name.trim().length !== 0 || limit.trim().length !== 0) {
        const newUser = {
          name: name.toUpperCase(),
          color: color,
        };

        for (let i = 1; i <= wipLimit; i++) {
          await this.props.addUser(newUser);
        }
        this.props.fetchUsers();
      }
    }
  };

  render() {
    return this.state.formOpen ? (
      <ContainerRow>
        <StyledTextArea
          style={{ width: "200px", marginLeft: "10px" }}
          autoFocus
          placeholder="Set name..."
          onChange={(e) => this.handleNameChange(e)}
        />
        <StyledTextArea
          style={{ width: "90px" }}
          placeholder="Set limit (max 30)..."
          onChange={(e) => this.handleLimitChange(e)}
        />
        <Button onClick={this.handleAddUser}>Add a user</Button>
        <CloseIcon onClick={this.handleCloseForm} />
      </ContainerRow>
    ) : (
      <OpenForm onClick={this.handleOpenForm}>Add a user</OpenForm>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.users,
});

const mapDispatchToProps = {
  fetchUsers,
  addUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
