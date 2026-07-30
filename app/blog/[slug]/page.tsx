import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogArticle } from "@/components/blog/BlogArticle";
import { BlogCard } from "@/components/blog/BlogCard";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { blogPosts, getBlogPost, getRelatedBlogPosts } from "@/lib/blog";
import { LOGO_PATH, SITE_NAME, absoluteUrl } from "@/lib/seo";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) notFound();

  const canonical = absoluteUrl(`/blog/${post.slug}`);
  const title = `${post.title} | İdil Eğitim`;

  return {
    title: { absolute: title },
    description: post.description,
    keywords: post.keywords,
    authors: [{ name: post.author, url: absoluteUrl("/") }],
    alternates: { canonical },
    robots: { index: true, follow: true },
    openGraph: {
      type: "article",
      locale: "tr_TR",
      siteName: SITE_NAME,
      url: canonical,
      title,
      description: post.description,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: [post.author],
      tags: post.keywords,
      images: [
        {
          url: post.image,
          width: 1200,
          height: 675,
          alt: post.imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: post.description,
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) notFound();

  const canonical = absoluteUrl(`/blog/${post.slug}`);
  const relatedPosts = getRelatedBlogPosts(post.slug);
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${canonical}#article`,
        headline: post.title,
        description: post.description,
        image: absoluteUrl(post.image),
        datePublished: post.publishedAt,
        dateModified: post.updatedAt ?? post.publishedAt,
        author: {
          "@type": "Organization",
          name: post.author,
          url: absoluteUrl("/"),
        },
        publisher: {
          "@type": "Organization",
          name: SITE_NAME,
          url: absoluteUrl("/"),
          logo: {
            "@type": "ImageObject",
            url: absoluteUrl(LOGO_PATH),
          },
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": canonical,
        },
        inLanguage: "tr-TR",
        articleSection: post.category,
        keywords: post.keywords?.join(", "),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonical}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Ana Sayfa",
            item: absoluteUrl("/"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blog",
            item: absoluteUrl("/blog"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: post.title,
            item: canonical,
          },
        ],
      },
    ],
  };
  const serializedStructuredData = JSON.stringify(structuredData).replace(/</g, "\\u003c");

  return (
    <>
      <script
        id="blog-post-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializedStructuredData }}
      />

      <SiteHeader
        backHref="/blog"
        backLabel="← Tüm Blog Yazıları"
        ariaLabel="Blog yazısı navigasyonu"
      />

      <main className="overflow-x-hidden bg-[#fbf7f0] px-5 pb-0 pt-14 text-[#12142b] sm:px-8 sm:pt-20">
        <div className="mx-auto max-w-6xl">
          <BlogArticle post={post} />
        </div>

        <section className="mx-auto max-w-6xl py-16 sm:py-24" aria-labelledby="related-posts-title">
          <h2 id="related-posts-title" className="mb-8 font-heading text-2xl font-black sm:text-3xl">
            İlgili Yazılar
          </h2>
          <div className="grid gap-7 md:grid-cols-2">
            {relatedPosts.map((relatedPost) => (
              <BlogCard post={relatedPost} headingLevel="h3" key={relatedPost.slug} />
            ))}
          </div>
        </section>

        <section className="-mx-5 bg-[#12142b] px-5 py-16 text-center text-white sm:-mx-8 sm:px-8 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-heading text-balance text-3xl font-black leading-tight sm:text-4xl">
              Çocuğunuzun okuma hızını, dikkatini ve okuduğunu anlama becerisini geliştirmek ister
              misiniz?
            </h2>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/#paketler"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#ff6b47] px-6 py-3 font-extrabold text-white transition hover:bg-[#e8502a] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Eğitim Paketlerini İncele
              </Link>
              <WhatsAppLink className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/35 px-6 py-3 font-extrabold text-white transition hover:border-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                WhatsApp&apos;tan Bilgi Al
              </WhatsAppLink>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter className="bg-[#0b0d20]" />
    </>
  );
}
