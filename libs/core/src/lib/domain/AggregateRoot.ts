import { DomainEvent } from './DomainEvent'
import { Entity } from './Entity'

export type TDomainEvent<T, K> = DomainEvent<Partial<T>, K>

export abstract class AggregateRoot<T, K> extends Entity<T, K> {
  private _domainEvents: Set<TDomainEvent<T, K>> = new Set()
  get domainEvents(): Set<TDomainEvent<T, K>> {
    return this._domainEvents
  }
  protected addDomainEvent(domainEvent: TDomainEvent<T, K>): void {
    this._domainEvents.add(domainEvent)
  }
  public clearEvents(): void {
    this._domainEvents.clear()
  }
}
