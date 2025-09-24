import EventForm from "../components/EventForm";
import { createEvent } from "../services/eventService";
import { useNavigate } from "react-router-dom";

const CreateEventPage = () => {
  const navigate = useNavigate();

  const handleCreate = async (data) => {
    try {
      await createEvent(data);
      navigate("/");
    } catch (error) {
      console.error("Failed to create event", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white text-center mb-2">
            Create New Event
          </h1>
          <p className="text-gray-300 text-center">
            Fill in the details to create a new event
          </p>
        </div>
        
        {/* Form Container */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
          <EventForm onSubmit={handleCreate} />
        </div>
      </div>
    </div>
  );
};

export default CreateEventPage;
