import express from "express";
import Ticketmodel from "../models/Ticket.js";

const Ticketrouter = express.Router();

// Create a new Event
Ticketrouter.post("/", async (req, res) => {
  try {
    const newTicket = await Ticketmodel.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        Ticket: newTicket,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
});
Ticketrouter.get("/", async (req, res) => {
    try {
      const events = await Ticketmodel.find();
      res.send(events);
    } catch (error) {
      res.status(500).send(error);
    }
  });

//get  based on ID
Ticketrouter.get("/:id", async (req, res) => {
  try {
    const Ticket = await Ticketmodel.findById(req.params.id);
    res.status(200).json({ Ticket });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "Ticket not found",
    });
  }
});


//update details
Ticketrouter.patch("/:id", async (req, res) => {
  try {
    const Ticket = await Ticketmodel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        Ticket,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
});

//delete
Ticketrouter.delete("/:id", async (req, res) => {
  try {
    await Ticketmodel.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "Ticket not found",
    });
  }
});

//ignore
Ticketrouter.post("/search", async (req, res) => {
  const { brand } = req.body;
  try {
    let rents = await Ticketmodel.find({
      $or: [{ brand: { $regex: brand, $options: "i" } }],
    });
    res.status(200).json({ Event });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
});

export default Ticketrouter;