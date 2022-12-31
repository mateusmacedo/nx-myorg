import { AggregateRoot } from '../domain/AggregateRoot'
import { DomainEvent } from '../domain/DomainEvent'
import { Identity } from '../domain/Identity'
import { HandlerMediator } from './HandlerMediator'
import { IHandler } from './IHandle'

class DummyDomainEvent extends DomainEvent {}
class DummyHandlerOne implements IHandler<DummyDomainEvent, string> {
  async handle(event: DummyDomainEvent): Promise<string> {
    console.info('HandlerOne:', event, 'When:', new Date())
    return Promise.resolve('dummy')
  }
}
class DummyHandlerTwo implements IHandler<DummyDomainEvent, number> {
  handle(event: DummyDomainEvent): number {
    console.info('HandlerTwo:', event, 'When:', new Date())
    return 2
  }
}
type DummyAggregateRootProps = {
  dummy: string
}
class DummyAggregateRoot extends AggregateRoot<DummyAggregateRootProps> {}

describe('HandlerMediator', () => {
  const handlerOne = new DummyHandlerOne()
  const handlerTwo = new DummyHandlerTwo()
  let event: DummyDomainEvent
  let aggregate: DummyAggregateRoot
  beforeEach(() => {
    jest.clearAllMocks()
    HandlerMediator.clearHandlers()
    event = new DummyDomainEvent(
      {
        dummy: 'dummy'
      },
      new Date()
    )
    aggregate = new DummyAggregateRoot({ dummy: 'dummy' }, new Identity('dummy'))
  })
  it('should register a handler', () => {
    HandlerMediator.register(handlerOne, event)
    expect(HandlerMediator.getHandlersForEvent(event)).toEqual(new Set([handlerOne]))
  })
  it('should register multiple handlers', () => {
    HandlerMediator.register(handlerOne, event)
    HandlerMediator.register(handlerTwo, event)
    expect(HandlerMediator.getHandlersForEvent(event)).toEqual(new Set([handlerOne, handlerTwo]))
  })
  it('should not register the same handler twice for the same event', () => {
    HandlerMediator.register(handlerOne, event)
    HandlerMediator.register(handlerOne, event)
    expect(HandlerMediator.getHandlersForEvent(event)).toEqual(new Set([handlerOne]))
  })
  it('should mark an aggregate for dispatch', () => {
    HandlerMediator.markAggregateForDispatch(aggregate)
    expect(HandlerMediator['markedAggregates']).toEqual([aggregate])
  })
  it('should not mark an aggregate for dispatch twice', () => {
    HandlerMediator.markAggregateForDispatch(aggregate)
    HandlerMediator.markAggregateForDispatch(aggregate)
    expect(HandlerMediator['markedAggregates']).toEqual([aggregate])
  })
  it('should dispatch events for an aggregate', async () => {
    const markFindSpy = jest.spyOn(HandlerMediator, 'markAggregateForDispatch')
    const dispatchSpy = jest.spyOn(HandlerMediator, 'dispatchEventsForAggregate')
    // const dispatchOneSpy = jest.spyOn(handlerOne, 'handle')
    HandlerMediator.register(handlerOne, event)
    HandlerMediator.register(handlerTwo, event)
    aggregate.addDomainEvent(event)
    HandlerMediator.markAggregateForDispatch(aggregate)
    await HandlerMediator.dispatchEventsForAggregate(aggregate)
    expect(markFindSpy).toHaveBeenCalledTimes(1)
    expect(markFindSpy).toHaveBeenCalledWith(aggregate)
    expect(dispatchSpy).toHaveBeenCalledTimes(1)
    expect(dispatchSpy).toHaveBeenCalledWith(aggregate)
    // expect(dispatchOneSpy).toHaveBeenCalledTimes(1)
  })
})
