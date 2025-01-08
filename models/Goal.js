const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  expiryDate: { type: Number, required: true}
});

const Goal = mongoose.model('Goal', goalSchema);
module.exports = Goal;