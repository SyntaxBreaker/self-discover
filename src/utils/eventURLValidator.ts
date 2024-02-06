import { EVENT_INVALID_URL } from "./constants";

const validateEventURL = (url: string) => {
  const urlRegex = new RegExp(
    /^http(s)?:\/\/((\d+\.\d+\.\d+\.\d+)|(([\w-]+\.)+([a-z,A-Z][\w-]*)))(:[1-9][0-9]*)?(\/([\w-.\/:%+@&=]+[\w- .\/?:%+@&=]*)?)?(#(.*))?$/i
  );

  if (urlRegex.test(url)) {
    return {
      isValid: true,
      data: null,
    };
  } else {
    return {
      isValid: false,
      data: {
        message: EVENT_INVALID_URL,
        details: "The provided URL does not match the expected format",
        hint: "Please make sure the URL follows the correct syntax.",
        code: "E001",
      },
    };
  }
};

export default validateEventURL;
