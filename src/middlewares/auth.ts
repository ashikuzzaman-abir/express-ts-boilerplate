import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { Request, Response, NextFunction } from 'express';

type IRequest = Request & {
  user?: any;
  permissions?: string[];
};

export function authfunction(req: IRequest, res: Response, next: NextFunction) {
  const token = req.header('x-auth-token');
  // const token = req.cookies.token;
  if (!token) return res.status(401).send('Access denied. No token present');

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_PRIVATE_KEY || 'fallback_key_12345_924542'
    );
    req.user = decoded;
    next();
  } catch (ex: any) {
    res.status(400).send('Invalid token.');
  }
}

type IUser = {
  _id: string;
  name: string;
  email: string;
  role: string;
  permissions: string[];
  organisation: string;
  sysUser: boolean;
};

export const protect = async (
  req: IRequest,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  let token: string | undefined;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(
        token,
        process.env.JWT_PRIVATE_KEY || 'fallback_key_12345_924542'
      ) as IUser;
      req.user = await User.findById(decoded?._id)
        .select('-password')
        .populate('role');
      req.permissions = req?.user?.role?.permissions;
      next();
    } catch (error: any) {
      console.error(error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};
