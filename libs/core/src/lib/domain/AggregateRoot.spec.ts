import { AggregateRoot } from './AggregateRoot'
import { DomainEvent } from './DomainEvent'
import { Identity } from './Identity'

type TDummy = {
  strProp: string
  numProp: number
  arrProp: string[]
  dummyEmbed: {
    dummyEmbedProp: string
  }
}
class DummyDomainEvent extends DomainEvent<TDummy> {}
class DummyAggregateRoot extends AggregateRoot<TDummy> {}
describe('AggregateRoot', () => {
  let id: Identity<string>
  let sut: AggregateRoot<TDummy>
  let domainEvent: DomainEvent
  let tDummy: TDummy
  beforeEach(() => {
    jest.clearAllMocks()
    id = new Identity('dummyId')
    tDummy = {
      strProp: 'strProp',
      numProp: 1,
      arrProp: ['arrProp'],
      dummyEmbed: {
        dummyEmbedProp: 'dummyEmbedProp'
      }
    }
  })
  it('should create an instance', () => {
    sut = new DummyAggregateRoot(tDummy, id)
    expect(sut).toBeTruthy()
    expect(sut.id).toBe(id)
    expect(sut.props).toBe(tDummy)
    expect(sut.domainEvents.size).toBe(0)
  })
  it('should add domain event', () => {
    sut = new DummyAggregateRoot(tDummy, id)
    domainEvent = new DummyDomainEvent(tDummy, new Date())
    sut.addDomainEvent(domainEvent)
    expect(sut.domainEvents.size).toBe(1)
    expect(sut.domainEvents.has(domainEvent)).toBeTruthy()
  })
  it('should not add domain event if already added', () => {
    sut = new DummyAggregateRoot(tDummy, id)
    domainEvent = new DummyDomainEvent(tDummy, new Date())
    sut.addDomainEvent(domainEvent)
    sut.addDomainEvent(domainEvent)
    expect(sut.domainEvents.size).toBe(1)
    expect(sut.domainEvents.has(domainEvent)).toBeTruthy()
  })
  it('should clear domain events', () => {
    sut = new DummyAggregateRoot(tDummy, id)
    domainEvent = new DummyDomainEvent(tDummy, new Date())
    sut.addDomainEvent(domainEvent)
    sut.clearEvents()
    expect(sut.domainEvents.size).toBe(0)
  })
})
