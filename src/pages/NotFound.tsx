import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Em } from "@/components/site/Section";
import { useSeo } from "@/lib/seo";

const LINKS = [
  { to: "/products", label: "Products" },
  { to: "/applications", label: "Applications" },
  { to: "/services", label: "Services" },
  { to: "/technology", label: "Technology" },
  { to: "/contact", label: "Contact" },
];

export default function NotFound() {
  useSeo({ title: "Page not found", description: "This page does not exist on protpure.com.", noindex: true });

  return (
    <section className="shell py-24 md:py-36">
      <p className="label text-ink-3">Error 404</p>
      <h1 className="display-2 mt-5 max-w-[16ch]">
        Nothing eluted at this <Em>address.</Em>
      </h1>
      <p className="lede mt-6 max-w-xl">
        The page may have moved when the site was rebuilt. These will get you back on track.
      </p>
      <div className="mt-9 flex flex-wrap gap-3">
        <Button size="lg" asChild>
          <Link to="/">Go to the home page</Link>
        </Button>
        {LINKS.map((l) => (
          <Button key={l.to} size="lg" variant="outline" asChild>
            <Link to={l.to}>{l.label}</Link>
          </Button>
        ))}
      </div>
    </section>
  );
}
