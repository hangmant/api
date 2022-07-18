import { ApolloDriverConfig } from '@nestjs/apollo';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GqlOptionsFactory } from '@nestjs/graphql';
import { ApolloServerPluginCacheControlDisabled } from 'apollo-server-core';
import { join } from 'path';
import { CountriesAPI } from '../../datasources/countries.datasource';

@Injectable()
export class GraphqlOptions implements GqlOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createGqlOptions(): ApolloDriverConfig {
    return {
      context: (context) => {
        const { connectionParams, extra } = context;

        // console.log('🤫 Dante ➤ GraphqlOptions ➤ createGqlOptions ➤ extra?.request', extra?.request)
        if (extra?.request || context?.reply?.request) {
          const request = extra?.request || context?.reply?.request;

          let bearerToken;

          if (connectionParams) {
            bearerToken = `Bearer ${
              connectionParams?.Authorization || connectionParams?.authorization
            }`;
          } else if (request) {
            bearerToken = request.headers.authorization;
          }

          return {
            req: {
              ...request,
              headers: {
                ...request?.headers,
                Authorization: bearerToken,
                authorization: bearerToken,
              },
            },
          };
        }
        return context;
      },
      cors: false,
      cache: 'bounded',
      plugins: [ApolloServerPluginCacheControlDisabled()],
      installSubscriptionHandlers: true,
      debug: true,
      playground: true,
      dataSources: () => {
        return {
          countriesAPI: new CountriesAPI(
            this.configService.get('restCountriesApi'),
          ),
        };
      },
      subscriptions: {
        'subscriptions-transport-ws': {
          onConnect: (context) => {
            /** Do auth here */

            return true;
          },
        },
      },
      buildSchemaOptions: {
        dateScalarMode: 'timestamp',
      },
      autoSchemaFile: join(process.cwd(), 'schema.graphql'),
    };
  }
}
