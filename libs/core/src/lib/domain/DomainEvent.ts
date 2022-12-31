export abstract class DomainEvent<TData = unknown> {
  private readonly name: string
  constructor(private readonly data: TData, private readonly occurred: Date) {
    this.name = this.constructor.name
  }
  getName(): string {
    return this.name
  }
  getData(): TData {
    return this.data
  }
  getOccurred(): Date {
    return this.occurred
  }
}
