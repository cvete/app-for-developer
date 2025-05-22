export async function GET() {
  try {
    const res = await fetch(process.env.N8N_BROKER_DATA_URL!, {
      headers: {
        'Authorization': `Bearer ${process.env.N8N_API_TOKEN}`,
      },
    });

    if (!res.ok) {
      return new Response(JSON.stringify({ error: 'Failed to fetch broker data from n8n' }), { status: res.status });
    }

    const data = await res.json();
    return Response.json(data);
  } catch (error) {
    console.error('Error fetching broker data:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
