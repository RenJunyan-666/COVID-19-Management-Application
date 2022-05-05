import { applyMiddleware, combineReducers, createStore } from "redux";
import buttonReducer from "./buttonReducer";
import hospitalReducer from "./hospitalReducer";
import hospitalListReducer from "./hospitalListReducer";
import userListReducer from "./userListReducer";
import loginUserReducer from "./loginUserReducer";
import reduxThunk from 'redux-thunk'

const reducer = combineReducers({
    buttonReducer,
    hospitalReducer,
    hospitalListReducer,
    userListReducer,
    loginUserReducer
})

const store = createStore(reducer, applyMiddleware(reduxThunk))
export default store