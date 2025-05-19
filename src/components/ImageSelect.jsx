import { useMemo, useState } from "react";
import useProcessedData from "../hooks/useProcessedData";
import ErrorMessage from "./ErrorMessage";
import LoadingMessage from "./LoadingMessage";

const ImageSelect = ({ setImage }) => {
  const { data, error, loading } = useProcessedData();
  const [selectedUrl, setSelectedUrl] = useState(null);

  console.log("ImageSelect data", data);

  const filteredData = useMemo(() => {
    return data.map(({ url, name }) => ({ url, name }));
  }, [data]);

  if (error) return <ErrorMessage message={error.message} />;
  if (loading) return <LoadingMessage />;


  const handleSelect = (url) => {
    if (selectedUrl === url) {
      setSelectedUrl(null);
      setImage(null);
    } else {
      setSelectedUrl(url);
      setImage(url);
    }
  };

  return (
    <div className="px-6">
      <div className="flex overflow-x-auto space-x-2">
        {filteredData.map((item, index) => (
          <button
            key={index}
            onClick={() => handleSelect(item.url)}
            className={`flex-shrink-0 whitespace-nowrap px-4 py-2 rounded-full font-radio text-sm transition-all
              ${
                selectedUrl === item.url
                  ? "bg-indigo-400 text-white"
                  : "bg-gray-100 text-stone-800 hover:bg-indigo-100 hover:text-indigo-500"
              } 
              hover:cursor-pointer`}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageSelect;
