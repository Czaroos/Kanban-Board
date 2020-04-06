import React from "react";
import Icon from "@material-ui/core/Icon";
import styled from "styled-components";

const OpenFormButton = styled.div`
display: flex;
align-items: center;
cursor: pointer;
border-radius: 3px;
height: 36px;
width: 290px;
padding-left: 10px;
opacity: 0.8;
color: white;
background-color: inherit;

&:hover {
  background-color: rgba(0,0,0,0.2);
  border: 1px solid rgba(1, 11, 15);
}
`;

const StyledIcon = styled(Icon)`
  margin-left: 5px;
  margin-right: 8px;
  padding-bottom: 2px;
`;

const OpenForm = ({ children, onClick }) => {
  return (
    <OpenFormButton onClick={onClick}>
      <StyledIcon>add</StyledIcon>
      <p style={{ flexShrink: 0 }}>{children}</p>
    </OpenFormButton>
  );
};

export default OpenForm;