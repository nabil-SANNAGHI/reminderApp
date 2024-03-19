import RegisterForm from "@/app/components/RegisterForm"
import Link from "next/link"

function Register() {
    return (
        <>
            <h1 className="text-center mb-5 uppercase font-bold">Register page</h1>
            <RegisterForm />
            <p className="text-right text-sm text-slate-500">Already have an account? <Link href="/login" className="underline text-slate-700">Login</Link></p>
        </>

    )
}

export default Register
