import { Module } from '@nestjs/common'

import { UsersController } from './users.controller'
import { CreateUserCommandHandler, UserCreatedEventHandler } from './users.handlers'
import { CqrsModule } from '@nestjs/cqrs'
import { CreateUserRepositoryProvider, IdentityGeneratorProvider, UserEventProducerProvider } from './user.providers'
import { UserUpsertRepository } from './user.repository'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: ['production', 'staging'].includes(process.env.NODE_ENV),
      envFilePath: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
      cache: true
    }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('MONGO_URI'),
        useUnifiedTopology: true
      }),
      inject: [ConfigService]
    }),
    CqrsModule
  ],
  controllers: [UsersController],
  providers: [
    IdentityGeneratorProvider,
    CreateUserRepositoryProvider,
    UserEventProducerProvider,
    UserUpsertRepository,
    CreateUserCommandHandler,
    UserCreatedEventHandler
  ]
})
export class AppModule {}
