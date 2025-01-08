const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require('body-parser');
const app = express();

const entryRouter = require('./routes/entries');
const Entry = require('./models/Entry');
const goalRouter = require('./routes/goals');
const Goal = require('./models/Goal');

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use('/api/entries', entryRouter);
app.use('/api/goals', goalRouter);

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB Connected!'))
  .catch((err) => {
    console.log('MongoDB Connection Error:', err);
    process.exit(1);
  });

app.get('/entries', async (req, res) => {
  try {
    const entries = await Entry.find();
    res.json(entries);
  } catch (err) {
    console.log(`Error getting entries: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
  
});

app.get('/goals', async (req, res) => {
  try {
    const goals = await Goal.find();
    res.json(goals);
  } catch (err) {
    console.log(`Error getting goals: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
});

app.post('/entries/', async (req, res) => {
  const { name, amount, date } = req.body;
  
  const entry = new Entry({
    name,
    amount,
    date
  });
  
  try {
    const savedEntry = await entry.save();
    res.json(savedEntry);
  } catch (err) {
    console.error('Error fetching:', err);
    res.status(400).send(err);
  }
});

app.post('/goals/', async (req, res) => {
  const { name } = req.body;
  let goal;
  const { amount, expiryDate } = req.body;
  goal = new Goal({
    name,
    amount,
    expiryDate
  });
  try {
    const savedGoal = await goal.save();
    res.json(savedGoal);
  } catch (err) {
    console.error('Error fetching!', err);
    res.status(400).send(err);
  }
});

app.delete('/entries/:_id', async (req, res) => {
  try {
    const deletedEntry = await Entry.findByIdAndDelete(req.params._id);
    res.json(deletedEntry);
    
  } catch (err) {
    console.error('Error fetching:', err);
    res.status(400).send(err);
  }
});

app.delete('/goals/:_id', async (req, res) => {
  try {
    const deletedGoal = await Goal.findByIdAndDelete(req.params._id);
    res.json(deletedGoal);
  } catch (err) {
    console.error('Error deleting!', err);
    res.status(400).send(err);
  }
});

app.put('/goals/', async (req, res) => {
  try {
    console.log('updating...');
    const updatedItem = await Goal.findByIdAndUpdate(
      req.params._id,
      {
        name: req.body.name,
        amount: req.body.amount,
        expiryDate: req.body.expiryDate
      }
    );
    console.log(req.params._id);
    console.log(req.body);
    res.status(200).send(updatedItem);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
