import { useResponseCache as responseCache } from '@graphql-yoga/plugin-response-cache'
import { createYoga } from 'graphql-yoga'
import { schema } from '~/gql/schema'

export const yoga = createYoga({
  schema,
  graphqlEndpoint: '/',
  plugins: [
    responseCache({
      session: () => null,
    }),
  ],
})
