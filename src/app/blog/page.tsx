import Link from "next/link";

import ContentHeader from "@/components/content/ContentHeader";
import ContentList from "@/components/content/ContentList";
import { buttonVariants } from "@/components/ui/Button";
import { ViewTransition } from "@/components/ViewTransition";
import { getPostsByYear } from "@/lib/content-utils";

export const metadata = {
  title: "블로그 - bandal.dev",
  description: "개발 관련 글을 공유합니다.",
};

export default async function BlogPage() {
  // 포스트 가져오기
  const postsByYear = await getPostsByYear();

  return (
    <ViewTransition
      transitions={{
        enter: "slideIn",
        exit: "fade",
      }}
    >
      <div>
        <div className="flex justify-between items-center mb-12">
          <ContentHeader
            title="블로그"
            description="개발 관련 글을 공유합니다."
          />
          <Link
            href="/notes"
            className={buttonVariants({ variant: "link", color: "foreground" })}
          >
            노트 보기 →
          </Link>
        </div>

        <ContentList
          contentByYear={postsByYear}
          contentPath="/blog"
          emptyMessage="포스트가 없습니다."
        />
      </div>
    </ViewTransition>
  );
}
