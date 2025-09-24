import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EventList from "../components/EventList";
import SearchFilter from "../components/SearchFilter";
import { getEvents } from "../services/eventService";

const EventListPage = () => {
  const navigate = useNavigate();
  const [allEvents, setAllEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch events on component mount
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        console.log("🔄 Fetching events from API...");
        const response = await getEvents();
        console.log("✅ API Response:", response);
        console.log("📊 Response Data:", response.data);
        
        // Extract data from axios response
        const eventsArray = Array.isArray(response.data) ? response.data : [];
        console.log("� Events Array:", eventsArray);
        
        setAllEvents(eventsArray);
        setFilteredEvents(eventsArray);
      } catch (error) {
        console.error("❌ Error fetching events:", error);
        console.error("❌ Error details:", error.response?.data || error.message);
        // Set empty arrays on error
        setAllEvents([]);
        setFilteredEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleAddNewEvent = () => {
    navigate("/create");
  };

  const handleFilter = (filtered) => {
    setFilteredEvents(filtered);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Loading events...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header with title and Add New Event button */}
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          Event Management
        </h1>
        <button
          onClick={handleAddNewEvent}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          ✨ Add New Event
        </button>
      </div>

      {/* Search and Filter Section */}
      <SearchFilter events={allEvents} onFilter={handleFilter} />

      {/* Events section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-700">
            Events ({filteredEvents.length})
          </h2>
        </div>
        <EventList events={filteredEvents} />
      </div>
    </div>
  );
};

export default EventListPage;
