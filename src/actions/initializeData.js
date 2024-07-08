import { receiveUsers } from "./users";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import { receiveQuestions } from "./questions";
import { _getUsers, _getQuestions } from "../utils/_DATA.js";

const getInitialData = () => {
  return Promise.all([_getUsers(), _getQuestions()]).then(
    ([users, questions]) => ({
      users,
      questions,
    })
  );
};

export const handleInitialData = () => {
  return (dispatch) => {
    dispatch(showLoading());
    return getInitialData().then(({ users, questions }) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
      dispatch(hideLoading());
    });
  };
};
