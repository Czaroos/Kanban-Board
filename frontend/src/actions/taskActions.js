import { CONSTANTS } from "../actions";

// export const addTask = (columnID, content) => {
//   return {
//     type: CONSTANTS.ADD_TASK,
//     payload: { content, columnID }
//   };
// };

export const editTask = (id, columnID, newContent) => {
  return {
    type: CONSTANTS.EDIT_TASK,
    payload: { id, columnID, newContent }
  };
};

export const deleteTask = (id, columnID) => {
  return {
    type: CONSTANTS.DELETE_TASK,
    payload: { id, columnID }
  };
};

function addTask(task) {
  return (dispatch) => {
    fetch('http://localhost:5000/columns/addTask/' + task.columnID, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })
      .then(res => res.json())
      .then(data => dispatch({
        type: CONSTANTS.ADD_TASK,
        payload: data
      }));
  }
}

export { addTask };
