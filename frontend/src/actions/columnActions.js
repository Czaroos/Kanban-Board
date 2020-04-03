import {CONSTANTS} from '../actions'

export function addColumn(column) {
  return (dispatch) => {
    fetch('http://localhost:5000/columns/add/', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(column)
    })
      .then(res => res.json())
      .then(newColumn => dispatch({
        type: CONSTANTS.ADD_COLUMN,
        payload: newColumn
      }));
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

export function fetchColumns() {
  return (dispatch) => {
    fetch('http://localhost:5000/columns')
      .then(res => res.json())
      .then(columns => dispatch({
        type: CONSTANTS.FETCH_COLUMNS,
        payload: columns
      }));
  }
}

export function deleteColumn(id) {
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