import { useState } from "react";
import key from '../APIKey'

const ProfileModal = ( {userData , setShowProfile, setProfileEdit} ) => {
    console.log(userData)
    const [formData, setFormData] = useState({
        username: userData.username,
        email: userData.email,
        password: userData.password,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async(e) => {
        
        e.preventDefault();
        try {
            const response = await fetch('/api/user/createUser', {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json',
                    'cache-control': 'no-cache',
                    'x-apikey': key,
                },
                
                body:JSON.stringify({
                    _id: userData.id,
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                    favorite_books: userData.favorite_books
                })
            })
            if(!response.ok){
             console.log('something went wrong')       
            }
            setProfileEdit(true)    
        } 
        catch (error) {
            console.log(error)
        }
        setShowProfile(false)
    }

    const handleDelete = async () => {
                
        e.preventDefault();
        try {
            const response = await fetch('/api/user/createUser', {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json',
                    'cache-control': 'no-cache',
                    'x-apikey': key,
                },
                
            })
            if(!response.ok){
             console.log('something went wrong')       
            }    
        } 
        catch (error) {
            console.log(error)
        }
        setShowProfile(false)
    }



    return (
        <div className='absolute top-0 right-0 m-4 w-[300px] z-50'>
            <div className="row-start-2 row-span-3 col-start-3 col-span-2 bg-white rounded-xl shadow-2xl">
                <button className='text-gray-500 float-right p-2 top-0' onClick={() => setShowProfile(false)}>X</button>

                <form className="w-full h-full bg-gray-100 p-8 rounded-lg shadow-lg mx-auto" onSubmit={handleSubmit}>
                    {/* Username */}
                    <label htmlFor="username" className="block text-black mb-2">
                        Username:
                    </label>
                    <input
                        type="text"
                        id="username"
                        name='username'
                        value={formData.username}
                        className="border border-gray-400 rounded w-full p-2 mb-4 text-black"
                        required
                        onChange={handleChange}
                    />

                    {/* Email */}
                    <label htmlFor="email" className="block text-black mb-2">
                        Email:
                    </label>
                    <input
                        type="email"
                        id="email"
                        name='email'
                        value={formData.email}
                        className="border border-gray-400 rounded w-full p-2 mb-4 text-black"
                        required
                        onChange={handleChange}
                    />

                    {/* Password */}
                    <label htmlFor="password" className="block text-black mb-2">
                        New Password:
                    </label>
                    <input
                        type="password"
                        id="password"
                        name='password'
                        value={formData.password}
                        className="border border-gray-400 rounded w-full p-2 mb-4 text-black"
                        required
                        onChange={handleChange}
                    />

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                    >
                        Save Changes
                    </button>
                    <button
                        onClick={handleDelete}
                        className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 mt-8"
                    >
                        Delete Account
                    </button>
                </form>
            </div>

        </div>
    )
}

export default ProfileModal