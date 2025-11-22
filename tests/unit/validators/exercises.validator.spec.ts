import { exerciseSchema } from '../../../src/validators/exercises.validator';

describe('Exercise Validator', () => {
  it('accepts valid payload', () => {
    const { error } = exerciseSchema.validate({ name: 'Push Up', difficulty: 'easy' });
    expect(error).toBeUndefined();
  });
  it('rejects missing name', () => {
    const { error } = exerciseSchema.validate({ difficulty: 'easy' });
    expect(error).toBeDefined();
  });
});
