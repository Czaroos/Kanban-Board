import React from "react";
import Button from "./Button";
import { connect } from "react-redux";
import { addColumn, fetchColumns } from "../actions";
import OpenForm from "./OpenForm";
import styled from "styled-components";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import CloseSharpIcon from "@material-ui/icons/CloseSharp";

var randomColor = require("randomcolor");

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

class SwimlaneForm extends React.PureComponent {
  state = {
    formOpen: false,
    title: "",
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

  handleTitleChange = (e) => {
    this.setState({
      title: e.target.value,
    });
  };

  handleAddSwimlane = async () => {
    const { title } = this.state;
    const { indexX, indexY, columns } = this.props;
    var color = randomColor({ luminosity: "light" });

    if (title) {
      this.setState({
        title: "",
        formOpen: false,
      });

      if (title.trim().length !== 0) {
        for (let i = 0; i < indexX; i++) {
          let previousColumnY = columns.find(
            (column) => column.indexX === i && column.indexY === indexY - 1
          );

          const newColumn = {
            title: title,
            indexY: indexY,
            indexX: i,
            limit: previousColumnY.limit,
            color: color,
          };

          await this.props.addColumn(newColumn);
          this.props.fetchColumns();
        }
      }
    }
  };

  render() {
    return this.state.formOpen ? (
      <Container>
        <ContainerRow>
          <StyledTextArea
            style={{ width: "300px" }}
            autoFocus
            placeholder="Set title..."
            onChange={(e) => this.handleTitleChange(e)}
          />
          <Button onClick={this.handleAddSwimlane}>Add a swimlane</Button>
          <CloseIcon onClick={this.handleCloseForm} />
        </ContainerRow>
      </Container>
    ) : (
      <OpenForm onClick={this.handleOpenForm}>Add a swimlane</OpenForm>
    );
  }
}

const mapStateToProps = (state) => ({
  columns: state.columns,
});

const mapDispatchToProps = {
  addColumn,
  fetchColumns,
};

export default connect(mapStateToProps, mapDispatchToProps)(SwimlaneForm);
