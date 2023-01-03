import { ValidationError } from '../validation/ValidationError'

export interface IValidator {
  validate: <T>(data: T) => Promise<ValidationError | ValidationError[]>
}
