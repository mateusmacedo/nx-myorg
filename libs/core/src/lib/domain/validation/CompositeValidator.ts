import { IValidator } from './IValidator'
import { ValidationError } from './ValidationError'

export abstract class CompositeValidator implements IValidator {
  _validators: Set<IValidator>
  constructor(validators?: Set<IValidator>) {
    this._validators = validators || new Set<IValidator>()
  }

  addValidator(target: string, validator: IValidator) {
    if (!this._validators.has(validator)) {
      this._validators.add(validator)
    }
  }

  getValidators(): Set<IValidator> {
    return this._validators
  }

  abstract validate<T>(data: T): Promise<ValidationError | ValidationError[]>
}
