import { useEffect, useState } from "react";
import fetchData from "./useFetchData";

const useProcessedData = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData()
      .then((fetchedData) => {
        const processedData = fetchedData.map((entry) => {
          const fileName = new URL(entry.url).pathname.split("/").pop();
          const name = fileName
            .replace(/\.[^/.]+$/, "")
            .replace(/_/g, " ")
            .toUpperCase();
          return { ...entry, name };
        });
        setData(processedData);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);
  return { data, error, loading };
};

export default useProcessedData;
