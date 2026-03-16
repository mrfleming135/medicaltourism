import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const session = req.cookies.get("admin_session")?.value;
  const pathname = req.nextUrl.pathname;

  const isAdminRoute = pathname === "/admin" || pathname.startsWith("/admin/");
  const isLoginRoute = pathname === "/admin-login";

  if (isAdminRoute && session !== "logged_in") {
    return NextResponse.redirect(new URL("/admin-login", req.url));
  }

  if (isLoginRoute && session === "logged_in") {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*", "/admin-login"],
};