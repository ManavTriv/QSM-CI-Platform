import { useState, lazy, Suspense } from "react";
import Navbar from "../components/Navbar";
import ImagesMessage from "../components/ImagesMessage";
import ImageSelect from "../components/ImageSelect";
import LoadingSpinner from "../components/LoadingSpinner";

// Lazy load the heavy 3D viewer component (lowers npm bundle size)
const NiivueViewer = lazy(() => import("../components/NiivueViewer"));

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
      {image && (
        <Suspense
          fallback={
            <LoadingSpinner
              message="Loading 3D viewer"
              description="Initializing medical image viewer..."
            />
          }
        >
          <NiivueViewer image={image} />
        </Suspense>
      )}
    </div>
  );
};

export default Images;
