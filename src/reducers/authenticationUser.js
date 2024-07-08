import { USER_LOGOUT, SET_USER_AUTHENTICATION } from "../constants/actions";

export const authenticationUser = (state = null, action) => {
  switch (action.type) {
    case SET_USER_AUTHENTICATION: {
      const { id, name, avatarURL } = action.user;
      return {
        id,
        name,
        avatarURL,
      };
    }
    case USER_LOGOUT:
      return null;
    default:
      return state;
  }
};
