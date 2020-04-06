import { CONSTANTS } from "../actions";

export function addTask(task) {
  return (dispatch) => {
    fetch('http://localhost:5000/tasks/add', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })
      .then(res => res.json())
      .then(newTask => dispatch({
        type: CONSTANTS.ADD_TASK,
        payload: newTask
      }));
  }
}

export function editTask(task) {
  return (dispatch) => {
    fetch('http://localhost:5000/tasks/' + task.id, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })
      .then(res => res.json())
      .then(editedTask => dispatch({
        type: CONSTANTS.EDIT_TASK,
        payload: editedTask
      }));
  }
}

export function deleteTask(task) {
  return (dispatch) => {
    fetch('http://localhost:5000/tasks/delete/' + task.id, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })
      .then(res => res.json())
      .then(deletedTask => dispatch({
        type: CONSTANTS.DELETE_TASK,
        payload: deletedTask
      }));
  }
}