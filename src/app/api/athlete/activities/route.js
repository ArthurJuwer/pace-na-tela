export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const page = parseInt(searchParams.get('page') || '1')
  const perPage = 20

  const cookies = req.headers.get('cookie') || ''
  const match = cookies.match(/access_token=([^;]+)/)
  const accessToken = match ? match[1] : null

  if (!accessToken) {
    return Response.json({ message: 'Não autenticado' }, { status: 401 })
  }

  try {
    const res = await fetch(
      `https://www.strava.com/api/v3/athlete/activities?per_page=${perPage}&page=${page}`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    )

    if (!res.ok) throw new Error(`Strava retornou ${res.status}`)

    const activities = await res.json()
    const filtered = activities.filter(a => a.distance > 0)

    return Response.json({ activities: filtered, page, hasMore: activities.length === perPage })
  } catch (err) {
    return Response.json({ message: err.message }, { status: 500 })
  }
}
