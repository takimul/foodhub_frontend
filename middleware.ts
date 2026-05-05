import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  
  const cookie =
    req.cookies.get("__Secure-better-auth.session_token") ||
    req.cookies.get("better-auth.session_token");

  const { pathname } = req.nextUrl;

  const isAuthPage =
    pathname.startsWith("/login") ||
    pathname.startsWith("/register");

  
  if (cookie && isAuthPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  
  if (!cookie && !isAuthPage) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
      Apply middleware to all routes EXCEPT:
      - API routes
      - Next.js internal files
      - Static files (images, js, css, etc.)
    */
    "/((?!api|_next|.*\\..*).*)",
  ],
};