import React from 'react';
import ReactDOM from 'react-dom'
import Button from './../src/components/Button'

it("render without crashing", ()=>{
    const div = document.createElement("div");
    ReactDOM.render(<Button></Button>,div)
})