"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV } from "@/lib/site";
import { Icon } from "./Icon";
import Logo from "./Logo";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu after navigating.
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-white/[0.82] backdrop-blur-[14px] backdrop-saturate-[180%] transition-[border-color,box-shadow] duration-200 ${
        scrolled ? "border-line shadow-[0_6px_24px_rgba(10,26,51,0.05)]" : "border-transparent"
      }`}
    >
      <div className="wrap flex h-[76px] items-center justify-between gap-6">
        <Logo variant="wordmark" className="h-3.5 sm:h-5 md:h-[22px]" />

        <nav
          id="nav-links"
          aria-label="Primary"
          className={`${open ? "flex" : "hidden"} absolute left-0 right-0 top-[76px] flex-col items-stretch gap-1 border-b border-line bg-white px-4 pb-5 pt-3.5 shadow-[0_20px_40px_rgba(10,26,51,0.08)] md:static md:flex md:flex-row md:items-center md:gap-1.5 md:border-0 md:bg-transparent md:p-0 md:shadow-none`}
        >
          {NAV.map((item) => {
            const active = !item.neverActive && pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-full px-4 py-3.5 text-[16px] font-semibold transition-[background-color,color] duration-200 hover:bg-blue-50 hover:text-blue md:px-3.5 md:py-2.5 md:text-[15px] ${
                  active ? "bg-blue-50 text-blue" : "text-ink-2"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2.5">
          <Link href="/contact" className="btn btn-primary btn-sm !px-3 !py-[9px] !text-[13px] sm:!px-3.5 sm:!py-2.5 sm:!text-[14px] md:!px-[18px]">
            Let&apos;s talk <Icon name="arrow" strokeWidth={2.2} />
          </Link>
          <button
            type="button"
            className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-[12px] border-[1.5px] border-line bg-white md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="nav-links"
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name="menu" strokeWidth={2.2} className="h-[22px] w-[22px] stroke-ink" />
          </button>
        </div>
      </div>
    </header>
  );
}
