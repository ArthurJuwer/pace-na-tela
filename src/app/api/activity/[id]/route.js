export async function GET(req, context) {
  // context.params contém os parâmetros dinâmicos
  const { id } = context.params;  

  const cookies = req.headers.get('cookie') || '';
  const match = cookies.match(/access_token=([^;]+)/);
  const accessToken = match ? match[1] : null;

  if (!accessToken) return new Response('Usuário não autenticado', { status: 401 });

  try {
    const res = await fetch(`https://www.strava.com/api/v3/activities/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!res.ok) throw new Error('Erro ao buscar atividade');

    const activity = await res.json();
    return new Response(JSON.stringify(activity), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response('Erro ao buscar atividade', { status: 500 });
  }
}
