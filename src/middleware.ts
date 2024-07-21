import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";

export async function middleware(request: NextRequest) {
    if (request.nextUrl.pathname == "/")
        return NextResponse.redirect(new URL("/pages/login", request.url))

    const protectedUrls = ['/pages/log', '/pages/print', '/pages/log/code/:path*'];

    if (cookies().has("print-session") && request.nextUrl.pathname == "/pages/login") {
        return NextResponse.redirect(new URL("/pages/print", request.url))
    }

    if (protectedUrls.includes(request.nextUrl.pathname) && !cookies().has("print-session")) {
        return NextResponse.redirect(new URL("/pages/login", request.url))
    }
}
