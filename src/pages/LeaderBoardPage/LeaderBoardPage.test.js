/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/render-result-naming-convention */
import React from "react";
import LeaderboardPage from "./LeaderBoardPage";
import { render, within } from "@testing-library/react";
import reducers from "../../reducers";
import logger from "../../middleware/logger";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { handleInitialData } from "../../actions/initializeData";
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

describe("Test LeaderboardPage", () => {
  it("Test correct display of leaderboard data", async () => {
    await store.dispatch(handleInitialData());
    const component = renderWithStore(<LeaderboardPage />);

    const table = component.getByRole("table");
    const tbody = within(table).getAllByRole("rowgroup")[1];

    const { users } = store.getState();
    const sortedUsers = Object.values(users).sort((a, b) => {
      const userAScore =
        Object.keys(a.answers).length + Object.keys(a.questions).length;
      const userBScore =
        Object.keys(b.answers).length + Object.keys(b.questions).length;
      return userBScore - userAScore;
    });

    const rows = within(tbody).getAllByRole("row");
    expect(rows).toHaveLength(sortedUsers.length);

    sortedUsers.forEach(({ name, answers, questions }, index) => {
      const columns = within(rows[index]).getAllByRole("cell");
      expect(columns).toHaveLength(3);
      expect(columns[0]).toHaveTextContent(name);
      expect(columns[1]).toHaveTextContent(Object.keys(answers).length);
      expect(columns[2]).toHaveTextContent(Object.keys(questions).length);
    });
  });
});
