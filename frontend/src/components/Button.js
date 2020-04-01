import React from "react";
import styled from "styled-components";
import ButtonOld from "@material-ui/core/Button";

const StyledButton = styled(ButtonOld)`
&& {
    color: white;
    background: #5aac44;
}
`;

const Button = ({ children, onClick }) => {
    return (
        <StyledButton variant="contained"
        onMouseDown={onClick}>{children}</StyledButton>
    );
};

export default Button;