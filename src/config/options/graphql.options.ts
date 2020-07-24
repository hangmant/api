import { Injectable } from '@nestjs/common'
import { GqlModuleOptions, GqlOptionsFactory } from '@nestjs/graphql'
import { join } from 'path'
import { CountriesAPI } from '../../datasources/countries.datasource'

@Injectable()
export class GraphqlOptions implements GqlOptionsFactory {
  createGqlOptions(): GqlModuleOptions {
    return {
      context: ({ req, res }) => ({ req, res }),
      installSubscriptionHandlers: true,
      debug: true,

      playground: true,
      dataSources: () => {
        return {
          countriesAPI: new CountriesAPI()
        }
      },
      buildSchemaOptions: {
        dateScalarMode: 'timestamp'
      },
      resolverValidationOptions: {
        requireResolversForResolveType: false
      },
      autoSchemaFile: join(process.cwd(), 'schema.graphql'),
      introspection: true
    }
  }
}
