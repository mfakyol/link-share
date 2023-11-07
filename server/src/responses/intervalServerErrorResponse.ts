import logger from '../utils/logger';
import { Request, Response } from 'express';
import HttpStatusCode from '../enums/HttpStatus';

function intervalServerErrorResponse(req: Request, res: Response, err?) {
  logger.error(`interval_server_error:${req.originalUrl}:${err}`);
  return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ status: false, message: 'interval_server_error' });
}

export default intervalServerErrorResponse;
