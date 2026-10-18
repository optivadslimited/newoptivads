import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: ReactNode;
  lead: string;
  children?: ReactNode;
  compact?: boolean;
};

/** Hero used by the service and contact pages. */
export default function PageHero({ eyebrow, title, lead, children, compact }: Props) {
  return (
    <section className={`page-hero-bg grid-overlay-top relative overflow-hidden pt-[84px] ${compact ? "pb-10" : "pb-14"}`}>
      <div className="wrap relative">
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="mb-5 mt-[18px] max-w-none text-[clamp(2.8rem,6.5vw,5rem)] leading-none tracking-[-0.04em] sm:max-w-[16ch] [&_span]:text-blue">
          {title}
        </h1>
        <p className="lead !max-w-[62ch]">{lead}</p>
        {children}
      </div>
    </section>
  );
}
