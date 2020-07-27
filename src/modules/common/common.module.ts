import { Global, Module } from '@nestjs/common'
import { IDScalar } from './scalars/id.scalar'
import { GravatarService } from './services/gravatar.service'

@Global()
@Module({
  providers: [IDScalar, GravatarService],
  exports: [GravatarService]
})
export class CommonModule {}
