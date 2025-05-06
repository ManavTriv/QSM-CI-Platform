import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Images from "../pages/Images";
import Compare from "../pages/Compare";
import Metric from "../pages/Metric";
import Algorithm from "../pages/Algorithm";
import Contribute from "../pages/Contribute";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/images" element={<Images />} />
      <Route path="/compare" element={<Compare />} />
      <Route path="/metric" element={<Metric />} />
      <Route path="/algorithm" element={<Algorithm />} />
      <Route path="/contribute" element={<Contribute />} />
    </Routes>
  );
};

export default AppRouter;
