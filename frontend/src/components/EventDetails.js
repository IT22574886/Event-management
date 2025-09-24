import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getEventById } from "../services/eventService";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const { data } = await getEventById(id);
        setEvent(data);
      } catch (error) {
        console.error("Failed to fetch event", error);
      }
    };
    fetchEvent();
  }, [id]);

  if (!event) return <p className="text-center mt-6">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 mt-6 rounded-xl shadow">
      <h2 className="text-3xl font-bold mb-4">{event.title}</h2>
      <p className="mb-2"><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
      <p className="mb-2"><strong>Venue:</strong> {event.venue}</p>
      <p className="mb-2"><strong>Capacity:</strong> {event.capacity}</p>
      <p className="mb-2"><strong>Status:</strong> {event.status}</p>
      <p className="mb-4"><strong>Description:</strong> {event.description}</p>
      
      <Link
        to="/"
        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
      >
        Back to Events
      </Link>
    </div>
  );
};

export default EventDetails;
