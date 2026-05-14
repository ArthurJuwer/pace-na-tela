'use client'
import { useEffect, useState, useCallback } from 'react'
import CardAtividade from '@/components/Account/Atividades/CardAtividade'

export default function Atividades() {
  const [activities, setActivities] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState(null)

  const fetchPage = useCallback(async (pageNum, append = false) => {
    append ? setLoadingMore(true) : setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/athlete/activities?page=${pageNum}`)
      if (!res.ok) throw new Error('Não foi possível carregar as atividades')
      const data = await res.json()
      setActivities(prev => append ? [...prev, ...data.activities] : data.activities)
      setHasMore(data.hasMore)
    } catch (e) {
      setError(e.message)
    } finally {
      append ? setLoadingMore(false) : setLoading(false)
    }
  }, [])

  useEffect(() => { fetchPage(1) }, [fetchPage])

  const handleLoadMore = () => {
    const next = page + 1
    setPage(next)
    fetchPage(next, true)
  }

  if (loading) return (
    <div className="flex flex-col items-center justify-center gap-3 pt-20">
      <div className="w-10 h-10 border-4 border-blueMain border-t-transparent rounded-full animate-spin" />
      <p className="text-blueMain font-semibold italic text-sm">Carregando atividades...</p>
    </div>
  )

  if (error) return (
    <div className="flex flex-col items-center justify-center gap-4 pt-20">
      <p className="text-red-500 text-sm text-center">{error}</p>
      <button
        onClick={() => fetchPage(1)}
        className="bg-blueMain text-white px-6 py-2 rounded-full text-sm font-semibold"
      >
        Tentar novamente
      </button>
    </div>
  )

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold italic text-blueMain">Atividades</h1>

      {activities.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 pt-16">
          <p className="text-gray-400 italic text-sm text-center">
            Nenhuma atividade com distância encontrada.
          </p>
        </div>
      ) : (
        <>
          <div className="flex flex-col divide-y divide-gray-100">
            {activities.map(activity => (
              <div key={activity.id} className="py-4">
                <CardAtividade activity={activity} />
              </div>
            ))}
          </div>

          {hasMore && (
            <button
              onClick={handleLoadMore}
              disabled={loadingMore}
              className="w-full py-3 rounded-2xl border border-blueMain text-blueMain font-semibold italic text-sm flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loadingMore ? (
                <>
                  <span className="w-4 h-4 border-2 border-blueMain border-t-transparent rounded-full animate-spin" />
                  Carregando...
                </>
              ) : 'Carregar mais'}
            </button>
          )}

          {!hasMore && activities.length > 0 && (
            <p className="text-center text-gray-400 text-xs italic py-2">
              Todas as atividades carregadas
            </p>
          )}
        </>
      )}
    </div>
  )
}
