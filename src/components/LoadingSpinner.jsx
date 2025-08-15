import { Loader2 } from "lucide-react";

const LoadingSpinner = ({
  message = "Loading",
  description = "Please wait while we fetch the data...",
  size = "default",
}) => {
  const sizeClasses = {
    small: "w-4 h-4",
    default: "w-5 h-5",
    large: "w-8 h-8",
  };

  return (
    <div className="flex justify-center p-4">
      <div className="inline-flex items-center max-w-md p-4 space-x-3 text-stone-800 bg-indigo-50 border border-indigo-100 rounded-lg shadow-sm font-radio">
        <Loader2
          className={`${sizeClasses[size]} text-indigo-800 animate-spin shrink-0`}
        />
        <div>
          <p className="font-medium">{message}</p>
          {description && (
            <p className="text-sm text-stone-600">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
