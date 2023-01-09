import { IIdentityGenerator, TIdentity } from '@myorg/core'
import {
  CreateUserCommand,
  CreateUserHandler,
  ICreateUserRepository,
  IUserEventProducer,
  UserAggregate,
  UserCreatedEvent,
  UserCreatedHandler
} from '@myorg/users'
import { Inject } from '@nestjs/common'
import { CommandHandler, EventsHandler, ICommandHandler, IEventHandler } from '@nestjs/cqrs'

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler
  extends CreateUserHandler
  implements ICommandHandler<CreateUserCommand, UserAggregate>
{
  constructor(
    @Inject('IIdentityGenerator') idGenerator: IIdentityGenerator<TIdentity>,
    @Inject('ICreateUserRepository') repository: ICreateUserRepository,
    @Inject('IUserEventProducer') producer: IUserEventProducer
  ) {
    super(idGenerator, repository, producer)
  }
  async execute(command: CreateUserCommand): Promise<UserAggregate> {
    return this.handle(command)
  }
}

@EventsHandler(UserCreatedEvent)
export class UserCreatedEventHandler extends UserCreatedHandler implements IEventHandler<UserCreatedEvent> {}
