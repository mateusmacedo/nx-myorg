import { TIdentity } from '@myorg/core/domain/Identity'

export type TUsername = string
export type TUser = {
  id: TIdentity
  name: TUsername
}
export type TUserProps = Omit<TUser, 'id'>
export type TCreateUser = Pick<TUser, 'name'>
