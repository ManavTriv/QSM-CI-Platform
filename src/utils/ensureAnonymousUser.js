import { initializeParse, AnonymousUtils } from "../api/parseConfig";

const ensureAnonymousUser = async () => {
  // Initialise parse only if needed
  const Parse = initializeParse();
  
  if (!Parse.User.current()) {
    try {
      await AnonymousUtils.logIn();
    } catch (err) {
      console.error("Failed to log in anonymously:", err);
    }
  }
};

export default ensureAnonymousUser;
