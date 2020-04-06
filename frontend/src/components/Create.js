import React from "react";
import Icon from "@material-ui/core/Icon";
import Button from "./Button";
import { connect } from "react-redux";
import { addColumn, addTask } from "../actions";
import Form from "./Form";
import OpenForm from "./OpenForm";

class Create extends React.PureComponent {
  state = {
    formOpen: false,
    content: "",
    // columnLimitInput: ""
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
    const { content } = this.state;

    if (content) {
      this.setState({
        content: "",
        // columnLimitInput: ""
      });

      if (content.trim().length !== 0) {
        const newColumn = {
          title: content,
          // limit: Number(columnLimitInput.replace(/\s/g, ""))
        };
  
        this.props.addColumn(newColumn);
      }
    }
  };

  handleAddTask = () => {
    const { columnID } = this.props;
    const { content } = this.state;

      if (content) {
        this.setState({
          content: ""
        });

      if (content.trim().length !== 0) {
        const newTask = {
          content,
          columnID
        };
  
        this.props.addTask(newTask);
      }
    }
  };

  renderOpenForm = () => {
    const { isColumn } = this.props;
    const buttonText = isColumn ? "Add a column" : "Add a task";

    return (
      <OpenForm onClick={this.openForm}>
        <Icon>add</Icon>
        <p style={{ flexShrink: 0 }}>{buttonText}</p>
      </OpenForm>
    );
  };

  render() {
    const { content } = this.state;
    const { isColumn } = this.props;

    const placeholder = isColumn
      ? "Enter a column name..."
      : "Enter a task description...";

    return this.state.formOpen ? (
      <Form
        content={content}
        placeholder={placeholder}
        onChange={this.handleInputChange}
        closeForm={this.closeForm}
      >
        <Button onClick={isColumn ? this.handleAddColumn : this.handleAddTask}>
          {isColumn ? "Add a column" : "Add a task"}
        </Button>
      </Form>
    ) : (
      <OpenForm onClick={this.openForm}>
        {isColumn ? "Add another column" : "Add another task"}
      </OpenForm>
    );
  }
}

const mapDispatchToProps = {
  addTask,
  addColumn
};

export default connect(null, mapDispatchToProps)(Create);
