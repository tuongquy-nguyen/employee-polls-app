import { connect } from "react-redux";
import { formatQuestion, formatDate } from "../../utils/utils";
import { Link } from "react-router-dom";
import "./index.css";

const Question = (props) => {
  const { name, timestamp, avatar, id } = props.question;

  return (
    <>
      {props.question ? (
        <Link to={`/questions/${id}`} className="question">
          <img src={avatar} alt={`Avatar of ${name}`} className="avatar" />
          <div className="question-info">
            <div>
              <span>{name}</span>
              <div>{formatDate(timestamp)}</div>
            </div>
          </div>
        </Link>
      ) : (
        <p>The question does not exist!</p>
      )}
    </>
  );
};

const mapStateToProps = ({ authenicationUser, users, questions }, { id }) => {
  const question = questions[id];
  return {
    authenicationUser,
    question: question
      ? formatQuestion(question, users[question.author], authenicationUser)
      : null,
  };
};

export default connect(mapStateToProps)(Question);
