import { ValidationError } from './ValidationError'

export interface IValidator {
  validate: <T>(data: T) => Promise<ValidationError>
}
