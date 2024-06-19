import { Request, Response } from 'express';
import User from '../models/user';
import { hashPassword, comparePassword } from '../helpers/auth';
import jwt from 'jsonwebtoken';

interface User {
  email: string;
  _id: string;
  name: string;
}

const test = (req: Request, res: Response): void => {
  res.json('Test is working');
};

const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    if (!name) {
      res.status(400).json({ error: 'Name is required' });
      return;
    }

    if (!password || password.length < 6) {
      res.status(400).json({ error: 'A password of at least 6 characters is required' });
      return;
    }

    const exist = await User.findOne({ email });
    if (exist) {
      res.status(400).json({ error: 'Email is already taken' });
      return;
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({ name, email, password: hashedPassword });

    res.json(user);
  } catch (error) {
    console.error('Registration failed:', error);
    if (error instanceof Error) {
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(500).json({ error: 'Unexpected Error' });
    }
  }
};

const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ error: 'Sorry, E-Mail not recognized' });
      return;
    }

    const match = await comparePassword(password, user.password);

    if (match) {
      jwt.sign(
        { email: user.email, id: user._id, name: user.name },
        process.env.JWT_SECRET_KEY as string,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie('token', token).json(user);
        }
      );
    } else {
      res.status(400).json({ error: 'Incorrect Password' });
    }
  } catch (error) {
    console.error('Login failed:', error);
    if (error instanceof Error) {
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(500).json({ error: 'Unexpected Error' });
    }
  }
};

const logoutUser = async (req: Request, res: Response): Promise<void> => {
  try {
    // Clear the token cookie
    res.clearCookie('token').json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Logout failed:', error);
    if (error instanceof Error) {
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(500).json({ error: 'Unexpected Error' });
    }
  }
};


const getProfile = (req: Request, res: Response): void => {
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY as string, {}, (err, user) => {
      if (err) {
        console.error('JWT verification error:', err);
        res.status(401).json({ error: 'Invalid token' });
      } else {
        res.json(user);
      }
    });
  } else {
    res.status(401).json({ error: 'No token provided' });
  }
};

export { test, registerUser, loginUser, getProfile, logoutUser };
