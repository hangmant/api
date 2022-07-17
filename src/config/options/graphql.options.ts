import { ApolloDriverConfig } from '@nestjs/apollo'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { GqlOptionsFactory } from '@nestjs/graphql'
import { ApolloServerPluginCacheControlDisabled } from 'apollo-server-core'
import { join } from 'path'
import { CountriesAPI } from '../../datasources/countries.datasource'

@Injectable()
export class GraphqlOptions implements GqlOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createGqlOptions(): ApolloDriverConfig {
    return {
      context: ({ req, connection, res }) => {
        if (connection) {
          return {
            req: {
              headers: {
                authorization: connection?.context?.authorization
              }
            }
          }
        }
        return { req, res }
      },
      cors: false,
      cache: 'bounded',
      plugins: [ApolloServerPluginCacheControlDisabled()],
      installSubscriptionHandlers: true,
      debug: true,
      playground: true,
      dataSources: () => {
        return {
          countriesAPI: new CountriesAPI(this.configService.get('restCountriesApi'))
        }
      },
      buildSchemaOptions: {
        dateScalarMode: 'timestamp'
      },
      autoSchemaFile: join(process.cwd(), 'schema.graphql'),
      introspection: true
    }
  }
}
