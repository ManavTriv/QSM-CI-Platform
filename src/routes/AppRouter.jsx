import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Images from "../pages/Images"

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/images" element={<Images />} />
    </Routes>
  );
};

export default AppRouter;
