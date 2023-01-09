import { IEventProducer } from '@myorg/core'
import { UserDomainEvent } from '../../domain/users.event'

export class UserProducer implements IEventProducer<UserDomainEvent> {
  async produce(event: UserDomainEvent): Promise<void> {
    console.info('UserProducer.produce', event)
  }
}
