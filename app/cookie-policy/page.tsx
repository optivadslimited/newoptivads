import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "How Optivads Limited uses cookies and similar technologies on optivads.com, and how you can control them.",
};

export default function CookiePolicyPage() {
  return (
    <LegalPage
      slug="cookie-policy"
      title={
        <>
          Cookie <span>Policy</span>
        </>
      }
      updated="September 21, 2025"
      lead="How Optivads Limited uses cookies and similar technologies on optivads.com, why we use them, and how you can control them under the UK GDPR and EU GDPR."
    />
  );
}
