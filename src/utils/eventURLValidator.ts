import { EVENT_INVALID_URL } from "./constants";

const validateEventURL = (url: string) => {
  const urlRegex = new RegExp(
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/i
  );

  if (urlRegex.test(url)) {
    return {
      isValid: true,
      message: "",
    };
  } else {
    return {
      isValid: false,
      message: EVENT_INVALID_URL,
    };
  }
};

export default validateEventURL;
