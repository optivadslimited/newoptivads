import Link from "next/link";
import { asset } from "@/lib/site";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Optivads home"
      className={`inline-flex items-center gap-2.5 text-[20px] font-extrabold tracking-[-0.03em] sm:text-[22px] ${className}`}
    >
      <img src={asset("/mark.svg")} alt="" width={34} height={34} className="h-[30px] w-[30px] sm:h-[34px] sm:w-[34px]" />
      Opti<b className="font-extrabold text-blue">vads</b>
    </Link>
  );
}
