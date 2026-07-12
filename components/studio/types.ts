import type { BlogDocument } from "../../lib/blog-store";

export interface Article extends BlogDocument {
  id: string;
  etag?: string;
}

export type ViewMode = "write" | "preview";
export type SaveStatus = "saved" | "saving" | "unsaved" | "error";
