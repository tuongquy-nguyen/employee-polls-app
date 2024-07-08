import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { useQuestionDetailHook } from "../../hooks/useQuestionDetailHook";
import "./index.css";

const QuestionPage = (props) => {
  const { dispatch, authenticationUser, questions, users } = props;
  const {
    handleOptionOne,
    handleOptionTwo,
    formattedQuestion,
    isOptionOneVoted,
    isOptionTwoVoted,
    isVoted,
    optionOneText,
    optionTwoText,
    question,
  } = useQuestionDetailHook(dispatch, authenticationUser, questions, users);

  const { name, optionOne, optionTwo, avatar } = formattedQuestion;

  if (question == null) {
    return <Navigate to="/error" />;
  }

  return (
    <div className="poll-container">
      <h3 data-testid="poll-header">Poll by {name}</h3>
      <img src={avatar} alt={`Avatar of ${name}`} className="avatar-big" />
      <h3>Would You Rather</h3>
      {!isVoted ? (
        <div className="poll-options">
          <div className="poll-option">
            <p className="poll-textarea">{optionOne.text}</p>
            <button onClick={handleOptionOne} className="poll-button">
              Vote
            </button>
          </div>
          <div className="poll-option">
            <p className="poll-textarea">{optionTwo.text}</p>
            <button onClick={handleOptionTwo} className="poll-button">
              Vote
            </button>
          </div>
        </div>
      ) : (
        <div className="poll-options">
          <div
            className={`poll-option ${
              isOptionOneVoted ? "background-voted" : "background-not-voted"
            }`}
          >
            <p>{optionOne.text}</p>
            <p data-testid="optionOne">{optionOneText}</p>
          </div>
          <div
            className={`poll-option ${
              isOptionTwoVoted ? "background-voted" : "background-not-voted"
            }`}
          >
            <p>{optionTwo.text}</p>
            <p data-testid="optionTwo">{optionTwoText}</p>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({ authenticationUser, users, questions }) => {
  return {
    authenticationUser,
    questions,
    users,
  };
};

export default connect(mapStateToProps)(QuestionPage);
