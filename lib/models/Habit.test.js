const mongoose = require('mongoose');
const Habit = require('./Habit');

describe('Habit model', () => {
  it('has a required title', () => {
    const habit = new Habit();
    const { errors } = habit.validateSync();

    expect(errors.title.message).toEqual('Path `title` is required.');
  });

  it('has a title and category field', () => {
    const habit = new Habit({
      title: 'Do Dishes',
      category: 'chore',
      dayOfTheWeek: 'Monday'
    });
    expect(habit.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      title: 'Do Dishes',
      category: 'chore',
      dayOfTheWeek: 'Monday'
    });
  });
});
