import { initializeParse } from "../api/parseConfig";
import ensureAnonymousUser from "../utils/ensureAnonymousUser";

const useEloUpdater = () => {
  const K_FACTOR = 32;

  const calculateExpectedScore = (playerRating, opponentRating) => {
    return 1 / (1 + Math.pow(10, (opponentRating - playerRating) / 400));
  };

  const calculateNewRating = (currentRating, expectedScore, actualScore) => {
    return Math.round(currentRating + K_FACTOR * (actualScore - expectedScore));
  };

  const updateElo = async (winnerId, loserId) => {
    try {
      const Parse = initializeParse();

      await ensureAnonymousUser();

      const ImageClass = Parse.Object.extend("Images");

      const query = new Parse.Query(ImageClass);
      const winner = await query.get(winnerId);
      const loser = await query.get(loserId);

      const winnerUrl = winner.get("url");
      const loserUrl = loser.get("url");

      const winnerElo = winner.get("Elo") || 1500;
      const loserElo = loser.get("Elo") || 1500;

      const winnerExpectedScore = calculateExpectedScore(winnerElo, loserElo);
      const loserExpectedScore = calculateExpectedScore(loserElo, winnerElo);

      const newWinnerElo = calculateNewRating(
        winnerElo,
        winnerExpectedScore,
        1
      );
      const newLoserElo = calculateNewRating(loserElo, loserExpectedScore, 0);

      winner.set("Elo", newWinnerElo);
      await winner.save();

      loser.set("Elo", newLoserElo);
      await loser.save();

      console.log(
        `ELO Updated - Winner: ${winnerElo} → ${newWinnerElo} (+${
          newWinnerElo - winnerElo
        })`
      );
      console.log(
        `ELO Updated - Loser: ${loserElo} → ${newLoserElo} (${
          newLoserElo - loserElo
        })`
      );

      return {
        winner: {
          id: winnerId,
          oldElo: winnerElo,
          newElo: newWinnerElo,
          change: newWinnerElo - winnerElo,
        },
        loser: {
          id: loserId,
          oldElo: loserElo,
          newElo: newLoserElo,
          change: newLoserElo - loserElo,
        },
      };
    } catch (error) {
      console.error("Elo update failed:", error);
      return error;
    }
  };

  return updateElo;
};

export default useEloUpdater;
