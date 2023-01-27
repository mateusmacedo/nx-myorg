export type THandlerResult<TResult> = TResult | Promise<TResult>
export interface IHandler<TData, TResult>{
  handle(data: TData): THandlerResult<TResult>
}





