import { unstable_ViewTransition as ReactViewTransition } from "react";

interface ViewTransitionProps
  extends React.ComponentProps<typeof ReactViewTransition> {
  children: React.ReactNode;
}

export function ViewTransition(props: ViewTransitionProps) {
  return <ReactViewTransition {...props} />;
}
