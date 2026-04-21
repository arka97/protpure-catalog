import { Link } from "react-router-dom";

interface Props {
  eyebrow: string;
  title: string;
  description: string;
  breadcrumbs?: { label: string; to?: string }[];
}

export function PageHero({ eyebrow, title, description, breadcrumbs }: Props) {
  return (
    <section className="bg-navy hex-pattern relative overflow-hidden">
      <div className="absolute -right-20 -bottom-20 w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,hsl(var(--teal)/0.15),transparent_70%)] pointer-events-none" />
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-14 relative">
        {breadcrumbs && (
          <div className="text-xs text-on-navy-muted mb-3 flex items-center gap-1.5">
            {breadcrumbs.map((b, i) => (
              <span key={i} className="flex items-center gap-1.5">
                {b.to ? (
                  <Link to={b.to} className="hover:text-white transition-colors">
                    {b.label}
                  </Link>
                ) : (
                  <span>{b.label}</span>
                )}
                {i < breadcrumbs.length - 1 && <span className="text-on-navy-muted">/</span>}
              </span>
            ))}
          </div>
        )}
        <div className="text-[11px] font-semibold tracking-[0.15em] text-teal-bright uppercase mb-3">
          {eyebrow}
        </div>
        <h1 className="font-serif text-3xl md:text-4xl text-white mb-3 max-w-3xl">{title}</h1>
        <p className="text-base text-on-navy max-w-2xl leading-relaxed">{description}</p>
      </div>
    </section>
  );
}