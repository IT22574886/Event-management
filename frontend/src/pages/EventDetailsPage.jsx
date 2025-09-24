import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getEventById, deleteEvent } from "../services/eventService";

const EventDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await getEventById(id);
        setEvent(response.data);
      } catch (error) {
        console.error("Failed to fetch event", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await deleteEvent(id);
        navigate("/");
      } catch (error) {
        console.error("Failed to delete event", error);
      }
    }
  };

  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex justify-center items-center">
        <div className="text-white text-xl">Loading event details...</div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-900 flex justify-center items-center">
        <div className="text-white text-xl">Event not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/")}
            className="text-blue-400 hover:text-blue-300 mb-4 flex items-center transition-colors"
          >
            ← Back to Events
          </button>
          <h1 className="text-3xl font-bold text-white mb-2">
            Event Details
          </h1>
        </div>

        {/* Event Details Card */}
        <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 overflow-hidden">
          {/* Event Header */}
          <div className="p-6 border-b border-gray-700">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  {event.title}
                </h2>
                <div className="flex items-center gap-4 text-gray-300">
                  <span className="flex items-center">
                    📅 {new Date(event.date).toLocaleDateString()}
                  </span>
                  <span className="flex items-center">
                    📍 {event.venue}
                  </span>
                  <span className="flex items-center">
                    👥 {event.capacity} capacity
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    event.status === "published"
                      ? "bg-green-100 text-green-700"
                      : event.status === "cancelled"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {event.status}
                </span>
              </div>
            </div>
          </div>

          {/* Event Body */}
          <div className="p-6">
            <h3 className="text-lg font-semibold text-white mb-3">
              Description
            </h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              {event.description || "No description provided."}
            </p>

            {/* Additional Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-700 p-4 rounded-lg">
                <h4 className="font-semibold text-white mb-2">Event Date</h4>
                <p className="text-gray-300">
                  {new Date(event.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg">
                <h4 className="font-semibold text-white mb-2">Venue</h4>
                <p className="text-gray-300">{event.venue}</p>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg">
                <h4 className="font-semibold text-white mb-2">Capacity</h4>
                <p className="text-gray-300">{event.capacity} attendees</p>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg">
                <h4 className="font-semibold text-white mb-2">Status</h4>
                <p className="text-gray-300 capitalize">{event.status}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleEdit}
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-lg transition-colors font-medium"
              >
                Edit Event
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors font-medium"
              >
                Delete Event
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;
