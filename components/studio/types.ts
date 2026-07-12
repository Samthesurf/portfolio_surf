import type { BlogDocument } from "../../lib/blog-store";

export interface Article extends BlogDocument {
  id: string;
  etag?: string;
  localRevision?: number;
}

export type ViewMode = "write" | "preview";
export type SaveStatus = "saved" | "saving" | "unsaved" | "error";
