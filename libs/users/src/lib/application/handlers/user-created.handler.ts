import { IHandler } from '@myorg/core'

import { UserCreatedEvent } from '../../domain/users.event'

export class UserCreatedHandler implements IHandler<UserCreatedEvent, void> {
  async handle(event: UserCreatedEvent): Promise<void> {
    console.info('UserCreatedHandler:', event)
  }
}
