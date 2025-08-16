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
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-6">
            <ErrorMessage message="Error loading data" />
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-[#fffefb] min-h-screen w-full">
        <Navbar />
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-6">
            <LoadingSpinner
              message="Loading comparison data"
              description="Preparing algorithm comparison..."
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#fffefb] min-h-screen w-full">
      <Navbar />
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-6 space-y-8">
          <CompareMessage />
          <AlgorithmComparison data={data} />
        </div>
      </div>
    </div>
  );
};

export default Compare;
