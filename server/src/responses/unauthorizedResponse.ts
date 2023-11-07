import logger from '../utils/logger';
import { Request, Response } from 'express';
import HttpStatusCode from '../enums/HttpStatus';

function unauthorizedResponse(req: Request, res: Response, message?: string) {
  logger.error(`unauthorized:${req.originalUrl}${message ? `:message=${message}` : ''}`);
  return res.status(HttpStatusCode.UNAUTHORIZED).send({ status: false, message: 'unauthorized' });
}

export default unauthorizedResponse;
