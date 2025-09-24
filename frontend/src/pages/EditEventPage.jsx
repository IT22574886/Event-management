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

  return <EventForm initialData={initialData} onSubmit={handleUpdate} />;
};

export default EditEventPage;
