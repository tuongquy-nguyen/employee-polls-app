import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { handleLogin } from "../actions/authenticationUser";

export const useLoginHook = (dispatch) => {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({
    username: "tylermcginnis",
    password: "dummypassword",
  });

  const onChangeUsername = (value) => {
    setLoginInfo({
      ...loginInfo,
      username: value,
    });
  };

  const onChangePassword = (value) => {
    setLoginInfo({
      ...loginInfo,
      password: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(handleLogin(loginInfo.username, loginInfo.password));
    setLoginInfo({
      username: "tylermcginnis",
      password: "dummypassword",
    });
    navigate("/");
  };

  return {
    loginInfo,
    onChangeUsername,
    onChangePassword,
    onSubmit,
  };
};
