import { Injectable } from '@nestjs/common'
import { GqlModuleOptions, GqlOptionsFactory } from '@nestjs/graphql'
import { join } from 'path'
import { CountriesAPI } from '../../datasources/countries.datasource'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class GraphqlOptions implements GqlOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createGqlOptions(): GqlModuleOptions {
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
      resolverValidationOptions: {
        requireResolversForResolveType: false
      },
      autoSchemaFile: join(process.cwd(), 'schema.graphql'),
      introspection: true
    }
  }
}
