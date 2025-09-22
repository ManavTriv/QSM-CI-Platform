import { FileText } from "lucide-react";

const AlgorithmDescription = ({ description }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-3">
      <div className="flex items-start gap-3">
        <FileText className="h-4 w-4 text-indigo-600 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="font-semibold text-stone-800 mb-1 text-base">
            Description
          </h3>
          <div className="text-sm text-stone-700 leading-relaxed">
            {description && description.trim()
              ? description
              : "No description is available for this algorithm."}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmDescription;
