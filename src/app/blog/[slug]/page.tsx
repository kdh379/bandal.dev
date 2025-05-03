import dynamic from "next/dynamic";
import Link from "next/link";
import { notFound } from "next/navigation";

import ContentDetailHeader from "@/components/content/ContentDetailHeader";
import { getPostBySlug } from "@/lib/content-utils";
import { cn } from "@/lib/utils";

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
    <div className="content-container my-16">
      <div className="flex justify-between items-center mb-8">
        <ContentDetailHeader
          title={post.title}
          date={post.date}
          backLink={{ href: "/blog", label: "블로그로 돌아가기" }}
        />
        <Link
          href="/notes"
          className={cn(
            "flex items-center gap-2 text-sm",
            "transition-opacity hover:opacity-70",
          )}
        >
          노트 보기 →
        </Link>
      </div>

      <article>
        {/* MDX 컴포넌트 렌더링 */}
        <PostContent />
      </article>
    </div>
  );
}

export const dynamicParams = false;
