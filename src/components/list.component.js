import React, { Component } from 'react';
import Axios from 'axios';
//import ShowColumns from "./column.component.js";
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";

//Style

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
};
const statusStyle = {
    textTransform: 'uppercase',
};
const btn= {
    backgroundColor: 'black',
    border: 'none',
    color: 'white',
    padding: '12px 16px',
    fontSize: '16px',
    cursor: 'pointer',
};
const btnbox = {
    display: 'flex',
    justifyContent: 'space-around',

}
const taskStyle = {
    border: '1px solid black',
    margin: '5px',
    backgroundColor: 'black',
};


const Task = props => (
    <div style={taskStyle}>
        <h2>{props.task.name}</h2>
        <h3>{props.task.description}</h3>
        <h4>{props.task.status}</h4>
        <h5>{props.task.user}</h5>
        <div style={btnbox}>
            {/* Link does not refresh browser */}
            <Link to={"/edit/"+props.task._id} style={btn}><i className="fa fa-pencil"></i></Link>
            <Link to="/" onClick={() => { props.deleteTask(props.task._id) }} style={btn}><i className="fa fa-trash"></i></Link>
        </div>
    </div>
)
// TASKS --------------
export class List extends Component {

    constructor(props){
        super(props);
        this.deleteTask = this.deleteTask.bind(this);
        this.state = {tasks: []};
    }

    componentDidMount(){
        Axios.get('http://localhost:5000/tasks/')
        .then(response => {
            this.setState({ tasks: response.data})
        })
        .catch((err) => {
            console.log(err);
        })
    }

    deleteTask(id){
        Axios.delete('http://localhost:5000/tasks/'+id)
        .then(response => {console.log(response.data)});

        this.setState({
            tasks: this.state.tasks.filter(el => el._id !== id)
        })
    }

    taksListing() {
        return this.state.tasks.map(el => { console.log(el);
                return <Task task={el} deleteTask={this.deleteTask} key={el._id}/>;
        })
    }

    render() {
        return(
            <div>
                {this.taksListing()}
            </div>   
        )
    }
};

//Child element
const Column = props => (
        <div style={columnStyle}>
            <div>
                <h2 style={statusStyle}>{props.column.status}</h2>
                <a href="/tasks/add" style={buttonStyle}>Add task</a>
            </div>
        </div>
);
// COLS ---------------------
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
   

    render() {
        return(
            <div style={columnboxStyle}>
                <List></List>
            </div>   
        )
    }
}



