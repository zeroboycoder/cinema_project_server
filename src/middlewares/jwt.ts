import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken';
const { JWT_SECRET } = process.env;

interface jwtResult {
  type: string,
}

interface CustomRequest extends Request {
  admin?: jwtResult;
  user?: jwtResult;
}

export const generateToken = (data: any) => {
  return jwt.sign(data, JWT_SECRET as string);
}

export const verifyToken = (req: CustomRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, JWT_SECRET as string, (err, payload: unknown) => {
      const result = payload as jwtResult;
      if (err) {
        throw err;
      }
      if (result.type === 'admin') {
        req.admin = result;
      }
      req.user = result;
      next();
    });
  } else {
    throw new Error("Unauthorized");
  }
};