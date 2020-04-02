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

// export const deleteColumn = columnID => {
//     return {
//         type: CONSTANTS.DELETE_COLUMN,
//         payload: {
//             columnID
//         }
//     };
// };

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

function deleteColumn(id) {
  return (dispatch) => {
    fetch('http://localhost:5000/columns/' + id, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(deletedColumnId => dispatch({
        type: CONSTANTS.DELETE_COLUMN,
        payload: deletedColumnId
      }));
  }
}

export { fetchColumns };
export { deleteColumn };