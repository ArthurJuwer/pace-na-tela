'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import {
  FootprintsIcon, MapPinIcon, TrophyIcon,
  ClockIcon, MountainIcon, ArrowRightIcon,
} from 'lucide-react'

// ─── Helpers ────────────────────────────────────────────────────────────────

function formatDistance(meters) {
  if (!meters) return '0 km'
  return (meters / 1000).toFixed(2) + ' km'
}

function formatDuration(seconds) {
  if (!seconds) return '0 min'
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  if (h > 0) return `${h}h ${m.toString().padStart(2, '0')}min`
  return `${m} min`
}

function formatDateShort(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
  })
}

function generateCuriosities(stats) {
  if (!stats) return []
  const all = stats.all_run_totals || {}
  const totalKm = (all.distance || 0) / 1000
  const totalM = all.elevation_gain || 0
  const totalSecs = all.moving_time || 0

  const items = []

  // Maratonas
  const marathons = totalKm / 42.195
  if (totalKm >= 1) {
    items.push({
      emoji: '🏅',
      value: marathons >= 1 ? marathons.toFixed(1) : (marathons * 100).toFixed(0) + '%',
      label: marathons >= 1 ? 'maratonas equivalentes' : 'de uma maratona completa',
      context: `${totalKm.toFixed(1)} km no total`,
      bg: 'bg-[#FC4C02]',
    })
  }

  // SP → Rio
  const spRio = totalKm / 360
  if (spRio >= 0.2) {
    items.push({
      emoji: '🛣️',
      value: spRio >= 1 ? spRio.toFixed(1) + 'x' : (spRio * 100).toFixed(0) + '%',
      label: spRio >= 1 ? 'viagens de SP ao Rio' : 'de uma viagem SP → Rio',
      context: '360 km de distância',
      bg: 'bg-blueSecond',
    })
  }

  // Everest
  if (totalM >= 500) {
    const everests = totalM / 8848
    items.push({
      emoji: '⛰️',
      value: everests >= 1 ? everests.toFixed(1) + 'x' : Math.round(totalM) + ' m',
      label: everests >= 1 ? 'vezes o Everest escalado' : 'de elevação acumulada',
      context: `${Math.round(totalM).toLocaleString('pt-BR')} m no total`,
      bg: 'bg-[#2C6B2F]',
    })
  }

  // Dias correndo
  const totalHours = totalSecs / 3600
  if (totalHours >= 1) {
    const totalDays = totalHours / 24
    items.push({
      emoji: '⏱️',
      value: totalDays >= 1 ? totalDays.toFixed(1) : totalHours.toFixed(1),
      label: totalDays >= 1 ? 'dias da vida correndo' : 'horas de corrida',
      context: `${Math.round(totalHours)}h em movimento`,
      bg: 'bg-blueMain',
    })
  }

  return items
}

// ─── Sub-componentes ─────────────────────────────────────────────────────────

function StatCard({ icon, value, label, dark }) {
  return (
    <div className={`rounded-2xl p-4 flex flex-col gap-1 ${dark ? 'bg-blueMain' : 'bg-blueSecond'}`}>
      <div className="text-white/60">{icon}</div>
      <p className="text-white text-xl font-black leading-tight">{value}</p>
      <p className="text-white/60 text-xs font-medium">{label}</p>
    </div>
  )
}

function ActivityRow({ activity }) {
  return (
    <div className="py-3 flex justify-between items-center gap-4 border-b border-gray-100 last:border-0">
      <div className="flex items-center gap-3">
        <div className="size-10 rounded-full bg-blueMain/10 flex items-center justify-center flex-shrink-0">
          <FootprintsIcon size={18} className="text-blueMain" />
        </div>
        <div>
          <p className="font-semibold text-sm text-[#1E1E1E] truncate max-w-[160px]">
            {activity.name}
          </p>
          <p className="text-xs text-gray-400">
            {formatDateShort(activity.start_date_local || activity.start_date)}
            {activity.location_city ? ` · ${activity.location_city}` : ''}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-end gap-1 flex-shrink-0">
        <span className="text-blueMain font-bold text-sm">
          {formatDistance(activity.distance)}
        </span>
        <Link
          href={`/activity/${activity.id}`}
          className="text-xs text-blueThird font-semibold flex items-center gap-0.5"
        >
          Criar post <ArrowRightIcon size={10} />
        </Link>
      </div>
    </div>
  )
}

// ─── Página ──────────────────────────────────────────────────────────────────

