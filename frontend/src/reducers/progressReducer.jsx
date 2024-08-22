import { progressActionType } from "../actions/progressAction";

const initialState = {
    progress: 0,
}

const progressReducer = (state = initialState, action) => {
    switch (action.type) {
        case progressActionType.UPLOAD_PROGRESS:
            return {
                ...state,
                progress: action.payload,
            }
        default:
            return state;
    }
}

export default progressReducer;