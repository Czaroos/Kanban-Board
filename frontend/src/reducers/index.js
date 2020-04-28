import { combineReducers } from 'redux';
import columnReducer from './columnReducer';
import userReducer from './userReducer';

export default combineReducers({
    columns: columnReducer,
    users: userReducer
});