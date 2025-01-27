
import key from '../../../APIKey'

export async function POST(req){
	try {
		const { title, author, genre } = await req.json();
	
		const response = await fetch('https://upunikself-fe0e.restdb.io/rest/books', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				'cache-control': 'no-cache',
				'x-apikey': key,
			},
            body: JSON.stringify({
                title: title,
                author: author,
                genre: genre
            })
		});

        if(!response.ok){
            console.log("Something went wrong")
        }        

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
	  } catch (error) {
		console.error('Error loading favorites:', error);
		return new Response(
		  JSON.stringify({ error: 'Failed to load favorites' }),
		  { status: 500, headers: { 'Content-Type': 'application/json' } }
		);
	  }
}