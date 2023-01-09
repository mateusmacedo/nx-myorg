import { Model, UpdateQuery, isValidObjectId } from 'mongoose'
import { IReadRepository, IWriteRepository } from '../../domain/contracts/IRepository'
import { PaginationParams, PaginatedResult } from '../../domain/contracts/IRepository'

export type TMongoPaginationParams = {
  take: number
  skip: number
}

export abstract class MongoBaseRepository<T> implements IReadRepository<T>, IWriteRepository<T> {
  constructor(private schema: Model<T>) {}
  getPaginationParams(paginationParams: PaginationParams): TMongoPaginationParams {
    const perPage = paginationParams.perPage ?? 10 //default 10 registros
    const page = paginationParams.page ?? 1 //default 1
    const pageNumber = page ? page - 1 : 0
    const skip = perPage * pageNumber
    return { take: perPage, skip: skip } as TMongoPaginationParams
  }
  async findOne(filter: T): Promise<T> {
    return await this.schema.findOne(filter)
  }
  async find(filter: T, pagination: PaginationParams): Promise<PaginatedResult<T>> {
    const { take, skip } = this.getPaginationParams(pagination)
    const countResult = await this.schema.count({ where: filter })
    const rows = await this.schema.find(filter).skip(skip).limit(take)
    return {
      rows: new Set<T>(rows),
      total: countResult,
      page: pagination.page,
      perPage: pagination.perPage
    }
  }
  async upsert(data: T | UpdateQuery<T>, _id?: number | string): Promise<T> {
    if (_id) {
      return await this.schema.findOneAndUpdate({ _id }, data, {
        returnOriginal: false
      })
    } else {
      return (await new this.schema(data).save()) as T
    }
  }
  async remove(filter: T): Promise<void> {
    return await this.schema.remove(filter)
  }
  isValidIdKey(_id: string): boolean {
    return isValidObjectId(_id)
  }
}
