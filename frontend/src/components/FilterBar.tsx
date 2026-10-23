interface FilterBarProps {
  skillLevel: string
  format: string
  timing: string
  onSkillLevelChange: (value: string) => void
  onFormatChange: (value: string) => void
  onTimingChange: (value: string) => void
}

const skillLevels = ['Any', 'Beginner', 'Intermediate', 'Advanced']
const formats = ['Any', 'Singles', 'Doubles']
const timings = ['Any', 'Today', 'Tonight', 'This Week']

const Chip = ({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-1 text-sm font-medium transition-colors ${
        active
          ? 'border-emerald-600 bg-emerald-600 text-white'
          : 'border-slate-300 bg-white text-slate-600'
      }`}
    >
      {label}
    </button>
  )
}

const FilterBar = ({
  skillLevel,
  format,
  timing,
  onSkillLevelChange,
  onFormatChange,
  onTimingChange,
}: FilterBarProps) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-2">
        {skillLevels.map((level) => (
          <Chip
            key={level}
            label={level}
            active={skillLevel === level}
            onClick={() => onSkillLevelChange(level)}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {formats.map((f) => (
          <Chip
            key={f}
            label={f}
            active={format === f}
            onClick={() => onFormatChange(f)}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {timings.map((t) => (
          <Chip
            key={t}
            label={t}
            active={timing === t}
            onClick={() => onTimingChange(t)}
          />
        ))}
      </div>
    </div>
  )
}

export default FilterBar
