import {
  ADD_NEW_USER_ANSWER,
  ADD_NEW_USER_QUESTION,
  GET_USERS,
} from "../constants/actions";

const initialState = {};

export const users = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return { ...state, ...action.users };
    case ADD_NEW_USER_ANSWER:
      const {
        authenticationUser: { id: userId },
        questionId,
        answer,
      } = action;
      return {
        ...state,
        [userId]: {
          ...state[userId],
          answers: {
            ...state[userId]?.answers,
            [questionId]: answer,
          },
        },
      };
    case ADD_NEW_USER_QUESTION:
      return {
        ...state,
        [action.author]: {
          ...state[action.author],
          questions: [...state[action.author]?.questions, action.questionId],
        },
      };
    default:
      return state;
  }
};
