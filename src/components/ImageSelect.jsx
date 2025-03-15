import { useMemo } from "react";
import useProcessedData from "../hooks/useProcessedData";
import ErrorMessage from "./ErrorMessage";
import LoadingMessage from "./LoadingMessage";

const ImageSelect = ({ setImage }) => {
  const { data, error, loading } = useProcessedData();
  const filteredData = useMemo(() => {
    return data.map(({ url, name }) => ({ url, name }));
  }, [data]);

  if (error) return <ErrorMessage message={error.message} />;
  if (loading) return <LoadingMessage />;

  const handleChange = (event) => {
    const selectedUrl = event.target.value;
    setImage(selectedUrl);
  };

  return (
    <div className="flex flex-row items-center space-x-2 mx-6">
      <label htmlFor="algorithm-select" className="text-md text-stone-800">
        Choose an algorithm:
      </label>
      <select
        id="algorithm-select"
        onChange={handleChange}
        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 text-md"
      >
        <option value="">Select an algorithm</option>
        {filteredData.map((item, index) => (
          <option key={index} value={item.url}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ImageSelect;
