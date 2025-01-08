const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Number, required: true }
});

const Entry = mongoose.model('Entry', entrySchema);
module.exports = Entry;