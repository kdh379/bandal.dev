import dynamic from "next/dynamic";
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
    title: `${post.title} - bandal.dev`,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Dynamic import로 MDX 컴포넌트 가져오기
  const PostContent = dynamic(
    () => import(`@/content/posts/${slug}/index.mdx`),
    {
      loading: () => <div className="py-8">콘텐츠를 불러오는 중...</div>,
      ssr: true, // 서버 사이드 렌더링 활성화
    },
  );

  return (
    <div className="content-container">
      <ContentDetailHeader
        slug={post.slug}
        title={post.title}
        date={post.date}
        backLink={{ href: "/blog", label: "블로그로 돌아가기" }}
      />
      <ViewTransition>
        <PostContent />
      </ViewTransition>
    </div>
  );
}

export const dynamicParams = false;
