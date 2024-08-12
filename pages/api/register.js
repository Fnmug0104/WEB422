// pages/api/register.js
import mongoose from 'mongoose';
import User from '../../models/user'; // Adjust the path based on your file structure
import bcrypt from 'bcryptjs';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

async function connectMongoDB() {
    if (mongoose.connection.readyState >= 1) {
        return mongoose.connection;
    }

    try {
        await mongoose.connect(MONGODB_URI); // Removed deprecated options
        console.log("Successfully Connected to MongoDB");
        return mongoose.connection;
    } catch (error) {
        console.error("Error! Cannot connect to MongoDB: ", error);
        throw new Error('Failed to connect to MongoDB');
    }
}

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { username, password } = req.body;

            if (!username || !password) {
                return res.status(400).json({ message: 'Username and password are required' });
            }

            await connectMongoDB();

            const hashedPassword = await bcrypt.hash(password, 10);
            await User.create({ username, password: hashedPassword });

            res.status(201).json({ message: 'User Registered Successfully!' });
        } catch (error) {
            console.error("Error during registration:", error);
            res.status(500).json({ message: 'An error occurred during registration' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
