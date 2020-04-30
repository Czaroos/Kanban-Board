import { CONSTANTS } from "../actions";

const initialState = [];

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.FETCH_USERS:
      return action.payload;

    case CONSTANTS.ADD_USER:
      state.push(action.payload);
      return state;

    case CONSTANTS.DRAG_HAPPENED: {
      const {
        type,
        draggableId,
        droppableIdEnd,
        columns
      } = action.payload;
      let newState = [];

      if (type === "user") {
        columns.forEach((column) => {
            column.tasks.forEach((task) => {
                if(task.id === droppableIdEnd) {
                        newState = state.filter((user) => user._id !== draggableId);
                    }
                }
            )
        })
      }
      return newState;
    }

    case CONSTANTS.DELETE_USER: {
      const deleteState = state.filter(user => user._id !== action.payload);
      return deleteState;
    }


    default:
      return state;
  }
};

export default userReducer;
