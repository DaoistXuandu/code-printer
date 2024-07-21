import Content from "@/app/models/Content";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { Types } from "mongoose";
import User from "@/app/models/User";
import { connectToDatabase } from "@/app/lib/connectToDB";

export async function POST(request: NextRequest) {
    try {
        await connectToDatabase()
        const { code } = await request.json()
        const id = cookies().get("print-session")?.value as string
        const user = await User.findOne({ _id: Types.ObjectId.createFromHexString(id) })
        if (user) {
            const content = await Content.create({
                teamId: Types.ObjectId.createFromHexString(id),
                teamName: user.username,
                content: code,
                status: 0
            })

            const userData = await fetch(`${process.env.NEXT_PUBLIC_LINK}/updateAttempt`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: id }),
            })

            return NextResponse.json({ message: "Succes adding new data", data: content, user: user }, { status: 200 })
        }
        else {
            return NextResponse.json({ message: "Fail adding new data" }, { status: 200 })
        }
    }
    catch (err) {
        return NextResponse.json(err, { status: 400 })
    }
}