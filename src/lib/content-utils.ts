import fs from "fs";
import path from "path";

import { cache } from "react";

export type ContentType = "blog" | "note";

export type ContentItem = {
  slug: string;
  title: string;
  description: string;
  date: string;
  published?: boolean;
  year: number;
  type?: ContentType;
};

// 콘텐츠 디렉토리 경로
const contentDirectories = {
  blog: path.join(process.cwd(), "src/content/posts"),
  note: path.join(process.cwd(), "src/content/notes"),
};

/**
 * 콘텐츠를 위한 유틸리티 함수들
 */

// MDX 모듈에서 메타데이터 가져오기
export async function getMeta(type: ContentType, slug: string) {
  try {
    const contentPath = type === "blog" ? "posts" : "notes";
    const content = await import(`@/content/${contentPath}/${slug}/index.mdx`);
    return content.meta || null;
  } catch (error) {
    console.error(`Error importing module for ${type}/${slug}:`, error);
    return null;
  }
}

// 디렉토리의 모든 슬러그 목록을 가져오는 함수
export function getSlugs(type: ContentType) {
  const directory = contentDirectories[type];

  if (!fs.existsSync(directory)) {
    return [];
  }

  return fs
    .readdirSync(directory, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
}

// 연도별로 콘텐츠 그룹화하는 함수
export function groupContentByYear<T extends { year: number }>(
  content: T[],
): Record<number, T[]> {
  const contentByYear: Record<number, T[]> = {};

  content.forEach((item) => {
    if (!contentByYear[item.year]) {
      contentByYear[item.year] = [];
    }
    contentByYear[item.year].push(item);
  });

  // 연도를 내림차순으로 정렬
  return Object.keys(contentByYear)
    .sort((a, b) => Number(b) - Number(a))
    .reduce(
      (obj, key) => {
        obj[Number(key)] = contentByYear[Number(key)];
        return obj;
      },
      {} as Record<number, T[]>,
    );
}

// 특정 슬러그의 콘텐츠 메타데이터를 가져오는 함수
export const getContentBySlug = cache(
  async (type: ContentType, slug: string): Promise<ContentItem | null> => {
    const meta = await getMeta(type, slug);

    if (!meta) {
      return null;
    }

    try {
      // 날짜 파싱 및 년도 추출
      const dateObj = new Date(meta.date);
      const year = dateObj.getFullYear();

      // 한글 날짜 형식으로 변환
      const formattedDate = dateObj.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      return {
        slug,
        title: meta.title,
        description: meta.description || "",
        date: formattedDate,
        published: meta.published !== false,
        year,
        type,
      };
    } catch (error) {
      console.error(`Error processing meta for ${type}/${slug}:`, error);
      return null;
    }
  },
);

// 모든 콘텐츠를 가져오는 함수
export async function getAllContent(type: ContentType): Promise<ContentItem[]> {
  const slugs = getSlugs(type);
  const contentPromises = slugs.map((slug) => getContentBySlug(type, slug));
  const content = await Promise.all(contentPromises);

  // null이 아닌 콘텐츠만 필터링하고, published가 true인 것만 포함
  return content
    .filter(
      (item): item is ContentItem => item !== null && item.published !== false,
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// 연도별로 콘텐츠 가져오기
export async function getContentByYear(
  type: ContentType,
): Promise<Record<number, ContentItem[]>> {
  const content = await getAllContent(type);
  return groupContentByYear(content);
}

// 블로그 포스트 관련 편의 함수
export const getPostBySlug = (slug: string) => getContentBySlug("blog", slug);
export const getAllPosts = () => getAllContent("blog");
export const getPostsByYear = () => getContentByYear("blog");

// 노트 관련 편의 함수
export const getNoteBySlug = (slug: string) => getContentBySlug("note", slug);
export const getAllNotes = () => getAllContent("note");
export const getNotesByYear = () => getContentByYear("note");
