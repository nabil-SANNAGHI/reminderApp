import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
const PUBLIC_FILE = /\.(.*)$/;

// had to make this again here as the other one is in a file with bcrypt which is not supported on edge runtimes
const verifyJWT = async (jwt) => {
  const { payload } = await jwtVerify(
    jwt,
    new TextEncoder().encode(process.env.JWT_SECRET)
  );
  return payload;
};

export async function middleware(req, res) {
  const { pathname } = req.nextUrl;
  console.log('pathname', pathname);
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const jwt = req.cookies.get("token");
  if (!jwt) {
    req.nextUrl.pathname = "/login";
    return NextResponse.redirect(req.nextUrl);
  }

  try {
    await verifyJWT(jwt.value);
    validateJWT
    return NextResponse.next();
  } catch (e) {
    console.error(e);
    req.nextUrl.pathname = "/login";
    return NextResponse.redirect(req.nextUrl);
  }
}