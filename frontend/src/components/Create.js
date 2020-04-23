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
      formOpen: true,
    });
  };

  closeForm = (e) => {
    this.setState({
      formOpen: false,
    });
  };

  handleInputChange = (e) => {
    this.setState({
      content: e.target.value,
    });
  };

  handleAddColumn = () => {
    const { content } = this.state;
    const { indexX, swimlanesNames, noColumns } = this.props;

    if (content) {
      this.setState({
        content: "",
        // columnLimitInput: ""
      });

      if (content.trim().length !== 0) {
        const newColumn = {
          title: content,
          indexY: 0,
          indexX: indexX,
          // limit: Number(columnLimitInput.replace(/\s/g, ""))
        };
        this.props.addColumn(newColumn);

        if (!noColumns) {
          swimlanesNames.forEach((swimlane, index) => {
            const newColumn = {
              title: swimlane,
              indexY: index + 1,
              indexX: indexX,
            };
            this.props.addColumn(newColumn);
          });
        }
      }
    }
  };

  handleAddSwimlane = () => {
    const { content } = this.state;
    const { indexX, indexY } = this.props;

    if (content) {
      this.setState({
        content: "",
        // columnLimitInput: ""
      });

      if (content.trim().length !== 0) {
        console.log(content, indexX, indexY);
        for (var i = 0; i < indexX; i++) {
          const newColumn = {
            title: content,
            indexY: indexY,
            indexX: i,
          };
          this.props.addColumn(newColumn);
        }
      }
    }
  };

  handleAddTask = () => {
    const { columnID } = this.props;
    const { content } = this.state;

    if (content) {
      this.setState({
        content: "",
      });

      if (content.trim().length !== 0) {
        const newTask = {
          content,
          columnID,
        };

        this.props.addTask(newTask);
      }
    }
  };

  renderOpenForm = () => {
    const { type } = this.props;
    let buttonText = "";
    switch (type) {
      case "isColumn":
        buttonText = "Add a column";
        break;

      case "isSwimlane":
        buttonText = "Add a swimlane";
        break;

      default:
        buttonText = "Add a task";
    }

    return (
      <OpenForm onClick={this.openForm}>
        <Icon>add</Icon>
        <p style={{ flexShrink: 0 }}>{buttonText}</p>
      </OpenForm>
    );
  };

  render() {
    const { content } = this.state;
    const { type } = this.props;

    let placeholder = "";
    switch (type) {
      case "isColumn":
        placeholder = "Add a column...";
        break;

      case "isSwimlane":
        placeholder = "Add a swimlane...";
        break;

      default:
        placeholder = "Add a task...";
    }

    return this.state.formOpen ? (
      <Form
        content={content}
        placeholder={placeholder}
        onChange={this.handleInputChange}
        closeForm={this.closeForm}
      >
        <Button
          onClick={
            type === "isColumn"
              ? this.handleAddColumn
              : type === "isSwimlane"
              ? this.handleAddSwimlane
              : this.handleAddTask
          }
        >
          {type === "isColumn"
            ? "Add a column"
            : type === "isSwimlane"
            ? "Add a swimlane"
            : "Add a task"}
        </Button>
      </Form>
    ) : (
      <OpenForm onClick={this.openForm}>
        {type === "isColumn"
          ? "Add a column"
          : type === "isSwimlane"
          ? "Add a swimlane"
          : "Add a task"}
      </OpenForm>
    );
  }
}

const mapDispatchToProps = {
  addTask,
  addColumn,
};

export default connect(null, mapDispatchToProps)(Create);
