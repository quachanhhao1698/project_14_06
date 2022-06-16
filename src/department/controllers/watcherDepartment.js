import { StarOutlined } from '@ant-design/icons';
import { takeEvery, put, select, takeLatest } from 'redux-saga/effects'
import * as ActionType from './actionTypes'

export default function* watcherDepartment() {
    yield takeEvery(ActionType.API_CREATE_DEPARTMENT, workerAPICreateDepartment);
    yield takeEvery(ActionType.UPDATE_DEPARTMENT_MANAGER_LIST, workerUpdateDepartment);

    yield takeEvery(ActionType.API_UPDATE_DEPARTMENT_STATUS, workerAPIUpdateDepartmentStatus)
    yield takeEvery(ActionType.UPDATE_DEPARTMENT_STATUS, workerUpdateDepartment)

    yield takeEvery(ActionType.API_UPDATE_DEPARTMENT_NAME, workerAPIUpdateDepartmentName)
    yield takeEvery(ActionType.UPDATE_DEPARTMENT_NAME, workerUpdateDepartment)



}

function* workerAPICreateDepartment(action) {
    yield put({
        type: ActionType.UPDATE_DEPARTMENT_MANAGER_LIST,
        ttype: 'add_new',
        data: action.data
    });

}
function* workerAPIUpdateDepartmentStatus(action) {
    // console.log('status',action);
    yield put({
        type: ActionType.UPDATE_DEPARTMENT_STATUS,
        ttype: 'update_status',
        data: action.data
    });
}

function* workerAPIUpdateDepartmentName(action) {
    console.log('Rename', action);
    yield put({
        type: ActionType.UPDATE_DEPARTMENT_NAME,
        ttype: 'update_name',
        data: action.data
    });
}

function* workerUpdateDepartment(action) {
    console.log(action);
    try {
        let deps = yield select((state) => state.departmentSate.departments);
        const depIndex = deps.findIndex(dep => dep.id === action.data.id)
        switch (action.ttype) {
            case 'add_new':
                let newDepartment = {
                    id: action.data.id,
                    name: action.data.name,
                    status: action.data.status,
                    img: "https://joeschmoe.io/api/v1/random",
                    user: [{ name: action.data.user, user_role_position: 1 }]
                }
                if (!newDepartment) throw 'empty newDepartmentId'
                deps.push(newDepartment)
                yield put({
                    type: ActionType.UPDATE_DEPARTMENT_MANAGER_LIST_SUCCESS,
                    data: deps,
                })
                break
            case 'update_status':
                deps[depIndex].status = action.data.status
                yield put({
                    type: ActionType.UPDATE_DEPARTMENT_STATUS_SUCCESS,
                    data: deps,
                })
                break
            case 'update_name':
                // const depIndex = deps.findIndex(dep => dep.id === action.data.id)
                deps[depIndex].name = action.data.name
                yield put({
                    type: ActionType.UPDATE_DEPARTMENT_NAME_SUCCESS,
                    data: deps,
                })
                break
            default:
                break;
        }
    }
    catch (error) {
        console.log(error, "workerUpdateDepartmentManager");
    }
}

