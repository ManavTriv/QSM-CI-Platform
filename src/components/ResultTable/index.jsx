import { memo } from "react";
import { useNavigate } from "react-router-dom";
import useProcessedData from "../../hooks/useProcessedData";
import useTableData from "../../hooks/useTableData";
import ErrorMessage from "../ErrorMessage";
import LoadingSpinner from "../LoadingSpinner";
import TableControls from "./TableControls";
import Table from "./Table";
import EmptyStateMessages from "./EmptyStateMessages";

const ResultTable = () => {
  const { data, error, loading } = useProcessedData();
  const navigate = useNavigate();

  const {
    sortConfig,
    searchTerm,
    selectedTags,
    sortedData,
    requestSort,
    setSearchTerm,
    setSelectedTags,
    clearFilters,
  } = useTableData(data);

  const handleMetricClick = (metric) => {
    navigate(`/metric?metric=${metric}`);
  };

  const handleClearSearch = () => setSearchTerm("");
  const handleClearTags = () => setSelectedTags([]);

  if (error) return <ErrorMessage message={error.message} />;
  if (loading) {
    return (
      <LoadingSpinner
        message="Loading results"
        description="Fetching algorithm data..."
      />
    );
  }

  return (
    <div className="space-y-4">
      <TableControls
        data={data}
        searchTerm={searchTerm}
        selectedTags={selectedTags}
        onSearchChange={setSearchTerm}
        onTagsChange={setSelectedTags}
      />

      <Table
        sortConfig={sortConfig}
        sortedData={sortedData}
        onRequestSort={requestSort}
        onMetricClick={handleMetricClick}
        navigate={navigate}
      />

      <EmptyStateMessages
        searchTerm={searchTerm}
        selectedTags={selectedTags}
        onClearSearch={handleClearSearch}
        onClearTags={handleClearTags}
      />
    </div>
  );
};

export default memo(ResultTable);
