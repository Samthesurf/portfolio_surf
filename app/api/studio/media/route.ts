import { putArticleMedia } from "@/lib/blog-store";
import {
  requireSameOriginMutation,
  requireStudioIdentity,
  studioErrorResponse,
} from "@/lib/studio-auth";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    await requireStudioIdentity(request);
    requireSameOriginMutation(request);
    const form = await request.formData();
    const slug = form.get("slug");
    const file = form.get("file");
    if (typeof slug !== "string" || !(file instanceof File)) {
      return Response.json({ error: "slug and image file are required", code: "invalid_request" }, { status: 400 });
    }
    const url = await putArticleMedia(slug, file.name, await file.arrayBuffer(), file.type);
    return Response.json({ url }, { status: 201, headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    return studioErrorResponse(error);
  }
}
