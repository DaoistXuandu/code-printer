import { NextResponse, NextRequest } from "next/server";
import { connectToDatabase } from "@/app/lib/connectToDB";
import { cookies } from "next/headers";

export async function GET() {
    try {
        cookies().delete("print-session")
        if (cookies().has("admin-session"))
            cookies().delete("admin-session")
        return NextResponse.json(`Successfully Log Out`, { status: 200 })
    }
    catch (err) {
        return NextResponse.json("Error: " + err, { status: 400 })
    }
}