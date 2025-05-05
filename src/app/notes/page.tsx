import Link from "next/link";

import ContentHeader from "@/components/content/ContentHeader";
import ContentList from "@/components/content/ContentList";
import { buttonVariants } from "@/components/ui/Button";
import { ViewTransition } from "@/components/ViewTransition";
import { getNotesByYear } from "@/lib/content-utils";

const DESCRIPTION = "개인적인 생각과 경험을 기록합니다.";

export const metadata = {
  title: "노트 - bandal.dev",
  description: DESCRIPTION,
};

export default async function NotesPage() {
  // 노트 가져오기
  const notesByYear = await getNotesByYear();

  return (
    <ViewTransition
      transitions={{
        enter: "slideIn",
        exit: "fade",
      }}
    >
      <div>
        <div className="flex justify-between items-center mb-12">
          <ContentHeader title="노트" description={DESCRIPTION} />
          <Link
            href="/blog"
            className={buttonVariants({ variant: "link", color: "foreground" })}
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
    </ViewTransition>
  );
}
