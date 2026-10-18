import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "./Icon";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "white" | "outline-white";
  size?: "sm";
  arrow?: boolean;
  className?: string;
};

/** Pill button. Internal routes use next/link; mailto/anchors fall back to a plain anchor. */
export default function Btn({ href, children, variant = "primary", size, arrow, className = "" }: Props) {
  const cls = ["btn", `btn-${variant}`, size ? `btn-${size}` : "", className].filter(Boolean).join(" ");
  const content = (
    <>
      {children}
      {arrow && <Icon name="arrow" strokeWidth={2.2} />}
    </>
  );
  if (href.startsWith("/") && !href.startsWith("//")) {
    return (
      <Link href={href} className={cls}>
        {content}
      </Link>
    );
  }
  return (
    <a href={href} className={cls}>
      {content}
    </a>
  );
}
