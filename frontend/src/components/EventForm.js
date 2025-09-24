import { useState, useEffect } from "react";

const EventForm = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    venue: "",
    capacity: 1,
    status: "draft",
  });

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-white p-6 mt-6 rounded-xl shadow"
    >
      <h3 className="text-2xl font-semibold mb-4">
        {initialData ? "Edit Event" : "Create Event"}
      </h3>

      {["title", "description", "date", "venue", "capacity"].map((field) => (
        <div key={field} className="mb-4">
          <label className="block font-medium mb-1 capitalize">{field}</label>
          <input
            type={field === "date" ? "date" : field === "capacity" ? "number" : "text"}
            name={field}
            value={formData[field]}
            min={field === "capacity" ? 1 : undefined}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
      ))}

      <div className="mb-4">
        <label className="block font-medium mb-1">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        {initialData ? "Update Event" : "Create Event"}
      </button>
    </form>
  );
};

export default EventForm;
