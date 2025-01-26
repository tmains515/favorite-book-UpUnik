'use client'
import Form from 'next/form'
import { useEffect } from 'react'
import key from '../../APIKey.js'
const CreateUser = ({setCreateUserModal}) => {
    useEffect(() => {
        const fetchData = async() => {
            const response = await fetch('https://upunikself-fe0e.restdb.io/rest/fav-book-users', {
                headers:{
                    'Content-Type' : 'application/json',
                    'cache-control': 'no-cache',
                    'x-apikey': key
                }
            
            })
            if(!response.ok){
                return new Error('Something went wrong')
            }
            let data = await response.json()
            console.log(data)
        }
        fetchData()
    })

    return (
        <div className='absolute grid grid-rows-6 grid-cols-6 w-full h-screen z-50'>
            <div className="row-start-2 row-span-3 col-start-3 col-span-2 bg-white rounded-xl shadow-2xl">
            <button className='text-gray-500 float-right p-2 top-0' onClick={() => setCreateUserModal(false)}>X</button>

                <Form className="w-full h-full bg-gray-100 p-8 rounded-lg shadow-lg mx-auto">
                    {/* Username */}
                    <label htmlFor="username" className="block text-black mb-2">
                        Username:
                    </label>
                    <input
                        type="text"
                        id="username"
                        className="border border-gray-400 rounded w-full p-2 mb-4"
                        required
                    />

                    {/* Email */}
                    <label htmlFor="email" className="block text-black mb-2">
                        Email:
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="border border-gray-400 rounded w-full p-2 mb-4"
                        required
                    />

                    {/* Password */}
                    <label htmlFor="password" className="block text-black mb-2">
                        Password:
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="border border-gray-400 rounded w-full p-2 mb-4"
                        required
                    />

                    {/* Confirm Password */}
                    <label htmlFor="confirm-password" className="block text-black mb-2">
                        Confirm Password:
                    </label>
                    <input
                        type="password"
                        id="confirm-password"
                        className="border border-gray-400 rounded w-full p-2 mb-4"
                        required
                    />

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                    >
                        Submit
                    </button>
                </Form>
            </div>

        </div>
    )
}
export default CreateUser