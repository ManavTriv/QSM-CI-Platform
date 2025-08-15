import Navbar from "./Navbar";
import LoadingSpinner from "./LoadingSpinner";

const PageLoadingFallback = ({
  message = "Loading",
  description = "Please wait...",
}) => {
  return (
    <div className="bg-[#fffefb] min-h-screen w-full">
      <Navbar />
      <LoadingSpinner message={message} description={description} />
    </div>
  );
};

export default PageLoadingFallback;
