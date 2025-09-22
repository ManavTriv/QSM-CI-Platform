import { useState, lazy, Suspense } from "react";
import ImagesMessage from "../components/ImagesMessage";
import ImageSelect from "../components/ImageSelect";
import LoadingSpinner from "../components/LoadingSpinner";
import PageLayout from "../components/Layout/PageLayout";

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
    <PageLayout>
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
    </PageLayout>
  );
};

export default Images;
