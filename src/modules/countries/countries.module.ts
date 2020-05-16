import { Module, UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from '../../guards/gqlAuth.guard'
import { CountriesResolver } from './countries.resolver'

@UseGuards(GqlAuthGuard)
@Module({
  providers: [CountriesResolver]
})
export class CountriesModule {}
