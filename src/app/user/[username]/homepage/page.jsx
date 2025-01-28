'use client'
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import BookTile from '@/app/components/BookTile';
import ProfileModal from '../../../components/ProfileModal'
const homepage = () => {
    const searchParams = useSearchParams();
    const userData = searchParams.get('userData') ? JSON.parse(searchParams.get('userData')) : null;
    const [userFavorites, setUserFavorites] = useState([]);
    const [showProfile, setShowProfile] = useState(false);

    const [edit, setEdit] = useState(null);
    const [editIndex, setEditIndex] = useState(null);
    const [submit, setSubmit] = useState(false)
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        genre: '',
    });

    // Fetch intial user favorites data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/user/load-favorites', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ _id: userData.id }),
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
        if(submit){
            setSubmit(false)
        }
    }, [userData.id, submit])

    // populate feilds if edit is active
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

    const handleSubmit = (e) => {
        e.preventDefault();

        let updatedFavorites = [...userFavorites];

        if (edit !== null) {
            updatedFavorites[editIndex] = {
                ...updatedFavorites[editIndex],
                title: formData.title,
                author: formData.author,
                genre: formData.genre,
            };
            
        } 
        else {
            updatedFavorites = [
                ...userFavorites,
                {
                    title: formData.title,
                    author: formData.author,
                    genre: formData.genre,
                },
            ];
        }
    
        setUserFavorites(updatedFavorites);
            const newFavorite = async () => {
            try {
                
                const request = await fetch('/api/user/add-favorite', {
                    method: 'PUT',
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify({
                        _id: userData.id,
                        username: userData.username,
                        favorite_books: updatedFavorites,
                    }),
                });
                if (!request.ok) {
                    throw new Error('Failed to update favorites');
                }
    
                const data = await request.json();
                alert(data.message);
    
                
                setSubmit(true);
                setFormData({
                    title: '',
                    author: '',
                    genre: '',
                });
                setEdit(null);
                setEditIndex(null)
            } catch (error) {
                console.error('Error updating favorites:', error.message);
            }
        };
    
        newFavorite();
    };


    const handleDelete = async (deleteIndex) => {
        try {
            const updatedFavorites = userFavorites.filter((book, index) => index !== deleteIndex);
            console.log(updatedFavorites)
            console.log(deleteIndex)

            setUserFavorites(updatedFavorites);
    
            const request = await fetch('/api/user/add-favorite', {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    _id: userData.id,
                    username: userData.username,
                    favorite_books: updatedFavorites,
                }),
            });
    
            if (!request.ok) {
                throw new Error('Failed to update favorites');
            }
    
            const data = await request.json();
        } catch (error) {
            console.error('Error updating favorites:', error.message);
        }
        setEditIndex(null)
    };
    
    


    

    return (
        <div className={`flex flex-col w-full h-screen ${showProfile ? 'bg-black opacity-60' : ""}`} >
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
                        {userFavorites.map((book, index) => (
                            <BookTile book={book} setEdit={setEdit} handleDelete={handleDelete} key={index} index={index} setEditIndex={setEditIndex}/>
                        ))}

                    </div>

                </div>


            </div>
            {showProfile ? <ProfileModal userData={userData} setShowProfile={setShowProfile} setProfileEdit={setProfileEdit}/> : ""}

            <div className='absolute top-0 right-0 w-10 h-10  m-4'>
                    <button onClick={() => setShowProfile(true)}>
                        <img src="/profile.png" alt="" />
                    </button>    
            </div>
        </div>

    )
}

export default homepage