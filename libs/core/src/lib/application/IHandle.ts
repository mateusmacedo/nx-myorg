export interface IHandler<TData, TResult> {
  handle(data: TData): TResult | Promise<TResult>
}
