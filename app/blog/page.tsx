import type { Metadata } from "next";
import Link from "next/link";
import { BlogCard } from "@/components/blog/BlogCard";
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

      <header className="border-b border-black/10 bg-[#fbf7f0]">
        <nav
          className="mx-auto flex max-w-6xl items-center justify-between gap-5 px-5 py-5 sm:px-8"
          aria-label="Blog navigasyonu"
        >
          <Link
            href="/"
            className="font-heading text-xl font-black text-[#12142b] transition-colors hover:text-[#e8502a] focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0e7a72]"
          >
            İdil Eğitim
          </Link>
          <Link
            href="/"
            className="text-sm font-extrabold text-[#0e7a72] transition-colors hover:text-[#e8502a] focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0e7a72]"
          >
            ← Ana Sayfa
          </Link>
        </nav>
      </header>

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

      <footer className="bg-[#12142b] px-5 py-10 text-[#fbf7f0] sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 İdil Eğitim. Tüm hakları saklıdır.</p>
          <div className="flex flex-wrap gap-5 font-bold">
            <Link href="/">Ana Sayfa</Link>
            <Link href="/#paketler">Eğitim Paketleri</Link>
            <Link href="/#iletisim-formu">İletişim</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
