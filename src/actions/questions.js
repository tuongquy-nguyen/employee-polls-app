import { showLoading, hideLoading } from "react-redux-loading-bar";
import { addUserAnswer, addUserQuestion } from "./users";
import {
  GET_QUESTIONS,
  ADD_NEW_QUESTION_ANSWER,
  ADD_NEW_QUESTION,
} from "../constants/actions";
import { _saveQuestion, _saveQuestionAnswer } from "../utils/_DATA";

const addQuestionAnswer = ({ id, option, authenticationUser }) => ({
  type: ADD_NEW_QUESTION_ANSWER,
  id,
  option,
  authenticationUser,
});

const addNewQuestion = (question) => ({
  type: ADD_NEW_QUESTION,
  question,
});

export const receiveQuestions = (questions) => ({
  type: GET_QUESTIONS,
  questions,
});

export const handleAddQuestion = (question) => {
  return (dispatch) => {
    dispatch(showLoading());

    return _saveQuestion(question)
      .then((question) => {
        dispatch(addNewQuestion(question));
        dispatch(addUserQuestion(question));
      })
      .then(() => dispatch(hideLoading()));
  };
};

export function handleAddQuestionAnswer(question, answer) {
  return (dispatch, getState) => {
    const { authenticationUser } = getState();
    dispatch(showLoading());
    return _saveQuestionAnswer({
      authenticationUser,
      questionId: question.id,
      answer,
    })
      .then(() => {
        dispatch(
          addQuestionAnswer({
            id: question.id,
            option: answer,
            authenticationUser,
          })
        );
        dispatch(addUserAnswer(authenticationUser, question.id, answer));
      })
      .then(() => dispatch(hideLoading()));
  };
}
