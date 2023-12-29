import { Request } from 'express';
import { User } from '../../api/models';

export interface CustomRequest extends Request {
  user?: User;
}
