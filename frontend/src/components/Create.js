import React from "react";
import Icon from "@material-ui/core/Icon";
import Button from "./Button";
import { connect } from "react-redux";
import { addColumn, addTask } from "../actions";
import styled from "styled-components";
import Form from "./Form";
import OpenForm from "./OpenForm";

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
opacity: 0.8;
color: white;
background-color: inherit;
`;

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
    const { columnID } = this.props;
    const { content } = this.state;

    if (content) {
      this.setState({
        content: ""
      });
      const task = {
        content: content,
        columnID: columnID
      }
      
      this.props.addTask(task);
    }
  };

  renderOpenForm = () => {
    const { addColumn } = this.props;
    const buttonText = addColumn ? "Add a column" : "Add a task";

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
      <OpenForm onClick={this.openForm}>
        {addColumn ? "Add another column" : "Add another task"}
      </OpenForm>
    );
  }
}

// const mapStateToProps = state => ({
//   post: state.posts.item
// });

const mapDispatchToProps = {
  addTask
};

export default connect(null, mapDispatchToProps)(Create);