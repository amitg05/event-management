import { Schema, model } from 'mongoose';

const LocationSchema = new Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true }
});

const EventSchema = new Schema({
  eventName: { type: String, required: true },
  eventDate: { type: Date, required: true },
  organizer: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  location: { type: LocationSchema, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const Event = model('Event', EventSchema);
