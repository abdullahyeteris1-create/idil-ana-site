import type { Metadata } from "next";
import { BlogCard } from "@/components/blog/BlogCard";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { blogPosts } from "@/lib/blog";
import { SITE_NAME, absoluteUrl } from "@/lib/seo";

const title = "Hızlı Okuma ve Eğitim Blogu | İdil Eğitim";
const description =
  "Çocuklarda hızlı okuma, okuduğunu anlama, dikkat, odaklanma ve verimli çalışma hakkında faydalı yazıları keşfedin.";
const canonical = absoluteUrl("/blog");

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical },
  keywords: [
    "hızlı okuma blogu",
    "okuduğunu anlama",
    "çocuklarda dikkat",
    "odaklanma",
    "verimli çalışma",
  ],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: SITE_NAME,
    url: canonical,
    title,
    description,
    images: [
      {
        url: blogPosts[0].image,
        width: 1200,
        height: 675,
        alt: blogPosts[0].imageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [blogPosts[0].image],
  },
};

const blogJsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": `${canonical}#blog`,
  name: "Hızlı Okuma ve Eğitim Blogu",
  description,
  url: canonical,
  inLanguage: "tr-TR",
  publisher: {
    "@type": "Organization",
    name: SITE_NAME,
    url: absoluteUrl("/"),
  },
  blogPost: blogPosts.map((post) => ({
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    url: absoluteUrl(`/blog/${post.slug}`),
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    image: absoluteUrl(post.image),
    author: { "@type": "Organization", name: post.author },
  })),
};

const serializedBlogJsonLd = JSON.stringify(blogJsonLd).replace(/</g, "\\u003c");

export default function BlogPage() {
  const featuredPost = blogPosts.find((post) => post.featured) ?? blogPosts[0];
  const otherPosts = blogPosts.filter((post) => post.slug !== featuredPost.slug);

  return (
    <>
      <script
        id="blog-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializedBlogJsonLd }}
      />

      <SiteHeader ariaLabel="Blog navigasyonu" />

      <main className="min-h-screen overflow-x-hidden bg-[#fbf7f0] text-[#12142b]">
        <section className="px-5 pb-14 pt-16 text-center sm:px-8 sm:pb-20 sm:pt-24">
          <div className="mx-auto max-w-4xl">
            <p className="mb-4 text-xs font-extrabold uppercase tracking-[0.18em] text-[#0e7a72]">
              İdil Eğitim Blog
            </p>
            <h1 className="font-heading text-balance text-4xl font-black leading-[1.08] tracking-[-0.035em] sm:text-5xl lg:text-6xl">
              Hızlı Okuma ve Eğitim Blogu
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-black/65">
              Çocuklarda hızlı okuma, okuduğunu anlama, dikkat, odaklanma ve verimli çalışma
              hakkında uzman içeriklerini inceleyin.
            </p>
          </div>
        </section>

        <section className="px-5 pb-16 sm:px-8 sm:pb-24" aria-labelledby="featured-title">
          <div className="mx-auto max-w-6xl">
            <h2 id="featured-title" className="mb-7 font-heading text-2xl font-black sm:text-3xl">
              Öne Çıkan Yazı
            </h2>
            <BlogCard post={featuredPost} featured headingLevel="h3" />
          </div>
        </section>

        <section className="bg-[#f2f7fb] px-5 py-16 sm:px-8 sm:py-24" aria-labelledby="all-posts-title">
          <div className="mx-auto max-w-6xl">
            <h2 id="all-posts-title" className="mb-8 font-heading text-2xl font-black sm:text-3xl">
              Diğer Blog Yazıları
            </h2>
            <div className="grid gap-7 md:grid-cols-2">
              {otherPosts.map((post) => (
                <BlogCard post={post} headingLevel="h3" key={post.slug} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
