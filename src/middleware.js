import { NextResponse } from "next/server";
import { auth } from "./auth";

export default async function middleware(req) {
    const session = await auth();
    if (!session?.payload?.token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/", "/setting"],
};