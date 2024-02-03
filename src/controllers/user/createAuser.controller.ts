import { Request, Response } from 'express';
import Joi from 'joi';

type BodyType = {
  name: string;
  email: string;
  phone: string;
  password: string;
  isActive: boolean;
  role: string;
  dateOfBirth: Date;
  profileImage: string;
};

const createAUser = async (req: Request, res: Response) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // create a user
  res.send('User created successfully');
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
    phone: Joi.string().messages({}),
    password: Joi.string().min(8).max(1024).required().messages({
      'any.required': 'Password is required',
      'string.min': 'Password must be at least 8 characters',
      'string.max': 'Password cannot be more than 1024 characters',
    }),
    isActive: Joi.boolean().messages({
      'any.boolean': 'Active must be a boolean',
    }),
    role: Joi.string().required().messages({
      'any.required': 'Role is required',
    }),
    dateOfBirth: Joi.date().messages({
      'any.date': 'Date of Birth must be a valid date',
    }),
    profileImage: Joi.string().messages({}),
  });
  return schema.validate(data);
};

export default createAUser;
