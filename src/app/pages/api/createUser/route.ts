import { NextResponse, NextRequest } from "next/server";
import { connectToDatabase } from "@/app/lib/connectToDB";
import User from "@/app/models/User";

export async function POST(request: NextRequest) {
    try {
        await connectToDatabase();
        const { username, password } = await request.json()

        const user = await User.create({
            username: username,
            password: password,
            attempt: 0
        })

        const data = {
            message: "Succes",
            user: user,
        }
        return NextResponse.json(data, { status: 200 })
    }
    catch (err) {
        return NextResponse.json("Error: " + err, { status: 400 })
    }
}