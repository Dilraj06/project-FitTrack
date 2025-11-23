import Joi from 'joi';

export const workoutSchema = Joi.object({
  title: Joi.string().min(1).max(200).required(),
  description: Joi.string().allow('', null),
  creatorId: Joi.string().required(),
  exercises: Joi.array().items(
    Joi.object({
      exerciseId: Joi.string().required(),
      order: Joi.number().optional(),
      reps: Joi.number().optional(),
      sets: Joi.number().optional(),
      restSeconds: Joi.number().optional()
    })
  ).required(),
  visibility: Joi.string().valid('public','private').optional()
});
