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