import type { Metadata } from "next";
import Btn from "@/components/Btn";
import CtaBand from "@/components/CtaBand";
import Feature, { type FeatureData } from "@/components/Feature";
import PageHero from "@/components/PageHero";
import SectionHead from "@/components/SectionHead";
import ServiceCard from "@/components/ServiceCard";
import SubNav from "@/components/SubNav";

export const metadata: Metadata = {
  title: "Performance Media Buying",
  description:
    "Programmatic media buying on TikTok Ads and Snapchat Ads, on-device traffic, in-app, in-game and CTV inventory, and direct OEM partnerships. Senior buyers, pay-for-performance models.",
  openGraph: {
    title: "Performance Media Buying — Optivads",
    description:
      "Programmatic media buying on TikTok Ads and Snapchat Ads, on-device traffic, in-app, in-game and CTV inventory, and direct OEM partnerships. Senior buyers, pay-for-performance models.",
  },
};

const FEATURES: FeatureData[] = [
  {
    id: "programmatic",
    kicker: "01 · Programmatic",
    title: "Programmatic Media Buying",
    sub: "TikTok Ads · Snapchat Ads · DSPs",
    lead: "Senior media buyers run your TikTok Ads and Snapchat Ads accounts alongside programmatic DSP inventory, with a testing cadence that finds winners fast and a scaling playbook that keeps CPA stable as spend grows.",
    includes: [
      "Account structure, pixel, SDK and MMP integration done right from day one",
      "Weekly creative testing sprints with clear hypotheses and kill criteria",
      "Daily bid, budget and audience optimisation toward CPA, ROAS or retention events",
      "Retargeting and re-engagement flows for lapsed and high-intent users",
      "DSP buying on premium open-web and in-app inventory with brand-safety controls",
    ],
    bestFor: ["Fintech", "Remittance", "Wellness", "Subscription apps"],
    icon: "target",
    chips: [
      { title: "CPA down 32%", sub: "Typical first 6 weeks" },
      { title: "12 creative tests", sub: "Every week, per account" },
      { title: "Spend scaled 4x", sub: "With CPA held flat" },
    ],
  },
  {
    id: "on-device",
    kicker: "02 · On-device",
    title: "On-device Traffic",
    sub: "Setup wizards · Recommendation feeds · Notifications",
    lead: "Meet users at the moment they set up or unlock a new phone. Through carrier and device partnerships we place your app in setup wizards, recommendation feeds, smart folders and notification slots across millions of Android devices.",
    includes: [
      "Pre-load and setup-wizard placements on new devices",
      "Dynamic recommendation feeds and smart folders on the home screen",
      "Carrier and device partnerships across Europe, LATAM, Africa, MENA and Asia",
      "Geo, device, OS and carrier targeting with install-based pricing",
      "Full MMP attribution and post-install quality monitoring",
    ],
    bestFor: ["Banking", "Payments", "Utilities", "Mass-market apps"],
    icon: "device",
    chips: [
      { title: "Millions of devices", sub: "Android, across 5 regions" },
      { title: "CPI pricing", sub: "Pay per verified install" },
      { title: "Day-1 engagement", sub: "Tracked and reported" },
    ],
  },
  {
    id: "in-app",
    kicker: "03 · In-app, In-game & CTV",
    title: "In-app, In-game & CTV",
    sub: "Rewarded · Interstitial · Playables · CTV / OTT",
    lead: "Premium inventory beyond the social feed. We buy rewarded, interstitial and playable placements inside top apps and games, and extend reach to Connected TV when your brand needs scale that social alone cannot deliver.",
    includes: [
      "Rewarded video and offerwall placements that drive high-intent installs",
      "Interstitials and playables in top-grossing games and utilities",
      "Connected TV and OTT campaigns with QR and attribution-based measurement",
      "Brand-safe inventory lists and real-time fraud filtering",
      "Creative adaptation for every format and aspect ratio",
    ],
    bestFor: ["Games", "Fintech", "Shopping", "Streaming"],
    icon: "screen",
    chips: [
      { title: "CTV reach", sub: "Measured, not assumed" },
      { title: "Top-grossing apps", sub: "Curated inventory lists" },
      { title: "Fraud filtered", sub: "In real time, every source" },
    ],
  },
  {
    id: "oem",
    kicker: "04 · OEM",
    title: "OEM",
    sub: "Xiaomi · Samsung · Oppo · Vivo · Huawei · Transsion",
    lead: "Direct partnerships with device manufacturers give you access to their app stores, browsers, news feeds and first-impact placements. Especially powerful in emerging markets, where OEM ecosystems reach users that Google and Meta cannot.",
    includes: [
      "OEM app-store listings, featured slots and search placements",
      "First-impact ads shown during device setup and first use",
      "OEM browser, news-feed and lock-screen inventory",
      "Volume deals in India, Southeast Asia, LATAM, Africa and MENA",
      "Dedicated OEM reporting with MMP reconciliation",
    ],
    bestFor: ["Emerging markets", "Fintech", "Remittance", "Super-apps"],
    icon: "oem",
    chips: [
      { title: "Direct OEM deals", sub: "No middle layers" },
      { title: "Emerging-market scale", sub: "India, SEA, LATAM, Africa" },
      { title: "First-impact ads", sub: "Seen during device setup" },
    ],
  },
];

export default function PerformanceMediaBuyingPage() {
  return (
    <>
      <PageHero
        eyebrow="01 · Performance Media Buying"
        title={
          <>
            Performance <span>Media Buying</span>
          </>
        }
        lead="Every channel that moves the needle for mobile apps, bought by senior traders and optimised daily toward your CPA and ROAS targets. From TikTok and Snapchat to the device itself, we go where your next best users are."
      >
        <div className="mt-8 flex flex-wrap gap-3.5">
          <Btn href="/contact" arrow>
            Request a rate card
          </Btn>
          <Btn href="/creator-content-marketing" variant="ghost">
            See Creator &amp; Content
          </Btn>
        </div>
        <SubNav
          items={[
            { href: "#programmatic", label: "Programmatic Media Buying" },
            { href: "#on-device", label: "On-device Traffic" },
            { href: "#in-app", label: "In-app, In-game & CTV" },
            { href: "#oem", label: "OEM" },
          ]}
        />
      </PageHero>

      {FEATURES.map((f, i) => (
        <Feature key={f.id} data={f} even={i % 2 === 0} />
      ))}

      <section className="section bg-soft">
        <div className="wrap">
          <SectionHead
            center
            kicker="Also from Optivads"
            title="Pair media buying with creator-led content"
            lead="The best-performing accounts we run combine paid channels with a steady supply of fresh creative. Our Creator & Content team plugs straight into your campaigns."
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <ServiceCard icon="users" iconStroke={1.8} title="Influencer Marketing" text="Creators sourced, briefed and paid on performance, with every install tracked." href="/creator-content-marketing#influencer" />
            <ServiceCard icon="pen" iconStroke={1.8} title="Creative Studio" text="Weekly creative drops built from what is already winning in your account." href="/creator-content-marketing#creative-studio" delay={1} />
            <ServiceCard icon="video" iconStroke={1.8} title="UGC" text="Native-feeling video at scale, with full usage rights and fast turnaround." href="/creator-content-marketing#ugc" delay={2} />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
