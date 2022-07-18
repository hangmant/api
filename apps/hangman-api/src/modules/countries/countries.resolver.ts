import { UseGuards } from '@nestjs/common';
import { Context, Query, Resolver } from '@nestjs/graphql';
import { CountriesAPI } from '../../datasources/countries.datasource';
import { GqlAuthGuard } from '../../guards/gql-auth.guard';
import { Country } from './models/country.model';

@UseGuards(GqlAuthGuard)
@Resolver((of) => Country)
export class CountriesResolver {
  // TODO: Create DataSource decorator
  @Query((returns) => [Country])
  countries(
    @Context('dataSources') { countriesAPI }: { countriesAPI: CountriesAPI },
  ) {
    return countriesAPI.getAll();
  }
}
