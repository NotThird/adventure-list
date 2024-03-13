require('dotenv').config(); // First, require dotenv at the top if you're using a .env file for your environment variables
const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.static('public'));

const port = process.env.PORT || 3000;

// MongoDB connection
// Make sure to replace <database_name> with your actual database name and use environment variables for sensitive information
mongoose.connect(process.env.MONGODB_URI, {
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));


const Movie = require('./models/movie');

// Add a movie
app.post('/movies', async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).send(movie);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all movies
app.get('/movies', async (req, res) => {
  try {
    const movies = await Movie.find({});
    res.send(movies);
  } catch (error) {
    res.status(500).send();
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
