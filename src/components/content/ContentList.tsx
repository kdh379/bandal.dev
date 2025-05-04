import Link from "next/link";

import { ViewTransition } from "@/components/ViewTransition";
import type { ContentItem } from "@/lib/content-utils";

type ContentByYear = Record<number, ContentItem[]>;

type ContentListProps = {
  contentByYear: ContentByYear;
  contentPath: string;
  emptyMessage: string;
};

export default function ContentList({
  contentByYear,
  contentPath,
  emptyMessage,
}: ContentListProps) {
  // 연도 목록 (컨텐츠가 있는 연도만)
  const filteredYears = Object.keys(contentByYear)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <>
      {filteredYears.length > 0 ? (
        filteredYears.map((year) => (
          <div key={year} className="mb-16">
            <h2 className="text-6xl font-bold -ml-4 mb-8 opacity-20 text-heading font-serif">
              {year}
            </h2>
            <div className="space-y-8 -mt-16">
              {contentByYear[year].map((item) => (
                <article key={item.slug} className="group">
                  <Link
                    href={`${contentPath}/${item.slug}`}
                    className="block group-hover:opacity-80 transition-opacity"
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                      <ViewTransition name={`title-${item.slug}`}>
                        <h3 className="text-xl font-bold flex-grow text-heading">
                          {item.title}
                        </h3>
                      </ViewTransition>
                      <div className="flex items-center gap-4">
                        <ViewTransition name={`date-${item.slug}`}>
                          <time className="text-sm whitespace-nowrap text-blockquote">
                            {item.date}
                          </time>
                        </ViewTransition>
                      </div>
                    </div>
                    <p className="mt-2 text-base line-clamp-2 text-blockquote">
                      {item.description}
                    </p>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="py-10 text-center">
          <p className="text-blockquote">{emptyMessage}</p>
        </div>
      )}
    </>
  );
}
