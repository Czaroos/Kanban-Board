import React, { Component } from 'react';
import Axios from 'axios';
import Modal from 'react-modal'
import { Link } from 'react-router-dom';
import { Col } from 'react-bootstrap';

var resC;
var resT;
var fullMap;
const Task = props => (
    <div>
        <h2>{props.task.name}</h2>
        <h3>{props.task.description}</h3>
        <h5>{props.task.user}</h5>
        <div>
            {/* Link does not refresh browser */}
            <Link to={"/edit/"+props.task._id}><i className="fa fa-pencil"></i></Link>
            <Link to="/" onClick={() => { props.deleteTask(props.task._id) }}><i className="fa fa-trash"></i></Link>
        </div>
    </div>
)

const Column = (props,props2) => (
    <div>
        <h2>{props.column.status}</h2>
        <div>
            <h4>{props2.task.name}</h4>
            <h4>{props2.task.description}</h4>
            <h4>{props2.task.user}</h4>
        </div>
    </div>
)
// TASKS --------------
export default class ListALL extends Component {

    constructor(props){
        super(props);
        this.deleteTask = this.deleteTask.bind(this);
        this.state = {
            tasks: [],
            columns: [],
            map: [],
        };
    }

    componentDidMount(){
       Axios.all([
           Axios.get('http://localhost:5000/tasks/'),
           Axios.get('http://localhost:5000/columns/'),
       ]).then(Axios.spread((tasksRes, columnsRes) => {
           this.setState({ tasks: tasksRes.data});
           this.setState({ columns: columnsRes.data});
       }))
    }

    deleteTask(id){
        Axios.delete('http://localhost:5000/tasks/'+id)
        .then(response => {console.log(response.data)});

        this.setState({
            tasks: this.state.tasks.filter(el => el._id !== id)
        })
    }

    log(){
        if(this.state.columns.length !== 0) 
        {
            var tempT = this.state.tasks;
            var tempC = this.state.columns;
            resC = Array.from(new Set(tempC.map(el => el.status)))
            .map(status => {
                return {
                    status: status,
                };
            });

            resT = tempT.filter( el =>{
                return el.status;
            });

            const map = resC.map(i => {
               const temp = resT.map(j =>{
                      const p = (i.status === j.status ? j : null );
                      return p;
                })
                const r = temp.filter(el =>{
                    return el != null;
                })
                return [i,r];
            })
            // console.log(bla);
            console.log("##########");
            console.log(map.length);
            console.log(map)
            console.log(map[0][0].status);
            console.log(map[1][0].status);
            console.log(map[2][0].status);
            console.log(map[3][0].status);
            console.log(map[3][1][0]);
            console.log(map[0][1][0]);
            console.log(map[0][1].length);
            
            
            // 1.[] column status name 2.[] tasks that equals column status 3.[] single task number
            //[0-backlog, 1-todo, 2-inprogress, 3-done][0-task1, 1-tasks2][1][_id,name,description,status,user]
        }
    }

    render() {
        return(
            <Modal isOpen={true}>
                <div>
                    {this.log()}
                </div>   
            </Modal>
        )
    }
};

