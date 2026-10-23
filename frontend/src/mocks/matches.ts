export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced'
export type MatchFormat = 'Singles' | 'Doubles'

export interface Match {
  id: string
  venueName: string
  venueSuburb: string
  startTime: string // ISO 8601, e.g. "2026-10-15T18:00:00+10:00"
  skillLevel: SkillLevel
  format: MatchFormat
  playersJoined: number
  playerCapacity: number
  costPerPlayer: number
  currency: string
}

export const mockMatches: Match[] = [
  {
    id: 'match_001',
    venueName: 'Riverside Pickleball Courts',
    venueSuburb: 'South Bank',
    startTime: '2026-10-15T18:00:00+10:00',
    skillLevel: 'Intermediate',
    format: 'Doubles',
    playersJoined: 3,
    playerCapacity: 4,
    costPerPlayer: 8,
    currency: 'AUD',
  },
  {
    id: 'match_002',
    venueName: 'Greenway Sports Centre',
    venueSuburb: 'Paddington',
    startTime: '2026-10-15T19:30:00+10:00',
    skillLevel: 'Beginner',
    format: 'Doubles',
    playersJoined: 2,
    playerCapacity: 4,
    costPerPlayer: 5,
    currency: 'AUD',
  },
  {
    id: 'match_003',
    venueName: 'Westside Courts',
    venueSuburb: 'Toowong',
    startTime: '2026-10-16T07:00:00+10:00',
    skillLevel: 'Advanced',
    format: 'Singles',
    playersJoined: 1,
    playerCapacity: 2,
    costPerPlayer: 10,
    currency: 'AUD',
  },
  {
    id: 'match_004',
    venueName: 'Riverside Pickleball Courts',
    venueSuburb: 'South Bank',
    startTime: '2026-10-16T18:00:00+10:00',
    skillLevel: 'Intermediate',
    format: 'Doubles',
    playersJoined: 4,
    playerCapacity: 4,
    costPerPlayer: 8,
    currency: 'AUD',
  },
]
