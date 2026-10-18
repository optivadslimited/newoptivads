import type { ReactNode } from "react";

type Props = {
  kicker: string;
  title: ReactNode;
  lead?: ReactNode;
  center?: boolean;
  big?: boolean;
  className?: string;
};

export default function SectionHead({ kicker, title, lead, center, big, className = "" }: Props) {
  return (
    <div className={`reveal mb-14 max-w-[760px] ${center ? "mx-auto text-center" : ""} ${className}`}>
      <span className={`kicker ${center ? "kicker-plain" : ""}`}>{kicker}</span>
      <h2
        className={
          big
            ? "mb-[18px] text-[clamp(2.6rem,6vw,4.6rem)] leading-none tracking-[-0.04em] [&_span]:text-blue"
            : "mb-[18px] text-[clamp(2rem,3.8vw,3rem)]"
        }
      >
        {title}
      </h2>
      {lead && <p className="lead !text-[1.1rem]">{lead}</p>}
    </div>
  );
}
