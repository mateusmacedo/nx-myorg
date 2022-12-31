import { TCreateUser } from './contracts/user'
import { UserCreatedEvent } from './events/user-created.event'
import { UserAggregate } from './user.aggregate'

describe('UserAggregate', () => {
  let sut: UserAggregate
  const data: TCreateUser = {
    name: 'dummy'
  }
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('should create a user', async () => {
    sut = UserAggregate.create(data)
    expect(sut).toBeDefined()
    expect(sut.id).toBeDefined()
    expect(sut.name).toEqual(data.name)
    expect(sut.domainEvents.size).toEqual(1)
    for (const event of sut.domainEvents) {
      expect(event).toBeInstanceOf(UserCreatedEvent)
    }
  })
})
