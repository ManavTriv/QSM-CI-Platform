import Navbar from "../components/Navbar";
import ResultTable from "../components/ResultTable";
import HomeOverview from "../components/HomeOverview";

const Home = () => {
  return (
    <>
      <div className="bg-[#fffefb] min-h-screen w-full space-y-5">
        <Navbar />
        <HomeOverview />
        <ResultTable />
      </div>
    </>
  );
};

export default Home;
