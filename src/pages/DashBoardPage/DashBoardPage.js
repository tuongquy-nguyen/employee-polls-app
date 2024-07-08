import { connect } from "react-redux";
import { useDashboardHook } from "../../hooks/useDashboardHook";
import "./index.css";

const DashboardPage = (props) => {
  const { questionDone, questionNew, questionsList } = useDashboardHook(props);

  return (
    <div>
      <div className="dashboard-question-kind">
        <h3 className="center">New Questions</h3>
        {questionsList(questionNew)}
      </div>
      <div className="dashboard-question-kind">
        <h3 className="center">Done</h3>
        {questionsList(questionDone)}
      </div>
    </div>
  );
};

const mapStateToProps = ({ questions, authenticationUser }) => ({
  questionIds: Object.keys(questions).sort(
    (a, b) => questions[b].timestamp - questions[a].timestamp
  ),
  questions,
  authenticationUser,
});

export default connect(mapStateToProps)(DashboardPage);
