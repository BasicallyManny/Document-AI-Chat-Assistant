import { Request, Response } from 'express';
import User from '../models/user';
import { hashPassword, comparePassword } from '../helpers/auth';
import jwt from 'jsonwebtoken';

interface User {
  email: string;
  _id: string;
  name: string;
}

/**
 * This function is an Express route handler that handles GET requests to the root
 * route ("/"). It responds with a JSON object containing the string "Test is working".
 *
 * @param {Request} req - The Express Request object.
 * @param {Response} res - The Express Response object.
 * @return {void} This function does not return anything.
 */
const test = (req: Request, res: Response): void => {
  // Respond to the request with a JSON object containing the string "Test is working".
  res.json({ message: 'Test is working' });
};

/**
 * This function is an asynchronous Express route handler that handles POST requests to the
 * '/register' route. It registers a new user by creating a new User document in the MongoDB
 * database. It expects a JSON payload containing the user's name, email, and password.
 *
 * @param {Request} req - The Express Request object. It should contain a JSON payload with
 * the user's name, email, and password.
 * @param {Response} res - The Express Response object. It will send a JSON response indicating
 * whether the registration was successful or not.
 * @return {Promise<void>} This function does not return anything.
 */
const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    // Extract the name, email, and password from the request body
    const { name, email, password } = req.body;

    // Check if the name field is empty
    if (!name) {
      // If the name field is empty, send a 400 response with an error message
      res.status(400).json({ error: 'Name is required' });
      return;
    }

    // Check if the password field is empty or less than 6 characters
    if (!password || password.length < 6) {
      // If the password field is empty or less than 6 characters, send a 400 response with an error message
      res.status(400).json({ error: 'A password of at least 6 characters is required' });
      return;
    }

    // Check if the email already exists in the database
    const exist = await User.findOne({ email });
    if (exist) {
      // If the email already exists, send a 400 response with an error message
      res.status(400).json({ error: 'Email is already taken' });
      return;
    }

    // Hash the password using the hashPassword function from the auth helper module
    const hashedPassword = await hashPassword(password);

    // Create a new User document in the MongoDB database with the name, email, and hashed password
    const user = await User.create({ name, email, password: hashedPassword });

    // Send a JSON response with the newly created user document
    res.json(user);
  } catch (error) {
    // If an error occurs during the registration process, log the error and send a 500 response with an error message
    console.error('Registration failed:', error);
    if (error instanceof Error) {
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(500).json({ error: 'Unexpected Error' });
    }
  }
};

/**
 * This function is an asynchronous Express route handler that handles POST requests to the
 * '/login' route. It attempts to authenticate a user by checking if the provided email and
 * password match an existing user in the database. If the authentication is successful, it creates
 * a JSON Web Token (JWT) and sets it as a cookie in the response. The JWT contains the user's
 * email, ID, and name.
 *
 * @param {Request} req - The Express Request object. It should contain a JSON payload with the
 * user's email and password.
 * @param {Response} res - The Express Response object. It will send a JSON response indicating
 * the success or failure of the authentication attempt.
 * @return {Promise<void>} This function does not return anything.
 */
const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    // Extract the email and password from the request body
    const { email, password } = req.body;

    // Find a user in the database with the provided email
    const user = await User.findOne({ email });

    // If no user is found, send a 400 response with an error message
    if (!user) {
      res.status(400).json({ error: 'Sorry, E-Mail not recognized' });
      return;
    }

    // Check if the provided password matches the hashed password in the database
    const match = await comparePassword(password, user.password);

    // If the password matches, create a JWT with the user's email, ID, and name
    if (match) {
      jwt.sign(
        { email: user.email, id: user._id, name: user.name },
        process.env.JWT_SECRET_KEY as string,
        {},
        (err, token) => {
          // If there is an error creating the JWT, throw the error
          if (err) throw err;
          // Set the JWT as a cookie in the response and send a JSON response with the user document
          res.cookie('token', token).json(user);
        }
      );
    } else {
      // If the password does not match, send a 400 response with an error message
      res.status(400).json({ error: 'Incorrect Password' });
    }
  } catch (error) {
    // If an error occurs during the authentication process, log the error and send a 500 response with an error message
    console.error('Login failed:', error);
    if (error instanceof Error) {
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(500).json({ error: 'Unexpected Error' });
    }
  }
};

/**
 * This function is an Express route handler that handles GET requests to the '/profile'
 * route. It extracts the token from the request cookies and verifies it using the JWT
 * secret key. If the token is valid, it sends a JSON response with the user information.
 * If the token is not provided, it sends a 401 Unauthorized response.
 *
 * @param {Request} req - The Express Request object. It should contain a token in the
 * cookies.
 * @param {Response} res - The Express Response object. It will send a JSON response with
 * the user information or a 401 Unauthorized response.
 * @return {void} This function does not return anything.
 */
const getProfile = (req: Request, res: Response): void => {
  // Extract the token from the request cookies
  const { token } = req.cookies;

  // If the token is provided
  if (token) {
    // Verify the token using the JWT secret key
    jwt.verify(token, process.env.JWT_SECRET_KEY as string, {}, (err, user) => {
      // If there is an error during verification
      if (err) {
        // Log the error
        console.error('JWT verification error:', err);
        // Send a 401 Unauthorized response with an error message
        res.status(401).json({ error: 'Invalid token' });
      } else {
        // If the token is valid, send a JSON response with the user information
        res.json(user);
      }
    });
  } else {
    // If the token is not provided, send a 401 Unauthorized response with an error message
    res.status(401).json({ error: 'No token provided' });
  }
};

export { test, registerUser, loginUser, getProfile };
