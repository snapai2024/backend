import { Response, NextFunction } from 'express';
import { User } from '../models';
import { CausalError } from '../../common/errors/causal.error';
import { CustomRequest } from '../../common/entities/customRequest';
import { RoleNameEnum } from '../models';
import { AuthenticationError } from '../../common/errors/authentication.error';
import { AuthService } from '../services/auth.service';
import { Logger } from '../../common/services/logger';

export interface AuthenticationMiddleware {
  checkPermissions(roles: RoleNameEnum[]): any;
}

class _AuthenticationMiddleware implements AuthenticationMiddleware {
  checkPermissions(roles: RoleNameEnum[]) {
    return async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
      try {
        const user: User = await AuthService.getAuthenticatedUserFromHeaders(req.headers);

        if (roles.length && !roles.includes(user.role.name as RoleNameEnum))
          throw new AuthenticationError(`Access denied for user ${user.id} to the requested resource.`);

        req.user = user;

        next();
      } catch (err) {
        res.status(401).json({ error: err as CausalError });
      }
    };
  }
}

export const AuthenticationMiddleware: AuthenticationMiddleware = new _AuthenticationMiddleware();
