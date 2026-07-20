import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const blogLastModified = blogPosts.reduce(
    (latest, post) => {
      const postDate = post.updatedAt ?? post.publishedAt;
      return postDate > latest ? postDate : latest;
    },
    blogPosts[0].updatedAt ?? blogPosts[0].publishedAt,
  );
  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(`${post.updatedAt ?? post.publishedAt}T00:00:00Z`),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: absoluteUrl("/"),
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/hizli-okuma-egitimi"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/blog"),
      lastModified: new Date(`${blogLastModified}T00:00:00Z`),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...blogEntries,
    {
      url: absoluteUrl("/kvkk-aydinlatma-metni"),
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
