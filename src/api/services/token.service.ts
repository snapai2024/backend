import jwt, { JwtPayload } from 'jsonwebtoken';
import { User, AuthToken, AuthFactory } from '../models';
import { config } from '../../common/config/main';
import { IncomingHttpHeaders } from 'http';
import { BusinessError } from '../../common/errors/business.error';

export interface TokenService {
  generate(user: User): AuthToken;
  extractTokenFromHeaders(headers: IncomingHttpHeaders): string;
  validate(token: string): JwtPayload;
  extractUserFromDecodedToken(decodedToken: JwtPayload): Promise<User>;
}

class _TokenService implements TokenService {
  /**
   * Generates a new token for a specific user.
   *
   * @param user
   */
  public generate(user: User): AuthToken {
    const expirationDate: Date = new Date(new Date().setDate(new Date().getDate() + 1));

    const authToken: string = jwt.sign(
      {
        uid: user.uid,
      },
      config.jwtSecret,
      { subject: user.uid, expiresIn: '1d', issuer: config.apiName, algorithm: 'HS256' },
    );

    const auth: AuthToken = AuthFactory.token(authToken, expirationDate);

    return auth;
  }

  public extractTokenFromHeaders(headers: IncomingHttpHeaders): string {
    if (!headers.authorization || headers.authorization.split(' ')[0] !== 'Bearer')
      throw new BusinessError('Bearer not found in authorization header.');

    return headers.authorization.split(' ')[1];
  }

  public validate(token: string): JwtPayload {
    try {
      return jwt.verify(token, config.jwtSecret) as JwtPayload;
    } catch (err) {
      throw new BusinessError('Invalid authentication token.');
    }
  }

  public async extractUserFromDecodedToken(decodedToken: JwtPayload): Promise<User> {
    const userUid: string = (decodedToken as JwtPayload).uid;

    const user = await User.findOne({
      where: {
        uid: userUid,
      },
    });

    if (!user) throw new BusinessError('User does not exists.');

    return user;
  }
}

export const TokenService: TokenService = new _TokenService();
