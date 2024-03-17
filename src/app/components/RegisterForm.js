'use client'
import { register } from '@/lib/api'
import React, { useState } from 'react'

function RegisterForm() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [status, setStatus] = useState("")

    async function handleSubmit(event) {
        event.preventDefault()

        if (!name || !email || !password) {
            setStatus({
                type: "error",
                message: "all fields are required"
            })
            return
        }
        try {
            const data = await register({ name, email, password })
            setStatus({
                type: data.type,
                message: data.message
            })
        } catch (error) {
            setStatus({
                type: "error",
                message: "something went worng try later!"
            })
        }
    }

    return (
        <form action="POST" onSubmit={handleSubmit} className="flex flex-col gap-3 mb-7">
            <input type="text" onChange={(e) => setName(e.target.value)} name="name" className="border w-80 border-slate-300 p-2 bg-slate-100" placeholder="User Name" />
            <input type="email" onChange={(e) => setEmail(e.target.value)} name="email" className="border w-80 border-slate-300 p-2 bg-slate-100" placeholder="Email" />
            <input type="password" onChange={(e) => setPassword(e.target.value)} name="password" className="border w-80 border-slate-300 p-2 bg-slate-100" placeholder="Password" />
            <button type="submit" className="bg-black py-2.5 text-white">Register</button>
            {
                status && <p className={`${status.type == "succes" ? "bg-green-400" : "bg-red-400"} p-1 text-center w-full`}>{status.message}</p>
            }
        </form>
    )
}

export default RegisterForm
