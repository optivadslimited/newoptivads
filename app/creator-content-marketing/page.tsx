import type { Metadata } from "next";
import Btn from "@/components/Btn";
import CtaBand from "@/components/CtaBand";
import Feature, { type FeatureData } from "@/components/Feature";
import PageHero from "@/components/PageHero";
import SectionHead from "@/components/SectionHead";
import ServiceCard from "@/components/ServiceCard";
import SubNav from "@/components/SubNav";

export const metadata: Metadata = {
  title: "Creator & Content Marketing",
  description:
    "Performance-led influencer marketing, a high-velocity creative studio and UGC at scale. Content built to feed your paid channels and convert.",
  openGraph: {
    title: "Creator & Content Marketing — Optivads",
    description:
      "Performance-led influencer marketing, a high-velocity creative studio and UGC at scale. Content built to feed your paid channels and convert.",
  },
};

const FEATURES: FeatureData[] = [
  {
    id: "influencer",
    kicker: "01 · Influencer Marketing",
    title: "Influencer Marketing",
    sub: "TikTok · Instagram · YouTube · Snapchat",
    lead: "Influencer campaigns built for performance, not vanity metrics. We find the right creators for your audience, handle briefs, contracts and payments, and track every install and conversion back to the post.",
    includes: [
      "Creator sourcing and vetting with audience, engagement and brand-safety checks",
      "Briefs, contracts, usage rights and payments handled end to end",
      "Tracking links, promo codes and MMP attribution per creator",
      "Spark Ads and whitelisting to amplify the best-performing posts",
      "Performance-based creator deals (CPI or CPA) where it makes sense",
    ],
    bestFor: ["Fintech", "Wellness", "Lifestyle", "Shopping"],
    icon: "users",
    chips: [
      { title: "Paid on performance", sub: "CPI / CPA creator deals" },
      { title: "Every post tracked", sub: "Links, codes, MMP" },
      { title: "Spark Ads", sub: "Amplify what works" },
    ],
  },
  {
    id: "creative-studio",
    kicker: "02 · Creative Studio",
    title: "Creative Studio",
    sub: "Concept · Script · Edit · Motion · Localise",
    lead: "A high-velocity creative team that lives inside your performance data. We turn what is winning in your account into new concepts, scripts, edits and statics every week, in every language you sell in.",
    includes: [
      "Concepting and scripting rooted in your best-performing hooks and angles",
      "Video editing, motion graphics and sound design for TikTok, Snapchat and programmatic",
      "Static, carousel and playable ad production",
      "Localisation and cultural adaptation for every market",
      "Weekly iteration loop: ship, measure, learn, repeat",
    ],
    bestFor: ["Apps scaling paid social", "Teams without in-house design", "Multi-market launches"],
    icon: "pen",
    chips: [
      { title: "Weekly creative drops", sub: "Fresh assets, every week" },
      { title: "Built from data", sub: "Your winners, iterated" },
      { title: "Every format", sub: "Video, static, playable" },
    ],
  },
  {
    id: "ugc",
    kicker: "03 · UGC",
    title: "UGC",
    sub: "Native-feeling video, at scale",
    lead: "Authentic user-generated video that looks like it belongs in the feed. Our vetted creator network produces hooks, demos, testimonials and reactions at scale, with full usage rights so you can run them anywhere.",
    includes: [
      "Vetted UGC creators matched to your audience and markets",
      "Multiple hooks and variations per concept for fast testing",
      "Raw footage plus edited, platform-ready versions",
      "Full usage rights for paid, organic and whitelisting",
      "Turnaround in days, not weeks",
    ],
    bestFor: ["Fintech", "Health & fitness", "Consumer apps", "Subscription"],
    icon: "video",
    chips: [
      { title: "Full usage rights", sub: "Paid, organic, whitelisting" },
      { title: "Hooks × variations", sub: "Built for testing" },
      { title: "Days, not weeks", sub: "Fast turnaround" },
    ],
  },
];

export default function CreatorContentMarketingPage() {
  return (
    <>
      <PageHero
        eyebrow="02 · Creator & Content Marketing"
        title={
          <>
            Creator &amp; <span>Content Marketing</span>
          </>
        }
        lead="Attention is the scarcest resource in mobile marketing. We earn it with creators, keep it with content that feels native, and turn it into installs and revenue your paid channels can scale."
      >
        <div className="mt-8 flex flex-wrap gap-3.5">
          <Btn href="/contact" arrow>
            Start a conversation
          </Btn>
          <Btn href="/performance-media-buying" variant="ghost">
            See Performance Media Buying
          </Btn>
        </div>
        <SubNav
          items={[
            { href: "#influencer", label: "Influencer Marketing" },
            { href: "#creative-studio", label: "Creative Studio" },
            { href: "#ugc", label: "UGC" },
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
            title="Put that content to work with performance media buying"
            lead="Creative only matters when it reaches the right users. Our media buying team runs the channels your content was made for."
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <ServiceCard icon="target" iconStroke={1.8} title="Programmatic" text="TikTok Ads, Snapchat Ads and DSP buying with structured creative testing." href="/performance-media-buying#programmatic" />
            <ServiceCard icon="device" iconStroke={1.8} title="On-device Traffic" text="Setup-wizard, feed and notification placements on millions of Android phones." href="/performance-media-buying#on-device" delay={1} />
            <ServiceCard icon="screen" iconStroke={1.8} title="In-app, In-game & CTV" text="Rewarded, interstitial and playable placements, plus Connected TV." href="/performance-media-buying#in-app" delay={2} />
            <ServiceCard icon="oem" iconStroke={1.8} title="OEM" text="Direct manufacturer partnerships for app-store and first-impact placements." href="/performance-media-buying#oem" delay={3} />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
