import {
  GET_QUESTIONS,
  ADD_NEW_QUESTION,
  ADD_NEW_QUESTION_ANSWER,
} from "../constants/actions";

const initialState = {};

export const questions = (state = initialState, action) => {
  switch (action.type) {
    case GET_QUESTIONS:
      return { ...state, ...action.questions };
    case ADD_NEW_QUESTION_ANSWER:
      const { id, option, authenticationUser } = action;
      return {
        ...state,
        [id]: {
          ...state[id],
          [option]: {
            ...state[id][option],
            votes: [...state[id]?.[option]?.votes, authenticationUser.id],
          },
        },
      };
    case ADD_NEW_QUESTION:
      return { ...state, [action.question.id]: action.question };
    default:
      return state;
  }
};
