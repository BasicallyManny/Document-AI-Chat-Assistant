import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes';

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL as string)
  .then(() => console.log('Database Connected'))
  .catch((err: Error) => console.log('Failed to connect to database', err));

// Initialize express server
const app = express();

// Middleware
app.use(cors({
  credentials: true, // Allow cookies to be sent in cross-origin requests
  origin: 'http://localhost:5173' // Only allow requests from this origin
}));
app.use(express.json()); // Parse incoming requests with JSON payloads
app.use(cookieParser()); // Cookie Parser Middleware
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/', authRoutes); // Use the authRoutes for handling authentication-related routes

// Initialize port
const port = 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
