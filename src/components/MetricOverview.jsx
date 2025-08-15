import { Info, FileText, BarChart } from "lucide-react";
import metricDescriptions from "../data/metricDescriptions";

const MetricOverview = ({ metric }) => {
  const description =
    metricDescriptions[metric] ||
    "No description is available for this metric.";

  return (
    <div>
      <div className="bg-white rounded-2xl shadow-md border border-indigo-100 p-6 font-radio">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
            <BarChart className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-stone-800">
              {metric} Analysis
            </h1>
            <p className="text-sm text-stone-600">
              Metric overview and performance insights
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-indigo-50 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Info className="mt-0.5 h-5 w-5 text-indigo-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-stone-800 mb-1">
                  About {metric}
                </h3>
                <p className="text-sm text-stone-700 leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <FileText className="mt-0.5 h-5 w-5 text-stone-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-stone-800 mb-1">
                    Measurement
                  </h3>
                  <p className="text-sm text-stone-600">
                    Quantifies algorithm performance using standardized
                    evaluation criteria
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <BarChart className="mt-0.5 h-5 w-5 text-stone-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-stone-800 mb-1">
                    Visualization
                  </h3>
                  <p className="text-sm text-stone-600">
                    Interactive scatter plot comparing performance across all
                    algorithms
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricOverview;
