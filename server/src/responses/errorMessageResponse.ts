import { Request, Response } from 'express';
import HttpStatusCode from '../enums/HttpStatus';

function errorMessageResponse(_req: Request, res: Response, message?: string) {
  return res.status(HttpStatusCode.OK).send({ status: false, message: message });
}

export default errorMessageResponse;
