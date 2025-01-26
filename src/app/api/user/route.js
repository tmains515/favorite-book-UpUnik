
import key from '../../APIKey';

export async function POST(req) {
  console.log('fart')
  try {
    const { username, password } = await req.json(); // Parse the incoming request body

    console.log('Username:', username);
    console.log('Password:', password);

    // Fetch from the external API
    const response = await fetch('https://upunikself-fe0e.restdb.io/rest/fav-book-users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'cache-control': 'no-cache',
        'x-apikey': key,
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();

    // Return the external API response
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('API Error:', error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
