import { Request, Response } from 'express';
import HttpStatusCode from '../enums/HttpStatus';

function successResponse(_req: Request, res: Response) {
  return res.status(HttpStatusCode.OK).send({ status: true });
}

export default successResponse;
