"use client"
import axios from "axios"

import toast from "react-hot-toast"
import {useRouter} from "next/navigation"


export default function ProfilePage() {
    const router = useRouter();
    
    const logout = async () => {
        try {
            await axios.get("api/users/logout");
            toast.success("Logout successful");

            router.push("/login")
        } catch (error) {
            console.error(error);

            toast.error(
                error instanceof Error ? error.message : "Something went wrong"
            );
        }
    }    
    
    return (
        <div className="flex flex-col items-center justify-content min-h-screen py-50">
            <h1>Profile</h1>
            <hr/>
            <p>Profile Page</p>
            <hr />

            <button
            onClick={logout}
            className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded">logout</button>
        </div>
    )
}