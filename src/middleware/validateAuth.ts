import type { NextFunction, Request, Response } from 'express';

export default async function validateAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers?.authorization;
  if (!authHeader) {
    return res.status(401).send('Unauthorized');
  }
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).send('Unauthorized');
  }

  return next();
}
