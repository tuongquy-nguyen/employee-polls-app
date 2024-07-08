import Question from "../components/Question/Question";

export const useDashboardHook = (props) => {
  const questionDone = props.questionIds.filter((id) => {
    const question = props.questions[id];
    return (
      question.optionOne.votes.includes(props.authenticationUser.id) ||
      question.optionTwo.votes.includes(props.authenticationUser.id)
    );
  });

  const questionNew = props.questionIds.filter(
    (id) => !questionDone.includes(id)
  );

  const questionsList = (questionKind) => {
    return (
      <ul className="dashboard-list">
        {questionKind.map((id) => (
          <li key={id}>
            <Question id={id} />
          </li>
        ))}
      </ul>
    );
  };

  return {
    questionDone,
    questionNew,
    questionsList,
  };
};
