export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');

  const clientId = process.env.STRAVA_CLIENT_ID;
  const clientSecret = process.env.STRAVA_CLIENT_SECRET;
  const redirectUri = process.env.STRAVA_REDIRECT_URI;

  try {
    const response = await fetch('https://www.strava.com/oauth/token', {
      method: 'POST',
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri,
      }),
    });

    const data = await response.json();

    // Aqui você pode salvar tokens em DB ou cookie. Exemplo simples de cookie:
    return new Response(null, {
      status: 302,
      headers: {
        Location: '/account/home',
        'Set-Cookie': `access_token=${data.access_token}; Path=/; HttpOnly`,
      },
    });
  } catch (err) {
    console.error(err);
    return new Response('Erro na autenticação', { status: 500 });
  }
}
