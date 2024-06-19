import express from 'express';
import cors from 'cors';
import { test, registerUser, loginUser, getProfile,logoutUser } from '../controllers/authController';

const router = express.Router();

// Apply CORS middleware
router.use(
  cors({
    credentials: true, // Allow cookies to be sent in cross-origin requests
    origin: 'http://localhost:5173' // Only allow requests from this origin
  })
);

// Define routes
router.get('/', test);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', getProfile);
router.post('/logout', logoutUser);

export default router;
