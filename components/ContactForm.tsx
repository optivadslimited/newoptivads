"use client";

import { FormEvent, useState } from "react";
import { CONTACT, LEAD_ENDPOINT } from "@/lib/site";
import { Icon } from "./Icon";

const BUDGETS = ["Under $10k", "$10k – $50k", "$50k – $150k", "$150k – $500k", "$500k+"];

const PILLARS = [
  {
    key: "performance",
    value: "Performance Media Buying",
    sub: "Programmatic, on-device, in-app & CTV, OEM",
    channels: ["Programmatic (TikTok & Snapchat Ads)", "On-device Traffic", "In-app, In-game & CTV", "OEM"],
  },
  {
    key: "creator",
    value: "Creator & Content Marketing",
    sub: "Influencers, creative studio, UGC",
    channels: ["Influencer Marketing", "Creative Studio", "UGC"],
  },
];

type Status = { kind: "idle" | "sending" | "ok" | "info"; text: string };

export default function ContactForm() {
  const [pillars, setPillars] = useState<Record<string, boolean>>({});
  const [channels, setChannels] = useState<Record<string, string[]>>({});
  const [interestError, setInterestError] = useState(false);
  const [status, setStatus] = useState<Status>({ kind: "idle", text: "" });

  const togglePillar = (key: string) => {
    setPillars((p) => {
      const next = { ...p, [key]: !p[key] };
      if (!next[key]) setChannels((c) => ({ ...c, [key]: [] }));
      return next;
    });
    setInterestError(false);
  };
  const toggleChannel = (key: string, value: string) =>
    setChannels((c) => {
      const list = c[key] || [];
      return { ...c, [key]: list.includes(value) ? list.filter((v) => v !== value) : [...list, value] };
    });

  const describeInterests = () =>
    PILLARS.filter((p) => pillars[p.key]).map((p) => {
      const ch = channels[p.key] || [];
      return p.value + (ch.length ? ` (${ch.join(", ")})` : " (channels to be discussed)");
    });

  // Fallback when the lead endpoint is unavailable: open the visitor's email client prefilled.
  const mailtoFallback = (fd: FormData) => {
    const lines = [
      `Name: ${fd.get("name")}`,
      `Company: ${fd.get("company")}`,
      `Work email: ${fd.get("email")}`,
      `App / website: ${fd.get("app")}`,
      `Monthly media budget: ${fd.get("budget")}`,
      "Interested in:",
      describeInterests().map((i) => `  - ${i}`).join("\n"),
      "",
      "Goals:",
      (fd.get("message") as string) || "-",
    ];
    const subject = `New enquiry from ${fd.get("company") || fd.get("name")}`;
    setStatus({
      kind: "info",
      text: `Opening your email client with the details prefilled. If nothing happens, email us directly at ${CONTACT.email}.`,
    });
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const chosen = PILLARS.filter((p) => pillars[p.key]);
    if (!chosen.length) {
      setInterestError(true);
      form.querySelector<HTMLElement>("#interest")?.scrollIntoView({ block: "center" });
      return;
    }
    const fd = new FormData(form);
    const payload = {
      name: fd.get("name"),
      company: fd.get("company"),
      email: fd.get("email"),
      app: fd.get("app"),
      budget: fd.get("budget"),
      interests: chosen.map((p) => p.value),
      channels: chosen.flatMap((p) => channels[p.key] || []),
      message: fd.get("message") || "",
      website: fd.get("website") || "",
      page: window.location.href,
    };
    setStatus({ kind: "sending", text: "Sending your enquiry…" });
    try {
      const r = await fetch(LEAD_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const j = await r.json().catch(() => null);
      if (!r.ok || !j || !j.ok) throw new Error("Lead endpoint rejected the submission");
      form.reset();
      setPillars({});
      setChannels({});
      setStatus({
        kind: "ok",
        text: "Thanks! Your enquiry is in. A senior member of the team will get back to you within one business day.",
      });
    } catch {
      mailtoFallback(fd);
    }
  };

  const labelCls = "text-[13.5px] font-bold text-ink-2";

  return (
    <form
      id="contact-form"
      onSubmit={onSubmit}
      noValidate={false}
      className="reveal rounded-3xl border border-line bg-white p-9 shadow-card"
    >
      <div className="hp" aria-hidden="true">
        <label htmlFor="f-website">Website</label>
        <input id="f-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <p className="mb-[18px] text-[13px] text-muted">
        Fields marked <span className="ml-0.5 font-extrabold text-blue">*</span> are required.
      </p>

      <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2">
        <div className="flex flex-col gap-[7px]">
          <label htmlFor="f-name" className={labelCls}>
            Full name <Req />
          </label>
          <input id="f-name" name="name" type="text" autoComplete="name" required placeholder="Jane Doe" className="input" />
        </div>
        <div className="flex flex-col gap-[7px]">
          <label htmlFor="f-company" className={labelCls}>
            Company <Req />
          </label>
          <input id="f-company" name="company" type="text" autoComplete="organization" required placeholder="Your company" className="input" />
        </div>
        <div className="flex flex-col gap-[7px]">
          <label htmlFor="f-email" className={labelCls}>
            Work email <Req />
          </label>
          <input id="f-email" name="email" type="email" autoComplete="email" required placeholder="you@company.com" className="input" />
        </div>
        <div className="flex flex-col gap-[7px]">
          <label htmlFor="f-app" className={labelCls}>
            App or website <Req />
          </label>
          <input id="f-app" name="app" type="text" inputMode="url" autoComplete="url" required placeholder="App store link or website" className="input" />
        </div>
        <div className="flex flex-col gap-[7px] sm:col-span-2">
          <label htmlFor="f-budget" className={labelCls}>
            Monthly media budget <Req />
          </label>
          <select id="f-budget" name="budget" required className="input" defaultValue="">
            <option value="">Select a range</option>
            {BUDGETS.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </div>

        <fieldset id="interest" className="m-0 min-w-0 border-0 p-0 sm:col-span-2">
          <legend className={`mb-2.5 p-0 ${labelCls}`}>
            What are you interested in? <Req />
          </legend>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {PILLARS.map((p) => {
              const on = !!pillars[p.key];
              return (
                <label
                  key={p.key}
                  className={`relative flex cursor-pointer items-start gap-3.5 rounded-[14px] border-[1.5px] bg-white p-4 transition-[border-color,background-color,box-shadow] duration-200 ${
                    on
                      ? "border-blue !bg-blue-50 shadow-[0_0_0_4px_rgba(0,123,255,0.10)]"
                      : interestError
                        ? "border-[#e57373]"
                        : "border-line hover:border-blue-200"
                  }`}
                >
                  <input
                    type="checkbox"
                    name="pillar"
                    value={p.value}
                    checked={on}
                    onChange={() => togglePillar(p.key)}
                    className="peer absolute m-0 h-px w-px opacity-0"
                  />
                  <span
                    className={`mt-[3px] grid h-[22px] w-[22px] flex-none place-items-center rounded-[7px] border-2 text-white transition-all duration-200 peer-focus-visible:outline peer-focus-visible:outline-[3px] peer-focus-visible:outline-offset-2 peer-focus-visible:outline-blue-200 ${
                      on ? "border-blue bg-blue" : "border-line bg-white"
                    }`}
                  >
                    <Icon name="tick" strokeWidth={3} className={`h-[13px] w-[13px] transition-opacity duration-150 ${on ? "opacity-100" : "opacity-0"}`} />
                  </span>
                  <span className="block">
                    <strong className="block text-[15px] leading-[1.3] text-ink">{p.value}</strong>
                    <small className="mt-[3px] block text-[12.5px] leading-[1.4] text-muted">{p.sub}</small>
                  </span>
                </label>
              );
            })}
          </div>

          {PILLARS.filter((p) => pillars[p.key]).map((p) => (
            <div key={p.key} className="mt-3 animate-fade-in rounded-[14px] border-[1.5px] border-dashed border-blue-200 bg-white p-4">
              <p className="mb-2.5 text-[13px] font-bold text-blue-dark">{p.value} · choose the channels you want to discuss</p>
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {p.channels.map((c) => (
                  <label
                    key={c}
                    className="flex cursor-pointer items-center gap-2.5 rounded-[12px] border-[1.5px] border-line px-3 py-2.5 text-[14px] font-semibold text-ink-2"
                  >
                    <input
                      type="checkbox"
                      name={p.key}
                      value={c}
                      checked={(channels[p.key] || []).includes(c)}
                      onChange={() => toggleChannel(p.key, c)}
                      className="h-[18px] w-[18px] accent-blue"
                    />
                    {c}
                  </label>
                ))}
              </div>
            </div>
          ))}

          <p className={`mt-2.5 text-[13px] font-semibold text-[#c62828] ${interestError ? "block" : "hidden"}`} role="alert">
            Please choose at least one: Performance Media Buying or Creator &amp; Content Marketing.
          </p>
        </fieldset>

        <div className="flex flex-col gap-[7px] sm:col-span-2">
          <label htmlFor="f-message" className={labelCls}>
            Tell us about your goals <span className="ml-1 text-[12.5px] font-semibold text-muted">(optional)</span>
          </label>
          <textarea id="f-message" name="message" placeholder="Target markets, KPIs, current channels, timelines…" className="input min-h-[130px] resize-y" />
        </div>
      </div>

      <div className="mt-[22px] flex flex-wrap items-center justify-between gap-3.5">
        <button type="submit" className="btn btn-primary" disabled={status.kind === "sending"}>
          Send enquiry <Icon name="arrow" strokeWidth={2.2} />
        </button>
        <small className="max-w-[46ch] text-[13px] text-muted">By submitting you agree to be contacted about your enquiry. We never share your details.</small>
      </div>

      <div
        className={`mt-4 rounded-[12px] px-4 py-3.5 text-[14px] font-semibold ${status.kind === "idle" ? "hidden" : "block"} ${
          status.kind === "ok" ? "bg-[#e8f8ef] text-[#0f6b3a]" : "bg-blue-50 text-blue-dark"
        }`}
        role="status"
        aria-live="polite"
      >
        {status.text}
      </div>
    </form>
  );
}

function Req() {
  return (
    <span className="ml-0.5 font-extrabold text-blue" aria-hidden="true">
      *
    </span>
  );
}
