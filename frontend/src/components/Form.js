import React from "react";
import styled from "styled-components";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

const Container = styled.div`
display: flex;
flex-direction: column;
`;

const StyledTextArea = styled(TextareaAutosize)`
  border-radius: 3px;
  width: 295px;
  color: #eee;
  resize: none;
  overflow: hidden;
  outline: none;
  background-color: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(1, 11, 15);


  ::placeholder {
    color: #eee;
  }
`;

const ButtonContainer = styled.div`
  margin-top: 6px;
  margin-bottom: 6px;
`;

const Form = React.memo(
  ({ placeholder, content = "", onChange, closeForm, children }) => {
    return (
      <Container>
        <StyledTextArea
          rowsMin={2}
          autoFocus
          placeholder={placeholder}
          value={content}
          onChange={(e) => onChange(e)}
          onBlur={closeForm}
        />
        <ButtonContainer>
          {children}
        </ButtonContainer>
      </Container>
    );
  }
);

export default Form;
