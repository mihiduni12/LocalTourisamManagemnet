import mongoose from "mongoose";

const TicketSchema = new mongoose.Schema({
  User_ID: {
    type: String,
    required: true,
  },
  
  date: {
    type: String,
    required: true,
  },
  
  TicketCount: {
    type: Number,
    required: true,
  },
  
  value: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  Eventid: {
    type: String,
    required: true,
  },
});

const Ticketmodel = mongoose.model("Ticket", TicketSchema);

export default Ticketmodel;