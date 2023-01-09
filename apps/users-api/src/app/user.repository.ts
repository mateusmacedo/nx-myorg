import { UserAggregate } from '@myorg/users'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { UserModel } from './user.model'
import { MongoBaseRepository } from '@myorg/core'

@Injectable()
export class UserUpsertRepository extends MongoBaseRepository<UserAggregate> {
  constructor(@InjectModel(UserModel.name) private schema: Model<UserModel>) {
    super(schema)
  }
}
