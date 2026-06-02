"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";



export default function SignupPage() {
    const router = useRouter();

    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    }) 

    const [buttonDisabled, setButtonDisabled] = React.useState(true)

    React.useEffect(() => {
        setButtonDisabled(!(user.email && user.password && user.username))
    }, [user])

    const onsignup = async () => {
        try {
            setButtonDisabled(true)
            const response = await axios.post("/api/users/signup", user)
            console.log("Sign up success", response.data)
            router.push("/login")
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "An error occurred"
            toast.error(errorMessage)
        } finally {
            setButtonDisabled(false)
        } 
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="flex flex-col w-80 p-6 border rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-4 text-center">SignUp</h1>

                <label htmlFor="username" className="mb-1">Username</label>
                <input 
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                    id="username"
                    type="text"
                    value={user.username}
                    onChange={(e) => setUser({...user, username: e.target.value})}
                    placeholder="username"
                />

                <label htmlFor="email" className="mb-1">Email</label>
                <input 
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                    id="email"
                    type="text"
                    value={user.email}
                    onChange={(e) => setUser({...user, email: e.target.value})}
                    placeholder="email"
                />

                <label htmlFor="password" className="mb-1">Password</label>
                <input 
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                    id="password"
                    type="password"
                    value={user.password}
                    onChange={(e) => setUser({...user, password: e.target.value})}
                    placeholder="password"
                />

                <button
                    onClick={onsignup}
                    disabled={buttonDisabled}
                    className={`p-2 bg-blue-500 text-white rounded-lg mb-4 hover:bg-blue-600 transition ${buttonDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                    {buttonDisabled ? "Signing up..." : "Signup here"}
                </button>

                <Link href="/login" className="text-blue-500 text-center hover:underline">
                    Visit login page
                </Link>
            </div>
        </div>
    )
}