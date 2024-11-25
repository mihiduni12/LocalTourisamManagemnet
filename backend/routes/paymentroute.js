import express from 'express';
import Pay from '../models/paymentmodel.js';
const payrouter = express.Router();

payrouter.post('/', async (req, res) => {
  try {
    const { User_ID, date, Value,pmethod } = req.body; // Removed 'status' from here
    const newpay = new Pay({
      User_ID,
      date,
      Value,
      pmethod
    }); // 'status' will default to 'pending' as defined in the schema
    const savedpay = await newpay.save();
    res.status(201).json(savedpay);
  } catch (error) {
    console.error('Error creating Bill:', error);
    res.status(500).json({ error: 'Failed to create Bill' });
  }
});

// Get all slips
payrouter.get('/', async (req, res) => {
  try {
    const pay = await Pay.find();
    res.status(200).json(pay);
  } catch (error) {
    console.error('Error getting Bill:', error);
    res.status(500).json({ error: 'Failed to get Bill' });
  }
});

// Get a single slip by ID
payrouter.get('/:id', async (req, res) => {
  try {
    const pay = await Pay.findById(req.params.id);
    if (!slip) {
      return res.status(404).json({ error: 'Bill not found' });
    }
    res.status(200).json(pay);
  } catch (error) {
    console.error('Error getting Bill by ID:', error);
    res.status(500).json({ error: 'Failed to get Bill' });
  }
});

// Update a slip by ID
payrouter.put('/:id', async (req, res) => {
  try {
    const { User_ID, status, Value} = req.body;
    const updatedSlip = await Pay.findByIdAndUpdate(req.params.id, {
      User_ID,
      status,
      Value,
    }, { new: true });
    if (!updatedSlip) {
      return res.status(404).json({ error: 'Bill not found' });
    }
    res.status(200).json(updatedSlip);
  } catch (error) {
    console.error('Error updating Bill:', error);
    res.status(500).json({ error: 'Failed to update Bill' });
  }
});

// Delete a slip by ID
payrouter.delete('/:id', async (req, res) => {
  try {
    const deletedSlip = await Pay.findByIdAndDelete(req.params.id);
    if (!deletedSlip) {
      return res.status(404).json({ error: 'Bill not found' });
    }
    res.status(200).json({ message: 'Bill deleted successfully' });
  } catch (error) {
    console.error('Error deleting Bill:', error);
    res.status(500).json({ error: 'Failed to delete Bill' });
  }
});

export default payrouter;
