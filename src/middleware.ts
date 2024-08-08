import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import { checkCodeAccess } from "./app/lib/controller";

export async function middleware(request: NextRequest) {
    if (request.nextUrl.pathname == "/")
        return NextResponse.redirect(new URL("/pages/login", request.url))

    const protectedUrls = ['/pages/log', '/pages/print', '/pages/log/code/:path*'];

    if (cookies().has("print-session") && request.nextUrl.pathname == "/pages/login") {
        return NextResponse.redirect(new URL("/pages/print", request.url))
    }

    if (cookies().get("admin-session")?.value == "access" && request.nextUrl.pathname == "/pages/print") {
        return NextResponse.redirect(new URL("/pages/log", request.url))
    }

    if (request.nextUrl.pathname.includes("/pages/log/code/")) {
        const url = request.nextUrl.pathname.split("/")
        if (cookies().get("admin-session")?.value != "access") {
            if (url[1] == "pages" && url[2] == "log" && url[3] == "code") {
                const team_id = cookies().get("print-session")?.value as string
                const result = await checkCodeAccess(url[url.length - 1], team_id)

                if (!result) {
                    return NextResponse.redirect(new URL("/pages/log", request.url))
                }
            }
        }
    }

    if (protectedUrls.includes(request.nextUrl.pathname) && !cookies().has("print-session")) {
        return NextResponse.redirect(new URL("/pages/login", request.url))
    }
}
