import multer from 'multer';
import logger from '../utils/logger';
import { NextFunction, Response } from 'express';
import { Request } from 'express-serve-static-core';
import intervalServerErrorResponse from '../responses/intervalServerErrorResponse';
import errorMessageResponse from '../responses/errorMessageResponse';

export default function uploadFileMiddleware(
  filename: string,
  isFileArray?: boolean,
  fileArrayMaxCount?: number,
  options?: multer.Options,
) {
  return (req: Request, res: Response, next: NextFunction) => {
    const multerInstance = multer({ ...options });
    let upload;

    if (isFileArray) upload = multerInstance.array(filename, fileArrayMaxCount);
    else upload = multerInstance.single(filename);

    upload(req, res, function (err) {
      if (err) logger.error(JSON.stringify(err));
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        if (err.code === 'LIMIT_FILE_SIZE') {
          errorMessageResponse(req, res, `max_file_size_${options?.limits?.fileSize}_byte.`);
        }
        intervalServerErrorResponse(req, res);
      } else if (err) {
        // An unknown error occurred when uploading.
        if (err.message === 'LIMIT_FILE_TYPE') {
          errorMessageResponse(req, res, `file_type_not_allowed`);
        } else {
          intervalServerErrorResponse(req, res);
        }
      }
      // Everything went fine.
      else next();
    });
  };
}
