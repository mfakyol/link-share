import { NextFunction, Request, Response } from 'express';
import unauthorizedResponse from '../responses/unauthorizedResponse';

export default function (req: Request, res: Response, next: NextFunction) {
  if (req.session.authenticated) next();
  else unauthorizedResponse(req, res);
}
