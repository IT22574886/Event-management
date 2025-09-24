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
      className="max-w-2xl mx-auto bg-gradient-to-br from-gray-50 via-white to-blue-50 p-8 mt-8 rounded-2xl shadow-lg border border-blue-200"
    >
      {/* <h3 className="text-3xl font-bold mb-6 text-blue-700 tracking-tight">
        {initialData ? "Edit Event" : "Create Event"}
      </h3> */}

      {["title", "description", "date", "venue", "capacity"].map((field) => (
        <div key={field} className="mb-5">
          <label className="block font-semibold mb-2 capitalize text-gray-700">{field}</label>
          <input
            type={field === "date" ? "date" : field === "capacity" ? "number" : "text"}
            name={field}
            value={formData[field]}
            min={field === "capacity" ? 1 : undefined}
            onChange={handleChange}
            required
            className="w-full border border-blue-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white shadow-sm transition"
          />
        </div>
      ))}

      <div className="mb-5">
        <label className="block font-semibold mb-2 text-gray-700">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border border-blue-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white shadow-sm transition"
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
