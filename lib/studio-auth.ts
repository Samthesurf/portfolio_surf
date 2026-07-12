import { createRemoteJWKSet, jwtVerify, type JWTPayload } from "jose";

import { BlogStoreError } from "./blog-store";

export interface StudioIdentity {
  email: string;
  name?: string;
}

export class StudioAuthError extends Error {
  constructor(message: string, public readonly status = 403) {
    super(message);
    this.name = "StudioAuthError";
  }
}

function normalizedOrigin(value: string): string {
  return value.replace(/\/$/, "");
}

function authConfiguration() {
  const teamDomain = process.env.CF_ACCESS_TEAM_DOMAIN;
  const audience = process.env.CF_ACCESS_AUD;
  const allowedEmail = process.env.STUDIO_ALLOWED_EMAIL?.trim().toLowerCase();
  if (!teamDomain || !audience || !allowedEmail) {
    throw new StudioAuthError("The writing studio security configuration is incomplete", 503);
  }
  return {
    teamDomain: normalizedOrigin(teamDomain),
    audience,
    allowedEmail,
  };
}

function isLocalDevelopment(request: Request): boolean {
  if (process.env.NODE_ENV !== "development") return false;
  const hostname = new URL(request.url).hostname;
  return hostname === "localhost" || hostname === "127.0.0.1";
}

export async function requireStudioIdentity(request: Request): Promise<StudioIdentity> {
  if (isLocalDevelopment(request)) {
    return { email: "ukpsamuel67@gmail.com", name: "Samuel Ukpai" };
  }

  const { teamDomain, audience, allowedEmail } = authConfiguration();
  const token = request.headers.get("cf-access-jwt-assertion");
  if (!token) throw new StudioAuthError("Cloudflare Access authentication is required", 401);

  let payload: JWTPayload;
  try {
    const jwks = createRemoteJWKSet(new URL(`${teamDomain}/cdn-cgi/access/certs`));
    ({ payload } = await jwtVerify(token, jwks, {
      issuer: teamDomain,
      audience,
      algorithms: ["RS256"],
    }));
  } catch {
    throw new StudioAuthError("Cloudflare Access authentication could not be verified", 403);
  }

  const email = typeof payload.email === "string" ? payload.email.toLowerCase() : "";
  if (email !== allowedEmail) {
    throw new StudioAuthError("This account is not allowed to use the writing studio", 403);
  }
  return {
    email,
    name: typeof payload.name === "string" ? payload.name : undefined,
  };
}

export function requireSameOriginMutation(request: Request): void {
  const url = new URL(request.url);
  const origin = request.headers.get("origin");
  if (!origin) {
    throw new StudioAuthError("Cross-origin write requests are not allowed", 403);
  }
  const normalized = normalizedOrigin(origin);
  if (normalized === url.origin) return;
  if (process.env.NODE_ENV === "development") {
    try {
      const parsed = new URL(origin);
      if (parsed.protocol === "http:" && (parsed.hostname === "localhost" || parsed.hostname === "127.0.0.1")) {
        return;
      }
    } catch {
      // Invalid origins fail closed below.
    }
  }
  throw new StudioAuthError("Cross-origin write requests are not allowed", 403);
}

export function studioErrorResponse(error: unknown): Response {
  if (error instanceof StudioAuthError) {
    return Response.json({ error: error.message, code: "not_authorized" }, { status: error.status });
  }
  if (error instanceof BlogStoreError) {
    return Response.json({ error: error.message, code: error.code }, { status: error.status });
  }
  console.error("Studio request failed", error);
  return Response.json({ error: "Unexpected studio error", code: "internal_error" }, { status: 500 });
}
