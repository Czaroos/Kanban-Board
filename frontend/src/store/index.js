import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';
// import createLogger from 'redux-logger'


// const middleware = [thunk, createLogger];
const middleware = [thunk]

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(...middleware),
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
 );

export default store;