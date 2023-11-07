import logger from '../utils/logger';
import { Request, Response } from 'express';
import HttpStatusCode from '../enums/HttpStatus';

function badRequestResponse(req: Request, res: Response, message?: string) {
  logger.error(`bad_request:${req.originalUrl}${message ? `:message=${message}` : ''}`);
  return res.status(HttpStatusCode.BAD_REQUEST).send({ status: false, message: message || 'bad_request' });
}

export default badRequestResponse;
