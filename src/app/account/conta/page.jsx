'use client'
import Image from 'next/image'
import { useEffect, useState, useCallback } from 'react'
import { MapPinIcon, CalendarIcon, FootprintsIcon, ClockIcon, MountainIcon, TrophyIcon, LogOutIcon } from 'lucide-react'
import LogoStrava from "../../../../public/logo-apps-integracao/Strava.svg"

function formatTotalDistance(meters) {
  const km = meters / 1000
  return km >= 1000
    ? (km / 1000).toFixed(1) + ' mil km'
    : km.toFixed(0) + ' km'
}

function formatTotalTime(seconds) {
  const h = Math.floor(seconds / 3600)
  if (h >= 24) return `${Math.floor(h / 24)}d ${h % 24}h`
  return `${h}h`
}

function formatMemberSince(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('pt-BR', {
    month: 'long',
    year: 'numeric',
  })
}

function StatCard({ icon, value, label, dark }) {
  return (
    <div className={`rounded-2xl p-4 flex flex-col gap-1 ${dark ? 'bg-blueMain' : 'bg-blueSecond'}`}>
      <div className="text-white/60">{icon}</div>
      <p className="text-white text-xl font-black leading-tight">{value}</p>
      <p className="text-white/60 text-xs font-medium">{label}</p>
    </div>
  )
}

export default function Conta() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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

  if (loading) return (
    <div className="flex flex-col items-center justify-center gap-3 pt-20">
      <div className="w-10 h-10 border-4 border-blueMain border-t-transparent rounded-full animate-spin" />
      <p className="text-blueMain font-semibold italic text-sm">Carregando perfil...</p>
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
  const all = stats?.all_run_totals
  const location = [athlete?.city, athlete?.state, athlete?.country].filter(Boolean).join(', ')

  return (
    <div className="flex flex-col gap-8 italic">

      {/* ── Perfil ── */}
      <div className="flex flex-col items-center gap-3">
        {athlete?.profile ? (
          <Image
            src={athlete.profile}
            alt={athlete.firstname || 'atleta'}
            width={96}
            height={96}
            className="size-24 rounded-full border-4 border-blueMain object-cover"
          />
        ) : (
          <div className="size-24 rounded-full border-4 border-blueMain bg-[#D9D9D9]" />
        )}

        <div className="flex flex-col items-center gap-1">
          <h1 className="text-2xl font-black text-[#1E1E1E]">
            {athlete?.firstname} {athlete?.lastname}
          </h1>

          {location && (
            <div className="flex items-center gap-1 text-[#A9A9A9]">
              <MapPinIcon size={13} />
              <span className="text-sm font-semibold">{location}</span>
            </div>
          )}

          {athlete?.created_at && (
            <div className="flex items-center gap-1 text-[#A9A9A9]">
              <CalendarIcon size={13} />
              <span className="text-xs font-medium">
                Membro desde {formatMemberSince(athlete.created_at)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ── Estatísticas no total ── */}
      {all?.count > 0 && (
        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-black text-blueMain">No total você...</h2>
          <div className="grid grid-cols-2 gap-3">
            <StatCard
              icon={<FootprintsIcon size={20} />}
              value={formatTotalDistance(all.distance)}
              label="percorridos"
              dark
            />
            <StatCard
              icon={<TrophyIcon size={20} />}
              value={all.count}
              label="corridas"
            />
            <StatCard
              icon={<ClockIcon size={20} />}
              value={formatTotalTime(all.moving_time)}
              label="em movimento"
            />
            <StatCard
              icon={<MountainIcon size={20} />}
              value={`${Math.round(all.elevation_gain / 1000).toLocaleString('pt-BR')} mil m`}
              label="de elevação"
              dark
            />
          </div>
        </div>
      )}

      {/* ── Conta conectada ── */}
      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-black text-blueMain">Conta conectada</h2>
        <div className="flex items-center justify-between bg-[#F5F5F5] rounded-2xl px-5 py-4">
          <div className="flex items-center gap-3">
            <Image src={LogoStrava} className="h-8 w-auto" alt="Strava" />
            <div>
              <p className="font-bold text-sm text-[#1E1E1E]">Strava</p>
              <p className="text-xs text-[#A9A9A9] font-medium">
                {athlete?.firstname} {athlete?.lastname}
              </p>
            </div>
          </div>
          <span className="text-xs font-bold text-green-600 bg-green-100 px-3 py-1 rounded-full">
            Conectado
          </span>
        </div>
      </div>

      {/* ── Sair ── */}
      <div className="flex flex-col gap-2 pt-2">
        <a
          href="/api/auth/logout"
          className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl border border-red-300 text-red-500 font-semibold text-sm"
        >
          <LogOutIcon size={16} />
          Sair da conta
        </a>
      </div>

    </div>
  )
}
