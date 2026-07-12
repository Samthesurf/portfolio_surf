import {
  listStudioArticles,
  saveStudioArticle,
} from "@/lib/blog-store";
import {
  requireSameOriginMutation,
  requireStudioIdentity,
  studioErrorResponse,
} from "@/lib/studio-auth";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const identity = await requireStudioIdentity(request);
    const articles = await listStudioArticles();
    return Response.json(
      { articles, identity },
      { headers: { "Cache-Control": "private, no-store" } },
    );
  } catch (error) {
    return studioErrorResponse(error);
  }
}

export async function POST(request: Request) {
  try {
    await requireStudioIdentity(request);
    requireSameOriginMutation(request);
    const article = await saveStudioArticle(await request.json());
    return Response.json({ article }, { status: 201, headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    return studioErrorResponse(error);
  }
}
