const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: {
    type: String, 
    required: true
  },
  category: {
    type: String,
    required: true
  },
  dayOfTheWeek: {
    type: String,
    required: true,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  }
});

module.exports = mongoose.model('Habit', schema);
