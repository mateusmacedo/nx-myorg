import { CompositeValidator } from './CompositeValidator'
import { IValidator } from './IValidator'
import { ValidationError } from './ValidationError'

describe('CompositeValidator', () => {
  class DummyValidator implements IValidator {
    validate<T>(data: T): Promise<ValidationError> {
      return Promise.resolve(null)
    }
  }
  class DummyCompositeValidator extends CompositeValidator {
    validate<T>(data: T): Promise<ValidationError> {
      return Promise.resolve(null)
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
})
