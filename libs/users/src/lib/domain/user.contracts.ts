import { TIdentity } from '@myorg/core'

import { UserAggregate } from './user.aggregate'
import { UserDomainEvent } from './users.event'

export type TUsername = string
export type TUser = {
  _id: TIdentity
  name: TUsername
}
export type TUserProps = Omit<TUser, '_id'>
export type TCreateUser = Pick<TUser, 'name'>

export interface ICreateUserRepository {
  create: (data: UserAggregate) => Promise<UserAggregate>
}

export interface IUserEventProducer {
  produce: (data: UserDomainEvent) => Promise<void>
}
