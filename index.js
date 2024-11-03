const express = require('express');
const multer = require('multer');
const cors = require('cors');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { exec } = require('child_process');

const SECRET_KEY = 'your_secret_key';
const uploadsDir = path.join(__dirname, 'uploads');

// Ensure the uploads directory exists
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// Configure file storage with multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/eduQuizDB')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// User model and schema setup
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);

// Routes
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) return res.status(400).send('No file uploaded.');
    res.status(200).send({ message: 'File uploaded successfully', filePath: req.file.path });
});

app.post('/generate-quiz', upload.single('file'), (req, res) => {
    console.log('Received request on /generate-quiz'); // Log request receipt
    if (!req.file) return res.status(400).send('No file uploaded.');
    const filePath = req.file.path;
    exec(`python3 extract_text.py ${filePath}`, { timeout: 10000 }, (error, stdout, stderr) => {
        if (error) {
            console.error('Error executing Python script:', error);
            return res.status(500).send({ message: 'Error generating quiz or timeout', error });
        }
        console.log('Python script output:', stdout);
        res.status(200).send({ quiz: stdout.trim() });
    });
});

// Authentication routes and middleware remain the same...

app.get('/test', (req, res) => {
    res.send({ message: 'Backend is reachable!' });
});

app.listen(5001, '0.0.0.0', () => console.log('Server running on port 5001'));
