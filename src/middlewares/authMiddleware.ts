import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import logger from '../config/logger';
import { ApiError } from '../utils/ApiError'
import { Roles } from '../config/roles'
import passport from 'passport';
import '../config/passport';

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Express {
        // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
        export interface Request {
            user?: User
        }
    }
}

export class AuthMiddleware {
    private verifyCallback = (req: Request, resolve: any, reject: (arg) => void, requiredRights: string[]) => async (err: any, user: any, info: any) => {
        if (err || info || !user) {
            return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
        }
        req.user = user;

        if (requiredRights.length) {
            const userRights = Roles.roleRights.get(user.role);
            const hasRequiredRights = requiredRights.every((requiredRight) => userRights.includes(requiredRight));
            if (!hasRequiredRights && req.params.userId !== user.id) {
                return reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));
            }
        }

        resolve();
    };

    public auth = (...requiredRights: string[]) => async (req: Request, res: Response, next: NextFunction) => {
        return new Promise((resolve, reject) => {
            passport.authenticate('jwt', { session: false }, this.verifyCallback(req, resolve, reject, requiredRights))(req, res, next);
        })
            .then(() => next())
            .catch((err) => next(err));
    };
}
