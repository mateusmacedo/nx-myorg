import { AggregateRoot, Identity, TIdentity } from '@myorg/core'

import { TUserProps } from './user.contracts'
import { UserCreatedEvent } from './users.event'

export class UserAggregate extends AggregateRoot<TUserProps, TIdentity> {
  public static create(data: TUserProps, _id: Identity<TIdentity>): UserAggregate {
    const aggregate = new UserAggregate(data, _id)
    const event = new UserCreatedEvent(data, _id, new Date())
    aggregate.addDomainEvent(event)
    return aggregate
  }
  get name(): string {
    return this.props.name
  }
}
