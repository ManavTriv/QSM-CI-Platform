import { Loader2 } from "lucide-react";

const LoadingMessage = () => (
  <div className="flex justify-center p-4">
    <div className="inline-flex items-center max-w-md p-4 space-x-3 text-stone-800 bg-indigo-50 border border-indigo-100 rounded-lg shadow-sm">
      <Loader2 className="w-5 h-5 text-indigo-800 animate-spin shrink-0" />
      <div>
        <p className="font-medium">Loading</p>
        <p className="text-sm text-stone-600">
          Please wait while we fetch the data...
        </p>
      </div>
    </div>
  </div>
);

export default LoadingMessage;
