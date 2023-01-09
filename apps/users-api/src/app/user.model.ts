import { TIdentity } from '@myorg/core'
import { TUser } from '@myorg/users'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema()
export class UserModel extends Document implements TUser {
  @Prop({
    required: true,
    unique: true,
    immutable: true,
    index: true
  })
  _id: TIdentity
  @Prop({
    required: true,
    unique: true,
    index: true
  })
  name: string
}
const UserModelSchema = SchemaFactory.createForClass(UserModel)
export { UserModelSchema }
