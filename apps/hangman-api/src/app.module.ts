import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from './config';
import { GraphqlOptions } from './config/options/graphql.options';
import { AuthModule } from './modules/auth/auth.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { CommonModule } from './modules/common/common.module';
import { CountriesModule } from './modules/countries/countries.module';
import { EmailVerificationSenderModule } from './modules/email-verification-sender/email-verification-sender.module';
import { EmailVerificationModule } from './modules/email-verification/email-verification.module';
import { LoggerModule } from './modules/logger/logger.module';
import { MessagesModule } from './modules/messages/messages.module';
import { MongooseConfigService } from './modules/mongo/mongoConfig.service';
import { RoomsUserModule } from './modules/rooms-user/rooms-user.module';
import { RoomsModule } from './modules/rooms/rooms.module';
import { StorageModule } from './modules/storage/storage.module';
import { UserModule } from './modules/users/users.module';
import { WordsModule } from './modules/words/words.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),
    LoggerModule,
    CommonModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GraphqlOptions,
    }),
    CountriesModule,
    AuthModule,
    EmailVerificationSenderModule,
    EmailVerificationModule,
    UserModule,
    WordsModule,
    StorageModule,
    CategoriesModule,
    RoomsModule,
    RoomsUserModule,
    MessagesModule,
  ],
})
export class AppModule {}
