import { connectToDatabase } from "@/app/lib/connectToDB";
import Content from "@/app/models/Content";
import { Types } from "mongoose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectToDatabase()
        const id = cookies().get("print-session")?.value as string
        const content = await Content.find({ teamId: Types.ObjectId.createFromHexString(id) })
        if (content) {
            return NextResponse.json({
                message: "Success getting content with the Id",
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