
import key from '../../../APIKey';
import bcrypt from 'bcrypt'
export async function POST(req) {
	try {
		const { username, password } = await req.json();

		// Fetch from the external API
		const response = await fetch('https://upunikself-fe0e.restdb.io/rest/fav-book-users', {
			method: 'GET',
			headers: {
				'content-type': 'application/json',
				'cache-control': 'no-cache',
				'x-apikey': key,
			},
		});

		if (!response.ok) {
			throw new Error('Failed to fetch user data');
		}

		const users = await response.json();
		const user = users.find((u) => u.username === username);

		if (!user || user.password !== password) {
			return new Response(
				JSON.stringify({ message: 'Invalid username or password' }),
				{ status: 401, headers: { 'Content-Type': 'application/json' } }
			);
		}

		// Return success response
		return new Response(
			JSON.stringify({ message: 'Login successful', id: user._id, username: user.username, email: user.email }),
			{ status: 200, headers: { 'Content-Type': 'application/json' } }
		);
	} catch (error) {
		console.error('API Error:', error.message);
		return new Response(JSON.stringify({ error: error.message }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		});
	}
}
