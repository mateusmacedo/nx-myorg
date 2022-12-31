import { AggregateRoot } from '@myorg/core/domain/AggregateRoot'
import { Identity } from '@myorg/core/domain/Identity'

import { TCreateUser, TUserProps } from './contracts/user'
import { UserCreatedEvent } from './events/user-created.event'

export class UserAggregate extends AggregateRoot<TUserProps> {
  public static create(data: TCreateUser): UserAggregate {
    const id = new Identity('dummy')
    const { name } = data
    const aggregate = new UserAggregate({ name }, id)
    const eventData = { id: id.value, name }
    aggregate.addDomainEvent(new UserCreatedEvent(eventData, new Date()))
    return aggregate
  }

  get name(): string {
    return this.props.name
  }
}
