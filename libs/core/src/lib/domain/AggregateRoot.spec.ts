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
class DummyDomainEvent extends DomainEvent<TDummy, string> {}
class DummyAggregateRoot extends AggregateRoot<TDummy, string> {
  constructor(props: TDummy, id: Identity<string>) {
    super(props, id)
  }
  static create(props: TDummy, id: Identity<string>): DummyAggregateRoot {
    const instance = new DummyAggregateRoot(props, id)
    const event = new DummyDomainEvent(props, id, new Date())
    instance.addDomainEvent(event)
    return instance
  }
}
describe('AggregateRoot', () => {
  let id: Identity<string>
  let sut: AggregateRoot<TDummy, string>
  let domainEvent: DomainEvent<TDummy, string>
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
  it('should instanciate ', () => {
    sut = new DummyAggregateRoot(tDummy, id)
    expect(sut).toBeTruthy()
    expect(sut.id).toBe(id)
    expect(sut.props).toBe(tDummy)
    expect(sut.domainEvents.size).toBe(0)
  })
  it('should instanciate with domain event', () => {
    sut = DummyAggregateRoot.create(tDummy, id)
    expect(sut).toBeTruthy()
    expect(sut.id).toBe(id)
    expect(sut.props).toBe(tDummy)
    expect(sut.domainEvents.size).toBe(1)
    domainEvent = sut.domainEvents.values().next().value
    expect(domainEvent).toBeInstanceOf(DummyDomainEvent)
    expect(domainEvent.getData()).toBe(tDummy)
    expect(domainEvent.getIdentity()).toBe(id)
    expect(domainEvent.getOccurred()).toBeInstanceOf(Date)
  })
  it('should clear domain events', () => {
    sut = DummyAggregateRoot.create(tDummy, id)
    expect(sut.domainEvents.size).toBe(1)
    sut.clearEvents()
    expect(sut.domainEvents.size).toBe(0)
  })
})
