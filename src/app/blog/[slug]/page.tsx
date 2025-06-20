import { notFound } from "next/navigation";

import ContentDetailHeader from "@/components/content/ContentDetailHeader";
import { ViewTransition } from "@/components/ViewTransition";
import { getPostBySlug } from "@/lib/content-utils";

import type { Metadata } from "next";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// 메타데이터 동적 생성
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "찾을 수 없음 - bandal.dev",
      description: "요청하신 블로그 글을 찾을 수 없습니다.",
    };
  }

  return {
    title: `${post.meta.title} - bandal.dev`,
    description: post.meta.description,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <ContentDetailHeader
        slug={post.meta.slug}
        title={post.meta.title}
        description={post.meta.description}
        date={post.meta.date}
        backLink={{ href: "/blog", label: "블로그로 돌아가기" }}
      />
      <div className="slide-enter-content">
        <ViewTransition>
          <post.Component />
        </ViewTransition>
      </div>
    </>
  );
}

export const dynamicParams = false;
