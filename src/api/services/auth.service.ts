import { AuthenticationError } from '../../common/errors/authentication.error';
import bcrypt from 'bcrypt';
import { TokenService } from './token.service';
import { User, AuthToken, AuthDTO } from '../models';
import { IncomingHttpHeaders } from 'http';
import { JwtPayload } from 'jsonwebtoken';
import { CausalError } from '../../common/errors/causal.error';

export interface AuthService {
  authenticate(authDTO: AuthDTO): Promise<AuthToken>;
  getAuthenticatedUserFromHeaders(headers: IncomingHttpHeaders): Promise<User>;
}

class _AuthService implements AuthService {
  /**
   * Authenticates a user.
   *
   * @param password
   * @param username
   * @param email
   */
  public async authenticate(authDTO: AuthDTO): Promise<AuthToken> {
    const existingUser = await User.findOne({
      where: {
        email: authDTO.email,
      },
    });

    if (!existingUser) throw new AuthenticationError('Incorrect login or password.');

    const isPasswordCorrect: boolean = await this.checkPassword(authDTO.password, existingUser.password);

    if (!isPasswordCorrect) throw new AuthenticationError('Incorrect login or password.');

    const authToken: AuthToken = TokenService.generate(existingUser);

    return authToken;
  }

  private async checkPassword(entry: string, userPassword: string): Promise<boolean> {
    return await bcrypt.compare(entry, userPassword);
  }

  public async getAuthenticatedUserFromHeaders(headers: IncomingHttpHeaders): Promise<User> {
    try {
      const token: string = TokenService.extractTokenFromHeaders(headers);

      const decodedToken: JwtPayload = TokenService.validate(token);

      const user: User = await TokenService.extractUserFromDecodedToken(decodedToken);

      return user;
    } catch (err) {
      throw new AuthenticationError(`User is not logged in : ${(err as CausalError).message}`);
    }
  }
}

export const AuthService: AuthService = new _AuthService();
