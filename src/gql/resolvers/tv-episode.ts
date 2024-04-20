import { TVEpisode } from '~/types/tmdb'
import { filterCast } from '~/util/filter-cast'
import { filterCrew } from '~/util/filter-crew'
import { filterImages } from '~/util/filter-images'
import { getPaginatePos } from '~/util/paginate-pos'
import { tmdbFetch } from '~/util/tmdb-fetch'

export async function tvEpisodeResolver(
  _: unknown,
  args: {
    id: string
    season_number: string
    episode_number: string
    query: string
    page: number
  },
) {
  const res = await tmdbFetch(
    `/tv/${args.id}/season/${args.season_number}/episode/${args.episode_number}`,
    {
      append_to_response: 'images,videos',
    },
  )
  const tvEpisode: TVEpisode = await res.json()

  const { start, end } = getPaginatePos(args.page ?? 1)

  return {
    ...tvEpisode,
    guest_stars: filterCast({
      cast: tvEpisode.guest_stars,
      query: args.query,
      page: args.page,
    }),
    crew: filterCrew({
      crew: tvEpisode.crew,
      query: args.query,
      page: args.page,
    }),
    images: {
      stills: filterImages({
        images: tvEpisode.images?.stills,
        page: args.page,
      }),
    },
    videos: {
      results: tvEpisode.videos?.results?.slice(start, end),
    },
  }
}
