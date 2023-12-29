import { CausalError } from './causal.error';

/**
 * This Error refer to errors send from authentication system
 */
export class AuthenticationError extends CausalError {
  constructor(public message: string, public options?: ErrorOptions) {
    super(`[AUTHENTICATION:ERROR]: ${message}`, options);
  }
}
