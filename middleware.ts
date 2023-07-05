import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (
    process.env.NODE_ENV === "production" &&
    request.headers.get("x-forwarded-proto") !== "https"
  ) {
    const hostname = request.headers.get("host") || request.nextUrl.hostname;
    const baseUrl = `https://${hostname}${request.nextUrl.pathname}`;
    const target = new URL(baseUrl);
    target.search = request.nextUrl.search;

    return NextResponse.redirect(target, 301);
  }

  return NextResponse.next();
}
