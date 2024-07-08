/* eslint-disable testing-library/render-result-naming-convention */
import React from "react";
import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import reducers from "./reducers";
import { configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import thunk from "redux-thunk";
import logger from "./middleware/logger";

const renderWithStore = (component) => {
  const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(thunk).concat(logger),
  });

  return render(
    <Provider store={store}>
      <Router>{component}</Router>
    </Provider>
  );
};

describe("Test App component", () => {
  it("Render App component success", () => {
    const component = renderWithStore(<App />);
    expect(component).toBeDefined();
    expect(component).toMatchSnapshot();
  });
});
