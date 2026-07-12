export interface BlogFrontmatter {
  title: string;
  excerpt: string;
  publishedAt: string;
  updatedAt?: string;
  coverImage?: string;
  coverAlt?: string;
  tags: string[];
  featured: boolean;
  draft: boolean;
  author: string;
}

export interface BlogHeading {
  depth: 2 | 3;
  title: string;
  id: string;
}

export interface BlogPostSummary extends BlogFrontmatter {
  slug: string;
  readingTime: string;
  wordCount: number;
}

export interface BlogPost extends BlogPostSummary {
  content: string;
  headings: BlogHeading[];
}
