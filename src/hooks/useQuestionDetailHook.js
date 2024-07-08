import { formatQuestion } from "../utils/utils";
import { useParams } from "react-router-dom";
import { handleAddQuestionAnswer } from "../actions/questions";

export const useQuestionDetailHook = (
  dispatch,
  authenticationUser,
  questions,
  users
) => {
  const { id } = useParams();
  const authedUserId = authenticationUser.id;
  const question = questions[id];
  const { optionOne, optionTwo } = question;

  const formattedQuestion = formatQuestion(
    question,
    users[question.author],
    authenticationUser
  );

  const isOptionOneVoted = optionOne.votes.includes(authedUserId);

  const isOptionTwoVoted = optionTwo.votes.includes(authedUserId);

  const isVoted =
    optionOne.votes.includes(authedUserId) ||
    optionTwo.votes.includes(authedUserId);

  const totalVotes = optionOne.votes.length + optionTwo.votes.length;

  const optionOneText = `Votes: ${optionOne.votes.length} (${Math.round(
    (100 * optionOne.votes.length) / totalVotes
  )}%)`;

  const optionTwoText = `Votes: ${optionTwo.votes.length} (${Math.round(
    (100 * optionTwo.votes.length) / totalVotes
  )}%)`;

  const handleOptionOne = (e) => {
    e.preventDefault();
    dispatch(handleAddQuestionAnswer(question, "optionOne"));
  };

  const handleOptionTwo = (e) => {
    e.preventDefault();
    dispatch(handleAddQuestionAnswer(question, "optionTwo"));
  };

  return {
    handleOptionOne,
    handleOptionTwo,
    formattedQuestion,
    isOptionOneVoted,
    isOptionTwoVoted,
    isVoted,
    optionOneVotes: optionOne.votes.length,
    optionTwoVotes: optionTwo.votes.length,
    totalVotes,
    optionOneText,
    optionTwoText,
    question,
  };
};
