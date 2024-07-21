import { NextResponse, NextRequest } from "next/server";
import { connectToDatabase } from "@/app/lib/connectToDB";
import { cookies } from "next/headers";

export async function GET() {
    try {
        const data = cookies().get("admin-session")?.value
        if (data == "access") {
            return NextResponse.json({ admin: true }, { status: 200 })
        }
        else {
            return NextResponse.json({ admin: false }, { status: 200 })
        }
    }
    catch (err) {
        return NextResponse.json("Error: " + err, { status: 400 })
    }
}