'use client'
import { signin } from '@/lib/api'
import { reSetValues } from '@/lib/helpers'
import React, { useState } from 'react'

function LoginForm() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [status, setStatus] = useState("")

    async function handleSubmit(event) {
        event.preventDefault()

        if (!email || !password) {
            setStatus({ type: "error", message: "all fields are required" })
            return
        }
        try {
            const data = await signin({ email, password })
            setStatus({ type: data.type, message: data.message })
            if (data.type == "success") reSetValues([setEmail, setPassword])
        } catch (error) {
            setStatus({ type: "error", message: "something went worng try later!" })
        }
    }

    return (
        <form onSubmit={handleSubmit} action="POST" className="flex flex-col gap-3 mb-7">
            <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border w-80 border-slate-300 p-2 bg-slate-100" placeholder="Email" />
            <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border w-80 border-slate-300 p-2 bg-slate-100" placeholder="Password" />
            <button type="submit" className="bg-black py-2.5 text-white">Login</button>
            {
                status && <p className={`${status.type == "success" ? "bg-green-400" : "bg-red-400"} p-1 text-center w-full`}>{status.message}</p>
            }
        </form>
    )
}

export default LoginForm
