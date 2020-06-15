import React from "react";
import Button from "./Button";
import { connect } from "react-redux";
import { addColumn, fetchColumns } from "../actions";
import styled from "styled-components";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import CloseSharpIcon from "@material-ui/icons/CloseSharp";
import OpenForm from "./OpenForm";

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

class ColumnForm extends React.PureComponent {
  state = {
    formOpen: false,
    title: "",
    info: "",
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

  handleTitleChange = (e) => {
    this.setState({
      title: e.target.value,
    });
  };

  handleInfoChange = (e) => {
    this.setState({
      info: e.target.value,
    });
  };

  handleLimitChange = (e) => {
    this.setState({
      limit: e.target.value,
    });
  };

  handleAddColumn = () => {
    const { title, info, limit } = this.state;
    const { indexX, swimlanesNames, noColumns, columns } = this.props;
    var color = randomColor({ luminosity: "light" });

    const isNumber = /[0-9]/.test(limit);
    const isNotEmptyString = !/^\s*$/.test(limit);

    if (title) {
      this.setState({
        title: "",
        info: "",
        limit: "",
        formOpen: false,
      });

      if (title.trim().length !== 0) {
        let previousColumnX = columns.find(
          (column) => column.indexX === indexX - 1 && column.indexY === 0
        );

        const newColumn = {
          title: title,
          indexY: 0,
          indexX: indexX,
          info: !/^\s*$/.test(info)
            ? info
            : "Task w tej kolumnie uznaje się za ukończony gdy:",
          limit: isNumber && isNotEmptyString ? limit : -99999,
          color: previousColumnX ? previousColumnX.color : color,
        };
        this.props.addColumn(newColumn);

        if (!noColumns) {
          swimlanesNames.forEach((swimlane, index) => {
            let previousColumnX = columns.find(
              (column) =>
                column.indexX === indexX - 1 && column.indexY === index + 1
            );

            const newColumn = {
              title: swimlane,
              indexY: index + 1,
              indexX: indexX,
              info: /^\s*$/.test(info)
                ? info
                : "Task w tej kolumnie uznaje się za ukończony gdy:",
              limit: isNumber && isNotEmptyString ? limit : -99999,
              color: previousColumnX ? previousColumnX.color : color,
            };
            this.props.addColumn(newColumn);
            this.props.fetchColumns();
          });
        }
      }
    }
  };

  render() {
    return this.state.formOpen ? (
      <Container>
        <StyledTextArea
          style={{ width: "300px" }}
          autoFocus
          placeholder="Set title..."
          onChange={(e) => this.handleTitleChange(e)}
        />
        <StyledTextArea
          style={{ width: "300px" }}
          placeholder="Set info..."
          onChange={(e) => this.handleInfoChange(e)}
        />
        <ContainerRow>
          <StyledTextArea
            style={{ width: "90px" }}
            placeholder="Set limit..."
            onChange={(e) => this.handleLimitChange(e)}
          />
          <Button onClick={this.handleAddColumn}>Add a column</Button>
          <CloseIcon onClick={this.handleCloseForm} />
        </ContainerRow>
      </Container>
    ) : (
      <OpenForm onClick={this.handleOpenForm}>Add a column</OpenForm>
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

export default connect(mapStateToProps, mapDispatchToProps)(ColumnForm);
