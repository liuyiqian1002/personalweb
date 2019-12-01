'use strict';

import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import RootReducer from './reducers/index';
import requestMiddleware from '../middleware/reuqest';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas'
const sagaMiddleware = createSagaMiddleware()

const logger = createLogger();
if (process.env.NODE_ENV !== 'production') {
  // middlewares.push(logger);
}

const store = createStore(
  RootReducer,
  {},
  compose(
    applyMiddleware(sagaMiddleware, requestMiddleware), // 触发redux-devtools
    window.devToolsExtension ? window.devToolsExtension() : (f) => f
  )
);
sagaMiddleware.run(rootSaga)

export default store;
