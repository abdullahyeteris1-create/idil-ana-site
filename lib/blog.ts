import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/**
 * Blog yazıları content/blog/*.mdx dosyalarından okunur.
 *
 * Yeni yazı eklemek için kod değiştirmek gerekmez: klasöre bir .mdx dosyası
 * bırakmak yeterlidir. Dosya adı adres olur (slug). Ayrıntılar için
 * content/blog/NASIL-YAZI-EKLENIR.md dosyasına bakın.
 */

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  category: string;
  readingTime: string;
  image: string;
  imageAlt: string;
  /** Ham MDX gövdesi; BlogArticle bileşeni derler. */
  content: string;
  featured?: boolean;
  keywords?: string[];
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
/** Ortalama sessiz okuma hızı; okuma süresi tahmininde kullanılır. */
const WORDS_PER_MINUTE = 200;

function requireString(value: unknown, field: string, file: string) {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(
      `content/blog/${file}: "${field}" alanı zorunlu ve boş olamaz. Dosyanın başındaki --- bloğunu kontrol edin.`,
    );
  }
  return value;
}

function estimateReadingTime(content: string) {
  const words = content.trim().split(/\s+/).length;
  return `${Math.max(1, Math.round(words / WORDS_PER_MINUTE))} dakika`;
}

function readPost(fileName: string): BlogPost {
  const raw = fs.readFileSync(path.join(BLOG_DIR, fileName), "utf8");
  const { data, content } = matter(raw);
  const slug = fileName.replace(/\.mdx$/, "");

  const publishedAt = requireString(data.publishedAt, "publishedAt", fileName);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(publishedAt)) {
    throw new Error(
      `content/blog/${fileName}: "publishedAt" YYYY-AA-GG biçiminde olmalı (örn. 2026-08-15).`,
    );
  }

  return {
    slug,
    title: requireString(data.title, "title", fileName),
    excerpt: requireString(data.excerpt, "excerpt", fileName),
    description: requireString(data.description, "description", fileName),
    publishedAt,
    updatedAt: typeof data.updatedAt === "string" ? data.updatedAt : undefined,
    author: typeof data.author === "string" ? data.author : "İdil Eğitim",
    category: requireString(data.category, "category", fileName),
    // Elle girilebilir, girilmezse metinden hesaplanır.
    readingTime:
      typeof data.readingTime === "string" ? data.readingTime : estimateReadingTime(content),
    image: requireString(data.image, "image", fileName),
    imageAlt: requireString(data.imageAlt, "imageAlt", fileName),
    content,
    featured: data.featured === true,
    keywords: Array.isArray(data.keywords) ? data.keywords.map(String) : undefined,
  };
}

function loadPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  return fs
    .readdirSync(BLOG_DIR)
    // Yalnızca .mdx dosyaları yazıdır; .md dosyaları (rehber vb.) yok sayılır.
    .filter((file) => file.endsWith(".mdx"))
    .map(readPost)
    // En yeni yazı başta.
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export const blogPosts: BlogPost[] = loadPosts();

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

/**
 * Önce aynı kategorideki yazılar, yetmezse diğerleri.
 * (Önceden yalnızca ilk iki yazı dönüyordu, "ilgili" değildi.)
 */
export function getRelatedBlogPosts(slug: string, limit = 2) {
  const current = getBlogPost(slug);
  const others = blogPosts.filter((post) => post.slug !== slug);
  if (!current) return others.slice(0, limit);

  const sameCategory = others.filter((post) => post.category === current.category);
  const rest = others.filter((post) => post.category !== current.category);

  return [...sameCategory, ...rest].slice(0, limit);
}

export function formatBlogDate(date: string) {
  return new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}
