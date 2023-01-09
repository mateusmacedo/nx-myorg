import { Identity } from './Identity'

export abstract class DomainEvent<TData, TKey> {
  private readonly name: string
  constructor(
    private readonly data: TData,
    private readonly identity: Identity<TKey>,
    private readonly occurred: Date
  ) {
    this.name = this.constructor.name
  }
  getName(): string {
    return this.name
  }
  getIdentity(): Identity<TKey> {
    return this.identity
  }
  getData(): TData {
    return this.data
  }
  getOccurred(): Date {
    return this.occurred
  }
}
