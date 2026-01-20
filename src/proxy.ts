import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export default function proxy(req: NextRequest) {
    const token = req.cookies.get("token")?.value || "";
    const pathname = req.nextUrl.pathname;

    const publicPaths = ["/login", "/signup"];

    const isPublicPath = publicPaths.some(
        (path) => path === pathname || pathname.startsWith(path)
    );

    if (!token && !isPublicPath) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    if (token && isPublicPath) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next|fonts|workers|.*\\..*).*)"],
};
