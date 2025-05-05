import Link from "next/link";

import ContentHeader from "@/components/content/ContentHeader";
import ContentList from "@/components/content/ContentList";
import { buttonVariants } from "@/components/ui/Button";
import { ViewTransition } from "@/components/ViewTransition";
import { getPostsByYear } from "@/lib/content-utils";

const DESCRIPTION = "개발자로서의 경험들을 공유합니다.";

export const metadata = {
  title: "블로그 - bandal.dev",
  description: DESCRIPTION,
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
          <ContentHeader title="블로그" description={DESCRIPTION} />
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
      <div className="mt-12 p-6 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium mb-2">이전 블로그 아카이브</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              더 과거의 글은 이전 블로그에 남아있어요.
            </p>
          </div>
          <div className="hidden sm:block text-slate-300 dark:text-slate-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
            </svg>
          </div>
        </div>
        <Link
          href="https://gomban.tistory.com/"
          target="_blank"
          className={buttonVariants({
            variant: "solid",
            size: "sm",
            className: "mt-2",
          })}
        >
          이전 블로그 보러가기 →
        </Link>
      </div>
    </ViewTransition>
  );
}
