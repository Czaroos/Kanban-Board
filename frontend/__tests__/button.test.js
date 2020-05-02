import React from 'react';
import ReactDOM from 'react-dom'
import Button from './../src/components/Button'
import { render } from '@testing-library/react'
import "@testing-library/jest-dom/extend-expect";

it("render without crashing", ()=>{
    const div = document.createElement("div");
    ReactDOM.render(<Button></Button>,div)
})

it("render button correctly", ()=>{
  const {getByTestId} = render(<Button children="Add column"></Button>)
  expect(getByTestId('button')).toHaveTextContent("Add column")
})