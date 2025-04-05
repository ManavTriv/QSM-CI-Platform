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
      <div className="bg-[#fffefb] min-h-screen w-full space-y-3">
        <Navbar />
        <div>
          <p className="mx-4 p-2">Description of image viewer</p>
        </div>
        <ImageSelect setImage={updateImage} />
        {image && <NiivueViewer image={image} />}
      </div>
    </>
  );
};

export default Images;
