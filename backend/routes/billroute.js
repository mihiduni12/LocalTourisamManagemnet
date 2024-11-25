import express from 'express';
import Bill from '../models/bill.js';

const billrouter = express.Router();

// Create a bill
billrouter.post('/', async (req, res) => {
  try {
    const bill = new Bill(req.body);
    await bill.save();
    res.status(201).send(bill);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all bills
billrouter.get('/', async (req, res) => {
  try {
    const bills = await Bill.find();
    res.send(bills);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a bill by ID
billrouter.get('/:id', async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);
    if (!bill) {
      return res.status(404).send();
    }
    res.send(bill);
  } catch (error) {
    res.status(500).send(error);
  }
});
billrouter.put('/:id', async (req, res) => {
  try {
    const { User_ID, date, type, status, Value } = req.body;

    // Find the bill by ID and update it
    const updatedBill = await Bill.findByIdAndUpdate(
      req.params.id,
      { User_ID, date, type, status, Value },
      { new: true } // Return the updated document
    );

    // If the bill is not found, return 404 Not Found error
    if (!updatedBill) {
      return res.status(404).json({ error: 'Bill not found' });
    }

    // If the bill is updated successfully, return the updated bill
    res.status(200).json(updatedBill);
  } catch (error) {
    console.error('Error updating bill:', error);
    // If any error occurs during the update process, return 500 Internal Server Error
    res.status(500).json({ error: 'Failed to update bill' });
  }
});
// Delete a bill by ID
billrouter.delete('/:id', async (req, res) => {
  try {
    const bill = await Bill.findByIdAndDelete(req.params.id);
    if (!bill) {
      return res.status(404).send();
    }
    res.send(bill);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default billrouter;
