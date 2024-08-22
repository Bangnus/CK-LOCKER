import { AuthActionType } from "../actions/authAction";

const initialState = {
    user: null,
    curentUser: null,
    users: [],
}

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case AuthActionType.USERS_SIGNIN:
            return {
                ...state,
                user: action.payload,
            };
        case AuthActionType.FECTH_USER:
            return {
                ...state,
                curentUser: action.payload,
            }
        case AuthActionType.FECTH_USERS:
            return {
                ...state,
                users: action.payload,
            }
        case AuthActionType.CREATE_USER:
            return {
                ...state,
                users: [...state.users, action.payload],
            }
        case AuthActionType.SIGN_OUT:
            return initialState;
        default:
            return state;
    }
}

export default AuthReducer;