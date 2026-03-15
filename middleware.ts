import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const session = req.cookies.get("admin_session")?.value;

  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");
  const isLoginRoute = req.nextUrl.pathname.startsWith("/admin-login");

  if (isAdminRoute && session !== "logged_in") {
    return NextResponse.redirect(new URL("/admin-login", req.url));
  }

  if (isLoginRoute && session === "logged_in") {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/admin-login"],
};