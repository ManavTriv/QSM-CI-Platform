import { useState, lazy, Suspense } from "react";
import Navbar from "../components/Navbar";
import ImagesMessage from "../components/ImagesMessage";
import ImageSelect from "../components/ImageSelect";
import LoadingSpinner from "../components/LoadingSpinner";

const NiivueViewer = lazy(() =>
  import("../components/NiivueViewer/NiivueViewer")
);

const Images = () => {
  const [image, setImage] = useState(null);
  const [algorithmName, setAlgorithmName] = useState(null);

  const updateImage = (newImage, name) => {
    setImage(newImage);
    setAlgorithmName(name);
  };

  return (
    <div className="bg-[#fffefb] min-h-screen w-full">
      <Navbar />
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-6 space-y-8">
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
              <NiivueViewer image={image} algorithmName={algorithmName} />
            </Suspense>
          )}
        </div>
      </div>
    </div>
  );
};

export default Images;
