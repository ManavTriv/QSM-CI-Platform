import { TriangleAlert } from "lucide-react";

const ErrorMessage = ({ message }) => (
  <div className="flex justify-center p-4">
    <div className="inline-flex items-center max-w-md p-4 space-x-3 text-red-800 bg-red-50 border border-red-200 rounded-lg shadow-sm">
      <TriangleAlert className="w-6 h-6 text-red-500 shrink-0" />
      <div>
        <p className="font-medium">Error</p>
        <p className="text-sm text-red-700">{message}</p>
      </div>
    </div>
  </div>
);

export default ErrorMessage;
