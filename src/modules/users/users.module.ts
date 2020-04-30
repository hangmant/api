import { Module } from '@nestjs/common'
import { CategoriesModule } from '../categories/categories.module'
import { MongoModule } from '../mongo/mongo.module'
import { User } from './users.model'
import { UsersResolver } from './users.resolver'
import { UsersService } from './users.service'

@Module({
  imports: [MongoModule.forFeature([User]), CategoriesModule],
  providers: [UsersResolver, UsersService],
  exports: [UsersService]
})
export class UserModule {}
