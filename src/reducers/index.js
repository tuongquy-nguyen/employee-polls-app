import { combineReducers } from "@reduxjs/toolkit";
import { authenUser } from "./authenUser";
import { users } from "./users";
import { questions } from "./questions";
import { loadingBarReducer } from "react-redux-loading-bar";

export default combineReducers({
  authenUser,
  users,
  questions,
  loadingBar: loadingBarReducer,
});
