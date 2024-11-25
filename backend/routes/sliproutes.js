import express from 'express';
import Slip from '../models/slipmodel.js'; // Corrected import statement

const sliprouter = express.Router();

// Create a new slip
sliprouter.post('/', async (req, res) => {
  try {
    const { User_ID, Value, imagePath ,date} = req.body; // Removed 'status' from here
    const newSlip = new Slip({
      User_ID,
      Value,
      imagePath,
      date
    }); // 'status' will default to 'pending' as defined in the schema
    const savedSlip = await newSlip.save();
    res.status(201).json(savedSlip);
  } catch (error) {
    console.error('Error creating slip:', error);
    res.status(500).json({ error: 'Failed to create slip' });
  }
});

// Get all slips
sliprouter.get('/', async (req, res) => {
  try {
    const slips = await Slip.find();
    res.status(200).json(slips);
  } catch (error) {
    console.error('Error getting slips:', error);
    res.status(500).json({ error: 'Failed to get slips' });
  }
});

// Get a single slip by ID
sliprouter.get('/:id', async (req, res) => {
  try {
    const slip = await Slip.findById(req.params.id);
    if (!slip) {
      return res.status(404).json({ error: 'Slip not found' });
    }
    res.status(200).json(slip);
  } catch (error) {
    console.error('Error getting slip by ID:', error);
    res.status(500).json({ error: 'Failed to get slip' });
  }
});

// Update a slip by ID
sliprouter.put('/:id', async (req, res) => {
  try {
    const { User_ID, status, Value, imagePath ,date} = req.body;
    const updatedSlip = await Slip.findByIdAndUpdate(req.params.id, {
      User_ID,
      status,
      Value,
      imagePath
    }, { new: true });
    if (!updatedSlip) {
      return res.status(404).json({ error: 'Slip not found' });
    }
    res.status(200).json(updatedSlip);
  } catch (error) {
    console.error('Error updating slip:', error);
    res.status(500).json({ error: 'Failed to update slip' });
  }
});

// Delete a slip by ID
sliprouter.delete('/:id', async (req, res) => {
  try {
    const deletedSlip = await Slip.findByIdAndDelete(req.params.id);
    if (!deletedSlip) {
      return res.status(404).json({ error: 'Slip not found' });
    }
    res.status(200).json({ message: 'Slip deleted successfully' });
  } catch (error) {
    console.error('Error deleting slip:', error);
    res.status(500).json({ error: 'Failed to delete slip' });
  }
});

export default sliprouter;
