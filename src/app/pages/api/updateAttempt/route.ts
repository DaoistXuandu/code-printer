import { connectToDatabase } from "@/app/lib/connectToDB";
import User from "@/app/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
    try {
        await connectToDatabase()
        const { id } = await request.json()
        const user = await User.findById({ _id: id })
        const numberAttempt = user?.attempt as number

        const data = await User.findOneAndUpdate(
            { _id: id },
            { $set: { attempt: numberAttempt + 1 } },
            { new: true }
        )
        return NextResponse.json({
            message: "Success increasing new attempt",
            data: data
        }, { status: 200 })

    }
    catch (err) {
        return NextResponse.json(err, { status: 400 })
    }

}