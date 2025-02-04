'use client'
import { useEffect, useState } from 'react'
import key from '../../APIKey.js'
const CreateUser = ({setCreateUserModal}) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
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
        console.log(formData)
        try {
            const response = await fetch('/api/user/createUser', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'cache-control': 'no-cache',
                    'x-apikey': key,
                },
                
                body:JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                    favorite_books: []
                })
            })
            if(!response.ok){
             console.log('something went wrong')       
            }    
        } 
        catch (error) {
            console.log(error)
        }
        setCreateUserModal(false)
    }

    return (
        <div className='absolute grid grid-rows-6 grid-cols-6 w-full h-screen z-50'>
            <div className="row-start-2 row-span-3 col-start-3 col-span-2 bg-white rounded-xl shadow-2xl">
            <button className='text-gray-500 float-right p-2 top-0' onClick={() => setCreateUserModal(false)}>X</button>

                <form className="w-full h-full bg-gray-100 p-8 rounded-lg shadow-lg mx-auto" onSubmit={handleSubmit}>
                    {/* Username */}
                    <label htmlFor="username" className="block text-black mb-2">
                        Username:
                    </label>
                    <input
                        type="text"
                        id="username"
                        name='username'
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
                        className="border border-gray-400 rounded w-full p-2 mb-4 text-black"
                        required
                        onChange={handleChange}
                    />

                    {/* Password */}
                    <label htmlFor="password" className="block text-black mb-2">
                        Password:
                    </label>
                    <input
                        type="password"
                        id="password"
                        name='password'
                        className="border border-gray-400 rounded w-full p-2 mb-4 text-black"
                        required
                        onChange={handleChange}
                    />

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                    >
                        Submit
                    </button>
                </form>
            </div>

        </div>
    )
}
export default CreateUser