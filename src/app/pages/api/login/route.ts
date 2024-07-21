import { connectToDatabase } from "@/app/lib/connectToDB";
import User from "@/app/models/User";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    try {
        await connectToDatabase()
        const { username, password } = await request.json()
        const user = await User.findOne({ username: username, password: password })
        if (user) {
            cookies().set("print-session", user?._id.toString())
            const user_split = user.username.split("_")
            if (user_split[0] == "Admin") {
                cookies().set("admin-session", "access")
            }
            return NextResponse.json({
                message: "Found User",
                permission: true
            }, { status: 200 })
        }
        else {
            return NextResponse.json({
                message: "User not found",
                permission: false
            }, { status: 200 })
        }

    }
    catch (err) {
        return NextResponse.json(err, { status: 400 })
    }
}