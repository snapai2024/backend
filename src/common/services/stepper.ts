export interface Stepper {
  nextStep(): void;
  getCurrentStep(): number;
  getNbSteps(): number;
  toString(): string;
}

/**
 * This helper format string in step counter
 */
class _Stepper implements Stepper {
  private currentStep: number = 1;

  constructor(private nbSteps: number) {}
  nextStep(): void {
    if (this.currentStep >= this.nbSteps) return;
    this.currentStep++;
  }
  getCurrentStep(): number {
    return this.currentStep;
  }
  getNbSteps(): number {
    return this.nbSteps;
  }
  toString(): string {
    return `Etape ${this.getCurrentStep()} / ${this.getNbSteps()}`;
  }
}

export const StepperFactory = {
  create: (nbSteps: number) => new _Stepper(nbSteps),
};
