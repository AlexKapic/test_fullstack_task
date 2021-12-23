import { NextFunction, Request, Response } from 'express';
import { HttpCode } from '../../common/enums';
import { HttpError } from '../../common/exceptions';
import { logger } from '../../common/utils/logger.util';
import { HttpErrorMessage } from '../../common/enums';

export const errorHandlerMiddleware = (
  err: HttpError,
  _: Request,
  res: Response,
  __: NextFunction,
): void => {
  logger.error(err);
  let status = HttpCode.INTERNAL_SERVER_ERROR;
  let message: string = HttpErrorMessage.INTERNAL_SERVER_ERROR;

  if (err instanceof HttpError) {
    status = err.status;
    message = err.message;
  }

  logger.error({ status, message });

  res.status(status).send({ error: message });
};
