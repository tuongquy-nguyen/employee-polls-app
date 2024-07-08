import { connect } from "react-redux";
import employee from "../../imgs/employees.png";
import { useLoginHook } from "../../hooks/useLoginHook";
import "./index.css";

const LoginPage = (props) => {
  const { dispatch } = props;
  const { loginInfo, onChangeUsername, onChangePassword, onSubmit } =
    useLoginHook(dispatch);

  return (
    <div className="login-container">
      <h1>Employee Polls</h1>
      <img src={employee} alt="Employee polls thumbnail" />
      <h2>Log In</h2>
      <form className="login-form" onSubmit={onSubmit}>
        <label htmlFor="username" className="login-label">
          User
        </label>
        <input
          type="text"
          data-testid="username"
          id="username"
          className="login-input"
          placeholder="Username"
          value={loginInfo.username}
          onChange={(e) => onChangeUsername(e.target.value)}
        />
        <label htmlFor="password" className="login-label">
          Password
        </label>
        <input
          type="password"
          data-testid="password"
          id="password"
          className="login-input"
          placeholder="Password"
          value={loginInfo.password}
          onChange={(e) => onChangePassword(e.target.value)}
        />
        <div>
          <button type="submit" data-testid="submit" className="button-login">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = ({ authenticationUser }) => ({
  loggedIn: authenticationUser !== null,
});

export default connect(mapStateToProps)(LoginPage);
