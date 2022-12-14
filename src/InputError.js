export const ERROR_INVALID_INPUT = 'INVALID_INPUT';
export const errorMessages = {
  invalidInput: 'Invalid input',
  operationFailed: 'Operation failed',
};

export class InputError extends Error {
  constructor() {
    super();

    this.code = ERROR_INVALID_INPUT;
  }
}