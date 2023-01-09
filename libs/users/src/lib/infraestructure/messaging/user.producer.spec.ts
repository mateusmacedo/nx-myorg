import { UserCreatedEvent } from './../../domain/users.event'
import { UserDomainEvent } from '../../domain/users.event'
import { UserProducer } from './user.producer'
import { Identity } from '@myorg/core'

describe('UserProducer', () => {
  let event: UserDomainEvent
  let producer: UserProducer
  beforeEach(async () => {
    jest.clearAllMocks()
    producer = new UserProducer()
  })
  describe('produce', () => {
    it('should produce a user', async () => {
      const logSpy = jest.spyOn(console, 'info')
      event = new UserCreatedEvent({ name: 'Dummy' }, new Identity('dummy'), new Date())
      await producer.produce(event)
      expect(logSpy).toHaveBeenCalledTimes(1)
      expect(logSpy).toHaveBeenCalledWith('UserProducer.produce', event)
    })
  })
})
