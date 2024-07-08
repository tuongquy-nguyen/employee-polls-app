export const formatQuestion = (question, user, authenticationUser) => {
  const { id, timestamp, optionOne, optionTwo } = question;

  return {
    name: user.name,
    id,
    timestamp,
    optionOne,
    optionTwo,
    avatar: user.avatarURL,
    authenticationUser,
  };
};

export const formatDate = (timestamp) => {
  const d = new Date(timestamp);
  const time = d.toLocaleTimeString("en-US");
  return `${time.substring(0, 5)}  ${time.slice(
    -2
  )} | ${d.toLocaleDateString()}`;
};
