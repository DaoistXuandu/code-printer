import { connectToDatabase } from "@/app/lib/connectToDB";
import Content from "@/app/models/Content";
import User from "@/app/models/User";
import { stat } from "fs";
import { Types } from "mongoose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
    try {
        await connectToDatabase()
        const { status, id } = await request.json()

        const data = await Content.findOneAndUpdate(
            { _id: id },
            { $set: { status: status } },
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