export class ValidationError extends Error {
  constructor(field: string, message: string) {
    super(message)
    this.name = field
  }
}
