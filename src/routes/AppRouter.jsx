import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import LoadingMessage from "../components/LoadingMessage";
import Home from "../pages/Home";
import Overview from "../pages/Overview";
import Images from "../pages/Images";
import Metric from "../pages/Metric";
import Algorithm from "../pages/Algorithm";
import Contribute from "../pages/Contribute";

// Lazy load heavy components (lowers npm bundle size)
const Compare = lazy(() => import("../pages/Compare"));

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/overview" element={<Overview />} />
      <Route path="/images" element={<Images />} />
      <Route 
        path="/compare" 
        element={
          <Suspense fallback={<LoadingMessage />}>
            <Compare />
          </Suspense>
        } 
      />
      <Route path="/metric" element={<Metric />} />
      <Route path="/algorithm" element={<Algorithm />} />
      <Route path="/contribute" element={<Contribute />} />
    </Routes>
  );
};

export default AppRouter;
