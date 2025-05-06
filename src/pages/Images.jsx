import { useState } from "react";
import Navbar from "../components/Navbar";
import ImageSelect from "../components/ImageSelect";
import NiivueViewer from "../components/NiivueViewer";

const Images = () => {
  const [image, setImage] = useState(null);

  const updateImage = (newImage) => {
    setImage(newImage);
  };

  return (
    <>
      <div className="bg-[#fffefb] min-h-screen w-full space-y-5">
        <Navbar />
        <div className="px-2 mx-4 overflow-x-auto space-y-3">
          <h1 className="font-radio text-indigo-400 font-semibold">
            QSM Medical Image Viewer
          </h1>
          <p className="font-radio text-[0.9375rem]">
            Select an algorithm to view its susceptibility map
          </p>
        </div>
        <ImageSelect setImage={updateImage} />
        {image && <NiivueViewer image={image} />}
      </div>
    </>
  );
};

export default Images;
