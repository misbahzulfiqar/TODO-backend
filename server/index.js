// import express from 'express';
// import dotenv from 'dotenv';
// import mongoose from 'mongoose';
// import bodyParser from 'body-parser';
// import userRoutes from './routes/userRoutes.js'; 

// const app = express();
// app.use(bodyParser.json());
// dotenv.config();

// const PORT = process.env.PORT || 7000;
// const MONGOURI = process.env.MONGODB_URI;

// mongoose.connect(MONGOURI)
// .then(() => console.log('🎉😄 MongoDB connected successfully! 🚀🥳✨'))
// app.listen(PORT, () => {
//     console.log(`🚀 Server is running on port ${PORT}... wohooo!!!!! 😎🔥💻🎈`);
// })

// app.use('/api', userRoutes);

import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors'; // Make sure this is imported
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();

// 🔴 CRITICAL: CORS must be the FIRST middleware
app.use(cors({
    origin: 'http://localhost:3000', // Your React frontend
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Body parser middleware (AFTER CORS)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 7000;
const MONGOURI = process.env.MONGODB_URI;

// MongoDB connection
mongoose.connect(MONGOURI)
    .then(() => console.log('🎉 MongoDB connected successfully! 🚀'))
    .catch(err => console.log('❌ MongoDB connection error:', err));

// Routes
app.use('/api', userRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});