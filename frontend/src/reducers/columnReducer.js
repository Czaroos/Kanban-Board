import { CONSTANTS } from "../actions";

const initialState = [];

const columnReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.FETCH_COLUMNS:
      let initialState = action.payload.map((column) => {
        let tasks = column.tasks.map((task) => {
          return {
            id: task._id,
            content: task.content,
            columnID: task.columnId,
            priority: task.priority,
          };
        });
        return {
          id: column._id,
          title: column.title,
          limit: column.limit,
          tasks: tasks,
          index: column.index,
        };
      });

      return initialState.sort((a, b) => {
        if (a.index > b.index) return 1;
        else return -1;
      });

    case CONSTANTS.ADD_COLUMN:
      const newColumn = {
        id: action.payload._id,
        title: action.payload.title,
        limit: action.payload.limit,
        tasks: [],
        index: action.payload.index,
      };
      return [...state, newColumn];

    case CONSTANTS.ADD_TASK: {
      let task = action.payload.tasks[action.payload.tasks.length - 1];

      let newTask = {
        id: task._id,
        content: task.content,
        columnID: task.columnId,
      };

      const addTaskState = state.map((col) => {
        if (col.id === newTask.columnID) {
          col.limit--;
          return {
            ...col,
            tasks: [...col.tasks, newTask],
          };
        } else return col;
      });

      return addTaskState;
    }

    case CONSTANTS.DRAG_HAPPENED:
      const {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexStart,
        droppableIndexEnd,
        type,
      } = action.payload;
      const newState = [...state];

      // dragging columns around (index swap)
      if (type === "column") {
        const column = newState.splice(droppableIndexStart, 1);
        newState.splice(droppableIndexEnd, 0, ...column);
        newState.map((col, index) => {
          col.index = index;
          return col;
        });
        return newState;
      }

      // destination: same column

      if (droppableIdStart === droppableIdEnd) {
        const column = state.find((column) => droppableIdStart === column.id);
        const task = column.tasks.splice(droppableIndexStart, 1);
        column.tasks.splice(droppableIndexEnd, 0, ...task);
      }

      // destination: other column

      if (droppableIdStart !== droppableIdEnd) {
        // find the column where drag happened
        const columnStart = state.find(
          (column) => droppableIdStart === column.id
        );
        columnStart.limit++;

        // pull out the task from this column
        const task = columnStart.tasks.splice(droppableIndexStart, 1);
        const newTask = task.map((task) => {
          task.columnID = droppableIdEnd;
          return task;
        });
        // find the column where drag ended
        const columnEnd = state.find((column) => droppableIdEnd === column.id);
        columnEnd.limit--;

        // put the task into a new column
        columnEnd.tasks.splice(droppableIndexEnd, 0, ...newTask);
      }

      return newState;

    case CONSTANTS.EDIT_TASK: {
      const { _id, content, userId, priority, columnId } = action.payload;
      return state.map((column) => {
        if (column.id === columnId) {
          const newTasks = column.tasks.map((task) => {
            if (task.id === _id) {
              task.content = content;
              task.priority = priority;
              task.userID = userId;
              return task;
            } else return task;
          });
          return { ...column, tasks: newTasks };
        } else return column;
      });
    }

    case CONSTANTS.DELETE_TASK: {
      const { _id, columnID } = action.payload;
      return state.map((column) => {
        if (column.id === columnID) {
          column.limit++;
          const newTasks = column.tasks.filter((task) => task.id !== _id);
          return { ...column, tasks: newTasks };
        } else {
          return column;
        }
      });
    }

    case CONSTANTS.EDIT_COLUMN: {
      const { _id, title, limit } = action.payload;
      return state.map((column) => {
        if (column.id === _id) {
          column.title = title;
          column.limit = limit;
          return column;
        } else {
          return column;
        }
      });
    }

    case CONSTANTS.DELETE_COLUMN: {
      const newStateDelete = [...state];
      const columnID = action.payload;
      const filtered = newStateDelete.filter(
        (column) => column.id !== columnID
      );
      return filtered.map((col, index) => {
        col.index = index;
        return col;
      });
    }

    default:
      return state;
  }
};

export default columnReducer;
