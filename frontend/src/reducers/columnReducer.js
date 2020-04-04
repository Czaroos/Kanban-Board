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
        newState.map((col) => {
          if (col.index === droppableIndexStart) {
            col.index = droppableIndexEnd;
            return col;
          }
          if (col.index === droppableIndexEnd) {
            col.index = droppableIndexStart;
            return col;
          } else return col;
        });
        const column = newState.splice(droppableIndexStart, 1);
        newState.splice(droppableIndexEnd, 0, ...column);
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
        task.columnID = droppableIdEnd;
        // find the column where drag ended
        const columnEnd = state.find((column) => droppableIdEnd === column.id);
        columnEnd.limit--;

        // put the task into a new column
        columnEnd.tasks.splice(droppableIndexEnd, 0, ...task);
      }

      return newState;

    case CONSTANTS.EDIT_TASK: {
      const { id, columnID, newContent } = action.payload;
      return state.map((column) => {
        if (column.id === columnID) {
          const newTasks = column.tasks.map((task) => {
            if (task.id === id) {
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
      const { id, columnID } = action.payload;
      return state.map((column) => {
        if (column.id === columnID) {
          column.limit++;
          const newTasks = column.tasks.filter((task) => task.id !== id);
          return { ...column, tasks: newTasks };
        } else {
          return column;
        }
      });
    }

    case CONSTANTS.EDIT_COLUMN_TITLE: {
      const { columnID, newTitle } = action.payload;
      return state.map((column) => {
        if (column.id === columnID) {
          column.title = newTitle;
          return column;
        } else {
          return column;
        }
      });
    }

    case CONSTANTS.DELETE_COLUMN: {
      const columnID = action.payload;
      return state.filter((column) => column.id !== columnID);
    }

    default:
      return state;
  }
};

export default columnReducer;
