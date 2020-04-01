import React from "react";
import Icon from "@material-ui/core/Icon";
import Button from "./Button";
import { connect } from "react-redux";
import { addColumn, addTask } from "../actions";
import styled from "styled-components";
import Form from "./Form";
import OpenForm from "./OpenForm";

class Create extends React.PureComponent {
  state = {
    formOpen: false,
    content: ""
  };

  openForm = () => {
    this.setState({
      formOpen: true
    });
  };

  closeForm = e => {
    this.setState({
      formOpen: false
    });
  };

  handleInputChange = e => {
    this.setState({
      content: e.target.value
    });
  };

  handleAddColumn = () => {
    const { dispatch } = this.props;
    const { content } = this.state;

    if (content) {
      this.setState({
        content: ""
      });
      dispatch(addColumn(content));
    }

    return;
  };

  handleAddTask = () => {
    const { dispatch, columnID } = this.props;
    const { content } = this.state;

    if (content) {
      this.setState({
        content: ""
      });
      dispatch(addTask(columnID, content));
    }
  };

  renderOpenForm = () => {
    const { addColumn } = this.props;

    const buttonText = addColumn ? "Add a column" : "Add a task";
    const textColor = addColumn ? "white" : "inherit";
    const buttonOpacity = addColumn ? 1 : 0.5;
    const buttonBackground = addColumn ? "rgba(0,0,0,.15)" : "inherit";

    const OpenFormButton = styled.div`
      display: flex;
      align-items: center;
      cursor: pointer;
      border-radius: 3px;
      height: 36px;
      margin-left: 8px;
      width: 300px;
      padding-left: 10px;
      padding-right: 10px;
      opacity: ${buttonOpacity};
      color: ${textColor};
      background-color: ${buttonBackground};
    `;

    return (
      <OpenFormButton onClick={this.openForm}>
        <Icon>add</Icon>
        <p style={{ flexShrink: 0 }}>{buttonText}</p>
      </OpenFormButton>
    );
  };

  render() {
    const { content } = this.state;
    const { addColumn } = this.props;
    const placeholder = addColumn
    ? "Enter a column name..."
    : "Enter a task description...";
    return this.state.formOpen ? (
      <Form
        content={content}
        placeholder={placeholder}
        onChange={this.handleInputChange}
        closeForm={this.closeForm}
      >
        <Button onClick={addColumn ? this.handleAddColumn : this.handleAddTask}>
          {addColumn ? "Add a column" : "Add a task"}
        </Button>
      </Form>
    ) : (
      <OpenForm addColumn={addColumn} onClick={this.openForm}>
        {addColumn ? "Add another column" : "Add another task"}
      </OpenForm>
    );
  }
}

export default connect()(Create);