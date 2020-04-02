import { CONSTANTS } from "../actions";

let columnId = 4;
let taskID = 0;

const initialState = [
  {
    _id: "12312312312",
    title: "Backlog",
    tasks: [{
      content: "dupa",
      _id: "12312312"
    }],
    tasks: [{
      content: "dupa",
      _id: "12312312"
    }]
  },
  {
    id: `column-${1}`,
    title: "To do",
    tasks: []
  },
  {
    id: `column-${2}`,
    title: "In progress",
    tasks: []
  },
  {
    id: `column-${3}`,
    title: "Done",
    tasks: []
  }
];

const columnReducer = (state = initialState, action) => {
  switch (action.type) {
    // case CONSTANTS.FETCH_COLUMNS:
    //   let newState = action.payload;
    //   return newState;

    case CONSTANTS.ADD_COLUMN:
      const newColumn = {
        title: action.payload,
        tasks: [],
        _id: `column-${columnId}`
      };
      columnId += 1;
      return [...state, newColumn];

    case CONSTANTS.ADD_TASK: {
      const newTask = {
        content: action.payload.content,
        _id: `task-${taskID}`
      };
      taskID += 1;

      const newState = state.map(column => {
        if (column._id === action.payload.columnId) {
          return {
            ...column,
            tasks: [...column.tasks, newTask]
          };
        } else {
          return column;
        }
      });

      return newState;
    }

    case CONSTANTS.DRAG_HAPPENED:
      const {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexStart,
        droppableIndexEnd,
        type
      } = action.payload;
      const newState = [...state];

      // dragging columns around
      if (type === "column") {
        const column = newState.splice(droppableIndexStart, 1);
        newState.splice(droppableIndexEnd, 0, ...column);
        return newState;
      }

      // destination: same column

      if (droppableIdStart === droppableIdEnd) {
        const column = state.find(column => droppableIdStart === column._id);
        const task = column.tasks.splice(droppableIndexStart, 1);
        column.tasks.splice(droppableIndexEnd, 0, ...task);
      }

      // destination: other column

      if (droppableIdStart !== droppableIdEnd) {
        // find the column where drag happened
        const columnStart = state.find(
          column => droppableIdStart === column._id
        );

        // pull out the task from this column
        const task = columnStart.tasks.splice(droppableIndexStart, 1);

        // find the column where drag ended
        const columnEnd = state.find(column => droppableIdEnd === column._id);

        // put the task into a new column
        columnEnd.tasks.splice(droppableIndexEnd, 0, ...task);
      }

      return newState;

    case CONSTANTS.EDIT_TASK: {
      const { _id, columnId, newContent } = action.payload;
      return state.map(column => {
        if (column._id === columnId) {
          const newTasks = column.tasks.map(task => {
            if (task._id === _id) {
              task.content = newContent;
              return task;
            }
            return task;
          });
          return { ...column, tasks: newTasks };
        }
        return column;
      });
    }

    case CONSTANTS.DELETE_TASK: {
      const { _id, columnId } = action.payload;
      return state.map(column => {
        if (column._id === columnId) {
          const newTasks = column.tasks.filter(task => task._id !== _id);
          return { ...column, tasks: newTasks };
        } else {
          return column;
        }
      });
    }

    case CONSTANTS.EDIT_COLUMN_TITLE: {
      const { columnId, newTitle } = action.payload;
      return state.map(column => {
        if (column._id === columnId) {
          column.title = newTitle;
          return column;
        } else {
          return column;
        }
      });
    }

    case CONSTANTS.DELETE_COLUMN: {
      const { columnId } = action.payload;
      return state.filter(column =>
        column._id !== columnId);
    }

    default:
      return state;
  }
};

export default columnReducer;
