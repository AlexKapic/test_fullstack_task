import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { HttpCode, HttpErrorMessage } from '../../common/enums';
import whiteListRoutes from '../../config/white-list-routes-config';
import { IRequestWithUser } from '../../common/interfaces/http';
import { env } from '../../env';

export const auth = (
  req: IRequestWithUser,
  res: Response,
  next: NextFunction,
): void => {
  if (whiteListRoutes.includes(req.path)) {
    return next();
  }

  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const decoded = jwt.verify(token, env.app.secretKey) as { userId: string };

    req.userId = decoded.userId;

    next();
  } catch (err) {
    res
      .status(HttpCode.UNAUTHORIZED)
      .json({ msg: HttpErrorMessage.UNAUTHORIZED, error: err });
  }
};
