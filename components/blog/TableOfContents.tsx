import type { BlogHeading } from "../../lib/blog-types";

function HeadingLinks({ headings }: { headings: BlogHeading[] }) {
  return (
    <ol className="space-y-2 text-sm">
      {headings.map((heading) => (
        <li key={heading.id} className={heading.depth === 3 ? "pl-4" : ""}>
          <a
            href={`#${heading.id}`}
            className="block border-l-2 border-transparent py-1 text-slate-500 transition hover:border-blue-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
          >
            {heading.title}
          </a>
        </li>
      ))}
    </ol>
  );
}

export default function TableOfContents({ headings }: { headings: BlogHeading[] }) {
  if (headings.length === 0) return null;

  return (
    <details className="mb-10 rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-white/10 dark:bg-white/5">
      <summary className="cursor-pointer font-bold text-slate-900 dark:text-white">In this article</summary>
      <div className="mt-4">
        <HeadingLinks headings={headings} />
      </div>
    </details>
  );
}
