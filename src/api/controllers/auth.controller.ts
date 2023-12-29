import { Response } from 'express';
import { AuthDTO, AuthToken } from '../models';
import { AuthService } from '../services/auth.service';
import { CausalError } from '../../common/errors/causal.error';
import { CustomRequest } from '../../common/entities/customRequest';

export interface AuthController {
  login(req: CustomRequest, res: Response): Promise<void>;
}

class _AuthController implements AuthController {
  public async login(req: CustomRequest, res: Response): Promise<void> {
    try {
      const authDTO: AuthDTO = {
        email: req.body.email,
        password: req.body.password,
      };

      const authToken: AuthToken = await AuthService.authenticate(authDTO);

      res.status(200).json(authToken);
    } catch (err) {
      res.status(401).json({ error: err as CausalError });
    }
  }
}

export const AuthController: AuthController = new _AuthController();
