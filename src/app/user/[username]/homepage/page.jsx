'use client'
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import BookTile from '@/app/components/BookTile';
const homepage = () => {
    const searchParams = useSearchParams();
    const userData = searchParams.get('userData') ? JSON.parse(searchParams.get('userData')) : null;
    useEffect( () => {
        const fetchData = async () => {
            try {

                const response = await fetch('/api/user/load-favorites', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ username: userData.username}),
                });
            
                if (!response.ok) {
                  throw new Error('Failed to load favorites');
                }
            
                const data = await response.json();
                console.log('Favorites:', data);
              } catch (error) {
                console.error(error.message);
              }
        }
        fetchData()
    })
    //                       nice, its {userData.username} {userData.id} {userData.email}
    return(
            <div className='flex flex-col w-full h-screen'>
                <h1 className='text-4xl m-10'>Welcome back, {userData.username}!</h1>
                <h1 className='text-4xl mx-auto'>Your favorite books</h1>
                <div className='flex w-1/2 h-1/2 bg-[#ededed] m-auto rounded-2xl shadow-2xl'>
                    <div className='w-full h-full grid grid-rows-6 grid-cols-6'>
                        <div className='flex w-full h-full shadow-lg row-start-1 row-span-2 col-span-6'>
                        <div className='flex flex-col w-full h-full m-2'>
                            <label htmlFor="" className='text-black'>Title:</label>
                            <input type="text" className=' rounded-full'/>
                            <label htmlFor="" className='text-black'>Author:</label>
                            <input type="text" className=' rounded-full'/>
                            <label htmlFor="" className='text-black'>Genre:</label>
                            <input type="text" className=' rounded-full' />
                        </div>

                        <div className='w-1/3 h-full flex'>
                            <button className='w-1/2 h-1/2 bg-[#80cc84] m-auto rounded-lg hover:bg-[#609e63]'>Add</button>
                        </div>

                    </div>
                    {/* Favorite Book Content Div*/}
                    <div className='row-start-3 h-auto row-span-4 col-span-6 text-black overflow-y-scroll overflow-x-hidden'>
                        <div className='flex sticky top-0 justify-between px-10 my-2 bg-[#ededed]'>
                            <h1>Title</h1>
                            <h1>Author</h1>
                            <h1>Genre</h1>
                            <h1>Options</h1>

                        </div>
                        <BookTile />
                        <BookTile />
                        <BookTile />
                        <BookTile />
                        <BookTile />
                        <BookTile />
                        <BookTile />
                        <BookTile />

                    </div>

                </div>

            </div>
        </div>

    )
}

export default homepage