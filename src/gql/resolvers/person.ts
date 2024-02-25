import { Person } from '~/types/tmdb'
import { filterCombinedCast } from '~/util/filter-combined-cast'
import { filterCombinedCrew } from '~/util/filter-combined-crew'
import { filterImages } from '~/util/filter-images'
import { tmdbFetch } from '~/util/tmdb-fetch'

export async function personResolver(
  _: unknown,
  args: {
    id: string
    query: string
    page: number
    filter: string
  },
) {
  const res = await tmdbFetch(`/person/${args.id}`, {
    append_to_response: 'combined_credits,images',
  })
  const person: Person = await res.json()

  return {
    ...person,
    combined_credits: {
      cast: filterCombinedCast({
        cast: person.combined_credits?.cast,
        query: args.query,
        page: args.page,
        filter: args.filter,
      }),
      crew: filterCombinedCrew({
        crew: person.combined_credits?.crew,
        query: args.query,
        page: args.page,
        filter: args.filter,
      }),
    },
    images: {
      profiles: filterImages({
        images: person.images?.profiles,
        page: args.page,
      }),
    },
  } as Person
}
