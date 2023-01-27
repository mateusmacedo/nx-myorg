export interface IEventProducer<T> {
  produce(event: T): Promise<void>
}
