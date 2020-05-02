import { CONSTANTS } from "../actions";

const initialState = [];

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.FETCH_USERS: {
      let initialState = action.payload.map((user) => {
        return {
          _id: user._id,
          name: user.name,
          color: user.color,
        };
      });
      return initialState;
    }

    case CONSTANTS.ADD_USER:
      state.push(action.payload);
      return state;

    case CONSTANTS.DRAG_HAPPENED: {
      const {
        type,
        draggableId,
        droppableIdEnd,
        droppableIdStart,
        columns,
      } = action.payload;
      let newState = [...state];

      if (type === "user" && droppableIdStart === droppableIdEnd) {
        return state;
      }

      if (type === "user") {
        const user = state.find((user) => user._id === draggableId);
        columns.forEach((column) => {
          column.tasks.forEach((task) => {
            if (task.id === droppableIdEnd) {
              const userAlreadyAdded = task.users.find(userAlreadyAdded => userAlreadyAdded.name === user.name)
              if(!userAlreadyAdded)
              newState = state.filter((user) => user._id !== draggableId);
            }
          });
        });
      }
      return newState;
    }

    case CONSTANTS.DELETE_USER_BY_NAME: {
      const deleteState = state.filter((user) => user.name !== action.payload);
      return deleteState;
    }

    default:
      return state;
  }
};

export default userReducer;
