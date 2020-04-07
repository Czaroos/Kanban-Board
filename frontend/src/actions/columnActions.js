import {CONSTANTS} from '../actions'

export function fetchColumns() {
  return (dispatch) => {
    fetch('/all')
      .then(res => res.json())
      .then(columns => dispatch({
        type: CONSTANTS.FETCH_COLUMNS,
        payload: columns
      }));
  }
}

export function addColumn(column) {
  return (dispatch) => {
    fetch('/columns/add/', {
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

export function dragStateSave(columns) {
  return (dispatch) => {
    fetch('/all', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(columns)
    })
      .then(res => res.json())
      .then(newState => dispatch({
        type: CONSTANTS.FETCH_COLUMNS,
        payload: newState
      }));
  }
}

export function editColumn(column) {
  return (dispatch) => {
    fetch('/columns/' + column.id, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(column)
    })
      .then(res => res.json())
      .then(editedColumn => dispatch({
        type: CONSTANTS.EDIT_COLUMN,
        payload: editedColumn
      }));
  }
}



export function deleteColumn(id) {
  return (dispatch) => {
    fetch('/columns/' + id, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(deletedColumnId => dispatch({
        type: CONSTANTS.DELETE_COLUMN,
        payload: deletedColumnId
      }));
  }
}