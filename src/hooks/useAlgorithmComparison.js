import { useState, useEffect, useRef, useCallback } from "react";

const useAlgorithmComparison = (data) => {
  const [currentPair, setCurrentPair] = useState([]);
  const [usedIndices, setUsedIndices] = useState([]);
  const [previousPair, setPreviousPair] = useState([]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);
  const [showNames, setShowNames] = useState(false);
  const initializedRef = useRef(false);

  const generateNewPair = useCallback(() => {
    if (!data || data.length < 2) return;

    let availableIndices = data
      .map((_, index) => index)
      .filter((index) => !usedIndices.includes(index));

    if (availableIndices.length < 2) {
      setUsedIndices([]);
      availableIndices = data.map((_, index) => index);
    }

    let firstIndex, secondIndex;
    let pairIsNew = false;
    let maxTries = 20;

    while (!pairIsNew && maxTries-- > 0) {
      firstIndex =
        availableIndices[Math.floor(Math.random() * availableIndices.length)];
      do {
        secondIndex =
          availableIndices[Math.floor(Math.random() * availableIndices.length)];
      } while (secondIndex === firstIndex);

      const pair = [firstIndex, secondIndex].sort();
      const prev = [...previousPair].sort();
      pairIsNew = pair[0] !== prev[0] || pair[1] !== prev[1];
    }

    setCurrentPair([data[firstIndex], data[secondIndex]]);
    setPreviousPair([firstIndex, secondIndex]);
    setUsedIndices((prev) => [...prev, firstIndex, secondIndex]);
    setSelectedAlgorithm(null);
    setShowNames(false);
  }, [data, usedIndices, previousPair]);

  useEffect(() => {
    if (initializedRef.current) return;
    if (data && data.length >= 2) {
      generateNewPair();
      initializedRef.current = true;
    }
  }, [data, generateNewPair]);

  const handleNext = () => {
    generateNewPair();
  };

  const handleSelect = (algorithm) => {
    setSelectedAlgorithm(algorithm);
    setShowNames(true);
  };

  return {
    currentPair,
    selectedAlgorithm,
    showNames,
    handleNext,
    handleSelect,
  };
};

export default useAlgorithmComparison;
