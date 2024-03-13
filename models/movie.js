const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  notes: String, // Updated from 'description' to 'notes'
  importance: {
    type: Number,
    required: true,
    min: 1, // Assuming 1 is least important
    max: 5  // Assuming 5 is most important
  },
  desireToWatch: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  seenBy: {
    type: String,
    enum: ['none', 'you', 'me', 'both'], // Customize as needed
    default: 'none'
  }
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
