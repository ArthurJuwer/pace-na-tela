export async function GET(req) {
  const cookies = req.headers.get('cookie') || '';
  const match = cookies.match(/access_token=([^;]+)/);
  const accessToken = match ? match[1] : null;

  if (!accessToken) {
    return Response.json({ message: 'Não autenticado' }, { status: 401 });
  }

  const headers = { Authorization: `Bearer ${accessToken}` };

  try {
    const athleteRes = await fetch('https://www.strava.com/api/v3/athlete', { headers });
    if (!athleteRes.ok) throw new Error(`Strava retornou ${athleteRes.status}`);
    const athlete = await athleteRes.json();

    const [statsRes, activitiesRes] = await Promise.all([
      fetch(`https://www.strava.com/api/v3/athletes/${athlete.id}/stats`, { headers }),
      fetch('https://www.strava.com/api/v3/athlete/activities?per_page=5&page=1', { headers }),
    ]);

    const stats = statsRes.ok ? await statsRes.json() : null;
    const activities = activitiesRes.ok ? await activitiesRes.json() : [];

    return Response.json({ athlete, stats, activities });
  } catch (err) {
    return Response.json({ message: err.message }, { status: 500 });
  }
}
