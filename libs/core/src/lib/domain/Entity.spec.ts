import { Entity } from './Entity'
import { Identity } from './Identity'
type DummyProps = {
  dummy: string
}
class DummyEntity extends Entity<DummyProps, string> {}
describe('Entity', () => {
  let sut: Entity<DummyProps, string>
  const strId = new Identity('dummy')
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('should create an entity with passed props and id', () => {
    sut = new DummyEntity({ dummy: 'dummy' }, strId)
    expect(sut).toBeInstanceOf(DummyEntity)
    expect(sut.id).toEqual(strId)
    expect(sut.props).toEqual({ dummy: 'dummy' })
    expect(sut.record).toEqual({ _id: strId.value, dummy: 'dummy' })
  })
  it('should not assert that an entity is an entity', () => {
    expect(Entity.isEntity('')).toBeFalsy()
  })
  it('should assert that an entity is an entity', () => {
    sut = new DummyEntity({ dummy: 'dummy' }, strId)
    expect(Entity.isEntity(sut)).toBeTruthy()
  })
})
