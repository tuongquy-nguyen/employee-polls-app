import { useEffect, Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import { handleInitialData } from "./actions/initializeData";
import { connect } from "react-redux";
import { LoadingBar } from "react-redux-loading-bar";
import { authedRoutes } from "./route";
import NavBar from "./components/NavBar/NavBar";
import LoginPage from "./pages/LoginPage/LoginPage";
import "./App.css";

function App(props) {
  useEffect(() => {
    props.dispatch(handleInitialData());
  }, []);

  return (
    <div>
      {props.authenticationUser !== null && (
        <Fragment>
          <LoadingBar />
          <div className="container">
            <NavBar />
            <Routes>
              {authedRoutes.map((route, index) => {
                const { path, exact, element } = route;
                return (
                  <Route
                    key={index}
                    path={path}
                    exact={exact}
                    element={element}
                  />
                );
              })}
            </Routes>
          </div>
        </Fragment>
      )}
      {props.authenticationUser === null && <LoadingBar />}
      {props.authenticationUser === null && props.loading === false && (
        <Fragment>
          <div className="container">
            <Routes>
              <Route path="*" exact element={<LoginPage />} />
            </Routes>
          </div>
        </Fragment>
      )}
    </div>
  );
}

const mapStateToProps = ({ authenticationUser, loadingBar }) => ({
  loading: loadingBar != null && loadingBar.default === 1,
  authenticationUser,
});

export default connect(mapStateToProps)(App);
