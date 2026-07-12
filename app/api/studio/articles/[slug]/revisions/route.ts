import {
  listArticleRevisions,
  restoreArticleRevision,
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
    return Response.json(
      { revisions: await listArticleRevisions(slug) },
      { headers: { "Cache-Control": "private, no-store" } },
    );
  } catch (error) {
    return studioErrorResponse(error);
  }
}

export async function POST(request: Request, { params }: RouteContext) {
  try {
    await requireStudioIdentity(request);
    requireSameOriginMutation(request);
    const { slug } = await params;
    const body = (await request.json()) as { revisionKey?: unknown; etag?: unknown };
    if (typeof body.revisionKey !== "string" || typeof body.etag !== "string") {
      return Response.json({ error: "revisionKey and etag are required", code: "invalid_request" }, { status: 400 });
    }
    const article = await restoreArticleRevision(slug, body.revisionKey, body.etag);
    return Response.json({ article }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    return studioErrorResponse(error);
  }
}
