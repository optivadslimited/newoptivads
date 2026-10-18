import Btn from "@/components/Btn";
import CtaBand from "@/components/CtaBand";
import { Icon, type IconName } from "@/components/Icon";
import SectionHead from "@/components/SectionHead";
import ServiceCard from "@/components/ServiceCard";
import { asset, CLIENTS, CONTACT } from "@/lib/site";

const BARS = [34, 42, 38, 52, 49, 61, 58, 70, 76, 72, 88, 100];

const PERFORMANCE_CARDS = [
  {
    icon: "target" as IconName,
    title: "Programmatic Media Buying",
    sub: "TikTok Ads & Snapchat Ads",
    text: "Full-funnel paid social and DSP buying with structured creative testing, built to scale spend without losing efficiency.",
    tags: ["TikTok Ads", "Snapchat Ads", "DSPs", "Retargeting"],
    href: "/performance-media-buying#programmatic",
  },
  {
    icon: "device" as IconName,
    title: "On-device Traffic",
    sub: "Setup wizards, feeds & notifications",
    text: "Reach users on the device itself. Setup-wizard, recommendation-feed and notification placements across millions of Android phones.",
    tags: ["Setup wizard", "Recommendation feeds", "Carrier partnerships"],
    href: "/performance-media-buying#on-device",
  },
  {
    icon: "screen" as IconName,
    title: "In-app, In-game & CTV",
    sub: "Premium inventory beyond the feed",
    text: "Rewarded, interstitial and playable placements inside top apps and games, plus Connected TV for reach that drives measurable lift.",
    tags: ["Rewarded video", "Interstitials", "Playables", "CTV / OTT"],
    href: "/performance-media-buying#in-app",
  },
  {
    icon: "oem" as IconName,
    title: "OEM",
    sub: "Direct manufacturer partnerships",
    text: "App-store, browser and first-impact placements through direct deals with device manufacturers in high-growth markets.",
    tags: ["Xiaomi", "Samsung", "Oppo & Vivo", "Transsion"],
    href: "/performance-media-buying#oem",
  },
];

const CREATOR_CARDS = [
  {
    icon: "users" as IconName,
    title: "Influencer Marketing",
    sub: "Creators paid on performance",
    text: "We source, brief, manage and pay creators on TikTok, Instagram, YouTube and Snapchat, tracking every install and conversion back to the post.",
    tags: ["Creator sourcing", "Tracking links", "Spark Ads", "Whitelisting"],
    href: "/creator-content-marketing#influencer",
  },
  {
    icon: "pen" as IconName,
    title: "Creative Studio",
    sub: "High-velocity ad creative",
    text: "Concepts, scripts, editing, motion, statics and localisation, all informed by what is already winning in your account.",
    tags: ["Video & motion", "Statics", "Playables", "Localisation"],
    href: "/creator-content-marketing#creative-studio",
  },
  {
    icon: "video" as IconName,
    title: "UGC",
    sub: "Authentic video you own",
    text: "A vetted network of UGC creators produces native-feeling video at scale, with hooks and variations ready to run across every channel.",
    tags: ["Vetted creators", "Hook variations", "Full usage rights", "Fast turnaround"],
    href: "/creator-content-marketing#ugc",
  },
];

const STEPS = [
  { title: "Audit & plan", text: "We review your funnel, MMP data and creative library, then build a channel plan with clear CPA and ROAS targets.", dur: "Week 1" },
  { title: "Launch & test", text: "Structured tests across channels, geos and creatives, so budget flows to what works instead of what we hoped would.", dur: "Weeks 2–4" },
  { title: "Optimise", text: "Daily bid, budget and creative decisions toward your KPI, with fraud filtering and incrementality checks built in.", dur: "Ongoing" },
  { title: "Scale", text: "Double down on winners, open new channels and markets, and keep efficiency as volume grows.", dur: "Month 2+" },
];

