import express from 'express';
import Notification from '../models/notificationModel.js';

const notirouter = express.Router();

// Create a new notification
notirouter.post('/', async (req, res) => {
  try {
    const {
      date,
      status,
      description,
      topic,
      userID,
    } = req.body;

    const newNotification = new Notification({
      date,
      status,
      description,
      topic,
      userID,
    });

    const savedNotification = await newNotification.save();
    res.status(201).json(savedNotification);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get all notifications
notirouter.get('/', async (req, res) => {
  try {
    const notifications = await Notification.find({});
    res.status(200).json(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get a single notification by ID
notirouter.get('/:id', async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    res.status(200).json(notification);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Update a notification by ID
notirouter.put('/:id', async (req, res) => {
  try {
    const notificationToUpdate = await Notification.findById(req.params.id);
    if (!notificationToUpdate) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    // Update fields
    notificationToUpdate.date = req.body.date || notificationToUpdate.date;
    notificationToUpdate.time = req.body.time || notificationToUpdate.time;
    notificationToUpdate.status =
      req.body.status || notificationToUpdate.status;
    notificationToUpdate.description =
      req.body.description || notificationToUpdate.description;
    notificationToUpdate.topic = req.body.topic || notificationToUpdate.topic;
    notificationToUpdate.userID = req.body.userID || notificationToUpdate.userID;

    const updatedNotification = await notificationToUpdate.save();
    res.status(200).json(updatedNotification);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Delete a notification by ID
notirouter.delete('/:id', async (req, res) => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id);
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    res.status(200).json({ message: 'Notification deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

export default notirouter;
