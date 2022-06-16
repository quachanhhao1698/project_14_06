import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "@redux-saga/core";
import watcherDepartment from '../department/controllers/watcherDepartment';
import rootReducer from "./rootReducer";

const sagaMiddleware = createSagaMiddleware()

const store = createStore(rootReducer,
    applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(watcherDepartment)

export default store;