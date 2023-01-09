import { ValueObject } from '@myorg/core'

import { TUsername } from './user.contracts'

export type TUsernameProps = {
  name: TUsername
}

export class Username extends ValueObject<TUsernameProps> {}
