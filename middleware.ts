import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export default async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value ?? "";
  const secretKey = process.env.JWT_SECRET ?? "";

  let userPayload: any;

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(secretKey)
    );
    userPayload = payload;

    return NextResponse.next({
      headers: { "x-user-payload": JSON.stringify(userPayload) },
    });
  } catch (error) {
    userPayload = null;
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

export const config = {
  matcher: ["/client-area/:path*"],
};
