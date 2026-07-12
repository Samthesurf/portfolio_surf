import { NextResponse, type NextRequest } from "next/server";

const canonicalHost = "samuelsurf.me";
const studioHost = "write.samuelsurf.me";
const redirectHosts = new Set(["www.samuelsurf.me", "samuelsurf.vercel.app"]);

function secureStudioResponse(response: NextResponse): NextResponse {
  response.headers.set("Cache-Control", "private, no-store");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Referrer-Policy", "no-referrer");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  return response;
}

export function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.toLowerCase().split(":")[0];
  const pathname = request.nextUrl.pathname;

  if (host === studioHost) {
    if (pathname === "/") {
      const url = request.nextUrl.clone();
      url.pathname = "/studio";
      return secureStudioResponse(NextResponse.rewrite(url));
    }
    return secureStudioResponse(NextResponse.next());
  }

  const isLocalDevelopment = host === "localhost" || host === "127.0.0.1";
  if (!isLocalDevelopment && (pathname.startsWith("/studio") || pathname.startsWith("/api/studio"))) {
    return new NextResponse("Not found", {
      status: 404,
      headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" },
    });
  }

  if (!host || !redirectHosts.has(host)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.protocol = "https:";
  url.hostname = canonicalHost;
  return NextResponse.redirect(url, 308);
}
