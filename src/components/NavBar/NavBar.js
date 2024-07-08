import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { handleLogout } from "../../actions/authenticationUser";
import {
  CREATE_QUESTION_PATH,
  DASHBOARD_PATH,
  LEADERBOARD_PATH,
} from "../../constants/paths";
import "./index.css";

const Navbar = ({ dispatch, authenticationUser }) => {
  const { avatarURL, name } = authenticationUser;

  const logout = (e) => {
    e.preventDefault();
    dispatch(handleLogout());
  };

  return (
    <nav className="nav">
      <ul>
        <li>
          <Link data-testid="home" to={DASHBOARD_PATH} className="nav-link">
            Home
          </Link>
        </li>
        <li>
          <Link
            data-testid="new-poll"
            to={CREATE_QUESTION_PATH}
            className="nav-link"
          >
            New-poll
          </Link>
        </li>
        <li>
          <Link
            data-testid="leaderboard"
            to={LEADERBOARD_PATH}
            className="nav-link"
          >
            Leaderboard
          </Link>
        </li>
        <li data-testid="authenticationUser" style={{ textAlign: "center" }}>
          <img src={avatarURL} alt={`Avatar of ${name}`} className="avatar" />
          {name}
        </li>
        <li style={{ float: "right" }}>
          <Link data-testid="logout" onClick={logout} className="nav-link">
            Logout
          </Link>
        </li>
      </ul>
    </nav>
  );
};

const mapStateToProps = ({ authenticationUser }) => {
  return {
    authenticationUser,
  };
};

export default connect(mapStateToProps)(Navbar);
