import express from "express";
import Event from "../models/Event.js";

const eventrouter = express.Router();

// Create a new event
eventrouter.post("/", async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).send(event);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all events
eventrouter.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.send(events);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a single event by ID
eventrouter.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).send("Event not found");
    }
    res.send(event);
  } catch (error) {
    res.status(500).send(error);
  }
});

eventrouter.put("/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["imageUrl", "EventName", "Description", "Date", "Time", "Location", "Category"];

  // Check if all updates are allowed
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    // Find the event by ID and update it
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    if (!event) {
      return res.status(404).send("Event not found");
    }

    res.send(event); // Send the updated event back as response
  } catch (error) {
    res.status(500).send("Internal Server Error"); // Handle server error
  }
});

// Delete an event by ID
eventrouter.delete("/:id", async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).send("Event not found");
    }
    res.send(event);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default eventrouter;
