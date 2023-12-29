import { User, UserDto } from '../models';

export interface UserParser {
  parseIn(user: Partial<UserDto>): User;
}

class _UserParser {
  parseIn(user: Partial<UserDto>): User {
    return User.build({
      email: user.email,
      password: user.password,
      roleId: user.roleId,
    });
  }
}

export const UserParser: UserParser = new _UserParser();
