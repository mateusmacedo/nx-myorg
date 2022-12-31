import { Identity } from '@myorg/core/domain/Identity'

import { UserCreatedEvent } from '../../domain/events/user-created.event'
import { UserAggregate } from './../../domain/user.aggregate'
import { IUpsertUserRepository, UserCreatedHandler } from './user-created.handler'

describe('UserCreatedHandler', () => {
  let repository: IUpsertUserRepository
  let sut: UserCreatedHandler
  let upsertResult: UserAggregate
  const id = new Identity('dummy').value
  const name = 'dummy'
  const userCreatedEvent = new UserCreatedEvent({ id, name }, new Date())
  beforeEach(async () => {
    jest.clearAllMocks()
    upsertResult = new UserAggregate(
      {
        name: 'dummy'
      },
      new Identity('dummy')
    )
    repository = {
      upsert: jest.fn().mockResolvedValue(upsertResult)
    }
    sut = new UserCreatedHandler(repository)
  })

  it('should handle', async () => {
    const result = await sut.handle(userCreatedEvent)
    expect(repository.upsert).toBeCalledTimes(1)
    expect(repository.upsert).toBeCalledWith(userCreatedEvent.getData())
    expect(result).toBeInstanceOf(UserAggregate)
  })
})
