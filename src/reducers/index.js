import { combineReducers } from "@reduxjs/toolkit";
import { authenticationUser } from "./authenticationUser";
import { users } from "./users";
import { questions } from "./questions";
import { loadingBarReducer } from "react-redux-loading-bar";

export default combineReducers({
  authenticationUser: authenticationUser,
  users,
  questions,
  loadingBar: loadingBarReducer,
});
