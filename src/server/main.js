import express from "express";
import ViteExpress from "vite-express";
import bodyParser from "body-parser";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";
import mysql from "mysql2";
import mongoose from "mongoose";

const app = express();
// Middleware
app.use(cors());
app.use(bodyParser.json());

// Middleware
app.use(cors());
app.use(bodyParser.json());

// // MySQL Database Connection
// const mysqlConnection = mysql.createConnection({
//     host: 'localhost',
//     user: 'your_mysql_user',
//     password: 'your_mysql_password',
//     database: 'your_mysql_database'
// });

// mysqlConnection.connect(err => {
//     if (err) {
//         console.error('MySQL connection error:', err);
//         return;
//     }
//     console.log('Connected to MySQL database.');
// });

// // MongoDB Connection
// mongoose.connect('mongodb://localhost:27017/your_mongo_database', { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('Connected to MongoDB database.'))
//     .catch(err => console.error('MongoDB connection error:', err));

// // User model for MongoDB
// const UserSchema = new mongoose.Schema({
//     username: String,
//     password: String,
// });

// const User = mongoose.model('User', UserSchema);

// // Multer setup for file uploads
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + '-' + file.originalname);
//     }
// });
// const upload = multer({ storage });

// // Registration Route
// app.post('/register', async (req, res) => {
//     const { username, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = new User({ username, password: hashedPassword });
//     await user.save();

//     res.status(201).json({ message: 'User registered successfully.' });
// });

// // Login Route
// app.post('/login', async (req, res) => {
//     const { username, password } = req.body;

//     const user = await User.findOne({ username });
//     if (!user) return res.status(404).send('User not found.');

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(401).send('Invalid password.');

//     const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
//     res.json({ token });
// });

// // File Upload Route
// app.post('/upload', upload.single('file'), (req, res) => {
//     res.json({ message: 'File uploaded successfully.', file: req.file });
// });


app.get("/hello", (req, res) => {
  res.send("Hello Vite + React!");
});

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000..."),
);
// http://localhost:3000