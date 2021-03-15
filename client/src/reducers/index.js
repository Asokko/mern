import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools } from 'redux-devtools-extension'
import thunk from "redux-thunk";
import flightReducer from "./flightReducer";
import userReducer from "./userReducer";

const middleware = [thunk];

const rootReducer = combineReducers({
    user: userReducer,
    flight:flightReducer
})

export const store = createStore(rootReducer, 
    composeWithDevTools(applyMiddleware(...middleware)))