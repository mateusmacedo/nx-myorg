import { DomainEvent } from './DomainEvent'
import { Entity } from './Entity'

export abstract class AggregateRoot<T> extends Entity<T> {
  private _domainEvents: Set<DomainEvent> = new Set()
  get domainEvents(): Set<DomainEvent> {
    return this._domainEvents
  }
  public addDomainEvent<TData>(domainEvent: DomainEvent<TData>): void {
    if (this._domainEvents.has(domainEvent)) return
    this._domainEvents.add(domainEvent)
  }
  public clearEvents(): void {
    this._domainEvents.clear()
  }
}
