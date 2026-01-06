const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const User = require('./models/User');
const Trip = require('./models/Trip');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/tourism'; // Update this if using MongoDB Atlas

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname))); // Serve static files from current directory

// Connect to MongoDB
mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        console.log('Please ensure MongoDB is running locally or update the connection string.');
    });

// Routes

// Register Endpoint
app.post('/api/register', async (req, res) => {
    try {
        const { fullName, username, email, password } = req.body;

        // Validate input
        if (!fullName || !username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if user exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email or username already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            fullName,
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Registration Error:', error);
        res.status(500).json({ message: 'Server error during registration' });
    }
});

// Login Endpoint
app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate input
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        // Check user
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create token
        const token = jwt.sign(
            { id: user._id, username: user.username },
            'your_jwt_secret_key', // In production, use environment variable
            { expiresIn: '1h' }
        );

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                fullName: user.fullName
            }
        });
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: 'Server error during login' });
    }
});

// Book Trip Endpoint
app.post('/api/book-trip', async (req, res) => {
    try {
        const { firstName, lastName, phone, email, from, destination, pickupAddress, token } = req.body;

        let userId = null;
        if (token) {
            try {
                const decoded = jwt.verify(token, 'your_jwt_secret_key');
                userId = decoded.id;
            } catch (e) {
                // Invalid token, ignore
            }
        }

        const newTrip = new Trip({
            userId,
            firstName,
            lastName,
            phone,
            email,
            from,
            destination,
            pickupAddress
        });

        await newTrip.save();
        res.status(201).json({ message: 'Trip booked successfully!' });
    } catch (error) {
        console.error('Booking Error:', error);
        res.status(500).json({ message: 'Server error during booking' });
    }
});

// Get User Profile Endpoint
app.get('/api/user-profile', async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'No token provided' });

    try {
        const decoded = jwt.verify(token, 'your_jwt_secret_key');
        const user = await User.findById(decoded.id).select('-password'); // Exclude password
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(403).json({ message: 'Invalid token' });
    }
});

// Get User Trips Endpoint
app.get('/api/my-trips', async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });
    try {
        const decoded = jwt.verify(token, 'your_jwt_secret_key');
        const trips = await Trip.find({ userId: decoded.id }).sort({ createdAt: -1 });
        res.json(trips);
    } catch (error) {
        res.status(403).json({ message: 'Invalid token' });
    }
});


// Catch-all route for SPA (if needed, but simple static serving works for these HTML files)
app.get('*', (req, res) => {
    // If request accepts html
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'index.html'));
    } else {
        res.status(404).json({ message: 'Not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
