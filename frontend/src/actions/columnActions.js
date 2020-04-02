import {CONSTANTS} from '../actions'

export const addColumn = (title) => {
    return {
        type: CONSTANTS.ADD_COLUMN,
        payload: title
    }
}

export const sort = (
    droppableIdStart,
    droppableIdEnd,
    droppableIndexStart,
    droppableIndexEnd,
    draggableId,
    type
) => {
    return {
        type: CONSTANTS.DRAG_HAPPENED,
        payload: {
            droppableIdStart,
            droppableIdEnd,
            droppableIndexStart,
            droppableIndexEnd,
            draggableId,
            type
        }
    }
}

export const editColumnTitle = (columnID, newTitle) => {
    return {
      type: CONSTANTS.EDIT_COLUMN_TITLE,
      payload: {
        columnID,
        newTitle
      }
    };
  };

export const deleteColumn = columnID => {
    return {
        type: CONSTANTS.DELETE_COLUMN,
        payload: {
            columnID
        }
    };
};

<<<<<<< HEAD
function fetchColumns() {
  return (dispatch) => {
    fetch('http://localhost:5000/columns')
      .then(res => res.json())
      .then(columns => dispatch({
        type: CONSTANTS.FETCH_COLUMNS,
        payload: columns
      }));
  }
}
=======
// function fetchColumns() {
//   return (dispatch) => {
//     fetch('http://localhost:5000/columns')
//       .then(res => res.json())
//       .then(res => dispatch({
//         type: CONSTANTS.FETCH_COLUMNS,
//         payload: res
//       }))   
//   }
// }
>>>>>>> 7b7419db875098f78db4ec8783d92e76d8115adb

// function createPost(post) {
//   return (dispatch) => {
//     fetch('https://jsonplaceholder.typicode.com/posts', {
//       method: 'POST',
//       headers: {
//         'content-type': 'application/json'
//       },
//       body: JSON.stringify(post)
//     })
//       .then(res => res.json())
//       .then(data => dispatch({
//         type: NEW_POST,
//         payload: data
//       }));
//   }
// }

// export { fetchColumns };