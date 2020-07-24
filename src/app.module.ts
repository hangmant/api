import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { GraphqlOptions } from './config/options/graphql.options'
import { AuthModule } from './modules/auth/auth.module'
import { CategoriesModule } from './modules/categories/categories.module'
import { CommonModule } from './modules/common/common.module'
import { LoggerModule } from './modules/logger/logger.module'
import { StorageModule } from './modules/storage/storage.module'
import { UserModule } from './modules/users/users.module'
import { WordsModule } from './modules/words/words.module'
import { CountriesModule } from './modules/countries/countries.module'
import { MailerModule } from '@nestjs-modules/mailer'
import { MailerOptions } from './config/options/mailer.options'
import { EmailVerificationModule } from './modules/email-verification/email-verification.module'
import { EmailVerificationSenderModule } from './modules/email-verification-sender/email-verification-sender.module'

@Module({
  imports: [
    LoggerModule,
    CommonModule,
    MailerModule.forRootAsync({
      useClass: MailerOptions
    }),
    GraphQLModule.forRootAsync({
      useClass: GraphqlOptions
    }),
    CountriesModule,
    // AuthModule,
    EmailVerificationSenderModule,
    // EmailVerificationModule,
    UserModule
    // WordsModule,
    // StorageModule,
    // CategoriesModule
  ]
})
export class AppModule {}
