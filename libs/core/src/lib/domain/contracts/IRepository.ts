import { TIdentity } from '../Identity'

export type PaginationParams = {
  page: number
  perPage: number
}
export type PaginatedResult<T> = {
  rows: Set<T>
  total: number
} & PaginationParams
export interface IReadRepository<T> {
  findOne(filter: Partial<T>): Promise<T>
  find(filter: Partial<T>, pagination: PaginationParams): Promise<PaginatedResult<T>>
}
export interface IWriteRepository<T> {
  upsert(data: Partial<T>, identity?: TIdentity): Promise<T>
  remove(filter: Partial<T>): Promise<void>
}
export type TUpsertRepository<T> = Pick<IWriteRepository<T>, 'upsert'>
