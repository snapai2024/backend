/**
 * This Error use the cause mechanism introduce in ES2022 to format error in Java style
 */
export class CausalError extends Error {
  constructor(public message: string, public options?: ErrorOptions) {
    super(message, options);
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, CausalError.prototype);
  }

  get fullstack(): string | undefined {
    if (!this.stack) return;

    let result = `${this.stack}\n`;
    let cause = this.cause as Error | undefined;

    while (cause) {
      result += `Caused by: ${cause.stack}\n`;
      cause = cause.cause as Error | undefined;
    }

    return result;
  }
}
