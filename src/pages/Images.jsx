import { useState } from "react";
import Navbar from "../components/Navbar";
import ImagesMessage from "../components/ImagesMessage";
import ImageSelect from "../components/ImageSelect";
import NiivueViewer from "../components/NiivueViewer";

const Images = () => {
  const [image, setImage] = useState(null);

  const updateImage = (newImage) => {
    setImage(newImage);
  };

  return (
    <div className="bg-[#fffefb] min-h-screen w-full space-y-5">
      <Navbar />
      <ImagesMessage />
      <ImageSelect setImage={updateImage} />
      {image && <NiivueViewer image={image} />}
    </div>
  );
};

export default Images;
