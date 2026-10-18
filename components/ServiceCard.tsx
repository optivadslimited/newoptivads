import Link from "next/link";
import { Icon, type IconName } from "./Icon";

type Props = {
  icon: IconName;
  iconStroke?: number;
  title: string;
  sub?: string;
  text: string;
  tags?: string[];
  href: string;
  delay?: number;
};

export default function ServiceCard({ icon, iconStroke = 2, title, sub, text, tags, href, delay }: Props) {
  return (
    <article className="card reveal" data-delay={delay}>
      <div className="card-icon">
        <Icon name={icon} strokeWidth={iconStroke} />
      </div>
      <h3 className="mb-1.5 text-[1.3rem] tracking-[-0.02em]">{title}</h3>
      {sub && <div className="mb-3 text-[13.5px] font-bold text-blue-dark">{sub}</div>}
      <p className="text-[15px] text-muted">{text}</p>
      {tags && (
        <ul className="mt-[18px] flex flex-wrap gap-2">
          {tags.map((t) => (
            <li key={t} className="tag">
              {t}
            </li>
          ))}
        </ul>
      )}
      <Link href={href} className="card-more card-link">
        Learn more <Icon name="arrow" strokeWidth={2.2} />
      </Link>
    </article>
  );
}
