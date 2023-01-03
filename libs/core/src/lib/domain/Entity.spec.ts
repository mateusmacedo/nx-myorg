import { Entity } from './Entity'
import { Identity } from './Identity'

describe('Entity', () => {
  type DummyProps = {
    dummy: string
  }
  class DummyEntity extends Entity<DummyProps> {}
  let sut: DummyEntity
  const strId = new Identity<string>('dummy')
  const numId = new Identity<number>(1)
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('should create an entity with passed props and number as id', () => {
    sut = new DummyEntity({ dummy: 'dummy' }, numId)
    expect(sut).toBeInstanceOf(DummyEntity)
  })
  it('should create an entity with passed props and string as id', () => {
    sut = new DummyEntity({ dummy: 'dummy' }, strId)
    expect(sut).toBeInstanceOf(DummyEntity)
  })
  it('should assert that an entity is an entity', () => {
    sut = new DummyEntity({ dummy: 'dummy' }, strId)
    expect(Entity.isEntity(sut)).toBeTruthy()
  })
  it('should not assert that an entity is an entity', () => {
    expect(Entity.isEntity('')).toBeFalsy()
  })
  it('should return the id of the entity', () => {
    sut = new DummyEntity({ dummy: 'dummy' }, strId)
    expect(sut.id).toEqual(strId)
  })
  it('should return the props of the entity', () => {
    sut = new DummyEntity({ dummy: 'dummy' }, strId)
    expect(sut.props).toEqual({ dummy: 'dummy' })
  })
  it('should return the record of the entity', () => {
    sut = new DummyEntity({ dummy: 'dummy' }, strId)
    expect(sut.record).toEqual({ id: strId, dummy: 'dummy' })
  })
})
