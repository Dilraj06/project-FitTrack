import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export const validate =
  (schema: Joi.ObjectSchema, partial = false) =>
  (req: Request, res: Response, next: NextFunction) => {
    const options = {
      abortEarly: false,
      allowUnknown: false,
      presence: partial ? "optional" : "required",
    } as any;
    const { error } = schema.validate(req.body, options);
    if (error)
      return res
        .status(400)
        .json({ errors: error.details.map((d) => d.message) });
    next();
  };
