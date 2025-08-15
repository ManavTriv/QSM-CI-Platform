import Parse from "parse/dist/parse.min.js";

let isInitialized = false;

export const initializeParse = () => {
  if (!isInitialized) {
    Parse.initialize(
      import.meta.env.VITE_PARSE_APP_ID,
      import.meta.env.VITE_PARSE_JS_KEY
    );
    Parse.serverURL = "https://parseapi.back4app.com/";
    isInitialized = true;
  }
  return Parse;
};

export const AnonymousUtils = Parse.AnonymousUtils;

export default Parse;
