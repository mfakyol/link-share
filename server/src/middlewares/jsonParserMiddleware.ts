import express, { NextFunction, Request, Response } from 'express';
import logger from '../utils/logger';
import badRequestResponse from '../responses/badRequestResponse';

const jsonParser = express.json();

export default function jsonParserMiddleware(req: Request, res: Response, next: NextFunction) {
  return jsonParser(req, res, function (err) {
    if (err && err.status === 400 && 'body' in err) {
      logger.error(JSON.stringify(err));
      badRequestResponse(req, res);
    } else next();
  });
}
