import { CreateUserRepository } from './user.repository'
import { Entity, TUpsertRepository } from '@myorg/core'

import { Identity } from '@myorg/core'
import { UserAggregate } from './user.aggregate'
import { TUser } from './user.contracts'

describe('CreateUserRepository', () => {
  let model: TUser
  let repository: TUpsertRepository<TUser>
  let sut: CreateUserRepository
  let user: UserAggregate
  beforeEach(async () => {
    jest.clearAllMocks()
    model = {
      _id: '1',
      name: 'John'
    }
    repository = {
      upsert: jest.fn().mockResolvedValue(model)
    }
    user = new UserAggregate({ name: model.name }, new Identity(model._id))
    sut = new CreateUserRepository(repository)
  })
  describe('create', () => {
    it('should create a user', async () => {
      const result = await sut.create(user)
      expect(repository.upsert).toHaveBeenCalledTimes(1)
      expect(repository.upsert).toHaveBeenCalledWith(user.props, user.id.value)
      expect(result).toEqual(user)
    })
    it('should throw an error', async () => {
      repository.upsert = jest.fn().mockRejectedValue(new Error('Error'))
      await expect(sut.create(user)).rejects.toThrowError('Error')
    })
  })
})
