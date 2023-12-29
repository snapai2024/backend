import { CausalError } from './causal.error';

/**
 * This Error refer to errors send from business logic
 */
export class BusinessError extends CausalError {
  constructor(public message: string, public options?: ErrorOptions) {
    super(`[BUSINESS:ERROR]: ${message}`, options);
  }
}
