import { USER_LOGOUT, SET_USER_AUTHENTICATION } from "../constants/actions";

export const handleLogin = (username, password) => (dispatch, getState) => {
  const { users } = getState();
  const foundedUser = Object.values(users).find(
    (u) => u.id === username && u.password === password
  );
  if (foundedUser) {
    return dispatch(setAuthenticationUser(foundedUser));
  }
};

export const handleLogout = () => ({
  type: USER_LOGOUT,
});

export const setAuthenticationUser = (user) => ({
  type: SET_USER_AUTHENTICATION,
  user,
});
