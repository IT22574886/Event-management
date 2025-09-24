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

  return <EventForm onSubmit={handleCreate} />;
};

export default CreateEventPage;
