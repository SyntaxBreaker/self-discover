import { EVENT_INVALID_URL } from "./constants";

const validateEventURL = (url: string) => {
  const urlRegex = new RegExp(
    /^http(s)?:\/\/((\d+\.\d+\.\d+\.\d+)|(([\w-]+\.)+([a-z,A-Z][\w-]*)))(:[1-9][0-9]*)?(\/([\w-.\/:%+@&=]+[\w- .\/?:%+@&=]*)?)?(#(.*))?$/i
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
