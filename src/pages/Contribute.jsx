import Navbar from "../components/Navbar";
import ContributeMessage from "../components/ContributeMessage";

const Contribute = () => {
  return (
    <div className="bg-[#fffefb] min-h-screen w-full">
      <Navbar />
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-6">
          <ContributeMessage />
        </div>
      </div>
    </div>
  );
};

export default Contribute;
