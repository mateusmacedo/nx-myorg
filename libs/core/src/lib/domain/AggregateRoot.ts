import { DomainEvent } from './DomainEvent'
import { Entity } from './Entity'

export abstract class AggregateRoot<T> extends Entity<T> {
  private _domainEvents: Set<DomainEvent> = new Set()
  get domainEvents(): Set<DomainEvent> {
    return this._domainEvents
  }
  public addDomainEvent(domainEvent: DomainEvent): void {
    if (this._domainEvents.has(domainEvent)) return
    this._domainEvents.add(domainEvent)
    this.logDomainEventAdded(domainEvent)
  }
  public clearEvents(): void {
    this._domainEvents.clear()
  }
  private logDomainEventAdded(domainEvent: DomainEvent): void {
    const thisClass = Reflect.getPrototypeOf(this)
    console.info(
      thisClass.constructor.name,
      '[Emitted]:',
      domainEvent.getName(),
      '[Occurred]:',
      domainEvent.getOccurred(),
      '[Data]:',
      domainEvent.getData()
    )
  }
}
