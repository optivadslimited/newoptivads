import Link from "next/link";
import { asset } from "@/lib/site";

type Props = {
  /** `wordmark`: OPTIVADS only (header). `full`: wordmark + "Driving Results, Delivering Growth" + chevrons (footer). */
  variant?: "wordmark" | "full";
  /** Sets the rendered height, e.g. `h-7`. Width follows the image's aspect ratio. */
  className?: string;
};

const ART = {
  wordmark: { src: "/logo-wordmark.png", width: 1200, height: 120 },
  full: { src: "/logo-full.png", width: 1400, height: 240 },
};

export default function Logo({ variant = "wordmark", className = "h-7" }: Props) {
  const art = ART[variant];
  return (
    <Link href="/" aria-label="Optivads home" className="inline-flex shrink-0 items-center">
      <img src={asset(art.src)} alt="Optivads" width={art.width} height={art.height} className={`w-auto ${className}`} />
    </Link>
  );
}
