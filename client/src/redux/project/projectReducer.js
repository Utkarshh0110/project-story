import {
  UPLOAD_PROJECT,
  GET_ALL_PROJECT,
  SET_ALL_PROJECT,
} from "./projectType";

const initialState = [];

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PROJECT:
      return state;
    case SET_ALL_PROJECT:
      state = action.payload;
      return state;
    case UPLOAD_PROJECT:
      return [action.payload, ...state];
    default:
      return state;
  }
};

export default projectReducer;
