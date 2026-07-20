import Image from "next/image";
import type { BlogContentBlock, BlogPost } from "@/lib/blog";
import { formatBlogDate } from "@/lib/blog";

function ContentBlock({ block }: { block: BlogContentBlock }) {
  switch (block.type) {
    case "heading":
      return (
        <h2 className="font-heading mt-12 text-2xl font-black leading-tight tracking-[-0.02em] text-[#12142b] sm:text-3xl">
          {block.text}
        </h2>
      );
    case "list": {
      const List = block.ordered ? "ol" : "ul";
      return (
        <List
          className={`my-6 space-y-3 pl-6 leading-8 text-black/70 ${
            block.ordered ? "list-decimal" : "list-disc marker:text-[#17a398]"
          }`}
        >
          {block.items.map((item) => (
            <li key={item} className="pl-1">
              {item}
            </li>
          ))}
        </List>
      );
    }
    case "quote":
      return (
        <blockquote className="my-8 border-l-4 border-[#ff6b47] bg-[#fff4ef] px-6 py-5 font-heading text-xl leading-8 text-[#12142b]">
          {block.text}
        </blockquote>
      );
    case "callout":
      return (
        <aside className="my-8 rounded-2xl border border-[#17a398]/25 bg-[#edf9f7] p-6">
          <h3 className="font-heading text-lg font-black text-[#0e7a72]">{block.title}</h3>
          <p className="mt-2 leading-7 text-black/70">{block.text}</p>
        </aside>
      );
    case "paragraph":
      return <p className="mt-5 text-[1.04rem] leading-8 text-black/70">{block.text}</p>;
  }
}

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
        {post.content.map((block, index) => (
          <ContentBlock block={block} key={`${block.type}-${index}`} />
        ))}

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
