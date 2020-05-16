import { Resolver, Query, Context } from '@nestjs/graphql'
import { CountriesAPI } from 'src/datasources/countries.datasource'

@Resolver('Country')
export class CountriesResolver {
  // TODO: Create DataSource decorator
  @Query()
  countries(@Context('dataSources') { countriesAPI }: { countriesAPI: CountriesAPI }) {
    return countriesAPI.getAll()
  }
}
