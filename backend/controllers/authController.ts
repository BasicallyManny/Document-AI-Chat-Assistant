import { Request, Response } from 'express'; //imported to provide type definitions for the request and response objects used in the route handlers
import User from '../models/user';  // Mongoose model for user data.


//handles GET requests to the test route.
const test = (req: Request, res: Response): void => {
    res.json("Test is working");
};


//handles POST requests to the register route.
const registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password } = req.body; //collect registration data from the DOM
        
        // Check if name is provided
        if (!name) {
            res.status(400).json({
                error: "Name is required"
            });
            return;
        }

        // Check if password is provided and has at least 6 characters
        if (!password || password.length < 6) {
            res.status(400).json({
                error: "A password of at least 6 characters is required"
            });
            return;
        }

        // Check if email already exists
        const exist = await User.findOne({ email });
        if (exist) {
            res.status(400).json({
                error: "Email is already taken"
            });
            return;
        }

        //Creates a new user document in the MongoDB database using the User model.
        const user = await User.create({ 
            name, email, password 
        });

        res.json(user);  // Send response with user data
    } catch (error) {
        console.error('Registration failed:', error);  // Log the error
        if (error instanceof Error) {
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            res.status(500).json({ error: "Unexpected Error" });
        }
    }
};

// Export
export { test, registerUser };
