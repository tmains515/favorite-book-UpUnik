import key from '../../../APIKey'

export async function POST(req) {
    const body = await req.json();
    const { _id } = body;

    try {
        // Fetch the current user record
        const userResponse = await fetch(
            `https://upunikself-fe0e.restdb.io/rest/fav-book-users/${_id}`,
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

        const user = await userResponse.json();
        console.log(JSON.stringify(user))

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