const WHY = [
  { icon: "tick" as IconName, title: "Pay for outcomes", text: "CPI, CPA, CPL or hybrid models. Your spend is tied to the events that matter to your business." },
  { icon: "shield" as IconName, title: "Fraud-protected traffic", text: "Machine-learning fraud detection and MMP verification on every source, so you only pay for genuine users." },
  { icon: "chart" as IconName, title: "Transparent reporting", text: "Weekly reports, shared dashboards and full visibility on sources, creatives and costs." },
  { icon: "bolt" as IconName, title: "Senior team, direct access", text: "You work with the people running your campaigns. No account-management layers, no hand-offs." },
];

const VERTICALS: { icon: IconName; label: string; top?: boolean }[] = [
  { icon: "creditcard", label: "Fintech & banking", top: true },
  { icon: "globe", label: "Remittance & payments", top: true },
  { icon: "trend", label: "Crypto & trading" },
  { icon: "heart", label: "Health & fitness", top: true },
  { icon: "drop", label: "Wellness & lifestyle" },
  { icon: "bag", label: "Shopping" },
  { icon: "plane", label: "Travel" },
  { icon: "gamepad", label: "Games" },
];

const STATS = [
  { count: "45", suffix: "M+", display: "45M+", label: "Monthly impressions", sub: "Across programmatic, on-device and OEM" },
  { count: "5", suffix: "M+", display: "5M+", label: "Monthly installs", sub: "MMP-attributed, fraud-filtered" },
  { count: "45", prefix: "+", suffix: "%", display: "+45%", label: "Average MoM ROAS lift", sub: "On scaled accounts after month one" },
  { count: "23.4", prefix: "+", suffix: "%", decimals: "1", display: "+23.4%", label: "Daily install growth", sub: "Average across active campaigns" },
];

