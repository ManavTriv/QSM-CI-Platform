import { memo } from "react";
import { useNavigate } from "react-router-dom";
import useProcessedData from "../../hooks/useProcessedData";
import useTableData from "../../hooks/useTableData";
import ErrorMessage from "../ErrorMessage";
import LoadingSpinner from "../LoadingSpinner";
import TableSearch from "./TableSearch";
import TagFilter from "../TagFilter";
import Table from "./Table";

const TableControls = ({
  data,
  searchTerm,
  selectedTags,
  onSearchChange,
  onTagsChange,
}) => (
  <div className="flex flex-col sm:flex-row gap-3">
    <div className="flex-1">
      <TableSearch
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        placeholder="Search algorithms by name..."
      />
    </div>
    <div className="flex-shrink-0">
      <TagFilter
        data={data}
        selectedTags={selectedTags}
        onTagsChange={onTagsChange}
        dropdownPosition="responsive"
      />
    </div>
  </div>
);

const EmptyStateMessages = ({
  searchTerm = "",
  selectedTags = [],
  onClearSearch,
}) => {
  if (!searchTerm.trim() && selectedTags.length === 0) return null;

  const getMessage = () => {
    const hasSearch = searchTerm.trim();
    const hasTags = selectedTags.length > 0;

    if (hasSearch && hasTags) {
      return `No algorithms found matching "${searchTerm}" with selected tags`;
    }
    if (hasSearch) {
      return `No algorithms found matching "${searchTerm}"`;
    }
    if (hasTags) {
      return "No algorithms found with selected tags";
    }
    return "No algorithms found";
  };

  return (
    <div className="text-center py-8 px-4">
      <p className="text-stone-600 font-radio mb-4">{getMessage()}</p>
      {searchTerm.trim() && onClearSearch && (
        <button
          onClick={onClearSearch}
          className="text-indigo-400 hover:text-indigo-600 font-radio text-sm cursor-pointer transition-colors"
        >
          Clear search
        </button>
      )}
    </div>
  );
};

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
  } = useTableData(data);

  const handleMetricClick = (metric) => {
    navigate(`/metric?metric=${metric}`);
  };

  const handleClearSearch = () => setSearchTerm("");

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  if (loading) {
    return (
      <LoadingSpinner
        message="Loading results"
        description="Fetching algorithm data..."
      />
    );
  }

  const hasResults = sortedData && sortedData.length > 0;

  return (
    <div className="space-y-4">
      <TableControls
        data={data}
        searchTerm={searchTerm}
        selectedTags={selectedTags}
        onSearchChange={setSearchTerm}
        onTagsChange={setSelectedTags}
      />

      {hasResults ? (
        <Table
          sortConfig={sortConfig}
          sortedData={sortedData}
          onRequestSort={requestSort}
          onMetricClick={handleMetricClick}
          navigate={navigate}
        />
      ) : (
        <EmptyStateMessages
          searchTerm={searchTerm}
          selectedTags={selectedTags}
          onClearSearch={handleClearSearch}
        />
      )}
    </div>
  );
};

export default memo(ResultTable);
