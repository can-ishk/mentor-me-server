import * as jwt from 'jsonwebtoken'
import {Request, Response, NextFunction} from 'express';

const TOKEN_KEY = 'secret';

// interface JwtPayload{
//     userId: string;
//     isAdmin: boolean;
// }

export const verifyToken = (req, res, next) => {
    try {
      const token= req.headers["x-access-token"];
  
      if (!token) {
        throw new Error("No token provided");
      }
  
      const { userId, isAdmin } = jwt.decode(token, TOKEN_KEY);
  
      req.body = {
        ...req.body,
        userId,
        isAdmin,
      };
  
      return next();
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  };
  
export const optionallyVerifyToken = (req, res, next) => {
    try {
      const token = req.headers["x-access-token"];
  
      if (!token) return next();
  
      const decoded = jwt.decode(token, TOKEN_KEY)
      req.body.userId = decoded.userId;
  
      next();
    } catch (err) {
      return next();
    }
  };

