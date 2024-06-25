import { Router } from 'express';
import { addEvent, updateEvent, deleteEvent, getEventById, listEvents } from '../controllers/eventController';

const router = Router();

router.post('/event', addEvent);
router.put('/event/:id', updateEvent);
router.delete('/event/:id', deleteEvent);
router.get('/event/:id', getEventById);
router.get('/events', listEvents);

export default router;
