import { TCreateUser } from '../../domain/user.contracts'

export class CreateUserCommand {
  constructor(public readonly data: TCreateUser) {}
}
