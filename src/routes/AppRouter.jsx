import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Images from "../pages/Images"
import Compare from "../pages/Compare"

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/images" element={<Images />} />
      <Route path="/compare" element={<Compare />} />
    </Routes>
  );
};

export default AppRouter;
