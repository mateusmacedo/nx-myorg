import { DomainEvent } from '@myorg/core/domain/DomainEvent'

import { TUser } from '../contracts/user'

export class UserCreatedEvent extends DomainEvent<TUser> {}
