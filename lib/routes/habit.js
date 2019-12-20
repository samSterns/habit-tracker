const { Router } = require('express');
const Habit = require('../models/Habit');


module.exports = Router()
  .post('/', (req, res) => {
    Habit
      .create(req.body)
      .then(habit => res.send(habit));
  })

  .get('/', (req, res) => {
    let habitQuery = {};
    Habit
      .find(habitQuery)
      .select({ title: true })
      .then(habits => res.send(habits));
  })

  .get('/:id', (req, res) => {
    Promise.all([
      Habit.findById(req.params.id)
    ])
      .then(([habit]) => res.send({ ...habit.toJSON() }));
  })

  .patch('/:id', (req, res) => {
    Habit
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(habit => res.send(habit));
  })

  .delete('/:id', (req, res) => {
    Promise.all([Habit.findByIdAndDelete(req.params.id)])
      .then(([habit]) => res.send(habit));
  });
