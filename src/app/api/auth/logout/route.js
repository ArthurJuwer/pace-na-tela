export async function GET() {
  return new Response(null, {
    status: 302,
    headers: {
      Location: '/',
      'Set-Cookie': 'access_token=; Path=/; HttpOnly; Max-Age=0; SameSite=Lax',
    },
  })
}
