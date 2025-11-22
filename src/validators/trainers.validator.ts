import Joi from 'joi';

export const trainerSchema = Joi.object({
  id: Joi.string().required(),
  bio: Joi.string().allow('', null),
  specialties: Joi.array().items(Joi.string()).optional(),
  clients: Joi.array().items(Joi.string()).optional()
});
