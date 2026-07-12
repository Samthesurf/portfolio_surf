import type { BlogDocument } from "../../lib/blog-store";

export interface Article extends BlogDocument {
  id: string;
  etag?: string;
}

export type ViewMode = "write" | "preview" | "split";
export type SaveStatus = "saved" | "saving" | "unsaved" | "error";
