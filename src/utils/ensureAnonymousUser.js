import Parse, { AnonymousUtils } from "../api/parseConfig";

const ensureAnonymousUser = async () => {
  if (!Parse.User.current()) {
    try {
      await AnonymousUtils.logIn();
    } catch (err) {
      console.error("Failed to log in anonymously:", err);
    }
  }
};

export default ensureAnonymousUser;
