import { UuidIdentityGenerator } from '@myorg/core'
import { CreateUserRepository, UserProducer } from '@myorg/users'
import { Provider } from '@nestjs/common'
import { UserUpsertRepository } from './user.repository'

export const IdentityGeneratorProvider: Provider = {
  provide: 'IIdentityGenerator',
  useClass: UuidIdentityGenerator
}
export const CreateUserRepositoryProvider: Provider = {
  provide: 'ICreateUserRepository',
  useFactory: (repository: UserUpsertRepository) => {
    return new CreateUserRepository(repository)
  },
  inject: [UserUpsertRepository]
}
export const UserEventProducerProvider: Provider = {
  provide: 'IUserEventProducer',
  useClass: UserProducer
}
