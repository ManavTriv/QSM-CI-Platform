import Navbar from "../components/Navbar";
import ResultTable from "../components/ResultTable";
import OverviewMessage from "../components/OverviewMessage";

const Overview = () => {
  return (
    <div className="bg-[#fffefb] min-h-screen w-full">
      <Navbar />
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-6 space-y-8">
          <OverviewMessage />
          <ResultTable />
        </div>
      </div>
    </div>
  );
};

export default Overview;
