import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

import ContentDetailHeader from "@/components/content/ContentDetailHeader";
import { ViewTransition } from "@/components/ViewTransition";
import { getNoteBySlug } from "@/lib/content-utils";

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
    <div className="content-container">
      <ContentDetailHeader
        slug={note.slug}
        title={note.title}
        date={note.date}
        backLink={{ href: "/notes", label: "노트로 돌아가기" }}
      />
      <ViewTransition>
        <NoteContent />
      </ViewTransition>
    </div>
  );
}
