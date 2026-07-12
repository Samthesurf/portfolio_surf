import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

import { requireStudioIdentity } from "@/lib/studio-auth";

export const metadata: Metadata = {
  title: "Writing Studio",
  robots: { index: false, follow: false, noarchive: true, nocache: true },
};

export default async function StudioLayout({ children }: { children: React.ReactNode }) {
  const incoming = await headers();
  const host = incoming.get("host") ?? "localhost:3000";
  const protocol = incoming.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const request = new Request(`${protocol}://${host}/studio`, { headers: new Headers(incoming) });
  try {
    await requireStudioIdentity(request);
  } catch {
    notFound();
  }
  return children;
}
