interface CloudflareEnv {
  BLOG_CONTENT: import("@cloudflare/workers-types").R2Bucket;
  STUDIO_ALLOWED_EMAIL: string;
  CF_ACCESS_TEAM_DOMAIN?: string;
  CF_ACCESS_AUD?: string;
}
