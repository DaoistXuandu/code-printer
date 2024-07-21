import { connectToDatabase } from "@/app/lib/connectToDB";
import Content from "@/app/models/Content";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
    try {
        await connectToDatabase()
        const { id } = await request.json()
        const content = await Content.findOne({ _id: Types.ObjectId.createFromHexString(id) })
        if (content) {
            return NextResponse.json({
                message: "Success getting a content with the Id",
                content: content
            }, { status: 200 })
        }
        else {
            return NextResponse.json({
                message: "There is no content with the Id"
            }, { status: 200 })
        }
    }
    catch (err) {
        return NextResponse.json(err, { status: 400 })
    }
}