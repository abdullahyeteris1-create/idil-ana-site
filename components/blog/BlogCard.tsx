import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/blog";
import { formatBlogDate } from "@/lib/blog";

type BlogCardProps = {
  post: BlogPost;
  featured?: boolean;
  headingLevel?: "h2" | "h3";
};

export function BlogCard({ post, featured = false, headingLevel = "h2" }: BlogCardProps) {
  const Heading = headingLevel;

  return (
    <article
      className={`group overflow-hidden rounded-[28px] border border-black/10 bg-white shadow-[0_24px_60px_-40px_rgba(18,20,43,0.48)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_70px_-38px_rgba(18,20,43,0.55)] ${
        featured ? "grid md:grid-cols-[1.15fr_1fr]" : "flex h-full flex-col"
      }`}
    >
      <Link
        href={`/blog/${post.slug}`}
        className={`relative block overflow-hidden ${featured ? "min-h-64 md:min-h-full" : "aspect-[16/9]"}`}
        aria-label={`${post.title} yazısını oku`}
      >
        <Image
          src={post.image}
          alt={post.imageAlt}
          fill
          sizes={featured ? "(max-width: 768px) 100vw, 55vw" : "(max-width: 768px) 100vw, 33vw"}
          className="object-cover transition duration-500 group-hover:scale-[1.025]"
          priority={featured}
        />
      </Link>

      <div className={`flex flex-1 flex-col ${featured ? "p-7 sm:p-10" : "p-6"}`}>
        <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-bold text-black/55">
          <span className="rounded-full bg-[#e7f7f5] px-3 py-1 text-[#0e7a72]">{post.category}</span>
          <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time>
          <span aria-hidden="true">•</span>
          <span>{post.readingTime}</span>
        </div>

        <Heading
          className={`font-heading font-black leading-tight tracking-[-0.02em] text-[#12142b] ${
            featured ? "text-2xl sm:text-3xl" : "text-xl"
          }`}
        >
          <Link href={`/blog/${post.slug}`} className="transition-colors hover:text-[#e8502a]">
            {post.title}
          </Link>
        </Heading>
        <p className="mt-4 flex-1 leading-7 text-black/65">{post.excerpt}</p>
        <Link
          href={`/blog/${post.slug}`}
          className="mt-6 inline-flex w-fit items-center gap-2 font-extrabold text-[#0e7a72] transition-colors hover:text-[#e8502a] focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0e7a72]"
        >
          Yazıyı Oku <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
