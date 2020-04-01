import React from "react";
import Icon from "@material-ui/core/Icon";
import styled from "styled-components";

const OpenForm = ({ addColumn, children, onClick }) => {
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
    <OpenFormButton onClick={onClick}>
      <Icon>add</Icon>
      <p style={{ flexShrink: 0 }}>{children}</p>
    </OpenFormButton>
  );
};

export default OpenForm;