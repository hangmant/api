import { Injectable } from '@nestjs/common'
import { GqlModuleOptions, GqlOptionsFactory } from '@nestjs/graphql'
import { GraphQLObjectId } from 'graphql-objectid-scalar'
import * as GraphQLJSON from 'graphql-type-json'
import { join } from 'path'
import { CountriesAPI } from './datasources/countries.datasource'

@Injectable()
export class GraphqlOptions implements GqlOptionsFactory {
  createGqlOptions(): GqlModuleOptions {
    return {
      context: ({ req, res }) => ({ req, res }),
      typePaths: ['./**/*.graphql'],
      installSubscriptionHandlers: true,
      debug: true,
      playground: true,
      dataSources: () => {
        return {
          countriesAPI: new CountriesAPI()
        }
      },
      resolvers: {
        JSON: GraphQLJSON,
        GraphQLObjectId
      },
      resolverValidationOptions: {
        requireResolversForResolveType: false
      },
      definitions: {
        // will generate .ts types from gql schema files
        path: join(process.cwd(), 'src/graphql.schema.generated.ts'),
        outputAs: 'class'
      },
      introspection: true
    }
  }
}
