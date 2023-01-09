import { Identity } from './Identity'
import { DomainEvent } from './DomainEvent'

describe('DomainEvent', () => {
  type TDummyEventData = { dummy: string }
  class DummyEvent extends DomainEvent<TDummyEventData, string> {}
  let sut: DummyEvent
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('should create a dummy domain event', () => {
    const dummyEventData: TDummyEventData = { dummy: 'dummy' }
    sut = new DummyEvent(dummyEventData, new Identity('dummy'), new Date())
    expect(sut).toBeDefined()
    expect(sut.getName()).toEqual('DummyEvent')
    expect(sut.getData()).toEqual(dummyEventData)
    expect(sut.getIdentity()).toBeInstanceOf(Identity)
    expect(sut.getOccurred()).toBeInstanceOf(Date)
  })
})
