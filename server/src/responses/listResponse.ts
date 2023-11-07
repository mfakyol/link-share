
import { Request, Response } from 'express';
import HttpStatusCode from '../enums/HttpStatus';

function listResponse(_req: Request, res: Response, list:unknown[]) {
  return res.status(HttpStatusCode.OK).send({ status: true, list });
}

export default listResponse;
