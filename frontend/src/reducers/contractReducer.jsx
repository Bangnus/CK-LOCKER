import { ContActionType } from "../actions/contractAction";

const initialState = {
    currentCont: [],
};

const contractReducer = (state = initialState, action) => {
    switch (action.type) {
        case ContActionType.FECTH_CONT:
            return {
                ...state,
                currentCont: action.payload,
            }
        case ContActionType.RESET_CONT:
            return {
                ...state,
                currentCont: [],
            }
        default:
            return state;
    }
};

export default contractReducer;