import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Optivads Limited collects, uses, shares and protects personal data, and your rights under the UK GDPR and EU GDPR.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      slug="privacy-policy"
      title={
        <>
          Privacy <span>Policy</span>
        </>
      }
      updated="September 21, 2025"
      lead="This policy explains what data Optivads Limited collects, why we collect it, how we use and share it, how long we keep it, and your rights."
    />
  );
}
