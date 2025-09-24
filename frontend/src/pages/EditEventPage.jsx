import EventForm from "../components/EventForm";
import { updateEvent, getEventById } from "../services/eventService";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const EditEventPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const { data } = await getEventById(id);
        setInitialData(data);
      } catch (error) {
        console.error("Failed to fetch event", error);
      }
    };
    fetchEvent();
  }, [id]);

  const handleUpdate = async (data) => {
    try {
      await updateEvent(id, data);
      navigate("/");
    } catch (error) {
      console.error("Failed to update event", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white text-center mb-2">
            Edit Event
          </h1>
          <p className="text-gray-300 text-center">
            Update the event details below
          </p>
        </div>
        
        {/* Form Container */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
          {initialData ? (
            <EventForm initialData={initialData} onSubmit={handleUpdate} />
          ) : (
            <div className="flex justify-center items-center py-12">
              <div className="text-gray-300 text-lg">Loading event data...</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditEventPage;
