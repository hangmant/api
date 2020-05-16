import { UseGuards } from '@nestjs/common'
import { Context, Query, Resolver } from '@nestjs/graphql'
import { CountriesAPI } from '../../datasources/countries.datasource'
import { GqlAuthGuard } from '../../guards/gqlAuth.guard'

@UseGuards(GqlAuthGuard)
@Resolver('Country')
export class CountriesResolver {
  // TODO: Create DataSource decorator
  @Query()
  countries(@Context('dataSources') { countriesAPI }: { countriesAPI: CountriesAPI }) {
    return countriesAPI.getAll()
  }
}
