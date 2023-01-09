export interface IEventSubscriber {
  subscribe<T>(event: T): void
}
