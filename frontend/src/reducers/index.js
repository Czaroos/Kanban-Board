import { combineReducers } from 'redux';
import columnReducer from './columnReducer';

const rootReducer = combineReducers({
    columns: columnReducer
});

export default rootReducer;