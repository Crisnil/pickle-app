import type { Match } from '../mocks/matches'

const formatStartTime = (iso: string): string => {
  return new Date(iso).toLocaleString(undefined, {
    weekday: 'short',
    hour: 'numeric',
    minute: '2-digit',
  })
}

const MatchCard = ({ match }: { match: Match }) => {
  const isFull = match.playersJoined >= match.playerCapacity

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-semibold text-slate-900">{match.venueName}</h3>
          <p className="text-sm text-slate-500">{match.venueSuburb}</p>
        </div>
        <span className="whitespace-nowrap rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
          {formatStartTime(match.startTime)}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap gap-2 text-xs font-medium">
        <span className="rounded-full bg-emerald-50 px-2 py-1 text-emerald-700">
          {match.skillLevel}
        </span>
        <span className="rounded-full bg-sky-50 px-2 py-1 text-sky-700">
          {match.format}
        </span>
        <span className="rounded-full bg-amber-50 px-2 py-1 text-amber-700">
          ${match.costPerPlayer} {match.currency}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm text-slate-600">
          {match.playersJoined}/{match.playerCapacity} players
        </span>
        <button
          type="button"
          disabled={isFull}
          className={`rounded-md px-3 py-1.5 text-sm font-semibold text-white ${
            isFull
              ? 'cursor-not-allowed bg-slate-300'
              : 'bg-emerald-600 hover:bg-emerald-700'
          }`}
        >
          {isFull ? 'Full' : 'Join'}
        </button>
      </div>
    </article>
  )
}

export default MatchCard
