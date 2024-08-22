import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from 'redux-thunk'
import AuthReducer from "./reducers/authReducer";
import lockerReducer from "./reducers/lockerReducer";
import roleReducer from "./reducers/roleReducer";
import systemReducer from "./reducers/systemReducer";
import takedocReducer from "./reducers/takedocReducer";
import progressReducer from "./reducers/progressReducer";
import contractReducer from "./reducers/contractReducer";

const rootReducer = combineReducers({
    auth: AuthReducer,
    locker: lockerReducer,
    userRole: roleReducer,
    system: systemReducer,
    takedoc: takedocReducer,
    progress: progressReducer,
    contract: contractReducer,
});

// Apply thunk middleware to handle async actions
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

