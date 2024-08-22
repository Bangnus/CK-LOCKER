import { RoleActionType } from "../actions/roleAction";

const initialState = {
    allRole: [],
    currentRole: null,
}

const roleReducer = (state = initialState, action) => {
    switch (action.type) {
        case RoleActionType.CREATE_ROLE:
            return {
                ...state,
                allRole: action.payload,
            }
        case RoleActionType.FECTH_ROLES:
            return {
                ...state,
                allRole: action.payload,
            }
        case RoleActionType.DELETE_ROLE:
            return {
                ...state,
                allRole: state.allRole.body.filter((allRole) => allRole.id !== action.payload.body.id),
            }
        default:
            return state;
    }
}

export default roleReducer;