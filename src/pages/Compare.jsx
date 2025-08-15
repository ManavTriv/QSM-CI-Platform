import Navbar from "../components/Navbar";
import CompareMessage from "../components/CompareMessage";
import AlgorithmComparison from "../components/AlgorithmComparison";
import useProcessedData from "../hooks/useProcessedData";
import ErrorMessage from "../components/ErrorMessage";
import LoadingSpinner from "../components/LoadingSpinner";

const Compare = () => {
  const { data, error, loading } = useProcessedData();

  if (error) {
    return (
      <div className="bg-[#fffefb] min-h-screen w-full">
        <Navbar />
        <ErrorMessage message="Error loading data" />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-[#fffefb] min-h-screen w-full">
        <Navbar />
        <LoadingSpinner
          message="Loading comparison data"
          description="Preparing algorithm comparison..."
        />
      </div>
    );
  }

  return (
    <div className="bg-[#fffefb] min-h-screen w-full">
      <Navbar />
      <div className="space-y-5 mt-5">
        <CompareMessage />
        <AlgorithmComparison data={data} />
      </div>
    </div>
  );
};

export default Compare;
