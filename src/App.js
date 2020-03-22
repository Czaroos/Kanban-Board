import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import ShowColumns from "./components/column.component.js";
import AddTaskModal from "./components/addtaskmodal.component";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

//Main app function
function App() {
  return (
    <Router>
      <div className="App">
        {/* <AddTaskModal></AddTaskModal> */}
      <Route path="/tasks/add" exact component={AddTaskModal}/> 
        <div className="columnbox">
        <Route path="/" exact component={ShowColumns}/>
         {/* <ShowColumns></ShowColumns>  */}
      

      {/* <Route path="/edit/:id" exact component={EditTask}/> */}
   
      </div>
    </div>
    </Router>
  );
}

export default App;
