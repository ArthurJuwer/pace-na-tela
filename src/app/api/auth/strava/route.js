export async function GET(req) {
  const clientId = process.env.STRAVA_CLIENT_ID;
  const redirectUri = process.env.STRAVA_REDIRECT_URI;
  const scope = 'read,activity:read_all,read_all';

  const authUrl = `https://www.strava.com/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scope}`;

  return new Response(null, {
    status: 302,
    headers: { Location: authUrl },
  });
}
