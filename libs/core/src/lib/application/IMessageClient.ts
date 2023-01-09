export interface IClientConnection<T> {
  connect(): Promise<T>
  disconnect(): Promise<void>
  getInstance(): T
}
export interface IClientProducer<T> {
  produce(message: T): Promise<void>
}
export interface IClientSubscriber<T> {
  subscribe(message: T): Promise<void>
}
