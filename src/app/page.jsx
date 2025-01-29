'use client'
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import Modal from './user/create-user/page'
export default function Home() {
	const router = useRouter();
	const [createUserModal, setCreateUserModal] = useState(false);
	const [signIn, setSignIn] = useState(false);
	const userNameRef = useRef(null);
	const userPassRef = useRef(null);

	// Login
	const login = async (username, password) => {
		try {
			const response = await fetch('/api/user/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ username, password }),
			});

			if (!response.ok) {
				throw new Error('Something went wrong');
			}

			const data = await response.json();

			//passing user object via search params
			router.push(`/user/${username}/homepage?userData=${encodeURIComponent(JSON.stringify(data))}`);
			} 
			catch (error) {
			console.error('Login failed:', error.message);
		}

	};


	return (
		<div className={`grid grid-rows-01 items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] ${createUserModal ? "bg-black opacity-60" : ""}`}>
			<main className={"flex flex-col gap-8 row-start-2 items-center sm:items-start bg-[#ededed] w-1/3 h-2/3 rounded-2xl shadow-2xl "}>
				<h1 className="text-[#80cc84] text-3xl text-center w-full mt-4">Welcome to Favo-rite-Books</h1>

				{signIn ?
					<div className="flex flex-col w-1/2 m-auto mb-8">
						<label htmlFor="" className="text-black">Username:</label>
						<input type="text" ref={userNameRef} className="text-black" />
						<label htmlFor="" className="text-black">Password:</label>
						<input type="password" ref={userPassRef} className="text-black" />
						<button className="bg-[#80cc84] px-4 h-10 rounded-xl hover:bg-[#609e63] mt-4" onClick={() => login(userNameRef.current.value, userPassRef.current.value)}>Sign-In</button>

					</div>
					:

					<div className="flex items-center justify-evenly w-full mt-2">
						<button className="bg-[#80cc84] px-4 h-10 rounded-xl hover:bg-[#609e63]" onClick={() => setSignIn(true)}>Sign-In</button>
						<button className="bg-[#80cc84] px-4 h-10 rounded-xl hover:bg-[#609e63]" onClick={() => setCreateUserModal(true)}>Create Account</button>
					</div>
				}
			</main>

			{/* Modal for creating new user */}
			{createUserModal ? <Modal setCreateUserModal={setCreateUserModal} /> : ""}



			<footer className="row-start-3 flex gap-6 flex-wrap items-center">
				By Tyler Mains
			</footer>
		</div>
	);
}
