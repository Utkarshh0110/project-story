import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk"
import projectReducer from "./project/projectReducer";

const store = createStore(projectReducer, applyMiddleware(thunk));

export default store;
