import { DomainEvent, TIdentity } from '@myorg/core'

import { TUserProps } from './user.contracts'
export abstract class UserDomainEvent extends DomainEvent<Partial<TUserProps>, TIdentity> {}
export class UserCreatedEvent extends UserDomainEvent {}
