import { initializeParse } from "../api/parseConfig";
import ensureAnonymousUser from "../utils/ensureAnonymousUser";

const useEloUpdater = () => {
  const updateElo = async (winnerId, loserId) => {
    try {
      // Initialize Parse on first data interaction (lowers npm bundle size)
      const Parse = initializeParse();

      await ensureAnonymousUser();

      const ImageClass = Parse.Object.extend("Images");

      const query = new Parse.Query(ImageClass);
      const winner = await query.get(winnerId);
      const loser = await query.get(loserId);

      const winnerUrl = winner.get("url");
      const loserUrl = loser.get("url");

      const winnerElo = winner.get("Elo") || 0;
      const loserElo = loser.get("Elo") || 0;

      await Parse.Cloud.run("elo", {
        winner: [winnerUrl, winnerElo],
        loser: [loserUrl, loserElo],
      });

      return null;
    } catch (error) {
      console.error("Elo update failed:", error);
      return error;
    }
  };

  return updateElo;
};

export default useEloUpdater;
