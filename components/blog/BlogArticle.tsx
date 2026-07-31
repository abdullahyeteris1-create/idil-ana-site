import Image from "next/image";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { MDXComponents } from "mdx/types";
import type { BlogPost } from "@/lib/blog";
import { formatBlogDate } from "@/lib/blog";

/**
 * MDX içeriğinin HTML etiketleri, sitenin tipografisiyle eşleşen
 * bileşenlere haritalanır. Yazar sade markdown yazar, görünüm buradan gelir.
 */
const mdxComponents: MDXComponents = {
  h2: (props) => (
    <h2
      className="font-heading mt-12 text-2xl font-black leading-tight tracking-[-0.02em] text-[#12142b] sm:text-3xl"
      {...props}
    />
  ),
  h3: (props) => (
    <h3 className="font-heading mt-9 text-xl font-black leading-tight text-[#12142b]" {...props} />
  ),
  p: (props) => <p className="mt-5 text-[1.04rem] leading-8 text-black/70" {...props} />,
  ul: (props) => (
    <ul
      className="my-6 list-disc space-y-3 pl-6 leading-8 text-black/70 marker:text-[#17a398]"
      {...props}
    />
  ),
  ol: (props) => <ol className="my-6 list-decimal space-y-3 pl-6 leading-8 text-black/70" {...props} />,
  li: (props) => <li className="pl-1" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="my-8 border-l-4 border-[#ff6b47] bg-[#fff4ef] px-6 py-5 font-heading text-xl leading-8 text-[#12142b] [&>p]:mt-0"
      {...props}
    />
  ),
  strong: (props) => <strong className="font-bold text-[#12142b]" {...props} />,
  a: ({ href = "", ...props }) => {
    const isInternal = href.startsWith("/") || href.startsWith("#");
    const className =
      "font-bold text-[#0e7a72] underline underline-offset-4 transition-colors hover:text-[#e8502a]";

    if (isInternal) {
      return <Link href={href} className={className} {...props} />;
    }
    return (
      <a href={href} className={className} target="_blank" rel="noopener noreferrer" {...props} />
    );
  },
  hr: () => <hr className="my-10 border-black/10" />,
  // Yazı içinde <Callout title="...">metin</Callout> olarak kullanılır.
  Callout: ({ title, children }: { title?: string; children?: React.ReactNode }) => (
    <aside className="my-8 rounded-2xl border border-[#17a398]/25 bg-[#edf9f7] p-6">
      {title && <h3 className="font-heading text-lg font-black text-[#0e7a72]">{title}</h3>}
      <div className="mt-2 leading-7 text-black/70 [&>p]:mt-0">{children}</div>
    </aside>
  ),
};

export function BlogArticle({ post }: { post: BlogPost }) {
  return (
    <article>
      <header className="mx-auto max-w-4xl text-center">
        <div className="mb-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm font-bold text-black/55">
          <span className="rounded-full bg-[#e7f7f5] px-3 py-1 text-[#0e7a72]">{post.category}</span>
          <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time>
          {post.updatedAt && (
            <>
              <span aria-hidden="true">•</span>
              <span>
                Güncellendi: <time dateTime={post.updatedAt}>{formatBlogDate(post.updatedAt)}</time>
              </span>
            </>
          )}
          <span aria-hidden="true">•</span>
          <span>{post.readingTime}</span>
        </div>
        <h1 className="font-heading text-balance text-4xl font-black leading-[1.08] tracking-[-0.035em] text-[#12142b] sm:text-5xl lg:text-6xl">
          {post.title}
        </h1>
        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-black/65">{post.excerpt}</p>
      </header>

      <div className="relative mx-auto mt-10 aspect-[16/9] max-w-6xl overflow-hidden rounded-[30px] border border-black/10 bg-[#eaf4f3] shadow-[0_28px_80px_-42px_rgba(18,20,43,0.55)] sm:mt-14">
        <Image
          src={post.image}
          alt={post.imageAlt}
          fill
          priority
          sizes="(max-width: 1200px) 100vw, 1152px"
          className="object-cover"
        />
      </div>

      <div className="mx-auto mt-12 max-w-3xl sm:mt-16">
        <MDXRemote source={post.content} components={mdxComponents} />

        <div className="mt-14 flex items-center gap-4 border-t border-black/10 pt-8">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#12142b] font-heading text-xl font-black text-white"
            aria-hidden="true"
          >
            İ
          </div>
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-black/45">Yazar</p>
            <p className="mt-1 font-extrabold text-[#12142b]">{post.author}</p>
          </div>
        </div>
      </div>
    </article>
  );
}
