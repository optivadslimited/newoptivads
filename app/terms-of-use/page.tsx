import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "The terms that govern your access to and use of optivads.com and the services provided by Optivads Limited.",
};

export default function TermsOfUsePage() {
  return (
    <LegalPage
      slug="terms-of-use"
      title={
        <>
          Terms of <span>Use</span>
        </>
      }
      updated="September 21, 2025"
      lead="These Terms govern your access to and use of the website optivads.com and related services provided by Optivads Limited. By using our website or services, you agree to these Terms."
    />
  );
}
