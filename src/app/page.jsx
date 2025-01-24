'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";
import Modal from './user/create-user/page'
export default function Home() {
	const router = useRouter()
	const [createUserModal, setCreateUserModal] = useState(false);

	const handleCreateUser = () => {
		setCreateUserModal(true)
	  };

	const handleSignIn = () => {
		router.push("/SignIn");
	};
	
	return (
		<div className={`grid grid-rows-01 items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] ${createUserModal ? "bg-black opacity-60" : ""}`}>
			<main className="flex flex-col gap-8 row-start-2 items-center sm:items-start bg-[#ededed] w-1/3 h-2/3 rounded-2xl">
				<h1 className="text-[#80cc84] text-3xl text-center w-full mt-4">Welcome to Favo-rite-Books</h1>
				<div className="flex items-center justify-evenly w-full mt-4">
					<button className="bg-[#80cc84] px-4 h-10 rounded-xl hover:bg-[#609e63]" >Sign-In</button>
					<button className="bg-[#80cc84] px-4 h-10 rounded-xl hover:bg-[#609e63]" onClick={handleCreateUser}>Create Account</button>
				</div>
			</main>

			{createUserModal ? <Modal/> : ""}

			<footer className="row-start-3 flex gap-6 flex-wrap items-center">
				By Tyler Mains
			</footer>
		</div>
	);
}
