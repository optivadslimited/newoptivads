export default function SubNav({ items }: { items: { href: string; label: string }[] }) {
  return (
    <nav className="mt-9 flex flex-wrap gap-2.5" aria-label="On this page">
      {items.map((item, i) => (
        <a
          key={item.href}
          href={item.href}
          className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-line bg-white px-4 py-2.5 text-[14px] font-bold text-ink-2 transition-all duration-200 hover:border-blue hover:text-blue"
        >
          <i className="grid h-[22px] w-[22px] place-items-center rounded-full bg-blue-50 text-[11px] font-extrabold not-italic text-blue">{i + 1}</i>
          {item.label}
        </a>
      ))}
    </nav>
  );
}
