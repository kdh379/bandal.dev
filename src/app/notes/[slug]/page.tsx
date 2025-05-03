import dynamic from "next/dynamic";
import Link from "next/link";
import { notFound } from "next/navigation";

import ContentDetailHeader from "@/components/content/ContentDetailHeader";
import { getNoteBySlug } from "@/lib/content-utils";
import { cn } from "@/lib/utils";

import type { Metadata } from "next";

interface NotePageProps {
  params: Promise<{
    slug: string;
  }>;
}

// 메타데이터 동적 생성
export async function generateMetadata({
  params,
}: NotePageProps): Promise<Metadata> {
  const { slug } = await params;
  const note = await getNoteBySlug(slug);

  if (!note) {
    return {
      title: "찾을 수 없음 - bandal.dev",
      description: "요청하신 노트를 찾을 수 없습니다.",
    };
  }

  return {
    title: `${note.title} - bandal.dev`,
    description: note.description,
  };
}

export default async function NotePage({ params }: NotePageProps) {
  const { slug } = await params;
  const note = await getNoteBySlug(slug);

  if (!note) {
    notFound();
  }

  // Dynamic import로 MDX 컴포넌트 가져오기
  const NoteContent = dynamic(
    () => import(`@/content/notes/${slug}/index.mdx`),
    {
      loading: () => <div className="py-8">콘텐츠를 불러오는 중...</div>,
      ssr: true, // 서버 사이드 렌더링 활성화
    },
  );

  return (
    <div className="content-container my-16">
      <div className="flex justify-between items-center mb-8">
        <ContentDetailHeader
          title={note.title}
          date={note.date}
          backLink={{ href: "/notes", label: "노트로 돌아가기" }}
        />
        <Link
          href="/blog"
          className={cn(
            "flex items-center gap-2 text-sm",
            "transition-colors hover:opacity-70",
            "text-foreground",
          )}
        >
          블로그 보기 →
        </Link>
      </div>

      <article>
        {/* MDX 컴포넌트 렌더링 */}
        <div className="mdx-content">
          <NoteContent />
        </div>
      </article>
    </div>
  );
}
