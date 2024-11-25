import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({

  imageUrl: {
    type: String,
    required: true,
  },
  EventName: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  Date: {
    type: String,
    required: true,
  },
  Time: {
    type: String,
    required: true,
  },
  Location: {
    type: String,
    required: true,
  },
  Category: {
    type: String,
    required: true,
  },
});
const Event = mongoose.model("Event", eventSchema);

export default Event;