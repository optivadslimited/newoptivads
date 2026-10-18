import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { Social } from "@/components/Footer";
import { Icon, type IconName } from "@/components/Icon";
import PageHero from "@/components/PageHero";
import { CONTACT } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Tell us about your app and growth targets. Optivads replies within one business day with next steps and a tailored rate card.",
  openGraph: {
    title: "Contact Us — Optivads",
    description: "Tell us about your app and growth targets. Optivads replies within one business day with next steps and a tailored rate card.",
  },
};

const INFO: { icon: IconName; label: string; value: string; href?: string }[] = [
  { icon: "mail", label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
  { icon: "phone", label: "Phone", value: CONTACT.phone, href: CONTACT.phoneHref },
  { icon: "pin", label: "Global West · Optivads Limited", value: CONTACT.london },
  { icon: "pin", label: "MENA · Veltadsap (sister agency)", value: CONTACT.casablanca },
  { icon: "clock", label: "Response time", value: "Within one business day" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        compact
        eyebrow="Contact us"
        title={
          <>
            Let&apos;s build your <span>growth plan</span>
          </>
        }
        lead="Tell us about your app and your targets. We reply within one business day with next steps, and send a tailored rate card within 48 hours."
      />

      <section className="section !pt-6">
        <div className="wrap grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <ContactForm />

          <aside
            className="reveal rounded-3xl p-9 text-white shadow-float"
            style={{ background: "linear-gradient(160deg, var(--color-blue-deep), var(--color-blue))" }}
            data-delay="1"
          >
            <h3 className="mb-2.5 text-[1.4rem]">Talk to the team</h3>
            <p className="text-white/85">
              Prefer email or a call? Reach us directly and a senior member of the team will get back to you. For campaigns in the Middle East and North Africa, our sister agency Veltadsap in Casablanca is part of the same team.
            </p>
            <ul className="my-[26px]">
              {INFO.map((item) => (
                <li key={item.label} className="flex items-start gap-3.5 border-t border-white/[0.18] py-3.5">
                  <span className="grid h-10 w-10 flex-none place-items-center rounded-[12px] bg-white/[0.14]">
                    <Icon name={item.icon} className="h-[18px] w-[18px]" />
                  </span>
                  <div>
                    <small className="block text-[12px] font-bold uppercase tracking-[0.08em] text-white/70">{item.label}</small>
                    {item.href ? (
                      <a href={item.href} className="text-[16px] font-bold">
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-[16px] font-bold">{item.value}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            <Social dark />
          </aside>
        </div>
      </section>
    </>
  );
}
