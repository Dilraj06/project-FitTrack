import Joi from 'joi';

export const exerciseSchema = Joi.object({
  name: Joi.string().min(1).max(200).required(),
  description: Joi.string().allow('', null),
  muscles: Joi.array().items(Joi.string()).optional(),
  difficulty: Joi.string().valid('easy','medium','hard').optional(),
  mediaUrl: Joi.string().uri().optional()
});