const HERO_CHIPS = [
  { icon: "target" as IconName, title: "TikTok & Snapchat Ads", sub: "CPA down 32% in 6 weeks", pos: "sm:-left-1.5 sm:-top-[34px] [animation-delay:.3s] mt-4 sm:mt-0" },
  { icon: "device" as IconName, title: "OEM & on-device", sub: "1.2M installs · 30 days", pos: "sm:-left-[26px] sm:bottom-[34px] [animation-delay:1.1s]" },
  { icon: "video" as IconName, title: "UGC & creators", sub: "48 creatives shipped this month", pos: "sm:-bottom-[18px] sm:-right-3.5 [animation-delay:2s]" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="hero-bg grid-overlay relative overflow-hidden pb-10 pt-14 sm:pb-[72px] sm:pt-[88px]">
        <div className="wrap relative grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div>
            <span className="eyebrow">Performance marketing agency · London &amp; Casablanca · Global reach</span>
            <h1 className="my-5 mt-[22px] text-[clamp(2.6rem,5.4vw,4.4rem)] leading-[1.02] tracking-[-0.035em]">
              Growth that performs.
              <br />
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg, var(--color-blue-dark), var(--color-blue))" }}>
                Users that stay.
              </span>
            </h1>
            <p className="lead">
              Optivads is a performance media buying and creator marketing agency for mobile apps. We acquire high-value users through programmatic, on-device, in-app and OEM channels, backed by creator-led content that converts.
            </p>
            <div className="mt-8 flex flex-wrap gap-3.5">
              <Btn href="/contact" arrow>
                Start a conversation
              </Btn>
              <Btn href="#performance" variant="ghost">
                Explore our services
              </Btn>
            </div>
            <ul className="mt-[30px] flex flex-wrap gap-x-[22px] gap-y-2.5 text-[14px] font-semibold text-ink-2">
              {["Pay-for-performance models", "Fraud-protected traffic", "Transparent weekly reporting"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <Icon name="check" strokeWidth={2.2} className="h-[18px] w-[18px] text-blue" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Dashboard visual */}
          <div className="relative min-h-0 p-0 sm:px-6 sm:pb-6 sm:pt-4 lg:min-h-[440px] lg:px-0 lg:pb-0 lg:pt-7" aria-hidden="true">
            <div className="relative mx-auto max-w-[480px] rounded-3xl border border-line bg-white p-5 shadow-float sm:p-[26px] lg:ml-auto lg:mr-0">
              <div className="mb-[18px] flex items-center justify-between">
                <strong className="text-[13px] sm:text-[15px]">Campaign overview · 30 days</strong>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e8f8f0] px-2.5 py-[5px] text-[12px] font-bold text-green before:h-[7px] before:w-[7px] before:animate-pulse-dot before:rounded-full before:bg-[#12b76a] before:content-['']">
                  Live
                </span>
              </div>
              <div className="mb-5 grid grid-cols-3 gap-2 sm:gap-3">
                {[
                  { k: "Installs", v: "5M+", d: "+23.4%" },
                  { k: "ROAS", v: "18.4x", d: "+145%" },
                  { k: "Fraud rate", v: "<12%", d: "MMP verified" },
                ].map((kpi) => (
                  <div key={kpi.k} className="rounded-[14px] bg-soft px-3.5 py-3">
                    <small className="block text-[10px] font-semibold uppercase tracking-[0.04em] text-muted sm:text-[11px] sm:tracking-[0.06em]">{kpi.k}</small>
                    <strong className="mt-1 block text-[16px] tracking-[-0.02em] sm:text-[20px]">{kpi.v}</strong>
                    <em className="mt-1 inline-block text-[11px] font-bold not-italic text-green">{kpi.d}</em>
                  </div>
                ))}
              </div>
              <div className="flex h-[120px] items-end gap-2 border-t border-dashed border-line pt-2">
                {BARS.map((h, i) => (
                  <i
                    key={i}
                    className={`block flex-1 origin-bottom animate-grow rounded-[6px_6px_3px_3px] ${i % 2 === 0 ? "opacity-[0.55]" : "opacity-90"}`}
                    style={{ height: `${h}%`, background: "linear-gradient(180deg, var(--color-blue), var(--color-blue-dark))" }}
                  />
                ))}
              </div>
              <div className="mt-2 flex justify-between text-[11px] font-semibold text-muted">
                <span>Week 1</span>
                <span>Week 2</span>
                <span>Week 3</span>
                <span>Week 4</span>
              </div>
            </div>
            {HERO_CHIPS.map((chip) => (
              <div key={chip.title} className={`chip !static mt-2.5 !flex w-full animate-none sm:!absolute sm:mt-0 sm:!inline-flex sm:w-auto sm:animate-float ${chip.pos}`}>
                <span className="chip-dot">
                  <Icon name={chip.icon} strokeWidth={2.2} />
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

      {/* Clients */}
      <section id="clients" className="border-y border-line bg-white pb-10 pt-14" aria-labelledby="clients-title">
        <div className="wrap">
          <p id="clients-title" className="mb-7 text-center text-[13px] font-bold uppercase tracking-[0.14em] text-muted">
            Trusted by the apps people use every day
          </p>
          <div className="mask-fade-x group relative overflow-hidden">
            <div className="flex w-max animate-marquee gap-14 group-hover:[animation-play-state:paused]">
              {[...CLIENTS, ...CLIENTS].map((c, i) => (
                <div
                  key={`${c.file}-${i}`}
                  className="inline-flex items-center gap-3 whitespace-nowrap text-[17px] font-bold tracking-[-0.01em] text-ink-2 opacity-75 grayscale transition-[filter,opacity] duration-300 hover:opacity-100 hover:grayscale-0"
                >
                  <img src={asset(`/clients/${c.file}.png`)} alt="" loading="lazy" width={44} height={44} className="h-11 w-11 rounded-[12px] shadow-[0_2px_8px_rgba(10,26,51,0.12)]" />
                  {c.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="pt-[72px]">
        <div className="wrap grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <div key={s.label} className="reveal rounded-card border border-line bg-soft px-[18px] pb-5 pt-5 sm:px-7 sm:pb-6 sm:pt-7" data-delay={i || undefined}>
              <div className="text-[clamp(2.2rem,3.6vw,3rem)] font-extrabold leading-none tracking-[-0.04em] text-blue">
                <span data-count={s.count} data-prefix={s.prefix} data-suffix={s.suffix} data-decimals={s.decimals}>
                  {s.display}
                </span>
              </div>
              <div className="mt-2 text-[15px] font-semibold text-ink-2">{s.label}</div>
              <div className="mt-1 text-[13px] text-muted">{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Performance Media Buying */}
      <section className="section" id="performance">
        <div className="wrap">
          <SectionHead
            big
            kicker="01 · What we do"
            title={
              <>
                Performance <span>Media Buying</span>
              </>
            }
            lead="Every channel that moves the needle for mobile apps, bought by senior traders and optimised daily toward your CPA and ROAS targets. You choose the KPI. We own the outcome."
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PERFORMANCE_CARDS.map((c, i) => (
              <ServiceCard key={c.title} {...c} delay={i || undefined} />
            ))}
          </div>
        </div>
      </section>

      {/* Creator & Content Marketing */}
      <section className="section bg-soft" id="creators">
        <div className="wrap">
          <SectionHead
            big
            kicker="02 · What we do"
            title={
              <>
                Creator &amp; <span>Content Marketing</span>
              </>
            }
            lead="Content that earns attention and converts it. From performance-led influencer campaigns to a full creative studio and UGC at scale, every asset is built to feed your paid channels."
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {CREATOR_CARDS.map((c, i) => (
              <ServiceCard key={c.title} {...c} delay={i || undefined} />
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section">
        <div className="wrap">
          <SectionHead
            center
            kicker="How we work"
            title="From first call to scaled campaigns in weeks, not quarters"
            lead="A clear, repeatable process so you always know what is happening with your budget and why."
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <div key={s.title} className="reveal relative rounded-card border border-line bg-white px-7 py-[30px]" data-delay={i || undefined}>
                <div className="mb-5 grid h-[46px] w-[46px] place-items-center rounded-full bg-blue text-[16px] font-extrabold text-white shadow-[0_8px_18px_rgba(0,123,255,0.3)]">{i + 1}</div>
                <h3 className="mb-2 text-[1.15rem]">{s.title}</h3>
                <p className="text-[15px] text-muted">{s.text}</p>
                <span className="mt-3.5 inline-block rounded-full bg-blue-50 px-2.5 py-[5px] text-[12px] font-bold text-blue-dark">{s.dur}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Optivads */}
      <section className="section section-dark" id="why">
        <div className="wrap grid grid-cols-1 items-start gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="reveal">
            <span className="kicker !text-blue-200">Why Optivads</span>
            <h2 className="mb-[18px] text-[clamp(2rem,3.8vw,3rem)]">Why leading apps choose us</h2>
            <p className="lead mb-7 !text-white/[0.82]">We are built for teams who want a partner that is accountable for results, not just activity.</p>
            <ul>
              {WHY.map((w, i) => (
                <li key={w.title} className={`flex gap-4 border-t border-white/[0.14] py-[18px] ${i === WHY.length - 1 ? "border-b" : ""}`}>
                  <span className="grid h-[34px] w-[34px] flex-none place-items-center rounded-[10px] bg-white/[0.14]">
                    <Icon name={w.icon} strokeWidth={2.4} className="h-[18px] w-[18px]" />
                  </span>
                  <div>
                    <h3 className="mb-1 text-[1.1rem] text-white">{w.title}</h3>
                    <p className="text-[15px] text-white/[0.78]">{w.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="reveal rounded-3xl bg-white p-[34px] text-ink shadow-[0_30px_60px_rgba(0,0,0,0.18)]" data-delay="1">
            <h3 className="mb-2 text-[1.3rem]">Pricing models</h3>
            <p className="text-[15px] text-muted">Flexible commercial models matched to your funnel and risk appetite.</p>
            <ul className="my-[22px] flex flex-wrap gap-2.5">
              {["CPI", "CPA", "CPL", "CPM", "Hybrid"].map((m) => (
                <li key={m} className="rounded-[12px] border border-blue-100 bg-blue-50 px-4 py-2.5 text-[15px] font-extrabold text-blue-dark">
                  {m}
                </li>
              ))}
            </ul>
            <div className="mb-[22px] flex items-start gap-2.5 rounded-[12px] border border-dashed border-blue-200 bg-soft px-3.5 py-3 text-[13.5px] text-ink-2">
              <Icon name="info" strokeWidth={2.2} className="mt-0.5 h-[18px] w-[18px] flex-none text-blue" />
              <span>Rates depend on vertical, geo, channel mix and volume. Share your targets and we will send a tailored rate card within 48 hours.</span>
            </div>
            <Btn href="/contact" arrow>
              Request a rate card
            </Btn>
          </div>
        </div>
      </section>

      {/* Verticals */}
      <section className="section bg-soft">
        <div className="wrap">
          <SectionHead
            center
            kicker="Industries"
            title="Deep expertise in the most competitive verticals"
            lead="We have scaled fintech, remittance, crypto and wellness apps in Europe, the Americas, Africa and Asia."
          />
          <ul className="reveal flex flex-wrap justify-center gap-3">
            {VERTICALS.map((v) => (
              <li
                key={v.label}
                className="inline-flex items-center gap-2.5 rounded-full border border-line bg-white px-5 py-3.5 font-bold text-ink-2 transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-blue"
              >
                <Icon name={v.icon} className="h-5 w-5 text-blue" />
                {v.label}
                {v.top && <span className="rounded-full bg-blue-50 px-2 py-[3px] text-[11px] font-extrabold uppercase tracking-[0.06em] text-blue-dark">Top performer</span>}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Offices */}
      <section className="section" id="offices">
        <div className="wrap">
          <SectionHead
            center
            kicker="Where we operate"
            title="Two agencies. One growth team."
            lead="Optivads runs campaigns for the Global West from London. Our sister agency Veltadsap covers the Middle East and North Africa from Casablanca, so you get local market knowledge on both sides of the Mediterranean."
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <OfficeCard
              tag="Global West"
              name="Optivads Limited"
              address={CONTACT.london}
              text="Headquarters. Campaigns across Europe, the Americas, Africa and APAC, run by the senior team you meet on the first call."
              tags={["UK & Europe", "Americas", "Sub-Saharan Africa", "APAC"]}
            />
            <OfficeCard
              tag="MENA"
              name="Veltadsap"
              badge="Sister agency"
              address={CONTACT.casablanca}
              text="Our sister agency for user acquisition across the Middle East and North Africa: local OEM and carrier relationships, Arabic and French creative, and creators on the ground."
              tags={["GCC", "Morocco & Maghreb", "Egypt & Levant"]}
              delay={1}
            />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

function OfficeCard({ tag, name, badge, address, text, tags, delay }: { tag: string; name: string; badge?: string; address: string; text: string; tags: string[]; delay?: number }) {
  return (
    <article className="office-card reveal relative overflow-hidden rounded-card border border-line bg-white px-[30px] py-8 transition-[transform,box-shadow] duration-[250ms] hover:-translate-y-1 hover:shadow-float" data-delay={delay}>
      <span className="mb-4 inline-block rounded-full bg-blue-50 px-2.5 py-[5px] text-[11px] font-extrabold uppercase tracking-[0.12em] text-blue-dark">{tag}</span>
      <h3 className="mb-1.5 text-[1.4rem]">
        {name}
        {badge && (
          <small className="ml-2 inline-block rounded-full border border-line bg-soft px-2 py-[3px] align-middle text-[12px] font-bold tracking-normal text-muted">{badge}</small>
        )}
      </h3>
      <p className="mb-3.5 flex items-start gap-2 text-[14px] font-semibold text-ink-2">
        <Icon name="pin" className="mt-0.5 h-[18px] w-[18px] flex-none text-blue" />
        <span>{address}</span>
      </p>
      <p className="text-[15px] text-muted">{text}</p>
      <ul className="mt-[18px] flex flex-wrap gap-2">
        {tags.map((t) => (
          <li key={t} className="tag">
            {t}
          </li>
        ))}
      </ul>
    </article>
  );
}

