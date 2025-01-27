import key from '../../../APIKey'

export async function POST(req) {
    try {
        const { username } = await req.json();
        // Fetch the current user record
        const userResponse = await fetch(
            `https://upunikself-fe0e.restdb.io/rest/fav-book-users?q={"username": "admin"}`,
            {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    'cache-control': 'no-cache',
                    'x-apikey': key,
                },
            }
        );

        if (!userResponse.ok) {
            throw new Error('Failed to fetch user');
        }

        const users = await userResponse.json();
        const user = users[0];

        const favoriteBooks = user.favorite_books || [];

        return new Response(JSON.stringify(favoriteBooks), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error updating favorites:', error.message);
        return new Response(
            JSON.stringify({ error: 'Failed to update favorites' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}

