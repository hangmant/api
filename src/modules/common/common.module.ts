import { Global, Module } from '@nestjs/common'
import { IDScalar } from './scalars/id.scalar'

@Global()
@Module({
  providers: [IDScalar]
})
export class CommonModule {}
