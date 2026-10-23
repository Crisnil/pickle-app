import { useMemo, useState } from 'react'
import FilterBar from '../components/FilterBar'
import MatchCard from '../components/MatchCard'
import { mockMatches, type Match } from '../mocks/matches'

const isSameDay = (a: Date, b: Date): boolean =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate()

const matchesTiming = (match: Match, timing: string, now: Date): boolean => {
  const start = new Date(match.startTime)
  if (timing === 'Today') return isSameDay(start, now)
  if (timing === 'Tonight') return isSameDay(start, now) && start.getHours() >= 17
  if (timing === 'This Week') {
    const weekFromNow = new Date(now)
    weekFromNow.setDate(weekFromNow.getDate() + 7)
    return start >= now && start <= weekFromNow
  }
  return true
}

const FindGamePage = () => {
  const [skillLevel, setSkillLevel] = useState('Any')
  const [format, setFormat] = useState('Any')
  const [timing, setTiming] = useState('Any')
  const [now] = useState(() => new Date())

  const filteredMatches = useMemo(() => {
    return mockMatches.filter((match) => {
      if (skillLevel !== 'Any' && match.skillLevel !== skillLevel) return false
      if (format !== 'Any' && match.format !== format) return false
      if (timing !== 'Any' && !matchesTiming(match, timing, now)) return false
      return true
    })
  }, [skillLevel, format, timing, now])

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold text-slate-900">Find a Game</h1>
      <FilterBar
        skillLevel={skillLevel}
        format={format}
        timing={timing}
        onSkillLevelChange={setSkillLevel}
        onFormatChange={setFormat}
        onTimingChange={setTiming}
      />
      <div className="flex flex-col gap-3">
        {filteredMatches.length === 0 ? (
          <p className="text-sm text-slate-500">No matches found. Try different filters.</p>
        ) : (
          filteredMatches.map((match) => <MatchCard key={match.id} match={match} />)
        )}
      </div>
    </div>
  )
}

export default FindGamePage
