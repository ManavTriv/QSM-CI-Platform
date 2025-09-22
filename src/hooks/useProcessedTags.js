import { useMemo } from "react";
import {
  processRawTags,
  processAllAlgorithmTags,
  createAlgorithmTagProcessor,
} from "../utils/tagProcessingUtils";

const useProcessedTags = (rawTags = [], data = []) => {
  const processedTags = useMemo(() => processRawTags(rawTags), [rawTags]);

  const allProcessedTags = useMemo(() => processAllAlgorithmTags(data), [data]);

  const getAlgorithmProcessedTags = useMemo(
    () => createAlgorithmTagProcessor(),
    []
  );

  return {
    processedTags,
    allProcessedTags,
    getAlgorithmProcessedTags,
  };
};

export default useProcessedTags;
