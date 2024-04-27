import { Request, Response } from 'express';
import Joi from 'joi';
import User from '../../models/user.model';

type BodyType = {
  name: string;
  email: string;
  password: string;
  isActive?: boolean;
  dateOfBirth: Date;
};

const createAUser = async (req: Request, res: Response) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // create a user
  const user = new User(req.body);
  const savedUser = await user.save();

  res.send({ message: 'User created successfully', userId: savedUser._id });
};

const validate = (data: BodyType): Joi.ValidationResult => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required().messages({
      'any.required': 'Name is required',
      'string.min': 'Name must be at least 2 characters long',
    }),
    email: Joi.string().email().required().messages({
      'any.required': 'Email is required',
      'string.email': 'Email must be a valid email',
    }),
    password: Joi.string().min(8).max(1024).required().messages({
      'any.required': 'Password is required',
      'string.min': 'Password must be at least 8 characters',
      'string.max': 'Password cannot be more than 1024 characters',
    }),
    isActive: Joi.boolean().messages({
      'any.boolean': 'Active must be a boolean',
    }),

    dateOfBirth: Joi.date().messages({
      'any.date': 'Date of Birth must be a valid date',
    }),
  });
  return schema.validate(data);
};

export default createAUser;
