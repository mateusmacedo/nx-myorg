import { ValueObject } from '@myorg/core/domain/ValueObject'

import { TUsername } from './contracts/user'

export type TUsernameProps = {
  name: TUsername
}

export class Username extends ValueObject<TUsernameProps> {}
