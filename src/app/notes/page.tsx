import Link from "next/link";

import ContentHeader from "@/components/content/ContentHeader";
import ContentList from "@/components/content/ContentList";
import { getNotesByYear } from "@/lib/content-utils";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "노트 - bandal.dev",
  description: "짧은 팁과 아이디어를 공유합니다.",
};

export default async function NotesPage() {
  // 노트 가져오기
  const notesByYear = await getNotesByYear();

  return (
    <div className="content-container my-16">
      <div className="flex justify-between items-center mb-12">
        <ContentHeader
          title="노트"
          description="짧은 팁과 아이디어를 공유합니다."
        />
        <Link
          href="/blog"
          className={cn(
            "px-4 py-2 rounded-md",
            "transition-colors hover:bg-gray-100 dark:hover:bg-gray-800",
            "text-foreground",
          )}
        >
          블로그 보기 →
        </Link>
      </div>

      <ContentList
        contentByYear={notesByYear}
        contentPath="/notes"
        emptyMessage="노트가 없습니다."
      />
    </div>
  );
}
