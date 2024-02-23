import { ReleaseDates } from '~/types/tmdb'

export function filterReleaseDates(args: { releaseDates?: ReleaseDates }) {
  return args.releaseDates?.results?.filter((x) => x.iso_3166_1 === 'US')
}
