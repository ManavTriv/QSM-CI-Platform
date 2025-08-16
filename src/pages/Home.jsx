import Navbar from "../components/Navbar";
import HomeMessage from "../components/HomeMessage";

const Home = () => {
  return (
    <div className="bg-[#fffefb] min-h-screen w-full">
      <Navbar />
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-6 space-y-8">
          <HomeMessage />
        </div>
      </div>
    </div>
  );
};

export default Home;
