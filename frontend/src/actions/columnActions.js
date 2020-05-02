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

export function sort(
    droppableIdStart,
    droppableIdEnd,
    droppableIndexStart,
    droppableIndexEnd,
    draggableId,
    type
) {
    return (dispatch, getState) => {
      const { users, columns } = getState();
      dispatch({
        type: CONSTANTS.DRAG_HAPPENED,
        payload: {
            droppableIdStart,
            droppableIdEnd,
            droppableIndexStart,
            droppableIndexEnd,
            draggableId,
            type,
            users,
            columns
        }
      })
    }
}

export function dragStateSave() {
  return (dispatch, getState) => {
    fetch('/all', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(getState().columns)
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