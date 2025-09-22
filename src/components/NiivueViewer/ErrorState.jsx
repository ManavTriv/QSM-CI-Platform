import { AlertCircle } from "lucide-react";

const ErrorState = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-center">
      <div className="text-center p-8 bg-red-50 border border-red-200 rounded-xl font-radio">
        <div className="text-red-600 mb-2">
          <AlertCircle className="w-12 h-12 mx-auto mb-4" />
        </div>
        <h3 className="text-lg font-medium text-red-800 mb-2">
          Failed to Load Image
        </h3>
        <p className="text-red-600 text-sm">
          Unable to load the medical image. Please try selecting a different
          algorithm.
        </p>
      </div>
    </div>
  );
};

export default ErrorState;
