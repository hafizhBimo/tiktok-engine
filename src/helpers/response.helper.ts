import { Logger } from '@nestjs/common';
import { Response } from 'express';

export class ResponseHelper {
  responseSuccess = (res, code, message) => {
    return res.status(code).send({
      code,
      status: 'success',
      message,
    });
  };
  responseSuccessData = (res, code, message, data) => {
    return res.status(code).send({
      code,
      status: 'success',
      message,
      data,
    });
  };

  responseSuccessDataFile = (res, code, message, hostname, data) => {
    return res.status(code).send({
      code,
      status: 'success',
      message,
      hostname,
      data,
    });
  };

  responseClientError = (res, code, message) => {
    return res.status(code).send({
      code,
      status: 'error',
      message,
    });
  };
  responseServerError = (res, error) => {
    const logger = new Logger();
    logger.error(error);
    return res.status(500).send({
      code: 500,
      status: 'error',
      message: 'Internal Server Error',
    });
  };
  responseUnAuthorized = (res: Response) => {
    return res.status(401).send({
      code: 401,
      status: 'error',
      message: 'Unauthorized',
    });
  };
}
