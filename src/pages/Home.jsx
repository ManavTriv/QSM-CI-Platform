import { useEffect, useState } from "react";
import NiivueTest from "../components/NiivueTest";
import fetchData from "../hooks/useFetchData";

const Home = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchData().then(setImages);
  }, []);

  return (
    <>
      <p className="text-7xl">QSM-CI</p>
      <NiivueTest />
    </>
  );
};

export default Home;
