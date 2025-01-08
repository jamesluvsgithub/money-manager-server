const express = require('express');
const router = express.Router();
const Entry = require('../models/Entry');

router.get('/', async (req, res) => {
  try {
    const entries = await Entry.find();
    res.json(entries);
  } catch (err) {
    console.error(`Error fetching: ${err}`);
    res.status(500).send(err);
  }
});

router.post('/', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
  try {
    const deletedEntry = await Entry.findByIdAndDelete(req.params.id);
    res.json(deletedEntry);
  } catch (err) {
    console.error('Error fetching:', err);
    res.status(400).send(err);
  }
});

module.exports = router;