import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '../reducers/index';

const initialState = {}

const middlewares = [thunk];

export default createStore(rootReducer, initialState, applyMiddleware(...middlewares));

