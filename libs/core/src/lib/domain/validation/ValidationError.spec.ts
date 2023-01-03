import { ValidationError } from './ValidationError'

describe('ValidationError', () => {
  let sut: ValidationError
  it('should create a instance', () => {
    sut = new ValidationError('field', 'message')
    expect(sut).toBeInstanceOf(ValidationError)
    expect(sut.name).toBe('field')
    expect(sut.message).toBe('message')
  })
})
