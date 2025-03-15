import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <>
      <div className="bg-[#fffefb] min-h-screen w-full space-y-3">
        <Navbar />
        <div>
          <p className="mx-4 p-2">
            Will contain image comparison for the ELO
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
