import { Identity } from '@myorg/core'

import { UserAggregate } from './user.aggregate'
import { TCreateUser } from './user.contracts'
import { UserCreatedEvent } from './users.event'

describe('UserAggregate', () => {
  let identity: Identity<string>
  let sut: UserAggregate
  const data: TCreateUser = {
    name: 'dummy'
  }
  beforeEach(() => {
    jest.clearAllMocks()
    identity = new Identity('dummy')
  })
  it('should create a user', async () => {
    sut = UserAggregate.create(data, identity)
    expect(sut).toBeDefined()
    expect(sut.id).toBeDefined()
    expect(sut.name).toEqual(data.name)
    expect(sut.domainEvents.size).toEqual(1)
    for (const event of sut.domainEvents) {
      expect(event).toBeInstanceOf(UserCreatedEvent)
    }
  })
})
