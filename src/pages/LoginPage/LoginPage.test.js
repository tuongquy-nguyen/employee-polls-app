/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/render-result-naming-convention */
import React from "react";
import LoginPage from "./LoginPage";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import reducers from "../../reducers";
import { configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
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

describe("Test LoginPage", () => {
  it("Test LoginPage correct display", () => {
    const component = renderWithStore(<LoginPage />);

    const usernameInput = component.getByTestId("username");
    const passwordInput = component.getByTestId("password");
    const submitButton = component.getByTestId("submit");

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
});
