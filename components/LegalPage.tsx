import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import type { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import PageHero from "./PageHero";

type Props = {
  /** Markdown file in content/, e.g. "privacy-policy" → content/privacy-policy.md */
  slug: string;
  title: ReactNode;
  updated: string;
  lead: string;
};

/** Legal document page: hero + the markdown body from content/<slug>.md rendered as prose. */
export default function LegalPage({ slug, title, updated, lead }: Props) {
  const markdown = fs.readFileSync(path.join(process.cwd(), "content", `${slug}.md`), "utf8");

  return (
    <>
      <PageHero compact eyebrow={`Legal · Last updated ${updated}`} title={title} lead={lead} />
      <section className="section !pt-6">
        <div className="wrap">
          <article className="prose prose-lg max-w-[800px] rounded-3xl border border-line bg-white p-6 shadow-card sm:p-9 md:p-12 prose-headings:font-extrabold prose-headings:tracking-[-0.02em] prose-headings:text-ink prose-h2:mt-12 prose-h2:text-[1.6rem] prose-h3:text-[1.2rem] prose-h4:text-[1rem] prose-p:text-ink-2 prose-li:text-ink-2 prose-strong:text-ink prose-a:font-semibold prose-a:text-blue prose-a:no-underline hover:prose-a:underline prose-th:text-ink prose-td:text-ink-2 prose-table:text-[15px]">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                a: ({ href = "", children }) =>
                  href.startsWith("/") ? (
                    <Link href={href}>{children}</Link>
                  ) : (
                    <a href={href} target="_blank" rel="noopener">
                      {children}
                    </a>
                  ),
                table: ({ children }) => (
                  <div className="-mx-2 overflow-x-auto sm:mx-0">
                    <table className="min-w-[560px] sm:min-w-0">{children}</table>
                  </div>
                ),
              }}
            >
              {markdown}
            </ReactMarkdown>
          </article>
        </div>
      </section>
    </>
  );
}
