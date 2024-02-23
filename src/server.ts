import { useResponseCache as responseCache } from '@graphql-yoga/plugin-response-cache'
import Bun from 'bun'
import { createSchema, createYoga } from 'graphql-yoga'
import { env } from '~/env'
import { movieResolver } from '~/resolvers/movie'
import { personResolver } from '~/resolvers/person'
import { searchResolver } from '~/resolvers/search'
import { tvResolver } from '~/resolvers/tv'
import { tvEpisodeResolver } from '~/resolvers/tv-episode'
import { tvSeasonResolver } from '~/resolvers/tv-season'

const typeDefs = await Bun.file('./gql/schema.gql').text()

const schema = createSchema({
  typeDefs: typeDefs,
  resolvers: {
    Query: {
      search: searchResolver,
      movie: movieResolver,
      tv: tvResolver,
      tvSeason: tvSeasonResolver,
      tvEpisode: tvEpisodeResolver,
      person: personResolver,
    },
  },
})

const yoga = createYoga({
  schema,
  graphqlEndpoint: '/',
  plugins: [responseCache({ session: () => null })],
})

Bun.serve({
  fetch: yoga,
  port: env.PORT,
})

console.log(`http://localhost:${env.PORT}`)
