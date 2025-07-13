import Navbar from "../components/Navbar";
import HomeMessage from "../components/HomeMessage";

const Home = () => {
  return (
    <>
      <div className="bg-[#fffefb] min-h-screen w-full space-y-5">
        <Navbar />
        <HomeMessage />
      </div>
    </>
  );
};

export default Home;