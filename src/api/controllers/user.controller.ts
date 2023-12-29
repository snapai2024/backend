import { Response } from 'express';
import { UserService } from '../services/user.service';
import { CreateUserDto, User, UpdateUserDto, UserDto } from '../models';
import { CausalError } from '../../common/errors/causal.error';
import { CustomRequest } from '../../common/entities/customRequest';
import { UserParser } from '../parsers/user.parser';

export interface UserController {
  getAll(req: CustomRequest, res: Response): any;
  getById(req: CustomRequest, res: Response): any;
  getCurrent(req: CustomRequest, res: Response): any;
  register(req: CustomRequest, res: Response): any;
  update(req: CustomRequest, res: Response): any;
  delete(req: CustomRequest, res: Response): any;
}

class _UserController implements UserController {
  public async getAll(req: CustomRequest, res: Response) {
    try {
      const users: User[] = await UserService.getAll();

      res.status(200).json(users);
    } catch (err) {
      res.status(400).json({ error: err as CausalError });
    }
  }

  public async getById(req: CustomRequest, res: Response) {
    try {
      const { id } = req.params;

      const user: User = await UserService.getById(Number(id));

      res.status(200).json(user);
    } catch (err) {
      res.status(400).json({ error: err as CausalError });
    }
  }

  public async getCurrent(req: CustomRequest, res: Response) {
    try {
      const user: User = await UserService.getById(Number(req.user!.id));

      res.status(200).json(user);
    } catch (err) {
      res.status(400).json({ error: err as CausalError });
    }
  }

  public async register(req: CustomRequest, res: Response) {
    try {
      const { email, password, roleId } = req.body;

      const input: CreateUserDto = {
        email: email,
        password: password,
        roleId: roleId,
      };

      const userToCreate: User = UserParser.parseIn(input);

      const createdUser: User = await UserService.create(userToCreate);

      res.status(201).json(createdUser);
    } catch (err) {
      res.status(400).json({ error: err as CausalError });
    }
  }

  public async update(req: CustomRequest, res: Response) {
    try {
      const { id } = req.params;
      const { email, password, roleId } = req.body;

      const input: UpdateUserDto = {
        email: email,
        password: password,
        roleId: roleId,
      };

      const userToUpdate: User = UserParser.parseIn(input);

      const updatedUser: User = await UserService.update(Number(id), userToUpdate);

      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(400).json({ error: err as CausalError });
    }
  }

  public async delete(req: CustomRequest, res: Response) {
    try {
      const { id } = req.params;

      const deletedUser: User = await UserService.deleteById(Number(id));

      res.status(200).json(deletedUser);
    } catch (err) {
      res.status(400).json({ error: err as CausalError });
    }
  }
}

export const UserController: UserController = new _UserController();
