import { NextResponse, NextRequest } from "next/server";
import { connectToDatabase } from "@/app/lib/connectToDB";
import User from "@/app/models/User";
import { Types } from "mongoose";
import { cookies } from "next/headers";

export async function GET() {
    try {
        await connectToDatabase()
        const id = cookies().get("print-session")?.value as string
        const user = await User.findOne({ _id: Types.ObjectId.createFromHexString(id) })

        if (user) {
            return NextResponse.json({
                message: "Success getting user username",
                username: user.username
            }, { status: 200 })
        }
        else {
            return NextResponse.json({
                message: "There is no user with this id"
            }, { status: 200 })
        }
    }
    catch (err) {
        return NextResponse.json("Error: " + err, { status: 400 })
    }
}