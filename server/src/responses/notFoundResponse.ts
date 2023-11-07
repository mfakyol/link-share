import logger from '../utils/logger';
import { Request, Response } from 'express';
import HttpStatusCode from '../enums/HttpStatus';

function notFoundResponse(req: Request, res: Response, message?: string) {
  logger.error(`not_found:${req.originalUrl}${message ? `:message=${message}` : ''}`);
  return res.status(HttpStatusCode.NOT_FOUND).send({ status: false, message: message || 'not_found' });
}

export default notFoundResponse;
