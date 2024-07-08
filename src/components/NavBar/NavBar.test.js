/* eslint-disable jest/no-conditional-expect */
/* eslint-disable testing-library/render-result-naming-convention */
/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import Navbar from "./NavBar";
import { render } from "@testing-library/react";
import reducers from "../../reducers";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { setAuthenticationUser } from "../../actions/authenticationUser";
import thunk from "redux-thunk";
import logger from "../../middleware/logger";

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk).concat(logger),
});

const renderWithStore = (component) => {
  return render(
    <Provider store={store}>
      <Router>{component}</Router>
    </Provider>
  );
};

describe("Test Navbar", () => {
  it("Test navbar displays expected links and user info (if logged in)", async () => {
    await store.dispatch(
      setAuthenticationUser({
        id: "tylermcginnis",
        name: "Tyler McGinnis",
        password: "dummypassword",
      })
    );
    const component = renderWithStore(<Navbar />);

    const links = ["home", "new-poll", "leaderboard"];

    links.forEach((linkId) => {
      expect(component.getByTestId(linkId).textContent).toBe(
        linkId.charAt(0).toUpperCase() + linkId.slice(1)
      );
    });

    const authenticatedUser = store.getState().authenticationUser;
    if (authenticatedUser) {
      expect(component.getByTestId("authenticationUser").textContent).toBe(
        authenticatedUser.name
      );
      expect(component.getByTestId("logout").textContent).toBe("Logout");
    }
  });
});
