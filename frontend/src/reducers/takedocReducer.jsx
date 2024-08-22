import { TypedocActionType } from "../actions/takedocAction";

const initialState = {
    typetakes: [],
    docwait: [],
    currentCont: null,
}

const takedocReducer = (state = initialState, action) => {
    switch (action.type) {
        case TypedocActionType.FECTH_TYPEDOC:
            return {
                ...state,
                typetakes: action.payload,
            }
        case TypedocActionType.RECHECK_CONT:
            return {
                ...state,
                currentCont: action.payload,
            }
        case TypedocActionType.CONTRACT:
            return {
                ...state,
                currentCont: action.payload,
            }
        case TypedocActionType.FECTH_DOCWAIT:
            return {
                ...state,
                docwait: action.payload,
            }
        default:
            return state;
    }
}

export default takedocReducer;