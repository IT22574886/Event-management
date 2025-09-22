// controllers/eventController.js
import Event from "../models/event.js";

// @desc    Get all events
// @route   GET /api/events
// @access  Public
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch events", error: error.message });
  }
};

// @desc    Get single event by ID
// @route   GET /api/events/:id
// @access  Public
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch event", error: error.message });
  }
};

// @desc    Create new event
// @route   POST /api/events
// @access  Public
export const createEvent = async (req, res) => {
  try {
    const { title, description, date, venue, capacity, status } = req.body;

    // Basic validation before saving
    if (!title || !description || !date || !venue || !capacity) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }
    if (capacity < 1) {
      return res.status(400).json({ message: "Capacity must be at least 1" });
    }
    if (status && !["draft", "published", "cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const event = await Event.create({
      title,
      description,
      date,
      venue,
      capacity,
      status: status || "draft",
    });

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: "Failed to create event", error: error.message });
  }
};

// @desc    Update event
// @route   PUT /api/events/:id
// @access  Public
export const updateEvent = async (req, res) => {
  try {
    const { title, description, date, venue, capacity, status } = req.body;

    // Optional validation for update
    if (capacity !== undefined && capacity < 1) {
      return res.status(400).json({ message: "Capacity must be at least 1" });
    }
    if (status && !["draft", "published", "cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    event.title = title ?? event.title;
    event.description = description ?? event.description;
    event.date = date ?? event.date;
    event.venue = venue ?? event.venue;
    event.capacity = capacity ?? event.capacity;
    event.status = status ?? event.status;

    const updatedEvent = await event.save();
    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: "Failed to update event", error: error.message });
  }
};

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Public
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    await event.deleteOne();
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete event", error: error.message });
  }
};
