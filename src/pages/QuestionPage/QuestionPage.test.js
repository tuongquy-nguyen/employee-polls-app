/* eslint-disable testing-library/render-result-naming-convention */
/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import QuestionPage from "./QuestionPage";
import { render } from "@testing-library/react";
import reducers from "../../reducers";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { setAuthenticationUser } from "../../actions/authenticationUser";
import { handleInitialData } from "../../actions/initializeData";
import thunk from "redux-thunk";
import logger from "../../middleware/logger";

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk).concat(logger),
});

const renderWithStore = (component, answerId) => {
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[`/questions/${answerId}`]}>
        <Routes>
          <Route path="/questions/:id" element={component} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
};

describe("Test QuestionPage", () => {
  it("Test correct display votes.", async () => {
    await store.dispatch(
      setAuthenticationUser({
        id: "tylermcginnis",
        name: "Tyler McGinnis",
        password: "dummypassword",
      })
    );
    await store.dispatch(handleInitialData());
    const { authenticationUser, questions } = store.getState();

    const answerId = Object.keys(
      store.getState().users[authenticationUser.id].answers
    )[0];
    const { optionOne, optionTwo } = questions[answerId];
    const firstOptionNumbers = optionOne.votes.length;
    const secondOptionNumbers = optionTwo.votes.length;
    const totals = firstOptionNumbers + secondOptionNumbers;

    const firstOption = `Votes: ${firstOptionNumbers} (${Math.round(
      (100 * firstOptionNumbers) / totals
    )}%)`;
    const secondOption = `Votes: ${secondOptionNumbers} (${Math.round(
      (100 * secondOptionNumbers) / totals
    )}%)`;

    const component = renderWithStore(<QuestionPage />, answerId);
    expect(component).toBeDefined();
    expect(component.getByTestId("poll-header")).toBeInTheDocument();
    expect(component.getByTestId("optionOne")).toBeInTheDocument();
    expect(component.getByTestId("optionTwo")).toBeInTheDocument();
    expect(component.getByTestId("optionOne").textContent).toEqual(firstOption);
    expect(component.getByTestId("optionTwo").textContent).toEqual(
      secondOption
    );
  });
});
