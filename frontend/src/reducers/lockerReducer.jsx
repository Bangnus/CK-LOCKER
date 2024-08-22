import { LockerActionType } from "../actions/lockerAction";

const initState = {
    lockers: [],
    locker: null,
    bookmarks: [],
    currentLocker: [],
    currentFloorContract: [],
    floors: [],
    lockerCont: [],
    typeDocs: [],
}

const lockerReducer = (state = initState, action) => {
    switch (action.type) {
        case LockerActionType.CREATE_LOCKER:
            return {
                ...state,
                lockers: action.payload,
            };
        case LockerActionType.FECTH_LOCKERS:
            return {
                ...state,
                lockers: action.payload,
            }
        case LockerActionType.FECTH_TYPEDOCS:
            return {
                ...state,
                typeDocs: action.payload,
            }
        case LockerActionType.CREATE_TYPEDOC:
            return {
                ...state,
                typeDocs: action.payload,
            }
        case LockerActionType.BOOKMARK:
            return {
                ...state,
                bookmarks: [...state.bookmarks, action.payload],
            }
        case LockerActionType.FECTH_FLOORS:
            return {
                ...state,
                currentLocker: action.payload.response,
                floors: action.payload.response[0].Lockerfloor,
                lockerCont: action.payload.lockerCont,
            }
        case LockerActionType.FECTH_FLOORCONTRACT:
            return {
                ...state,
                currentFloorContract: action.payload[0].Lockerfloor[0].LockerCont,
            }
        default:
            return state;
    }
}

export default lockerReducer;