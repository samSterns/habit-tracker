require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Habit = require('../lib/models/Habit');

describe('habit routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let habit;

  beforeEach(async() => {
    habit = await Habit
      .create({
        title: 'Do Dishes',
        category: 'chore',
        dayOfTheWeek: 'Monday'
      });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates a habit', () => {
    return request(app)
      .post('/api/v1/habits')
      .send({
        title: 'Do Dishes',
        category: 'chore',
        dayOfTheWeek: 'Monday'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          title: 'Do Dishes',
          category: 'chore',
          dayOfTheWeek: 'Monday',
          __v: 0
        });
      });
  });

  it('gets all habits', async() => {
    const habits = await Habit.create([
      {  title: 'Do Dishes', category: 'chore', dayOfTheWeek: 'Monday' },
      {  title: 'Do Laundry', category: 'chore', dayOfTheWeek: 'Sunday' },
      {  title: 'Go to Gym', category: 'exercise', dayOfTheWeek: 'Monday' },
      
    ]);

    return request(app)
      .get('/api/v1/habits')
      .then(res => {
        habits.forEach(habit => {
          expect(res.body).toContainEqual({
            _id: habit._id.toString(),
            title: habit.title
          });
        });
      });
  });

  it('gets a habit by id', async() => {
    return request(app)
      .get(`/api/v1/habits/${habit._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          title: 'Do Dishes',
          category: 'chore',
          dayOfTheWeek: 'Monday',
          __v: 0
        });
      });
  });

  it('updates a habit by id', async() => {
    return request(app)
      .patch(`/api/v1/habits/${habit._id}`)
      .send({ title: 'unload dishwasher' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          title: 'unload dishwasher',
          category: 'chore',
          dayOfTheWeek: 'Monday',
          __v: 0
        });
      });
  });

  it('deletes a habit by id', async() => {
    return request(app)
      .delete(`/api/v1/habits/${habit._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          title: 'Do Dishes',
          category: 'chore',
          dayOfTheWeek: 'Monday',
          __v: 0
        });
      });
     
  });
});
