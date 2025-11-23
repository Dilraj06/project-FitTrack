import Joi from 'joi';

export const clientSchema = Joi.object({
  userId: Joi.string().required(),
  name: Joi.string().min(1).max(200).required(),
  age: Joi.number().integer().min(1).max(120).optional(),
  heightCm: Joi.number().min(30).max(300).optional(),
  weightKg: Joi.number().min(2).max(400).optional(),
  goals: Joi.array().items(Joi.string()).optional(),
  assignedTrainerId: Joi.string().optional()
});
