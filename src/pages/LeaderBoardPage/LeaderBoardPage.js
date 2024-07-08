import { connect } from "react-redux";
import "./index.css";

const LeaderBoardPage = (props) => {
  const { users } = props;

  return (
    <div className="leaderboard-container">
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Users</th>
            <th>Answered</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(users).map((user, index) => (
            <tr key={index}>
              <td className="leaderboard-cell">
                <div className="leaderboard-info">
                  <img
                    src={user.avatarURL}
                    alt={`Avatar of ${user.name}`}
                    className="leaderboard-user-avt"
                  />
                  <div>
                    <span className="leaderboard-user-name">{user.name}</span>
                    <span className="leaderboard-uid">{user.id}</span>
                  </div>
                </div>
              </td>
              <td className="leaderboard-cell">
                <span>{Object.keys(user.answers).length}</span>
              </td>
              <td className="leaderboard-cell">
                <span>{user.questions.length}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = ({ questions, users }) => ({
  questions,
  users: Object.values(users).sort(
    (a, b) =>
      Object.keys(b.answers).length +
      Object.keys(b.questions).length -
      Object.keys(a.answers).length -
      Object.keys(a.questions).length
  ),
});

export default connect(mapStateToProps)(LeaderBoardPage);
