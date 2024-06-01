import { Request, Response } from 'express'; //imported to provide type definitions for the request and response objects used in the route handlers
import User from '../models/user';  // Mongoose model for user data.
import { hashPassword, comparePassword } from '../helpers/auth';

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

        const hashedPassword = await hashPassword(password);

        //Creates a new user document in the MongoDB database using the User model.
        const user = await User.create({ 
            name, email, password: hashedPassword  
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

//Login in point
const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body; //collect login data from DOM

        // Check if the user exists in the database
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({
                error: 'Sorry, E-Mail not recognized'
            });
            return;
        }

        // Check if passwords match
        const match = await comparePassword(password, user.password);
        
        // If matches is true assign JWT
        if (match) {
            res.json("Passwords Match");
        } else {
            res.status(400).json({
                error: "Incorrect Password"
            });
        }
    } catch (error) {
        console.error('Login failed:', error);  // Log the error
        if (error instanceof Error) {
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            res.status(500).json({ error: "Unexpected Error" });
        }
    }
}

// Export
export { test, registerUser, loginUser };