export default function Home() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [url, setUrl] = useState('')
  const router = useRouter()

  const fetchData = useCallback(() => {
    setLoading(true)
    setError(null)
    fetch('/api/athlete')
      .then(r => {
        if (!r.ok) throw new Error('Não foi possível carregar o perfil')
        return r.json()
      })
      .then(setData)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  const handleOpenLink = () => {
    const match = url.match(/activities\/(\d+)/)
    if (match) {
      router.push(`/activity/${match[1]}`)
    } else {
      alert('Por favor, insira um URL válido da atividade do Strava.')
    }
  }

  if (loading) return (
    <div className="flex flex-col items-center justify-center gap-3 pt-20">
      <div className="w-10 h-10 border-4 border-blueMain border-t-transparent rounded-full animate-spin" />
      <p className="text-blueMain font-semibold italic text-sm">Carregando seu perfil...</p>
    </div>
  )

  if (error) return (
    <div className="flex flex-col items-center justify-center gap-4 pt-20">
      <p className="text-red-500 text-sm text-center">{error}</p>
      <button
        onClick={fetchData}
        className="bg-blueMain text-white px-6 py-2 rounded-full text-sm font-semibold"
      >
        Tentar novamente
      </button>
    </div>
  )

  const { athlete, stats } = data || {}
  const activities = (data?.activities || []).filter(a => a.distance > 0)
  const ytd = stats?.ytd_run_totals
  const curiosities = generateCuriosities(stats)

  return (
    <div className="flex flex-col gap-8">

      {/* ── Perfil ── */}
      <div className="flex items-center gap-4 bg-blueMain rounded-2xl p-5">
        {athlete?.profile ? (
          <Image
            src={athlete.profile}
            alt={athlete.firstname || 'atleta'}
            width={64}
            height={64}
            className="size-16 rounded-full border-2 border-white object-cover flex-shrink-0"
          />
        ) : (
          <div className="size-16 rounded-full border-2 border-white bg-blueSecond flex-shrink-0" />
        )}
        <div className="text-white min-w-0">
          <p className="text-xs font-medium opacity-70">Bem-vindo de volta!</p>
          <h1 className="text-xl font-black italic truncate">
            {athlete?.firstname} {athlete?.lastname}
          </h1>
          {(athlete?.city || athlete?.country) && (
            <div className="flex items-center gap-1 mt-0.5">
              <MapPinIcon size={11} className="opacity-60 flex-shrink-0" />
              <p className="text-xs opacity-60 truncate">
                {[athlete.city, athlete.country].filter(Boolean).join(', ')}
              </p>
            </div>
          )}
        </div>
        {stats?.all_run_totals?.count > 0 && (
          <div className="ml-auto text-center text-white flex-shrink-0">
            <p className="text-2xl font-black">{stats.all_run_totals.count}</p>
            <p className="text-xs opacity-60">corridas</p>
          </div>
        )}
      </div>

      {/* ── Stats do ano ── */}
      {ytd?.count > 0 && (
        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-black italic text-blueMain">Esse ano você...</h2>
          <div className="grid grid-cols-2 gap-3">
            <StatCard
              icon={<FootprintsIcon size={20} />}
              value={formatDistance(ytd.distance)}
              label="percorridos"
              dark
            />
            <StatCard
              icon={<ClockIcon size={20} />}
              value={formatDuration(ytd.moving_time)}
              label="em movimento"
            />
            <StatCard
              icon={<TrophyIcon size={20} />}
              value={ytd.count}
              label="atividades"
            />
            <StatCard
              icon={<MountainIcon size={20} />}
              value={`${Math.round(ytd.elevation_gain)} m`}
              label="de elevação"
              dark
            />
          </div>
        </div>
      )}

      {/* ── Curiosidades ── */}
      {curiosities.length > 0 && (
        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-black italic text-blueMain">Sabia que...</h2>
          <div className="flex gap-3 overflow-x-auto pb-1 snap-x snap-mandatory -mx-4 px-4 scrollbar-hide">
            {curiosities.map((c, i) => (
              <div
                key={i}
                className={`min-w-[175px] snap-start flex-shrink-0 ${c.bg} rounded-2xl p-5 flex flex-col gap-2`}
              >
                <span className="text-3xl">{c.emoji}</span>
                <span className="text-white text-3xl font-black leading-none">{c.value}</span>
                <span className="text-white/90 text-sm font-semibold leading-snug">{c.label}</span>
                <span className="text-white/55 text-xs">{c.context}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Atividades Recentes ── */}
      {activities?.length > 0 && (
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-black italic text-blueMain">Atividades Recentes</h2>
            <Link
              href="/account/atividades"
              className="text-blueThird text-sm font-semibold flex items-center gap-1"
            >
              Ver todas <ArrowRightIcon size={14} />
            </Link>
          </div>
          <div className="flex flex-col">
            {activities.map(activity => (
              <ActivityRow key={activity.id} activity={activity} />
            ))}
          </div>
        </div>
      )}

      {/* ── Carregar Atividade ── */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <h2 className="text-blueMain text-lg font-black italic">Carregar Atividade</h2>
          <p className="text-blueSecond text-xs font-medium">
            Cole o link de qualquer atividade do Strava
          </p>
        </div>
        <div className="relative">
          <input
            type="text"
            className="border border-blueMain rounded-xl p-3.5 w-full placeholder:italic placeholder:text-[#8C9BBC] text-xs pr-12"
            placeholder="ex: https://www.strava.com/activities/1367221"
            value={url}
            onChange={e => setUrl(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleOpenLink()}
          />
          <button
            onClick={handleOpenLink}
            className="bg-blueMain size-7 flex items-center text-white rounded-md justify-center absolute transform -translate-y-1/2 top-1/2 right-3"
          >
            →
          </button>
        </div>
      </div>

    </div>
  )
}
