import { ValueObject } from './ValueObject'

describe('ValueObject', () => {
  type Props = {
    dummy: string
  }
  class DummyValueObject extends ValueObject<Props> {}
  let sut: ValueObject<Props>
  beforeEach(() => {
    jest.clearAllMocks()
    sut = new DummyValueObject({ dummy: 'dummy' })
  })
  it('should be defined', () => {
    expect(sut).toBeDefined()
  })
  it('should be equal to itself', () => {
    expect(sut.equals(sut)).toBeTruthy()
  })
  it('should be equal to another instance with the same props', () => {
    expect(sut.equals(new DummyValueObject({ dummy: 'dummy' }))).toBeTruthy()
  })
  it('should not be equal to another instance with different props', () => {
    expect(sut.equals(new DummyValueObject({ dummy: 'different' }))).toBeFalsy()
  })
  it('should not be equal to null', () => {
    expect(sut.equals(null)).toBeFalsy()
  })
  it('should not be equal to undefined', () => {
    expect(sut.equals(undefined)).toBeFalsy()
  })
  it('should not be equal to an object without props', () => {
    const dummy = new DummyValueObject({ dummy: 'dummy' })
    dummy['props'] = undefined
    expect(sut.equals(dummy)).toBeFalsy()
  })
})
