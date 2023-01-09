import { Identity } from '@myorg/core'

import { UserCreatedHandler } from './user-created.handler'
import { UserCreatedEvent } from '../../domain/users.event'

describe('UserCreatedHandler', () => {
  let sut: UserCreatedHandler
  const id = new Identity('dummy')
  const name = 'dummy'
  const userCreatedEvent = new UserCreatedEvent({ name }, id, new Date())
  beforeEach(async () => {
    jest.clearAllMocks()
    sut = new UserCreatedHandler()
  })

  it('should handle', async () => {
    const logspy = jest.spyOn(console, 'info')
    await sut.handle(userCreatedEvent)
    expect(logspy).toHaveBeenCalledTimes(1)
    expect(logspy).toBeCalledWith('UserCreatedHandler:', userCreatedEvent)
  })
})
