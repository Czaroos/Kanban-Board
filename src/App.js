import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import ListALL from './components/listall.component';
import AddTaskModal from "./components/addtaskmodal.component";


//Main app function
function App() {
  return (
    <Router>
      <div className="App">
        {/* <AddTaskModal></AddTaskModal> */}
      <Route path="/tasks/add" exact component={AddTaskModal}/> 
        <div className="columnbox">
        {/* <Route path="/" exact component={ShowColumns}/> */}
        <Route path="/" exact component={ListALL}/> 
         {/* <ShowColumns></ShowColumns>  */}
      

      {/* <Route path="/edit/:id" exact component={EditTask}/> */}
   
      </div>
    </div>
    </Router>
  );
}

export default App;
