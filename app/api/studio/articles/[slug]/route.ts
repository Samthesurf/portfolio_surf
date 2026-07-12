import {
  archiveStudioArticle,
  getStudioArticle,
  saveStudioArticle,
} from "@/lib/blog-store";
import {
  requireSameOriginMutation,
  requireStudioIdentity,
  studioErrorResponse,
} from "@/lib/studio-auth";

export const dynamic = "force-dynamic";

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export async function GET(request: Request, { params }: RouteContext) {
  try {
    await requireStudioIdentity(request);
    const { slug } = await params;
    const article = await getStudioArticle(slug);
    if (!article) return Response.json({ error: "Article not found", code: "not_found" }, { status: 404 });
    return Response.json({ article }, { headers: { "Cache-Control": "private, no-store" } });
  } catch (error) {
    return studioErrorResponse(error);
  }
}

export async function PUT(request: Request, { params }: RouteContext) {
  try {
    await requireStudioIdentity(request);
    requireSameOriginMutation(request);
    const { slug } = await params;
    const body = (await request.json()) as { article?: unknown; etag?: unknown };
    if (!body.article || typeof body.etag !== "string") {
      return Response.json({ error: "Article and etag are required", code: "invalid_request" }, { status: 400 });
    }
    const candidate = body.article as Record<string, unknown>;
    if (candidate.slug !== slug) {
      return Response.json({ error: "Article slugs cannot be changed", code: "slug_mismatch" }, { status: 400 });
    }
    const article = await saveStudioArticle(candidate, body.etag);
    return Response.json({ article }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    return studioErrorResponse(error);
  }
}

export async function DELETE(request: Request, { params }: RouteContext) {
  try {
    await requireStudioIdentity(request);
    requireSameOriginMutation(request);
    const { slug } = await params;
    const body = (await request.json()) as { etag?: unknown };
    if (typeof body.etag !== "string") {
      return Response.json({ error: "etag is required", code: "invalid_request" }, { status: 400 });
    }
    await archiveStudioArticle(slug, body.etag);
    return new Response(null, { status: 204 });
  } catch (error) {
    return studioErrorResponse(error);
  }
}
