import bcrypt from 'bcrypt';
import { BusinessError } from '../../common/errors/business.error';
import { User } from '../models';
import Role from '../models/role.model';
import { v4 as uuidv4 } from 'uuid';

export interface UserService {
  getAll(): Promise<User[]>;
  getById(id: number): Promise<User>;
  create(input: User): Promise<User>;
  update(id: number, input: User): Promise<User>;
  deleteById(id: number): Promise<User>;
}

class _UserService implements UserService {
  private emailRegex = RegExp(
    '(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])',
  );

  /**
   * Get a specific user.
   */
  public async getAll(): Promise<User[]> {
    const users: User[] = await User.findAll();

    return users;
  }

  /**
   * Get a specific user.
   *
   * @param id
   */
  public async getById(id: number): Promise<User> {
    const user = await User.findByPk(id);

    if (!user) throw new BusinessError('User does not exists.');

    return user;
  }

  /**
   * Creates a new user.
   *
   * @param user
   */
  public async create(input: User): Promise<User> {
    this.validateEmail(input.email, this.emailRegex);

    const existingUser = await User.findOne({
      where: {
        email: input.email,
      },
    });

    if (existingUser) throw new BusinessError('User already exists.');

    const cryptedPassword = await bcrypt.hash(input.password, 10);

    const role = await Role.findByPk(input.roleId);

    if (!role) throw new BusinessError(`Role id '${input.roleId}' does not exists.`);

    const uid: string = await this.generateUid();

    const createdUser = await User.create({
      uid: uid,
      email: input.email,
      password: cryptedPassword,
      roleId: role.id,
    });

    return createdUser.reload();
  }

  /**
   * Updates a specific user.
   *
   * @param id
   * @param user
   */
  public async update(id: number, input: User): Promise<User> {
    const user = await User.findByPk(id);

    if (!user) throw new BusinessError('User does not exists.');

    // for(let key in input) {
    //   if (user.dataValues[key] !== input.dataValues[key]) {
    //     user.dataValues[key] = input.dataValues[key]
    //   }
    // }

    if (input.email !== user.email) {
      this.validateEmail(input.email, this.emailRegex);

      const existingUser = await User.findOne({
        where: {
          email: input.email,
        },
      });

      if (existingUser) throw new BusinessError('User already exists.');

      user.email = input.email;
    }

    if (input.password) {
      const cryptedPassword = await bcrypt.hash(input.password, 10);

      user.password = cryptedPassword;
    }

    if (input.roleId !== user.roleId) {
      const role = await Role.findByPk(input.roleId);

      if (!role) throw new BusinessError(`Role id '${input.roleId}' does not exists.`);

      user.roleId = role.id;
    }

    await user.save();

    return user.reload();
  }

  /**
   * Deletes a specific user by id.
   *
   * @param id
   */
  public async deleteById(id: number): Promise<User> {
    const user = await User.findByPk(id);

    if (!user) throw new BusinessError('User does not exists.');

    await user.destroy();

    return user;
  }

  private validateEmail(email: string, regex: RegExp): boolean {
    if (!regex.test(email)) throw new BusinessError('Invalid email format.');
    return true;
  }

  private async generateUid(): Promise<string> {
    const users: User[] = await User.findAll();

    const uid_list: string[] = users.map((user) => {
      return user.uid;
    });

    let uid: string = uuidv4();

    while (uid_list.includes(uid)) uid = uuidv4();

    return uid;
  }
}

export const UserService: UserService = new _UserService();
