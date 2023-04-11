import * as jwt from 'jsonwebtoken'
import {Request, Response, NextFunction} from 'express';

const TOKEN_KEY:any = 'secret';

interface JwtPayload{
    userId: string;
    isAdmin: boolean;
}

export const verifyToken = (req:Request, res:Response, next:NextFunction) => {
    try {
      const token:any = req.headers["x-access-token"];
  
      if (!token) {
        throw new Error("No token provided");
      }
  
      const { userId, isAdmin } = jwt.decode(token, TOKEN_KEY) as unknown as JwtPayload;
  
      req.body = {
        ...req.body,
        userId,
        isAdmin,
      };
  
      return next();
    } catch (err:any) {
      return res.status(400).json({ error: err.message });
    }
  };
  
export const optionallyVerifyToken = (req:Request, res:Response, next:NextFunction) => {
    try {
      const token:any = req.headers["x-access-token"];
  
      if (!token) return next();
  
      const decoded = jwt.decode(token, TOKEN_KEY) as unknown as {userId: string};
      req.body.userId = decoded!.userId;
  
      next();
    } catch (err) {
      return next();
    }
  };

