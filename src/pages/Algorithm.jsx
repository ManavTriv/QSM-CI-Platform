import React from "react";
import { useLocation } from "react-router-dom";
import useProcessedData from "../hooks/useProcessedData";
import ErrorMessage from "../components/ErrorMessage";
import LoadingMessage from "../components/LoadingMessage";
import Navbar from "../components/Navbar";
import NavigateButton from "../components/NavigateButton";
import algorithmInfo from "../data/algorithmInfo";

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

  const { description, tags } = algorithmInfo[algorithmName] || {};

  return (
    <div className="space-y-5">
      <div className="px-2 mx-4">
        <NavigateButton to="/" label="HOME" />
      </div>
      <div className="px-2 mx-4 overflow-x-auto space-y-3">
        <div className="space-y-1">
          <h1 className="font-radio text-indigo-400 font-semibold text-lg">
            {algorithmName}
          </h1>
          {tags && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="font-radio px-2 py-1 text-xs font-medium bg-indigo-100 text-stone-800 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        {description && (
          <p className="font-radio text-[0.9375rem] text-stone-800">
            {description}
          </p>
        )}
      </div>
      <div>
        <div className="px-2 mx-4">[IMAGE OF ALGORITHM]</div>
      </div>
    </div>
  );
};

const Algorithm = () => {
  return (
    <div className="bg-[#fffefb] min-h-screen w-full space-y-5">
      <Navbar />
      <AlgorithmContent />
    </div>
  );
};

export default Algorithm;
