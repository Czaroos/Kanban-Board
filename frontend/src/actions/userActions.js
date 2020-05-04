import { CONSTANTS } from "../actions";

export function fetchUsers() {
  return (dispatch) => {
    fetch("/users")
      .then((res) => res.json())
      .then((users) =>
        dispatch({
          type: CONSTANTS.FETCH_USERS,
          payload: users,
        })
      );
  };
}

export function addUser(user) {
  return (dispatch) => {
    fetch("/users/add", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((newUser) =>
        dispatch({
          type: CONSTANTS.ADD_USER,
          payload: newUser,
        })
      );
  };
}

export function deleteUser(id) {
  return (dispatch) => {
    fetch('/users/' + id, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(_id => dispatch({
        type: CONSTANTS.DELETE_USER,
        payload: _id
      }));
  }
}

export function deleteUserByName(name) {
  return (dispatch) => {
    fetch('/users/deleteByName/' + name, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(name => dispatch({
      type: CONSTANTS.DELETE_USER_BY_NAME,
      payload: name
    }))
  }
}

export function dragStateSaveUsers() {
  return (dispatch, getState) => {
    fetch('/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(getState().users)
    })
      .then(res => res.json())
      .then(newState => dispatch({
        type: CONSTANTS.FETCH_USERS,
        payload: newState
      }));
  }
}