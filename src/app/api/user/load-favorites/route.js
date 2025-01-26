import key from '../../../APIKey'

export async function POST(req) {	
	try {
		//const { id } = await req.json();
		const { username } = await req.json();
	
		const response = await fetch('https://upunikself-fe0e.restdb.io/rest/favorited-books', {
			method: 'GET',
			headers: {
				'content-type': 'application/json',
				'cache-control': 'no-cache',
				'x-apikey': key,
			},
		});

		const books = await response.json();
		console.log('Fetched books:', JSON.stringify(books, null, 2));
		const userBooks = books.find((entry) =>
			entry.user_id.some((user) => user.username === username)
		  );
		  
		  const favorites = userBooks ? userBooks.book_id : [];
		  console.log('Favorites:', favorites);
		  

		return new Response(JSON.stringify(favorites), {
		  status: 200,
		  headers: { 
			'Content-Type': 'application/json' ,
			'cache-control': 'no-cache',
			'x-apikey': key,
		},
		});
	  } catch (error) {
		console.error('Error loading favorites:', error);
		return new Response(
		  JSON.stringify({ error: 'Failed to load favorites' }),
		  { status: 500, headers: { 'Content-Type': 'application/json' } }
		);
	  }
}