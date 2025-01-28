
import key from '../../../APIKey'
export async function POST(req){
	console.log('reached here')
	try {
		const { username, email, password } = await req.json();
		const response = await fetch(`https://upunikself-fe0e.restdb.io/rest/fav-book-users`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				'cache-control': 'no-cache',
				'x-apikey': key,
			},
			body: JSON.stringify({
				username: username,
				email: email,
				password: password,
				favorite_books: []
			})
		});

		const responseData = await response.json();
		console.log(responseData)
		return new Response(JSON.stringify({ message: "User added successfully", data: responseData }), {
			status: 200,
			headers: {
				'Content-Type': 'application/json',
				'cache-control': 'no-cache',
				'x-apikey': key,
			},
		});
	}
	catch (error) {
		console.error('Error loading favorites:', error);
		return new Response(
			JSON.stringify({ error: 'Failed to load favorites' }),
			{ status: 500, headers: { 'Content-Type': 'application/json' } }
		);
	}
}


export async function PUT(req) {

	try {
		const { _id, username, email, password, favorite_books } = await req.json();

		const response = await fetch(`https://upunikself-fe0e.restdb.io/rest/fav-book-users/${_id}`, {
			method: 'PUT',
			headers: {
				'content-type': 'application/json',
				'cache-control': 'no-cache',
				'x-apikey': key,
			},
			body: JSON.stringify({
				username: username,
				email: email,
				password: password,
				favorite_books: favorite_books
			})
		});

		const responseData = await response.json();
		console.log(responseData)
		return new Response(JSON.stringify({ message: "User added successfully", data: responseData }), {
			status: 200,
			headers: {
				'Content-Type': 'application/json',
				'cache-control': 'no-cache',
				'x-apikey': key,
			},
		});
	}
	catch (error) {
		console.error('Error loading favorites:', error);
		return new Response(
			JSON.stringify({ error: 'Failed to load favorites' }),
			{ status: 500, headers: { 'Content-Type': 'application/json' } }
		);
	}
}






export async function DELETE(req) {

	try {
		const { _id } = await req.json();

		const response = await fetch(`https://upunikself-fe0e.restdb.io/rest/fav-book-users/${_id}`, {
			method: 'DELETE',
			headers: {
				'content-type': 'application/json',
				'cache-control': 'no-cache',
				'x-apikey': key,
			},

		});

		if (!response.ok) {
			console.log('Something went wrong')
		}


		return new Response(JSON.stringify({ message: "User deleted successfully" }), {
			status: 200,
			headers: {
				'Content-Type': 'application/json',
				'cache-control': 'no-cache',
				'x-apikey': key,
			},
		});
	}
	catch (error) {
		console.error('Error loading favorites:', error);
		return new Response(
			JSON.stringify({ error: 'Failed to load favorites' }),
			{ status: 500, headers: { 'Content-Type': 'application/json' } }
		);
	}
}