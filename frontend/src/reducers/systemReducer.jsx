import { SystemActionType } from "../actions/systemAction";

const initialState = {
    branchs: [],
    branchFZ: [],
    zones: [],
    colors: [],
    protype: [],
    apikeys: [],
    currentBranch: null,
}

const systemReducer = (state = initialState, action) => {
    switch (action.type) {
        case SystemActionType.FECTH_BRANCH:
            return {
                ...state,
                zones: action.payload,
            }
        case SystemActionType.FECTH_COLORS:
            return {
                ...state,
                colors: action.payload,
            }
        case SystemActionType.CREATE_COLOR:
            return {
                ...state,
                colors: [...state.colors, action.payload],
            }
        case SystemActionType.FECTH_PROTYPES:
            return {
                ...state,
                protype: action.payload,
            }
        case SystemActionType.CREATE_PROTYPE:
            return {
                ...state,
                protype: [...state.protype, action.payload],
            }
        case SystemActionType.FECTH_FLBRANCHES:
            return {
                ...state,
                branchFZ: action.payload,
            }
        case SystemActionType.CREATE_APIKEY:
            return {
                ...state,
                apikeys: [...state.apikeys, action.payload],
            }
        case SystemActionType.FECTH_APIKEYS:
            return {
                ...state,
                apikeys: action.payload,
            }
        default:
            return state;
    }
};

export default systemReducer;