import { useLocation } from "react-router-dom";
import useProcessedData from "../hooks/useProcessedData";
import ErrorMessage from "../components/ErrorMessage";
import LoadingSpinner from "../components/LoadingSpinner";
import Navbar from "../components/Navbar";
import NavigateButton from "../components/NavigateButton";
import algorithmInfo from "../data/algorithmInfo";

const AlgorithmContent = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const algorithmName = searchParams.get("name");
  const { data, error, loading } = useProcessedData();

  if (error) return <ErrorMessage message="Error loading data" />;
  if (loading)
    return (
      <LoadingSpinner
        message="Loading algorithm data"
        description="Fetching algorithm information..."
      />
    );
  if (!algorithmName) return <ErrorMessage message="No algorithm selected" />;

  const algorithmData = data.find((item) => item.name === algorithmName);
  if (!algorithmData)
    return <ErrorMessage message={`Algorithm "${algorithmName}" not found`} />;

  const { description, tags } = algorithmInfo[algorithmName] || {};

  return (
    <div className="space-y-8">
      <div>
        <NavigateButton to="/" label="HOME" />
      </div>
      <div className="space-y-3">
        <div className="space-y-1">
          <h1 className="font-radio text-indigo-400 font-semibold ">
            {algorithmName}
          </h1>
          {tags && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="font-radio px-2 py-1 text-[0.68rem] font-medium bg-indigo-100 text-stone-800 rounded-full"
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
        <div>[IMAGE OF ALGORITHM]</div>
      </div>
    </div>
  );
};

const Algorithm = () => {
  return (
    <div className="bg-[#fffefb] min-h-screen w-full">
      <Navbar />
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-6">
          <AlgorithmContent />
        </div>
      </div>
    </div>
  );
};

export default Algorithm;
