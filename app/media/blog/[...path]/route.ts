import { getArticleMedia, getStudioArticle } from "@/lib/blog-store";
import { requireStudioIdentity } from "@/lib/studio-auth";

export const dynamic = "force-dynamic";

interface RouteContext {
  params: Promise<{ path: string[] }>;
}

export async function GET(request: Request, { params }: RouteContext) {
  const { path } = await params;
  const [slug, ...mediaPath] = path;
  if (!slug || mediaPath.length === 0) return new Response("Not found", { status: 404 });

  const article = await getStudioArticle(slug);
  if (!article) return new Response("Not found", { status: 404 });
  if (article.draft) {
    try {
      await requireStudioIdentity(request);
    } catch {
      return new Response("Not found", { status: 404 });
    }
  }

  const object = await getArticleMedia(slug, mediaPath);
  if (!object) return new Response("Not found", { status: 404 });
  const headers = new Headers();
  if (object.httpMetadata?.contentType) headers.set("Content-Type", object.httpMetadata.contentType);
  if (object.httpMetadata?.contentLanguage) headers.set("Content-Language", object.httpMetadata.contentLanguage);
  if (object.httpMetadata?.contentDisposition) headers.set("Content-Disposition", object.httpMetadata.contentDisposition);
  if (object.httpMetadata?.contentEncoding) headers.set("Content-Encoding", object.httpMetadata.contentEncoding);
  if (object.httpMetadata?.cacheControl) headers.set("Cache-Control", object.httpMetadata.cacheControl);
  headers.set("ETag", object.httpEtag);
  headers.set("X-Content-Type-Options", "nosniff");
  return new Response(object.body as unknown as BodyInit, { headers });
}
