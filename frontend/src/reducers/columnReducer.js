import { CONSTANTS } from "../actions";

const initialState = [];

const columnReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.FETCH_COLUMNS: {
      const initialState = action.payload.map((column) => {
        let tasks = column.tasks.map((task) => {
          let users = task.users.map((user) => {
            let newUser = {
              _id: user._id,
              name: user.name,
              color: user.color,
            };
            return newUser;
          });
          let newTask = {
            id: task._id,
            content: task.content,
            priority: task.priority,
            columnID: task.columnId,
            users: users,
            color: task.color,
            progress: task.progress,
            isLocked: task.isLocked,
          };
          return newTask;
        });
        let newColumn = {
          id: column._id,
          title: column.title,
          limit: column.limit,
          tasks: tasks,
          index: column.index,
          indexX: column.indexX,
          indexY: column.indexY,
          info: column.info,
          color: column.color,
        };
        return newColumn;
      });

      const indecesY = new Set();
      initialState.forEach((column) => indecesY.add(column.indexY));
      const indecesYArr = Array.from(indecesY).sort().reverse(); // first element must be highest value

      let sortedInitialState = [];
      for (let i = 0; i <= indecesYArr[0]; i++) {
        initialState.forEach((column) => {
          if (column.indexY === i) sortedInitialState.push(column);
        });
      }

      return sortedInitialState;
    }

    case CONSTANTS.ADD_COLUMN:
      const newColumn = {
        id: action.payload._id,
        title: action.payload.title,
        limit: action.payload.limit,
        tasks: [],
        index: action.payload.index,
        indexX: action.payload.indexX,
        indexY: action.payload.indexY,
        info: action.payload.info,
        color: action.payload.color,
      };
      return [...state, newColumn];

    case CONSTANTS.ADD_TASK: {
      let task = action.payload.tasks[action.payload.tasks.length - 1];

      let newTask = {
        id: task._id,
        content: task.content,
        columnID: task.columnId,
        users: [],
        priority: task.priority,
        color: task.color,
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
        draggableId,
        users,
      } = action.payload;
      const newState = [...state];

      // dragging swimlanes around (index swap)
      if (type === "swimlane") {
        let indecesToChange = droppableIndexStart - droppableIndexEnd; // negative number = decrement other columns // positive number = increment other columns
        newState.map((column) => {
          if (column.indexY === droppableIndexStart) {
            column.indexY = droppableIndexEnd;
            return column;
          } else if (indecesToChange > 1) {
            let indecesArray = [];
            for (let i = droppableIndexStart - 1; i >= droppableIndexEnd; i--) {
              indecesArray.push(i);
            }
            indecesArray.map((el) => {
              if (column.indexY === el) {
                column.indexY++;
                return column;
              } else return column;
            });
          } else if (indecesToChange < -1) {
            let indecesArray = [];
            for (let i = droppableIndexStart + 1; i <= droppableIndexEnd; i++) {
              indecesArray.push(i);
            }
            indecesArray.map((el) => {
              if (column.indexY === el) {
                column.indexY--;
                return column;
              } else return column;
            });
          } else if (indecesToChange === -1 || indecesToChange === 1) {
            if (column.indexY === droppableIndexEnd) {
              column.indexY = droppableIndexStart;
              return column;
            } else return column;
          }
          return column;
        });
        const highestIndexY =
          newState.filter((column) => column.indexX === 0).length - 1;

        let sortedSwapState = [];
        for (let i = 0; i <= highestIndexY; i++) {
          newState.forEach((column) => {
            if (column.indexY === i) sortedSwapState.push(column);
          });
        }
        return sortedSwapState;
      }

      if (type === "user" && droppableIdStart === droppableIdEnd) {
        return newState;
      }

      if (type === "user") {
        const user = users.find((user) => user._id === draggableId);
        const updatedState = newState.map((column) => {
          let tasks = column.tasks.map((task) => {
            if (task.id === droppableIdEnd) {
              const userAlreadyAdded = task.users.find(
                (userAlreadyAdded) => userAlreadyAdded.name === user.name
              );
              if (!userAlreadyAdded)
                return {
                  ...task,
                  users: [...task.users, user],
                };
              else return task;
            } else return task;
          });
          return {
            ...column,
            tasks: tasks,
          };
        });
        return updatedState;
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
      const {
        _id,
        content,
        userId,
        priority,
        columnId,
        progress,
        color,
        isLocked,
      } = action.payload;
      return state.map((column) => {
        if (column.id === columnId) {
          const newTasks = column.tasks.map((task) => {
            if (task.id === _id) {
              task.content = content;
              task.priority = priority;
              task.userID = userId;
              task.progress = progress;
              task.color = color;
              task.isLocked = isLocked;
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
      const { _id, title, limit, info } = action.payload;
      return state.map((column) => {
        if (column.id === _id) {
          column.title = title;
          column.limit = limit;
          column.info = info;
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

    case CONSTANTS.DELETE_USER: {
      return state.map((column) => {
        column.tasks.map((task) => {
          task.users = task.users.filter((user) => user._id !== action.payload);
          return task;
        });
        return column;
      });
    }

    default:
      return state;
  }
};

export default columnReducer;
