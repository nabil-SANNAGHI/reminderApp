import { connectDB } from "@/config/dbConfig";
import { hashPassword } from "@/lib/auth";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

export async function POST(request, response) {
    try {
        await connectDB();

        const { name, email, password } = await request.json();
        // check if user already exists
        // return
        const userExists = await User.findOne({ email: email });
        if (userExists) {
            return NextResponse.json({
                message: "User already exists",
                type: "error"
            });
        }

        // hash password
        const hashedPassword = await hashPassword(password);

        // create user
        await User.create({
            name,
            email,
            password: hashedPassword
        });
        return NextResponse.json({
            message: "User created successfully",
            type: "success"
        });

    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 401 });
    }
}