import { TIdentity } from '../Identity'

export type QueryProps = {
  [key: string]: unknown
}
export interface IRepository<T> {
  getPaginationParams(page: number, perPage?: number)

  list(
    filter?: QueryProps,
    page?: number,
    _perPage?: number
  ): Promise<{ rows: T[]; totalRows: number; perPage: number }>

  findOne(filter: Partial<QueryProps>): Promise<T>

  find(filter: Partial<QueryProps>): Promise<T[]>

  upsert(data: Partial<QueryProps>, _id?: TIdentity): Promise<T>

  remove(filter: Partial<QueryProps>): Promise<void>

  isValidIdKey(_id: string): boolean
}
