import React from "react";
import Button from "./Button";
import { connect } from "react-redux";
import { addTask, editTask } from "../actions";
import OpenForm from "./OpenForm";
import styled from "styled-components";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import CloseSharpIcon from "@material-ui/icons/CloseSharp";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import PriorityHighIcon from "@material-ui/icons/PriorityHigh";
import { SketchPicker } from "react-color";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const RadioOption = styled(FormControlLabel)`
  && {
    padding: 0px;
    margin: 0px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContainerRowJustified = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
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

class TaskForm extends React.PureComponent {
  state = {
    formOpen: false,
    content: this.props.taskContent || "",
    priorityRadioValue: this.props.taskPriority || "normal",
    modalOpened: false,
    color: this.props.taskColor || {
      r: "99",
      g: "118",
      b: "127",
      a: "1",
    },
  };

  handleCloseModal = () => {
    this.setState({ modalOpened: false });
  };

  handleChangeColor = (color) => {
    this.setState({ color: color.rgb });
  };

  handleOpenForm = () => {
    this.setState({
      formOpen: true,
    });
  };

  handleCloseForm = () => {
    if(this.props.isEditing) this.props.closeForm()
    this.setState({
      formOpen: false,
    });
  };

  handleContentChange = (e) => {
    this.setState({
      content: e.target.value,
    });
  };

  handleAddTask = () => {
    const { columnID } = this.props;
    const { content, priorityRadioValue, color } = this.state;


    if (content) {
      this.setState({
        content: "",
        formOpen: false,
      });

      if (content.trim().length !== 0) {
        const newTask = {
          columnID,
          content,
          priority: priorityRadioValue,
          color,
        };

        this.props.addTask(newTask);
      }
    }
  };

  handleEditTask = () => {
    const { taskID, columnID, taskUsers, isLocked } = this.props;
    const { content, priorityRadioValue, color } = this.state;

      if (content.trim().length !== 0) {
        const editedTask = {
          id: taskID,
          content,
          priority: priorityRadioValue,
          color,
          columnID,
          users: taskUsers,
          isLocked
        };

        this.props.editTask(editedTask);
      }

    this.props.closeForm()
  };

  RadioButtons() {
    const handleChangePriority = (event) =>
      this.setState({
        priorityRadioValue: event.target.value,
      });

    return (
      <FormControl component="fieldset">
        <RadioGroup
          row
          aria-label="priority"
          name="priority"
          onChange={handleChangePriority}
          defaultValue={this.state.priorityRadioValue}
        >
          <RadioOption
            value="normal"
            control={<Radio style={{ color: "white" }} size="small" />}
            label={<PriorityHighIcon style={{ fontSize: "1.4rem" }} />}
            labelPlacement="top"
          />
          <RadioOption
            value="high"
            control={<Radio style={{ color: "orange" }} size="small" />}
            label={
              <PriorityHighIcon
                style={{ color: "orange", fontSize: "1.7rem" }}
              />
            }
            labelPlacement="top"
          />
          <RadioOption
            value="very high"
            control={<Radio style={{ color: "red" }} size="small" />}
            label={
              <PriorityHighIcon style={{ color: "red", fontSize: "2rem" }} />
            }
            labelPlacement="top"
          />
        </RadioGroup>
      </FormControl>
    );
  }

  render() {
    const { isEditing } = this.props;

    return this.state.formOpen || isEditing ? (
      <Container>
        <ContainerRowJustified>
          <div>
            <div
              style={{
                width: "36px",
                height: "14px",
                background: `rgba(${this.state.color.r}, ${this.state.color.g}, ${this.state.color.b}, ${this.state.color.a})`,
                border: "1px solid white",
                borderRadius: "2px",
                boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
                display: "inline-block",
                cursor: "pointer",
              }}
              onClick={() => {
                this.setState({
                  modalOpened: true,
                });
              }}
            ></div>
            <Modal
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              open={this.state.modalOpened}
              onClose={this.handleCloseModal}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={this.state.modalOpened}>
                <div>
                  <SketchPicker
                    color={this.state.color}
                    onChange={this.handleChangeColor}
                  />
                </div>
              </Fade>
            </Modal>
          </div>
          <CloseIcon
            onClick={this.handleCloseForm}
            style={{ margin: "0px 0px 5px 220px" }}
          />
        </ContainerRowJustified>
        <StyledTextArea
          style={{ width: "285px" }}
          rowsMin={1}
          autoFocus
          onFocus={(e) => e.target.select()}
          placeholder="Set a content..."
          value={this.state.content}
          onChange={(e) => this.handleContentChange(e)}
        />
        <ContainerRowJustified>
          {this.RadioButtons()}
          <Button
            onClick={isEditing ? this.handleEditTask : this.handleAddTask}
          >
            Save a task
          </Button>
        </ContainerRowJustified>
      </Container>
    ) : (
      <OpenForm onClick={this.handleOpenForm}>Add a task</OpenForm>
    );
  }
}

const mapDispatchToProps = {
  addTask,
  editTask,
};

export default connect(null, mapDispatchToProps)(TaskForm);
