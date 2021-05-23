import { GET_ALL_PROJECT, UPLOAD_PROJECT, SET_ALL_PROJECT } from "./projectType";
export const getProject = () => {
  return {
    type: GET_ALL_PROJECT,
  };
};

export const uploadProject = (project) => {
  return {
    type: UPLOAD_PROJECT,
    payload: project,
  };
};


export const setProjects = (project) => {
  return {
    type: SET_ALL_PROJECT,
    payload: project,
  };
};
