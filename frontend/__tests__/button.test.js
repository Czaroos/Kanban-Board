import React from 'react';
import ReactDOM from 'react-dom'
import Button from './../src/components/Button'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer'
afterEach(cleanup);

it("render without crashing", ()=>{
    const div = document.createElement("div");
    ReactDOM.render(<Button></Button>,div)
})

it("render button correctly with text content", ()=>{
  const {getByTestId} = render(<Button children="Add column"></Button>)
  expect(getByTestId('button')).toHaveTextContent("Add column")
})

it("render button correctly with empty text content", ()=>{
    const {getByTestId} = render(<Button children=""></Button>)
    expect(getByTestId('button')).toHaveTextContent("")
  })

it("matches snapshot normal text", ()=>{
    const tree = renderer.create(<Button children="Add task"></Button>).toJSON();
    expect(tree).toMatchSnapshot();
}) 

it("matches snapshot long number", ()=>{
    const tree = renderer.create(<Button children="9999999"></Button>).toJSON();
    expect(tree).toMatchSnapshot();
})

it("matches snapshot wierd text", ()=>{
    const tree = renderer.create(<Button children="chomik dżungarski"></Button>).toJSON();
    expect(tree).toMatchSnapshot();
})