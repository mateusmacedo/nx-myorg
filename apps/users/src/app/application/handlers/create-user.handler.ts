import { IHandler } from '@myorg/core/application/IHandle'
import { UserAggregate } from '../../domain/user.aggregate'
import { CreateUserCommand } from '../commands/create-user.command'
export class CreateUserHandler implements IHandler<CreateUserCommand, UserAggregate> {
  handle(command: CreateUserCommand): UserAggregate {
    return UserAggregate.create(command.data)
  }
}
