import { TCreateUser } from '../../domain/contracts/user'

export class CreateUserCommand {
  constructor(public readonly data: TCreateUser) {}
}
