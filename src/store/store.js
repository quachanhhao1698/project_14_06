import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "@redux-saga/core";
import watcherDepartment from '../department/controllers/watcherDepartment';
import departmentReducer from "../department/models/departmentReducer";

const sagaMiddleware = createSagaMiddleware()

const store = createStore(departmentReducer,
    applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(watcherDepartment)

export default store;