'use client'
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import BookTile from '@/app/components/BookTile';
const homepage = () => {
    const searchParams = useSearchParams();
    const userData = searchParams.get('userData') ? JSON.parse(searchParams.get('userData')) : null;
    const [userFavorites, setUserFavorites] = useState([]);
    const [edit, setEdit] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        genre: '',
    });
    useEffect(() => {
        console.log('useEffect triggered with userData:', userData);
        const fetchData = async () => {
            try {

                const response = await fetch('/api/user/load-favorites', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username: userData.username }),
                });

                if (!response.ok) {
                    throw new Error('Failed to load favorites');
                }

                const data = await response.json();
                setUserFavorites(data)
            } catch (error) {
                console.error(error.message);
            }
        }
        fetchData()
    }, [userData.username])


    useEffect(() => {
        if (edit !== null) {
            setFormData({
                title: edit.title || '',
                author: edit.author || '',
                genre: edit.genre || '',
            });
        }
    }, [edit]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();    

        // If edit is null, submit as POST and update relation table as well
        const newFavorite = async() => {
            const request = await fetch('/api/user/add-favorite', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({title: formData.title, author: formData.author, genre: formData.genre})
            })
            console.log(request)
            if (!request.ok) {
                throw new Error('Failed to add to favorites');
            }

            const data = await request.json();
            alert(data.message);



            setFormData({
                title: '',
                author: '',
                genre: '',
            });
        }


        // If edit is not null, submit as PUT
        const updateFavorite = async() => {
            const request = await fetch('/api/user/add-favorite', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                }
            })
    
            if (!request.ok) {
                throw new Error('Failed to load favorites');
            }
        }

        if(edit === null){
            newFavorite()
        }
        else{
            updateFavorite()
        }

    };

    return (
        <div className='flex flex-col w-full h-screen'>
            <h1 className='text-4xl m-10'>Welcome back, {userData.username}!</h1>
            <h1 className='text-4xl mx-auto'>Your favorite books</h1>
            <div className='flex w-1/2 h-1/2 bg-[#ededed] m-auto rounded-2xl shadow-2xl'>
                <div className='w-full h-full grid grid-rows-6 grid-cols-6'>
                    <div className='flex w-full h-full shadow-lg row-start-1 row-span-2 col-span-6'>
                        <div className='flex flex-row w-full h-full m-2'>
                            <form onSubmit={handleSubmit} className="flex w-full">
                                <div className='flex flex-col w-full'>
                                    {/* Title Input */}
                                    <label htmlFor="title" className="text-black">Title:</label>
                                    <input
                                        type="text"
                                        name="title"
                                        id="title"
                                        className="text-black rounded-full pl-4"
                                        value={formData.title}
                                        onChange={handleChange}
                                    />

                                    {/* Author Input */}
                                    <label htmlFor="author" className="text-black">Author:</label>
                                    <input
                                        type="text"
                                        name="author"
                                        id="author"
                                        className="text-black rounded-full pl-4"
                                        value={formData.author}
                                        onChange={handleChange}
                                    />

                                    {/* Genre Input */}
                                    <label htmlFor="genre" className="text-black">Genre:</label>
                                    <input
                                        type="text"
                                        name="genre"
                                        id="genre"
                                        className="text-black rounded-full pl-4"
                                        value={formData.genre}
                                        onChange={handleChange}
                                    />

                                </div>
                                <div className='w-1/3 h-full flex'>
                                    {edit === null ?
                                        <button className='w-1/2 h-1/2 bg-[#80cc84] m-auto rounded-lg hover:bg-[#609e63]' type='submit'>Add</button>
                                        :
                                        <button className='w-1/2 h-1/2 bg-[#80cc84] m-auto rounded-lg hover:bg-[#609e63]' type='submit'>Save</button>
                                    }
                                </div>
                            </form>
                        </div>



                    </div>

                    {/* Favorite Book Content Div*/}
                    <div className='row-start-3 h-auto row-span-4 col-span-6 text-black overflow-y-scroll overflow-x-hidden'>
                        <div className='flex sticky top-0 justify-between px-20 my-2 bg-[#ededed]'>
                            <h1 className='text-xl font-semibold ml-4'>Title</h1>
                            <h1 className='text-xl font-semibold'>Author</h1>
                            <h1 className='text-xl font-semibold'>Genre</h1>
                            <h1 className='text-xl font-semibold'>Options</h1>

                        </div>
                        {userFavorites.map((book) => (
                            <BookTile book={book} setEdit={setEdit} />
                        ))}

                    </div>

                </div>

            </div>
        </div>

    )
}

export default homepage