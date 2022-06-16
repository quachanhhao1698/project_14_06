import * as ActionType from '../controllers/actionTypes'

const initState = {
    departments: [
        {
            id: '1',
            name: 'IT',
            status: true,
            img: "https://joeschmoe.io/api/v1/random",
            user: [
                {
                    name: 'Nguyen Van ABC',
                    user_role_position: 1
                },
                {
                    name: 'Tran Van B',
                    user_role_position: '3'
                }
            ]
        },
        {
            id: '2',
            name: 'HR',
            status: false,
            img: "https://joeschmoe.io/api/v1/random",
            user: [
                {
                    name: 'Nguyen Van ACD',
                    user_role_position: 1

                },
                {
                    name: 'Tran Van B',
                    user_role_position: '3'

                }
            ]
        },
        {
            id: '3',
            name: 'Maketing',
            status: true,
            img: "https://joeschmoe.io/api/v1/random",
            user: [
                {
                    name: 'Nguyen Van ADE',
                    user_role_position: 1
                },
                {
                    name: 'Tran Van B',
                    user_role_position: '3'
                }
            ]
        },
        {
            id: '4',
            name: 'DP4',
            status: true,
            img: "https://joeschmoe.io/api/v1/random",
            user: [
                {
                    name: 'Nguyen Van AFC',
                    user_role_position: 1
                },
                {
                    name: 'Tran Van B',
                    user_role_position: '3'
                },
                {
                    name: 'Tran Van B',
                    user_role_position: '3'
                },
                {
                    name: 'Tran Van B',
                    user_role_position: '3'
                },
            ]
        }
    ]
}

export default function departmentReducer(state = initState, action) {
    // console.log("reducer",action);
    switch (action.type) {
        case ActionType.UPDATE_DEPARTMENT_MANAGER_LIST_SUCCESS:
            return {
                ...state,
                departments: action.data
            }

        case ActionType.UPDATE_DEPARTMENT_STATUS_SUCCESS:
            return {
                ...state,
                departments: action.data
            }
        case ActionType.UPDATE_DEPARTMENT_NAME_SUCCESS:
            return {
                ...state,
                departments: action.data
            }
        default: return state
    }

}