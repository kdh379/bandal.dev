import { getAllPosts, getAllNotes } from "@/lib/content-utils";

import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseURL = "https://bandal.dev";

  // 기본 라우트
  const routes = [
    {
      url: baseURL,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseURL}/blog`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseURL}/notes`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseURL}/about`,
      lastModified: new Date().toISOString(),
    },
  ];

  // 블로그 포스트
  const posts = await getAllPosts();
  const postUrls = posts.map((post) => ({
    url: `${baseURL}/blog/${post.meta.slug}`,
    lastModified: new Date(post.meta.date).toISOString(),
  }));

  // 노트
  const notes = await getAllNotes();
  const noteUrls = notes.map((note) => ({
    url: `${baseURL}/notes/${note.meta.slug}`,
    lastModified: new Date(note.meta.date).toISOString(),
  }));

  // 모든 URL 결합
  return [...routes, ...postUrls, ...noteUrls];
}
