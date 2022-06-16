import { combineReducers } from "redux";
import departmentReducer from "../department/models/departmentReducer";
import saleReducer from "../sale/models/saleReducer";

const rootReducer = combineReducers({
    departmentSate:departmentReducer,
    saleState:saleReducer

})

export default rootReducer;