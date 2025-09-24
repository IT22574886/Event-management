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
          <p className="text-gray-500 text-lg">No events found</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="min-w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Venue</th>
                <th className="px-4 py-3">Capacity</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
            {events.length > 0 ? (
              events.map((event) => (
                <tr key={event._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3">{event.title}</td>
                  <td className="px-4 py-3">
                    {new Date(event.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">{event.venue}</td>
                  <td className="px-4 py-3">{event.capacity}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        event.status === "published"
                          ? "bg-green-100 text-green-700"
                          : event.status === "cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {event.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 flex gap-2">
                    <Link
                      to={`/edit/${event._id}`}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </Link>
                    <Link
                      to={`/details/${event._id}`}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => handleDelete(event._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
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
                  className="text-center py-4 text-gray-500 italic"
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
