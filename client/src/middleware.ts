import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const cookieStore = cookies();
    const browserWallet = (await cookieStore).get("browserWallet")?.value;
    if (!browserWallet) {
        const redirectUrl = new URL("/login", request.url);
        redirectUrl.searchParams.set("callbackUrl", pathname);
        redirectUrl.searchParams.set("message", "");
        return NextResponse.redirect(redirectUrl);
    } else {
        return NextResponse.next();
    }
}

export const config = {
    matcher: "/dashboard/:path*",
};
