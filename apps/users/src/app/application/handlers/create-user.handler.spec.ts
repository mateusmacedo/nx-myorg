import { Identity } from '@myorg/core/domain/Identity'

import { TCreateUser } from '../../domain/contracts/user'
import { UserAggregate } from '../../domain/user.aggregate'
import { CreateUserCommand } from './../commands/create-user.command'
import { CreateUserHandler } from './create-user.handler'

describe('CreateUserHandler', () => {
  const identifier = new Identity('dummy')
  const createUser: TCreateUser = {
    name: 'dummy'
  }
  let sut: CreateUserHandler
  let command: CreateUserCommand
  beforeEach(() => {
    jest.clearAllMocks()
    sut = new CreateUserHandler()
    command = new CreateUserCommand(createUser)
  })
  it('should create a user aggregate', async () => {
    UserAggregate.create = jest.fn().mockReturnValue(new UserAggregate({ name: 'dummy' }, identifier))
    const result = await sut.handle(command)
    expect(UserAggregate.create).toHaveBeenCalledTimes(1)
    expect(UserAggregate.create).toBeCalledWith(createUser)
    expect(result).toBeInstanceOf(UserAggregate)
    expect(result.id).toEqual(identifier)
    expect(result.name).toEqual('dummy')
  })
  it('should throw an error when create a user aggregate', async () => {
    UserAggregate.create = jest.fn().mockReturnValueOnce(() => {
      throw new Error('Error')
    })
    await expect(sut.handle(command)).toThrowError('Error')
  })
})
