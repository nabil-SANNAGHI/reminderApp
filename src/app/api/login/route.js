import { connectDB } from "@/config/dbConfig";
import { comparePassword, createJWT, validateJWT } from "@/lib/auth";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        await connectDB();
        const reqBody = await request.json()

        // get user from DB
        const user = await User.findOne({ email: reqBody.email });
        // check if user exist 
        if (!user) {
            return NextResponse.json({
                message: "User not found",
                type: "error"
            });
        }

        // check if user is active
        if (!user.isActive) {
            return NextResponse.json({
                message: "User is inactive , please contact admin",
                type: "error"
            });
        }

        // check if password is correct
        const validPassword = await comparePassword(reqBody.password, user.password);
        if (!validPassword) {
            return NextResponse.json({
                message: "Invalid password",
                type: "error"
            });
        }



        // create token
        const token = await createJWT(user)

        const response = NextResponse.json({
            message: "Login successful",
            type: "success"
        });
        // // set cookie
        response.cookies.set("token", token, {
            path: "/",
            httpOnly: true,
        });

        return response
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
}