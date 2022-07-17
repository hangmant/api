import { Module } from '@nestjs/common'
import { CountriesResolver } from './countries.resolver'

@Module({
  providers: [CountriesResolver]
})
export class CountriesModule {}
