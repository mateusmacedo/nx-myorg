import { IHandler } from '@myorg/core/application/IHandle'

import { UserCreatedEvent } from '../../domain/events/user-created.event'
import { TUser } from './../../domain/contracts/user'
import { UserAggregate } from './../../domain/user.aggregate'

export interface IUpsertUserRepository {
  upsert: (data: TUser) => Promise<UserAggregate>
}

export class UserCreatedHandler implements IHandler<UserCreatedEvent, UserAggregate> {
  constructor(private readonly repository: IUpsertUserRepository) {}
  async handle(event: UserCreatedEvent): Promise<UserAggregate> {
    return this.repository.upsert(event.getData())
  }
}
