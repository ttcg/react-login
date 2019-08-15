import { createStore, applyMiddleware } from "redux";

import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './redux/redux.index';
import rootSaga from './redux/saga.index'

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(sagaMiddleware)
    )
);
export default store;

sagaMiddleware.run(rootSaga);