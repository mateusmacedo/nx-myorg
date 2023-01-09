import { IEventProducer, IHandler, IIdentityGenerator, Identity, TIdentity } from '@myorg/core'

import { ICreateUserRepository } from '../../domain/user.contracts'
import { UserAggregate } from '../../domain/user.aggregate'
import { CreateUserCommand } from '../commands/create-user.command'
import { UserDomainEvent } from '../../domain/users.event'
export class CreateUserHandler implements IHandler<CreateUserCommand, UserAggregate> {
  constructor(
    private readonly idGenerator: IIdentityGenerator<TIdentity>,
    private readonly repository: ICreateUserRepository,
    private readonly producer: IEventProducer<UserDomainEvent>
  ) {}
  async handle(command: CreateUserCommand): Promise<UserAggregate> {
    const id = await this.idGenerator.generate()
    const userAggregate = UserAggregate.create(command.data, new Identity(id))
    await this.repository.create(userAggregate)
    for (const event of userAggregate.domainEvents) {
      await this.producer.produce(event)
    }
    userAggregate.clearEvents()
    return userAggregate
  }
}
