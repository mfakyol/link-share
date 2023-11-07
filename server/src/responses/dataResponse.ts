
import { Request, Response } from 'express';
import HttpStatusCode from '../enums/HttpStatus';

function dataResponse(_req: Request, res: Response, data:unknown) {
  return res.status(HttpStatusCode.OK).send({ status: true, data });
}

export default dataResponse;
