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
          try {
            const fileName = new URL(entry.url).pathname.split("/").pop();
            const name = decodeURIComponent(fileName)
              .replace(/\.[^/.]+$/, "")
              .replace(/_/g, " ")
              .toUpperCase();
            return { ...entry, name };
          } catch (urlError) {
            console.warn("Invalid URL for entry:", entry.url, urlError);
            const fallbackName = entry.objectId || "Unknown Algorithm";
            return { ...entry, name: fallbackName };
          }
        });
        setData(processedData);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);
  return { data, error, loading };
};

export default useProcessedData;
