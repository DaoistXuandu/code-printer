import { connectToDatabase } from "@/app/lib/connectToDB";
import User from "@/app/models/User";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { compareSync } from "bcrypt-ts";


export async function POST(request: NextRequest) {
    try {
        await connectToDatabase()
        const { username, password } = await request.json()
        const user = await User.findOne({ username: username })
        // throw "Alpha"

        if (user) {
            const hashedPassword = user.password
            console.log(password, hashedPassword)
            const result = compareSync(password, hashedPassword)
            if (result) {
                cookies().set("print-session", user?._id.toString())
                const user_split = user.username.split("_")
                if (user_split[0] == "admin") {
                    cookies().set("admin-session", "access")
                }
                return NextResponse.json({
                    message: "Found User",
                    permission: true
                }, { status: 200 })
            }
            else {
                throw "Wrong Password"
            }
        }
        else {
            throw "User not found"
        }
    }
    catch (err) {
        return NextResponse.json({
            message: "Err: " + err,
            permission: false
        }, { status: 404 })
    }
}