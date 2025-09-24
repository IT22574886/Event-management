import { useState, useEffect } from "react";

const SearchFilter = ({ events = [], onFilter }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Ensure events is always an array
  const safeEvents = Array.isArray(events) ? events : [];

  // Filter events whenever searchTerm or statusFilter changes
  useEffect(() => {
    let filtered = safeEvents;
    
    // Filter by search term (title)
    if (searchTerm.trim()) {
      filtered = filtered.filter((event) =>
        event.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by status
    if (statusFilter) {
      filtered = filtered.filter((event) => event.status === statusFilter);
    }
    
    onFilter?.(filtered);
  }, [searchTerm, statusFilter, safeEvents, onFilter]);

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("");
  };

  const statusOptions = [
    { value: "", label: "All Status", count: safeEvents.length },
    { value: "draft", label: "Draft", count: safeEvents.filter(e => e.status === "draft").length },
    { value: "published", label: "Published", count: safeEvents.filter(e => e.status === "published").length },
    { value: "cancelled", label: "Cancelled", count: safeEvents.filter(e => e.status === "cancelled").length },
    { value: "completed", label: "Completed", count: safeEvents.filter(e => e.status === "completed").length }
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        {/* Search Input */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="🔍 Search events by title or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Status Filter */}
        <div className="min-w-[200px]">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label} {option.count > 0 && `(${option.count})`}
              </option>
            ))}
          </select>
        </div>

        {/* Clear Filters Button */}
        {(searchTerm || statusFilter) && (
          <button
            onClick={clearFilters}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Clear Filters
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchFilter;
