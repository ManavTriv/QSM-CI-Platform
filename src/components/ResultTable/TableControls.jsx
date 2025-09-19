import TableSearch from "./TableSearch";
import TagFilter from "./TagFilter";

const TableControls = ({
  data,
  searchTerm,
  selectedTags,
  onSearchChange,
  onTagsChange,
}) => {
  return (
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
        />
      </div>
    </div>
  );
};

export default TableControls;
