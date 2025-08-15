import Navbar from "../components/Navbar";
import HomeMessage from "../components/HomeMessage";

const Home = () => {
  return (
    <div className="bg-[#fffefb] min-h-screen w-full">
      <Navbar />
      <HomeMessage />
    </div>
  );
};

export default Home;
