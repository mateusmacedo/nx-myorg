import { Identity, IIdentityGenerator, TIdentity } from '@myorg/core'

import { UserAggregate } from '../../domain/user.aggregate'
import { ICreateUserRepository, IUserEventProducer, TCreateUser } from '../../domain/user.contracts'
import { UserCreatedEvent } from '../../domain/users.event'
import { CreateUserCommand } from './../commands/create-user.command'
import { CreateUserHandler } from './create-user.handler'

describe('CreateUserHandler', () => {
  const identifier = new Identity('dummy')
  const createUserData: TCreateUser = {
    name: 'dummy'
  }
  const occurredOn = new Date()
  let userAggregate: UserAggregate
  let userCreatedEvent: UserCreatedEvent
  let idGenerator: IIdentityGenerator<TIdentity>
  let repository: ICreateUserRepository
  let producer: IUserEventProducer
  let sut: CreateUserHandler
  let command: CreateUserCommand
  beforeEach(() => {
    jest.clearAllMocks()
    userCreatedEvent = new UserCreatedEvent(createUserData, identifier, occurredOn)
    userAggregate = new UserAggregate(createUserData, identifier)
    userAggregate['_domainEvents'] = new Set([userCreatedEvent])
    UserAggregate.create = jest.fn().mockReturnValue(userAggregate)
    idGenerator = {
      generate: jest.fn().mockResolvedValue(identifier.value)
    }
    repository = {
      create: jest.fn()
    }
    producer = {
      produce: jest.fn()
    }
    sut = new CreateUserHandler(idGenerator, repository, producer)
    command = new CreateUserCommand(createUserData)
  })
  describe('handle', () => {
    it('should handle create user command', async () => {
      const createSpy = jest.spyOn(UserAggregate, 'create')
      const clearSpy = jest.spyOn(userAggregate, 'clearEvents')
      const result = await sut.handle(command)
      expect(result).toEqual(userAggregate)
      expect(idGenerator.generate).toHaveBeenCalledTimes(1)
      expect(createSpy).toHaveBeenCalledTimes(1)
      expect(createSpy).toHaveBeenCalledWith(command.data, identifier)
      expect(repository.create).toHaveBeenCalledTimes(1)
      expect(repository.create).toHaveBeenCalledWith(userAggregate)
      expect(producer.produce).toHaveBeenCalledTimes(1)
      expect(producer.produce).toHaveBeenCalledWith(userCreatedEvent)
      expect(clearSpy).toHaveBeenCalledTimes(1)
      expect(userAggregate.domainEvents.size).toEqual(0)
    })
    it('should throw when id generator fails', async () => {
      jest.spyOn(idGenerator, 'generate').mockImplementationOnce(() => {
        throw new Error('dummy')
      })
      await expect(sut.handle(command)).rejects.toThrow()
    })
    it('should throw when user aggregate creation fails', async () => {
      jest.spyOn(UserAggregate, 'create').mockImplementationOnce(() => {
        throw new Error('dummy')
      })
      await expect(sut.handle(command)).rejects.toThrow()
    })
    it('should throw when repository fails', async () => {
      jest.spyOn(repository, 'create').mockImplementationOnce(() => {
        throw new Error('dummy')
      })
      await expect(sut.handle(command)).rejects.toThrow()
    })
    it('should throw when producer fails', async () => {
      jest.spyOn(producer, 'produce').mockImplementationOnce(() => {
        throw new Error('dummy')
      })
      await expect(sut.handle(command)).rejects.toThrow()
    })
    it('should throw when clear events fails', async () => {
      jest.spyOn(userAggregate, 'clearEvents').mockImplementationOnce(() => {
        throw new Error('dummy')
      })
      await expect(sut.handle(command)).rejects.toThrow()
    })
  })
})
