import { NextResponse, NextRequest } from "next/server";
import { connectToDatabase } from "@/app/lib/connectToDB";
import { cookies } from "next/headers";
import User from "@/app/models/User";
import { use } from "react";
import { Types } from "mongoose";

export async function POST(request: NextRequest) {
    try {
        await connectToDatabase();
        let { id } = await request.json()
        id = Types.ObjectId.createFromHexString(id)
        let user = await User.findOne({ _id: id })
        if (user)
            return NextResponse.json(true, { status: 200 })
        else
            return NextResponse.json(false, { status: 200 })
    }
    catch (err) {
        return NextResponse.json("Error: " + err, { status: 400 })
    }
}