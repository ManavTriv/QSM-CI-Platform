import Navbar from "../components/Navbar";
import ResultTable from "../components/ResultTable";
import OverviewMessage from "../components/OverviewMessage";

const Overview = () => {
  return (
    <div className="bg-[#fffefb] min-h-screen w-full space-y-5">
      <Navbar />
      <OverviewMessage />
      <ResultTable />
    </div>
  );
};

export default Overview;
