import { connect } from "react-redux";
import { useCreateQuestionHook } from "../../hooks/useCreateQuestionHook";
import "./index.css";

const CreateQuestionPage = (props) => {
  const { dispatch, authenticationUser } = props;
  const { option, onChangeOptionOne, onChangeOptionTwo, onSubmit } =
    useCreateQuestionHook(dispatch, authenticationUser);

  const isButtonDisable = option.optionOne === "" || option.optionTwo === "";

  return (
    <div>
      <h1 className="center">Would You Rather Choose</h1>
      <h2 className="center" style={{ color: "#A9A9A9" }}>
        Create Your Poll
      </h2>
      <form className="create-question-form" onSubmit={onSubmit}>
        <h3 className="center">First Option</h3>
        <input
          type="text"
          placeholder="Option One"
          data-testid="option-one"
          value={option.optionOne}
          onChange={onChangeOptionOne}
          className="create-question-input"
        />
        <h3 className="center">Second Option</h3>
        <input
          type="text"
          placeholder="Option Two"
          data-testid="option-two"
          value={option.optionTwo}
          onChange={onChangeOptionTwo}
          className="create-question-input"
        />
        <button
          data-testid="submit-button"
          className="button"
          type="submit"
          disabled={isButtonDisable}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = ({ authenticationUser }) => ({
  authenticationUser,
});

export default connect(mapStateToProps)(CreateQuestionPage);
