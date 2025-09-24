import { useEffect, useState } from "react";
import { deleteEvent } from "../services/eventService";
import { Link } from "react-router-dom";

const EventList = ({ events = [] }) => {
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await deleteEvent(id);
        // You might want to refresh the events in the parent component
        window.location.reload(); // Simple refresh - can be improved
      } catch (error) {
        console.error("Failed to delete event:", error);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {events.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-400 text-lg">No events found</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-gray-800 rounded-xl shadow-lg border border-gray-700">
          <table className="min-w-full text-left">
            <thead className="bg-gray-700 border-b border-gray-600">
              <tr>
                <th className="px-4 py-3 text-gray-200 font-semibold">Title</th>
                <th className="px-4 py-3 text-gray-200 font-semibold">Date</th>
                <th className="px-4 py-3 text-gray-200 font-semibold">Venue</th>
                <th className="px-4 py-3 text-gray-200 font-semibold">Capacity</th>
                <th className="px-4 py-3 text-gray-200 font-semibold">Status</th>
                <th className="px-4 py-3 text-gray-200 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
            {events.length > 0 ? (
              events.map((event) => (
                <tr key={event._id} className="border-t border-gray-700 hover:bg-gray-750 transition-colors duration-150">
                  <td className="px-4 py-3 text-gray-200">{event.title}</td>
                  <td className="px-4 py-3 text-gray-300">
                    {new Date(event.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-gray-300">{event.venue}</td>
                  <td className="px-4 py-3 text-gray-300">{event.capacity}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        event.status === "published"
                          ? "bg-green-900/50 text-green-400 border border-green-800"
                          : event.status === "cancelled"
                          ? "bg-red-900/50 text-red-400 border border-red-800"
                          : "bg-yellow-900/50 text-yellow-400 border border-yellow-800"
                      }`}
                    >
                      {event.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 flex gap-2">
                    <Link
                      to={`/edit/${event._id}`}
                      className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded transition-colors duration-200 text-sm font-medium"
                    >
                      Edit
                    </Link>
                    <Link
                      to={`/details/${event._id}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition-colors duration-200 text-sm font-medium"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => handleDelete(event._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition-colors duration-200 text-sm font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-8 text-gray-400 italic"
                >
                  No events found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      )}
    </div>
  );
};

export default EventList;
