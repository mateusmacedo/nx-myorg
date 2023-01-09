import { Identity, TUpsertRepository } from '@myorg/core'
import { ICreateUserRepository, TUser } from './user.contracts'
import { UserAggregate } from './user.aggregate'

export class CreateUserRepository implements ICreateUserRepository {
  constructor(private readonly repository: TUpsertRepository<TUser>) {}
  async create(data: UserAggregate): Promise<UserAggregate> {
    const resultSet = await this.repository.upsert(data.props, data.id.value)
    const { _id, ...props } = resultSet
    return new UserAggregate(props, new Identity(_id))
  }
}
