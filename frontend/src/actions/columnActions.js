import {CONSTANTS} from '../actions'

export const addColumn = (title) => {
    return {
        type: CONSTANTS.ADD_COLUMN,
        payload: title
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

export const editColumnTitle = (columnID, newTitle) => {
    return {
      type: CONSTANTS.EDIT_COLUMN_TITLE,
      payload: {
        columnID,
        newTitle
      }
    };
  };

export const deleteColumn = columnID => {
    return {
        type: CONSTANTS.DELETE_COLUMN,
        payload: {
            columnID
        }
    };
};