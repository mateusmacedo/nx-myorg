import { AggregateRoot } from '../domain/AggregateRoot'
import { DomainEvent } from '../domain/DomainEvent'
import { Identity, TIdentity } from '../domain/Identity'
import { IHandler } from './IHandle'

export class HandlerMediator {
  private static handlersMap: Array<Set<IHandler<unknown, unknown>>>
  private static markedAggregates: AggregateRoot<unknown>[] = []

  public static register<T, K>(handler: IHandler<T, K>, event: DomainEvent): void {
    const subject: string = event.constructor.name
    if (!HandlerMediator.handlersMap[subject]) {
      HandlerMediator.handlersMap[subject] = new Set<IHandler<unknown, unknown>>()
    }
    HandlerMediator.handlersMap[subject].add(handler)
  }
  public static getHandlersForEvent(event: DomainEvent): Set<IHandler<unknown, unknown>> {
    const subject: string = event.constructor.name
    return HandlerMediator.handlersMap[subject]
  }
  private static findMarkedAggregateByID(id: Identity<TIdentity>): AggregateRoot<unknown> {
    let found: AggregateRoot<unknown> = null
    for (const aggregate of HandlerMediator.markedAggregates) {
      if (aggregate.id.equals(id)) {
        found = aggregate
      }
    }
    return found
  }
  public static markAggregateForDispatch<T>(aggregate: AggregateRoot<T>): void {
    const aggregateFound = !!HandlerMediator.findMarkedAggregateByID(aggregate.id)
    if (!aggregateFound) {
      HandlerMediator.markedAggregates.push(aggregate)
    }
  }
  private static async dispatch(event: DomainEvent): Promise<void> {
    const subject: string = event.constructor.name
    if (HandlerMediator.handlersMap[subject]) {
      const handlers: Set<IHandler<unknown, unknown>> = HandlerMediator.handlersMap[subject]
      for (const handler of handlers) {
        await handler.handle(event)
      }
    }
  }
  private static async dispatchAggregateEvents(aggregate: AggregateRoot<unknown>): Promise<void> {
    for (const event of aggregate.domainEvents) {
      await HandlerMediator.dispatch(event)
      aggregate.clearEvents()
      HandlerMediator.removeAggregateFromMarkedDispatchList(aggregate)
    }
  }
  public static async dispatchEventsForAggregate(aggregate: AggregateRoot<unknown>): Promise<void> {
    const found = HandlerMediator.findMarkedAggregateByID(aggregate.id)
    if (aggregate) {
      HandlerMediator.dispatchAggregateEvents(found)
    }
  }

  private static removeAggregateFromMarkedDispatchList(aggregate: AggregateRoot<unknown>): void {
    const index = HandlerMediator.markedAggregates.findIndex((a) => a.id.equals(aggregate.id))
    HandlerMediator.markedAggregates.splice(index, 1)
  }
  public static clearHandlers(): void {
    HandlerMediator.handlersMap = []
  }
  public static clearMarkedAggregates(): void {
    HandlerMediator.markedAggregates = []
  }
}
