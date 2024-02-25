import { createSchema } from 'graphql-yoga'
import { movieResolver } from '~/gql/resolvers/movie'
import { personResolver } from '~/gql/resolvers/person'
import { searchResolver } from '~/gql/resolvers/search'
import { tvResolver } from '~/gql/resolvers/tv'
import { tvEpisodeResolver } from '~/gql/resolvers/tv-episode'
import { tvSeasonResolver } from '~/gql/resolvers/tv-season'
import { typeDefs } from '~/gql/typeDefs'

export const schema = createSchema({
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
