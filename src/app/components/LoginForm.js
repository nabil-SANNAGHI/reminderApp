'use client'
import React from 'react'

function LoginForm() {
    return (
        <form action="" className="flex flex-col gap-3 mb-7">
            <input type="email" name="email" className="border w-80 border-slate-300 p-2 bg-slate-100" placeholder="Email" />
            <input type="password" name="password" className="border w-80 border-slate-300 p-2 bg-slate-100" placeholder="Password" />
            <button type="submit" className="bg-black py-2.5 text-white">Login</button>
        </form>
    )
}

export default LoginForm
