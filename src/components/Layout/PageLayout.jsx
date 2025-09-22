import Navbar from "../Navbar";

const PageLayout = ({ children }) => {
  return (
    <div className="bg-[#fffefb] min-h-screen w-full">
      <Navbar />
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-6 space-y-8">{children}</div>
      </div>
    </div>
  );
};

export default PageLayout;
