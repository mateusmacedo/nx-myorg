import { IValidator } from '../contracts/IValidator'
import { CompositeValidator } from './CompositeValidator'
import { ValidationError } from './ValidationError'

describe('CompositeValidator', () => {
  class DummyValidator implements IValidator {
    validate<T>(data: T): Promise<ValidationError | ValidationError[]> {
      console.info('DummyValidator.validate:', data)
      return Promise.resolve(null)
    }
  }
  class DummyCompositeValidator extends CompositeValidator {
    private _errors: ValidationError[] = []
    async validate<T>(data: T): Promise<ValidationError | ValidationError[]> {
      for (const validator of this._validators) {
        const error = await validator.validate(data)
        if (Array.isArray(error)) {
          this._errors = this._errors.concat(error)
        } else if (error instanceof ValidationError) {
          this._errors.push(error)
        } else {
          return Promise.resolve(null)
        }
      }
      return Promise.resolve(this._errors)
    }
  }
  let validator: IValidator
  let validatorSet: Set<IValidator>
  let sut: CompositeValidator
  beforeEach(() => {
    jest.clearAllMocks()
    validator = new DummyValidator()
    validatorSet = new Set<IValidator>([validator])
  })
  it('should create a instance with validators', () => {
    sut = new DummyCompositeValidator(validatorSet)
    expect(sut).toBeInstanceOf(CompositeValidator)
  })
  it('should create a instance without validators', () => {
    sut = new DummyCompositeValidator()
    expect(sut).toBeInstanceOf(CompositeValidator)
  })
  it('should add a validator', () => {
    sut = new DummyCompositeValidator()
    sut.addValidator('test', validator)
    expect(sut.getValidators()).toEqual(validatorSet)
  })
  it('should not add a validator if it already exists', () => {
    sut = new DummyCompositeValidator(validatorSet)
    sut.addValidator('test', validator)
    expect(sut.getValidators()).toEqual(validatorSet)
  })
  it('should validate', async () => {
    sut = new DummyCompositeValidator(validatorSet)
    const result = await sut.validate('test')
    expect(result).toBeNull()
  })
  it('should not validate', async () => {
    const error = new ValidationError('test', 'test')
    jest.spyOn(validator, 'validate').mockResolvedValue(error)
    sut = new DummyCompositeValidator(validatorSet)
    const result = (await sut.validate('test')) as ValidationError[]
    expect(result).toEqual([error])
  })
})
