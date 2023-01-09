import { CreateUserCommand, UserAggregate } from '@myorg/users'
import { Controller, Post } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'

@Controller()
export class UsersController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  async createUser(): Promise<UserAggregate> {
    const command = new CreateUserCommand({
      name: 'John Doe'
    })
    return this.commandBus.execute<CreateUserCommand, UserAggregate>(command)
  }
}
