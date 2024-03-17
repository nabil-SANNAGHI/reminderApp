import LoginForm from "@/app/components/LoginForm"
import Link from "next/link"

function login() {
    return (
        <>
            <h1 className="text-center mb-5 uppercase font-bold">login page</h1>
            <LoginForm />
            <p className="text-right text-sm text-slate-500">dont have an account? <Link href="/register" className="underline text-slate-700">Register</Link></p>
        </>
    )
}

export default login
