/* eslint-disable testing-library/render-result-naming-convention */
/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import CreateQuestionPage from "./CreateQuestionPage";
import { render, fireEvent } from "@testing-library/react";
import reducers from "../../reducers";
import logger from "../../middleware/logger";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import thunk from "redux-thunk";

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

describe("Test NewQuestionPage", () => {
  it("Test correct display and enable submit button", async () => {
    const component = renderWithStore(<CreateQuestionPage />);
    const submitButton = component.getByTestId("submit-button");
    const optionOneInput = component.getByTestId("option-one");
    const optionTwoInput = component.getByTestId("option-two");

    expect(submitButton).toBeDisabled();

    fireEvent.change(optionOneInput, { target: { value: "optionOne" } });
    fireEvent.change(optionTwoInput, { target: { value: "optionTwo" } });

    expect(optionOneInput.value).toEqual("optionOne");
    expect(optionTwoInput.value).toEqual("optionTwo");
    expect(submitButton).not.toBeDisabled();
  });
});
