import { Icon, type IconName } from "./Icon";

export type FeatureData = {
  id: string;
  kicker: string;
  title: string;
  sub: string;
  lead: string;
  includes: string[];
  bestFor: string[];
  icon: IconName;
  chips: { title: string; sub: string }[];
};

/** Alternating two-column service feature: text + animated visual. "Even" features (the 1st, 3rd…, matching the
 *  original page where the hero counted as section one) get the soft background and the visual on the left on desktop. */
export default function Feature({ data, even }: { data: FeatureData; even: boolean }) {
  return (
    <section id={data.id} className={`scroll-mt-[90px] py-16 md:py-[88px] ${even ? "bg-soft" : ""}`}>
      <div className="wrap grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className={`reveal ${even ? "lg:order-2" : ""}`}>
          <span className="kicker">{data.kicker}</span>
          <h2 className="mb-2 text-[clamp(1.9rem,3.4vw,2.7rem)]">{data.title}</h2>
          <div className="mb-4 text-[15px] font-bold text-blue-dark">{data.sub}</div>
          <p className="lead !text-[1.05rem]">{data.lead}</p>
          <ul className="mt-[26px] grid gap-3">
            {data.includes.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[15px] text-ink-2">
                <Icon name="check" strokeWidth={2.4} className="mt-0.5 h-5 w-5 flex-none text-blue" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <ul className="mt-6 flex flex-wrap items-center gap-2 text-[13.5px] font-semibold text-muted">
            Best for:
            {data.bestFor.map((b) => (
              <li key={b} className="tag-blue">
                {b}
              </li>
            ))}
          </ul>
        </div>

        <div
          className="reveal relative grid min-h-[320px] place-items-center overflow-visible rounded-[28px] border border-line sm:min-h-[380px]"
          style={{ background: "linear-gradient(160deg, var(--color-blue-50), #fff 60%)" }}
          data-delay="1"
          aria-hidden="true"
        >
          <span className="absolute h-[260px] w-[260px] animate-spin-slow rounded-full border-[1.5px] border-dashed border-blue-200" />
          <span className="absolute hidden h-[340px] w-[340px] animate-spin-slow rounded-full border-[1.5px] border-dashed border-blue-200 opacity-60 [animation-direction:reverse] sm:block" />
          <div
            className="grid h-[150px] w-[150px] place-items-center rounded-[40px] text-white shadow-[0_30px_60px_rgba(0,86,204,0.3)]"
            style={{ background: "linear-gradient(145deg, var(--color-blue), var(--color-blue-dark))" }}
          >
            <Icon name={data.icon} strokeWidth={1.8} className="h-[70px] w-[70px]" />
          </div>
          {data.chips.map((chip, i) => (
            <div
              key={chip.title}
              className={`chip animate-float-slow !px-2.5 !py-2 !text-[12px] sm:!px-3.5 sm:!py-2.5 sm:!text-[13px] ${
                i === 0 ? "left-[26px] top-7" : i === 1 ? "right-[22px] top-[46%] [animation-delay:1.3s]" : "bottom-[30px] left-10 [animation-delay:2.4s]"
              }`}
            >
              <span className="chip-dot">
                <Icon name="check" strokeWidth={2.4} />
              </span>
              <span>
                {chip.title}
                <small>{chip.sub}</small>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
