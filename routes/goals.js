const express = require('express');
const router = express.Router();
const Goal = require('../models/Goal');

router.get('/', async (req, res) => {
  try {
    const goals = await Goal.find();
    res.json(goals);
  } catch (err) {
    console.error(`Error fetching: ${err}`);
    res.status(500).send(err);
  }
});

router.post('/', async (req, res) => {
  const { name } = req.body;
  let goal;
  console.log(req.body);
  if (name === 'Max Total Expenses'){
    const { amount, units, unit } = req.body;
    goal = new Goal({
      name,
      amount,
      units,
      unit
    });
  }
  
  try {
    const savedGoal = await Goal.save();
    res.json(savedGoal);
  } catch (err) {
    console.error('Error fetching:', err);
    res.status(400).send(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedGoal = await Goal.findByIdAndDelete(req.params.id);
    res.json(deletedGoal);
  } catch (err) {
    console.error('Error fetching:', err);
    res.status(400).send(err);
  }
});

module.exports = router;