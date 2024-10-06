import { NextResponse, NextRequest } from "next/server";
import { connectToDatabase } from "@/app/lib/connectToDB";
import User from "@/app/models/User";
import { genSaltSync, hashSync } from "bcrypt-ts";

export async function POST(request: NextRequest) {
    try {
        await connectToDatabase();
        const { username, password } = await request.json()
        const salt = genSaltSync(10)
        const hashedPassword = hashSync(password, salt)

        // disable route
        // throw "Shits"

        const duplicate = await User.findOne({ username: username })
        if (duplicate)
            throw "Username already exist!"

        const user = await User.create({
            username: username,
            password: hashedPassword,
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