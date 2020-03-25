import React, { Component } from 'react';
import Axios from 'axios';
import List from "./list.component";
import { BrowserRouter as Router, Route } from "react-router-dom";

//STYLES
const columnStyle = {
    border: '5px solid orange',
    margin: '20px',
    padding: '5px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
};
  
const buttonStyle = {
    backgroundColor: '#4CAF50',
    border: 'none',
    color: 'white',
    padding: '15px 32px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    margin: '4px 2px',
    cursor: 'pointer'
  };

const columnboxStyle = {
    backgroundColor: '#282c34',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    fontSize: 'calc(10px + 2vmin)',
    color: 'white'
  }
const statusStyle = {
    textTransform: 'uppercase',
}
//CODE

const Column = props => (
        <div style={columnStyle}>
            <div>
                <h2 style={statusStyle}>{props.column.status}</h2>
                <a href="/tasks/add" style={buttonStyle}>Add task</a>
            </div>
            <Route path="/" exact component={List}/>
        </div>
)

export default class ShowColumns extends Component {
    constructor(props){
        super(props);
        this.deleteColumn = this.deleteColumn.bind(this);
        this.state = {columns: []};
    }

    componentDidMount(){
        Axios.get('http://localhost:5000/columns/')
        .then(response => {
            this.setState({ columns: response.data})
        })
        .catch((err) => {
            console.log(err);
        })
    }

    componentGetColStat(){
        console.log("halo");
    }

    deleteColumn(id){
        Axios.delete('http://localhost:5000/columns/'+id)
        .then(response => {console.log(response.data)});

        this.setState({
            columns: this.state.columns.filter(el => el._id !== id)
        })
    }

    columnsListing() {
        return this.state.columns.map(el => {
            return <Column column={el} deleteColumn={this.deleteColumn} key={el._id}/>;
        });
    }
    getCols(){
        return console.log(this.state.columns);
    }

    render() {
        return(
            <div style={columnboxStyle}>
                {this.columnsListing()}
            </div>   
        )
    }
}