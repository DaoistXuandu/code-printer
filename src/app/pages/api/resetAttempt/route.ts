import { connectToDatabase } from "@/app/lib/connectToDB";
import User from "@/app/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        await connectToDatabase()

        const data = await User.updateMany(
            {},
            { $set: { attempt: 0 } }
            // { multi: true }
        )
        return NextResponse.json({
            message: "Success reset",
            data: data
        }, { status: 200 })

    }
    catch (err) {
        return NextResponse.json(err, { status: 400 })
    }

}