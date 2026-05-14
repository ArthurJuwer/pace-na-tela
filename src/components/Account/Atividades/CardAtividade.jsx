'use client'
import Link from 'next/link'
import { ArrowRightIcon, FootprintsIcon } from 'lucide-react'

const SPORT_LABELS = {
  Run: 'Corrida',
  TrailRun: 'Trail',
  Walk: 'Caminhada',
  Hike: 'Trilha',
  Ride: 'Ciclismo',
  VirtualRun: 'Corrida Virtual',
}

function formatDuration(seconds) {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  if (h > 0) return `${h}h ${m.toString().padStart(2, '0')}min`
  return `${m}min`
}

function formatPace(metersPerSecond) {
  if (!metersPerSecond) return null
  const minPerKm = 1000 / (metersPerSecond * 60)
  const min = Math.floor(minPerKm)
  const sec = Math.round((minPerKm - min) * 60)
  return `${min}:${sec.toString().padStart(2, '0')} /km`
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function CardAtividade({ activity }) {
  const {
    id,
    name,
    distance,
    moving_time,
    start_date_local,
    start_date,
    location_city,
    location_state,
    sport_type,
    type,
    average_speed,
  } = activity

  const km = (distance / 1000).toFixed(2)
  const pace = formatPace(average_speed)
  const location = [location_city, location_state].filter(Boolean).join(', ')
  const sportLabel = SPORT_LABELS[sport_type] || SPORT_LABELS[type] || sport_type || type || 'Atividade'

  return (
    <div className="w-full flex justify-between items-center gap-3">
      <div className="flex items-center gap-4 min-w-0">

        {/* Ícone com distância */}
        <div className="size-20 flex-shrink-0 bg-blueMain rounded-2xl flex flex-col items-center justify-center gap-0.5">
          <FootprintsIcon size={22} className="text-white/70" />
          <span className="text-white font-black text-base leading-none">{km}</span>
          <span className="text-white/60 text-[10px] font-semibold">km</span>
        </div>

        {/* Info */}
        <div className="italic flex flex-col gap-1 min-w-0">
          <h1 className="text-[#1E1E1E] font-bold text-sm truncate">{name}</h1>
          <h2 className="text-[#ACACAC] text-xs font-semibold">
            {formatDate(start_date_local || start_date)}
          </h2>
          {location && (
            <h3 className="text-[#ACACAC] text-xs font-semibold truncate">{location}</h3>
          )}
          <div className="flex items-center gap-2 flex-wrap mt-0.5">
            <span className="bg-blueMain text-white text-xs py-0.5 px-3 rounded-full font-semibold">
              {sportLabel}
            </span>
            <span className="text-[#ACACAC] text-xs font-medium">
              {formatDuration(moving_time)}
              {pace && ` · ${pace}`}
            </span>
          </div>
        </div>
      </div>

      {/* Ação */}
      <Link
        href={`/activity/${id}`}
        className="flex-shrink-0 flex flex-col items-center gap-0.5 text-blueMain"
      >
        <ArrowRightIcon size={22} />
        <span className="text-[10px] font-semibold text-blueThird">post</span>
      </Link>
    </div>
  )
}
