
import key from '../../../APIKey'

export async function PUT(req){
	try {
		const { username, favorite_books, _id } = await req.json();
        console.log(_id)
		const response = await fetch(`https://upunikself-fe0e.restdb.io/rest/fav-book-users/${_id}`, {
			method: 'PUT',
			headers: {
				'content-type': 'application/json',
				'cache-control': 'no-cache',
				'x-apikey': key,
			},
            body: JSON.stringify({
                username: username,
                favorite_books: favorite_books
            })
		});
    

        const responseData = await response.json();
        console.log(responseData)
		return new Response(JSON.stringify({ message: "Book added successfully", data: responseData }), {
		  status: 200,
		  headers: { 
			'Content-Type': 'application/json' ,
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