import Navbar from "../components/Navbar";
import ResultTable from "../components/ResultTable";

const Home = () => {
  return (
    <>
      <div className="bg-[#fffefb] min-h-screen w-full space-y-3">
        <Navbar />
        <div>
          <p className="mx-4 p-2">
            Description of QSM-CI and Web Interface purpose
          </p>
        </div>
        <ResultTable />
      </div>
    </>
  );
};

export default Home;
