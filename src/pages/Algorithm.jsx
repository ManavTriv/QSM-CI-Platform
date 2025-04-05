import React from "react";
import { useLocation } from "react-router-dom";
import useProcessedData from "../hooks/useProcessedData";
import ErrorMessage from "../components/ErrorMessage";
import LoadingMessage from "../components/LoadingMessage";
import Navbar from "../components/Navbar";
import NavigateButton from "../components/NavigateButton";

const AlgorithmContent = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const algorithmName = searchParams.get("name");
  const { data, error, loading } = useProcessedData();

  if (error) return <ErrorMessage message={"Error loading data"} />;
  if (loading) return <LoadingMessage />;
  if (!algorithmName) return <ErrorMessage message={"No algorithm selected"} />;

  const algorithmData = data.find((item) => item.name === algorithmName);
  if (!algorithmData)
    return <ErrorMessage message={`Algorithm "${algorithmName}" not found`} />;

  return (
    <div className="mx-4 space-y-5">
      <NavigateButton />
      <p className="">
        {`This is ${algorithmName}, an algorithm description goes here ...`}
      </p>
    </div>
  );
};

const Algorithm = () => {
  return (
    <div className="bg-[#fffefb] min-h-screen w-full space-y-3">
      <Navbar />
      <AlgorithmContent />
    </div>
  );
};

export default Algorithm;