import { unstable_ViewTransition as ReactViewTransition } from "react";

export function ViewTransition({ children }: { children: React.ReactNode }) {
  return <ReactViewTransition>{children}</ReactViewTransition>;
}
