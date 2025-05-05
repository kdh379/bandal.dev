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
    title: `${note.meta.title} - bandal.dev`,
    description: note.meta.description,
  };
}

export default async function NotePage({ params }: NotePageProps) {
  const { slug } = await params;
  const note = await getNoteBySlug(slug);

  if (!note) {
    notFound();
  }

  return (
    <>
      <ContentDetailHeader
        slug={note.meta.slug}
        title={note.meta.title}
        date={note.meta.date}
        backLink={{ href: "/notes", label: "노트로 돌아가기" }}
      />
      <div className="slide-enter-content">
        <ViewTransition>
          <note.Component />
        </ViewTransition>
      </div>
    </>
  );
}
