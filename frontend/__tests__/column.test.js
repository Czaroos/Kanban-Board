import React from 'react';
import ReactDOM from 'react-dom'
import App from './../src/components/App'
import { connect } from "react-redux";
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer'
afterEach(cleanup);

it("render without crashing", ()=>{
    const div = document.createElement("div");
    ReactDOM.render(<App store={provided.innerRef}></App>,div)
})
