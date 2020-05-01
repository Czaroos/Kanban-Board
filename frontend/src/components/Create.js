import React from "react";
import Icon from "@material-ui/core/Icon";
import Button from "./Button";
import { connect } from "react-redux";
import {
  addColumn,
  addTask,
  fetchColumns,
  addUser,
  fetchUsers,
} from "../actions";
import OpenForm from "./OpenForm";
import styled from "styled-components";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import CloseSharpIcon from "@material-ui/icons/CloseSharp";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

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

class Create extends React.PureComponent {
  state = {
    formOpen: false,
    content: "",
    content2: "",
    content3: "",
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
    const { content, content2, content3 } = this.state;
    const { indexX, swimlanesNames, noColumns } = this.props;

    const isNumber = /[0-9]/.test(content3)
    const isNotEmptyString = !(/^\s*$/.test(content3))

    console.log(isNumber)
    if (content) {
      this.setState({
        content: "",
        content2: "",
        content3: "",
        formOpen: false,
      });

      if (content.trim().length !== 0) {
        const newColumn = {
          title: content,
          indexY: 0,
          indexX: indexX,
          info: content2,
          limit: isNumber && isNotEmptyString ? content3 : -99999
        };
        this.props.addColumn(newColumn);

        if (!noColumns) {
          swimlanesNames.forEach((swimlane, index) => {
            const newColumn = {
              title: swimlane,
              indexY: index + 1,
              indexX: indexX,
              info: content2,
              limit: isNumber && isNotEmptyString ? content3 : -99999
            };
            this.props.addColumn(newColumn);
            this.props.fetchColumns();
          });
        }
      }
    }
  };

  handleAddSwimlane = () => {
    const { content } = this.state;
    const { indexX, indexY, columns } = this.props;

    if (content) {
      this.setState({
        content: "",
        formOpen: false
      });

      if (content.trim().length !== 0) {
        for (let i = 0; i < indexX; i++) {
          let previousColumn = columns.find(column => column.indexX === i && column.indexY === indexY - 1)

          const newColumn = {
            title: content,
            indexY: indexY,
            indexX: i,
            limit: previousColumn.limit
          };
          this.props.addColumn(newColumn);
          this.props.fetchColumns();
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
        formOpen: false
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

  handleAddUser = () => {
    const { content, content2 } = this.state;

    if (content && content2) {
      this.setState({
        content: "",
        content2: "",
        formOpen: false,
      });

      const wipLimit = Number(content2);
      if (content.trim().length !== 0 || content2.trim().length !== 0) {
        const newUser = {
          name: content,
        };

        for (let i = 1; i <= wipLimit; i++) {
          this.props.addUser(newUser);
          this.props.fetchUsers();
        }
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

  renderSwitch = (type) => {
    switch (type) {
      case "isColumn": {
        return (
          <Container>
            <StyledTextArea
              style={{ width: "300px" }}
              rowsMin={1}
              autoFocus
              placeholder="Set title..."
              value={this.content}
              onChange={(e) =>
                this.setState({
                  content: e.target.value,
                })
              }
            />
            <StyledTextArea
              style={{ width: "300px" }}
              rowsMin={1}
              placeholder="Set info..."
              value={this.content2}
              onChange={(e) =>
                this.setState({
                  content2: e.target.value,
                })
              }
            />
            <ContainerRow>
              <StyledTextArea
                style={{ width: "90px" }}
                rowsMin={1}
                placeholder="Set limit..."
                value={this.content3}
                onChange={(e) =>
                  this.setState({
                    content3: e.target.value,
                  })
                }
              />
              <Button onClick={this.handleAddColumn}>Add a column</Button>
              <CloseIcon onClick={this.closeForm} />
            </ContainerRow>
          </Container>
        );
      }

      case "isUser": {
        return (
          <ContainerRow>
            <StyledTextArea
              style={{ width: "200px", marginLeft: "10px" }}
              rowsMin={1}
              autoFocus
              placeholder="Set name..."
              value={this.content}
              onChange={(e) =>
                this.setState({
                  content: e.target.value,
                })
              }
            />
            <StyledTextArea
              style={{ width: "90px" }}
              rowsMin={1}
              placeholder="Set limit..."
              value={this.content2}
              onChange={(e) =>
                this.setState({
                  content2: e.target.value,
                })
              }
            />
            <Button onClick={this.handleAddUser}>Add a user</Button>
            <CloseIcon onClick={this.closeForm} />
          </ContainerRow>
        );
      }

      case "isSwimlane": {
        return (
          <Container>
            <ContainerRow>
            <StyledTextArea
              style={{ width: "300px" }}
              rowsMin={1}
              autoFocus
              placeholder="Set title..."
              value={this.content}
              onChange={(e) =>
                this.setState({
                  content: e.target.value,
                })
              }
            />
              <Button onClick={this.handleAddSwimlane}>Add a swimlane</Button>
              <CloseIcon onClick={this.closeForm} />
            </ContainerRow>
          </Container>
        );
      }

      default: {
        return (
          <Container>
            <StyledTextArea
              style={{ width: "277px" }}
              rowsMin={1}
              autoFocus
              placeholder="Set content..."
              value={this.content}
              onChange={(e) =>
                this.setState({
                  content: e.target.value,
                })
              }
            />
            <ContainerRow>
              <Button onClick={this.handleAddTask}>Add a task</Button>
              <CloseIcon onClick={this.closeForm} />
            </ContainerRow>
          </Container>
        );
      }
    }
  };

  render() {
    const { type } = this.props;

    return this.state.formOpen ? (
      <div>{this.renderSwitch(type)}</div>
    ) : (
      <OpenForm onClick={this.openForm}>
        {type === "isColumn"
          ? "Add a column"
          : type === "isSwimlane"
          ? "Add a swimlane"
          : type === "isUser"
          ? "Add a user"
          : "Add a task"}
      </OpenForm>
    );
  }
}

const mapStateToProps = state => ({
  columns: state.columns
})

const mapDispatchToProps = {
  addTask,
  addColumn,
  fetchColumns,
  fetchUsers,
  addUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);
