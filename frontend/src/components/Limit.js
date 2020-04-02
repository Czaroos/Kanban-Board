import React from "react";
import styled, { keyframes } from "styled-components";

const breathing = keyframes`
  0% {
    color: rgba(255,0,0,1);
  }
  25% {
    color: rgba(255,0,0,0.50);
  }
  50% {
    color: rgba(255,0,0,0);
  }
  75% {
    color: rgba(255,0,0,0.50);
  }
  100%{
    color: rgba(255,0,0,1);
  }
`;

const Breathe = styled.div`
  font-weight: bold;
  animation: ${breathing} 3s linear infinite;
`;


const Limit = ({columnsLimit, tasks}) => {
    let limit = 3; // In future change to columnLimit parameter
    limit -= tasks.length;
return limit <= 0 ? <Breathe>TASK OVERFLOW</Breathe> : <div>{limit}</div>;
} 
export default Limit;