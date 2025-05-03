import { GitHubIcon } from "@/components/GitHubIcon";
import { Logo } from "@/components/Logo";
import { NavLink } from "@/components/NavLink";

export function Navigation() {
  return (
    <nav
      className="sticky top-0 z-10 backdrop-blur-md border-b py-3 transition-all duration-300"
      style={{
        borderColor: "var(--hr-color)",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.03)",
      }}
    >
      <div className="content-container flex justify-between items-center">
        <Logo />
        <ul className="flex gap-6 items-center">
          <li>
            <NavLink href="/blog">블로그</NavLink>
          </li>
          <li>
            <NavLink href="/notes">노트</NavLink>
          </li>
          <li>
            <NavLink href="/about">소개</NavLink>
          </li>
          <li>
            <NavLink
              href="https://github.com/kdh379"
              isExternal
              icon={<GitHubIcon />}
            >
              GitHub
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
