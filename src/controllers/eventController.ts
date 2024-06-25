import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { getDB } from '../config/database';

// Add a new event
export const addEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const db = getDB();
    const newEvent = {
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    const result = await db.collection('events').insertOne(newEvent);
    res.status(201).json(result);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

// Update an existing event
export const updateEvent = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const db = getDB();
  
      // Ensure the provided id is a valid ObjectId
      if (!ObjectId.isValid(id)) {
        res.status(400).json({ message: "Invalid event ID" });
        return;
      }
  
      // Remove _id from the update payload to avoid modifying the immutable field
      const { _id, ...updatedEvent } = req.body;
      updatedEvent.updatedAt = new Date();
  
      const result = await db.collection('events').updateOne(        
        { _id: new ObjectId(id) },
        { $set: updatedEvent },
        { returnDocument: 'after' }
      );
  
      if (result.acknowledged && result.modifiedCount > 0) {
        res.status(200).json({ message: "Event updated successfully" });
      } else {
        res.status(404).json({ message: "Event not found" });
      }
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).json({ message: err.message });
      } else {
        res.status(500).json({ message: "An unknown error occurred" });
      }
    }
  };

// Delete an event
export const deleteEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const db = getDB();
    await db.collection('events').deleteOne({ _id: new ObjectId(id) });
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

// Retrieve an event by its ID
export const getEventById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const db = getDB();
    const event = await db.collection('events').findOne({ _id: new ObjectId(id) });
    if (event) {
      res.status(200).json(event);
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

// List all events with optional filters
export const listEvents = async (req: Request, res: Response): Promise<void> => {
  try {
    const db = getDB();
    const { eventName, organizer } = req.query;
    let query: any = {};
    if (eventName) {
      query.eventName = { $regex: new RegExp(eventName as string, 'i') };
    }
    if (organizer) {
      query.organizer = { $regex: new RegExp(organizer as string, 'i') };
    }
    const events = await db.collection('events').find(query).toArray();
    res.status(200).json(events);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};
