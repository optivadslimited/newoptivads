import Link from "next/link";
import { CONTACT } from "@/lib/site";
import { SocialIcon } from "./Icon";
import Logo from "./Logo";

const performance = [
  { href: "/performance-media-buying#programmatic", label: "Programmatic Media Buying" },
  { href: "/performance-media-buying#on-device", label: "On-device Traffic" },
  { href: "/performance-media-buying#in-app", label: "In-app, In-game & CTV" },
  { href: "/performance-media-buying#oem", label: "OEM" },
];
const creator = [
  { href: "/creator-content-marketing#influencer", label: "Influencer Marketing" },
  { href: "/creator-content-marketing#creative-studio", label: "Creative Studio" },
  { href: "/creator-content-marketing#ugc", label: "UGC" },
  { href: "/#clients", label: "Clients" },
];

export function Social({ dark = false }: { dark?: boolean }) {
  const base = dark
    ? "bg-white/[0.14] hover:bg-white [&:hover_svg]:fill-blue"
    : "bg-white/[0.08] hover:bg-blue";
  return (
    <div className="flex gap-2.5">
      {[
        { href: CONTACT.linkedin, name: "linkedin" as const, label: "LinkedIn" },
        { href: CONTACT.instagram, name: "instagram" as const, label: "Instagram" },
        { href: CONTACT.x, name: "x" as const, label: "X" },
      ].map((s) => (
        <a
          key={s.name}
          href={s.href}
          target="_blank"
          rel="noopener"
          aria-label={s.label}
          className={`grid h-10 w-10 place-items-center rounded-[12px] transition-colors duration-200 ${base}`}
        >
          <SocialIcon name={s.name} className="h-[18px] w-[18px] fill-white" />
        </a>
      ))}
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-ink pb-7 pt-[72px] text-white/[0.78]">
      <div className="wrap">
        <div className="grid grid-cols-1 gap-10 border-b border-white/[0.12] pb-11 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          <div>
            <Logo variant="full" className="h-[72px]" />
            <p className="mb-[22px] mt-4 max-w-[36ch] text-[15px]">
              Performance media buying and creator marketing for mobile apps that need to grow profitably.
            </p>
            <Social />
          </div>
          <div>
            <h4 className="mb-[18px] text-[14px] font-extrabold uppercase tracking-[0.12em] text-white">Performance</h4>
            <ul>
              {performance.map((l) => (
                <li key={l.href} className="mb-2.5 text-[15px]">
                  <Link href={l.href} className="hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-[18px] text-[14px] font-extrabold uppercase tracking-[0.12em] text-white">Creator &amp; Content</h4>
            <ul>
              {creator.map((l) => (
                <li key={l.href} className="mb-2.5 text-[15px]">
                  <Link href={l.href} className="hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-[18px] text-[14px] font-extrabold uppercase tracking-[0.12em] text-white">Offices &amp; contact</h4>
            <ul>
              <li className="mb-2.5 text-[15px]">
                <strong className="font-bold text-white">Global West · Optivads Limited</strong>
                <span className="mt-0.5 block text-[13.5px] text-white/60">{CONTACT.london}</span>
              </li>
              <li className="mb-2.5 text-[15px]">
                <strong className="font-bold text-white">MENA · Veltadsap</strong>{" "}
                <span className="ml-1 inline-block rounded-full border border-[rgba(185,214,255,0.35)] px-[7px] py-px align-middle text-[11px] font-bold text-blue-200">
                  sister agency
                </span>
                <span className="mt-0.5 block text-[13.5px] text-white/60">{CONTACT.casablanca}</span>
              </li>
              <li className="mb-2.5 text-[15px]">
                <a href={`mailto:${CONTACT.email}`} className="hover:text-white">
                  {CONTACT.email}
                </a>
              </li>
              <li className="mb-2.5 text-[15px]">
                <a href={CONTACT.phoneHref} className="hover:text-white">
                  {CONTACT.phone}
                </a>
              </li>
              <li className="mb-2.5 text-[15px]">
                <Link href="/contact" className="hover:text-white">
                  Book a call →
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-3 pt-6 text-[13.5px] text-white/55">
          <span>© {new Date().getFullYear()} Optivads Limited. All rights reserved.</span>
          <ul className="flex gap-[18px]">
            {["Privacy Policy", "Cookie Policy", "Terms of Use"].map((l) => (
              <li key={l} className="mb-2.5 text-[15px]">
                <a href="#" className="hover:text-white">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
