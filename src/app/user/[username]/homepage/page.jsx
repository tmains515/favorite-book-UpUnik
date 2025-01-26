'use client'
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
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

    return(
        <div>nice, its {userData.username} {userData.id} {userData.email}</div>
    )
}

export default homepage