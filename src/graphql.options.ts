import { GqlModuleOptions, GqlOptionsFactory } from '@nestjs/graphql'
import { Injectable } from '@nestjs/common'
import { join } from 'path'
import * as GraphQLJSON from 'graphql-type-json'
import { GraphQLObjectId } from 'graphql-objectid-scalar'

@Injectable()
export class GraphqlOptions implements GqlOptionsFactory {
  createGqlOptions(): Promise<GqlModuleOptions> | GqlModuleOptions {
    return {
      context: ({ req, res }) => ({ req, res }),
      typePaths: ['./**/*.graphql'],
      installSubscriptionHandlers: true,
      debug: true,
      playground: true,
      resolvers: {
        JSON: GraphQLJSON,
        ID: GraphQLObjectId
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
