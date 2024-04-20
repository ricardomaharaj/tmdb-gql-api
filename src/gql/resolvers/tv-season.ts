import { TVSeason } from '~/types/tmdb'
import { filterCast } from '~/util/filter-cast'
import { filterCrew } from '~/util/filter-crew'
import { filterImages } from '~/util/filter-images'
import { getPaginatePos } from '~/util/paginate-pos'
import { tmdbFetch } from '~/util/tmdb-fetch'

export async function tvSeasonResolver(
  _: unknown,
  args: {
    id: string
    season_number: string
    query: string
    page: number
  },
) {
  const res = await tmdbFetch(`/tv/${args.id}/season/${args.season_number}`, {
    append_to_response: 'credits,images,videos',
  })
  const tvSeason: TVSeason = await res.json()

  const { start, end } = getPaginatePos(args.page ?? 1)

  return {
    ...tvSeason,
    credits: {
      cast: filterCast({
        cast: tvSeason.credits?.cast,
        query: args.query,
        page: args.page,
      }),
      crew: filterCrew({
        crew: tvSeason.credits?.crew,
        query: args.query,
        page: args.page,
      }),
    },
    images: {
      posters: filterImages({
        images: tvSeason.images?.posters,
      }),
    },
    videos: {
      results: tvSeason.videos?.results?.slice(start, end),
    },
  }
}
