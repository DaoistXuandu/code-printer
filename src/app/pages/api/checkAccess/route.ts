import { NextResponse, NextRequest } from "next/server";
import { connectToDatabase } from "@/app/lib/connectToDB";
import { cookies } from "next/headers";
import User from "@/app/models/User";
import { use } from "react";
import { Types } from "mongoose";
import Content from "@/app/models/Content";

export async function POST(request: NextRequest) {
    try {
        await connectToDatabase();
        let { code_id, team_id } = await request.json()

        let team_id_obj = Types.ObjectId.createFromHexString(team_id)
        let code_id_obj = Types.ObjectId.createFromHexString(code_id)

        let user = await Content.findOne({
            _id: code_id_obj,
            teamId: team_id_obj
        })

        if (user)
            return NextResponse.json(true, { status: 200 })
        else
            return NextResponse.json(false, { status: 200 })
    }
    catch (err) {
        return NextResponse.json(false, { status: 200 })
    }
}