import Parse from "../api/parseConfig";
import ensureAnonymousUser from "../utils/ensureAnonymousUser";

const useEloUpdater = () => {
  const updateElo = async (objectId, delta) => {
    try {
      await ensureAnonymousUser();

      const ImageClass = Parse.Object.extend("Images");
      const query = new Parse.Query(ImageClass);
      const imageObject = await query.get(objectId);
      const currentElo = imageObject.get("Elo") || 0;
      await imageObject.save();
      console.log(
        `Updated Elo for ${objectId}: ${currentElo} → ${currentElo + delta}`
      );
      return null;
    } catch (error) {
      return error;
    }
  };

  return updateElo;
};

export default useEloUpdater;
