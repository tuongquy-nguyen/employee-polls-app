import {
  ADD_NEW_USER_ANSWER,
  ADD_NEW_USER_QUESTION,
  GET_USERS,
} from "../constants/actions";

export const addUserQuestion = (question) => ({
  type: ADD_NEW_USER_QUESTION,
  author: question.author,
  questionId: question.id,
});

export const addUserAnswer = (authenticationUser, questionId, answer) => ({
  type: ADD_NEW_USER_ANSWER,
  authenticationUser,
  questionId,
  answer,
});

export const receiveUsers = (users) => ({
  type: GET_USERS,
  users,
});
