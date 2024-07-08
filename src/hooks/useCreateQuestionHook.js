import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { handleAddQuestion } from "../actions/questions";

export const useCreateQuestionHook = (dispatch, authenticationUser) => {
  const navigate = useNavigate();
  const [option, setOption] = useState({ optionOne: "", optionTwo: "" });

  const onChangeOptionOne = (e) => {
    const text = e.target.value;
    setOption({
      ...option,
      optionOne: text,
    });
  };

  const onChangeOptionTwo = (e) => {
    const text = e.target.value;
    setOption({
      ...option,
      optionTwo: text,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { optionOne, optionTwo } = option;
    dispatch(
      handleAddQuestion({
        optionOneText: optionOne,
        optionTwoText: optionTwo,
        author: authenticationUser.id,
      })
    );
    setOption({
      optionOne: "",
      optionTwo: "",
    });
    navigate("/");
  };

  return {
    option,
    onChangeOptionOne,
    onChangeOptionTwo,
    onSubmit,
  };
};
