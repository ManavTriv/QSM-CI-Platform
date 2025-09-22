// Legacy compatibility - import from centralized metrics config
import { getMetricDescriptions } from "../config/metrics";

const metricDescriptions = getMetricDescriptions();

export default metricDescriptions;
