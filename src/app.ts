import express from 'express';
import bodyParser from 'body-parser';
import eventRoutes from './routes/eventRoutes';
import { connectDB } from './config/database';

const app = express();

// Connect to MongoDB
connectDB();

app.use(bodyParser.json());
app.use('/api', eventRoutes);

export default app;
