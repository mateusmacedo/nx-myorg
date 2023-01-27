export interface IClientConnection<T> {
  connect(): Promise<T>
  disconnect(): Promise<void>
  getInstance(): T
}
export interface IClientProducer<TMessage> {
  produce(message: TMessage): Promise<void>
}
export interface IClientSubscriber<TMessage> {
  subscribe(message: TMessage): Promise<void>
}
