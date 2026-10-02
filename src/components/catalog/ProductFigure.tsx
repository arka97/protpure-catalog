import { ProductIllustration } from "@/components/viz/ProductIllustration";
import { productBySlug } from "@/data/catalog";
import { PACK_LINEUP, visualForProduct, type ProductVisual } from "@/data/product-visuals";
import { cn } from "@/lib/utils";

/*
  The picture of a product line: the client's pack image, one of the client's photographs, or a drawing
  (see src/data/product-visuals.ts). Pack images have a white background, so they always stand on the
  white "plate", on light and on dark surfaces alike.
*/

interface ProductFigureProps {
  visual: ProductVisual;
  /** Load immediately (above the fold). */
  priority?: boolean;
  className?: string;
}

/** The large picture on a product page, with its caption. */
export function ProductFigure({ visual, priority, className }: ProductFigureProps) {
  return (
    <figure className={className}>
      <div className="overflow-hidden rounded-lg bg-plate">
        {visual.kind === "pack" && (
          <img
            src={visual.image.src}
            srcSet={`${visual.image.src} 1x, ${visual.image.src2x} 2x`}
            width={visual.image.width}
            height={visual.image.height}
            alt={visual.image.alt}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            className="mx-auto h-64 w-auto sm:h-[17.5rem] print:h-40"
          />
        )}
        {visual.kind === "photo" && (
          <img
            src={visual.photo.src}
            srcSet={visual.photo.srcSet}
            sizes="(min-width: 1024px) 34vw, 92vw"
            width={visual.photo.width}
            height={visual.photo.height}
            alt={visual.photo.alt}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            className="h-auto w-full"
          />
        )}
        {visual.kind === "illustration" && <ProductIllustration id={visual.id} />}
      </div>
      <figcaption className="mt-2.5 text-[0.8125rem] leading-snug text-ink-2">{visual.caption}</figcaption>
    </figure>
  );
}

interface ProductThumbProps {
  slug: string;
  className?: string;
}

/**
 * The same picture at card size. Decorative: it always sits next to the product's name.
 * Renders nothing for a product without a picture.
 */
export function ProductThumb({ slug, className }: ProductThumbProps) {
  const visual = visualForProduct(slug);
  if (!visual) return null;
  return (
    <span
      aria-hidden
      className={cn("block aspect-[3/4] w-[4.5rem] shrink-0 overflow-hidden rounded-lg bg-plate", className)}
    >
      {visual.kind === "pack" && (
        <img
          src={visual.image.src}
          width={visual.image.width}
          height={visual.image.height}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-contain"
        />
      )}
      {visual.kind === "photo" && (
        <img
          src={visual.photo.src}
          srcSet={visual.photo.srcSet}
          sizes="6rem"
          width={visual.photo.width}
          height={visual.photo.height}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      )}
      {visual.kind === "illustration" && <ProductIllustration id={visual.id} detail decorative />}
    </span>
  );
}

/**
 * A row of pack images for the top of the catalogue. The pictures have a white background, so they are
 * multiplied onto the plate and can stand closer together than their frames.
 */
export function PackLineup({ className }: { className?: string }) {
  const packs = PACK_LINEUP.flatMap((slug) => {
    const visual = visualForProduct(slug);
    const product = productBySlug(slug);
    return visual?.kind === "pack" && product ? [{ slug, name: product.name, image: visual.image }] : [];
  });
  if (!packs.length) return null;
  const names = packs.map((p) => p.name);
  const list = names.length > 1 ? `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}` : names[0];
  return (
    <figure className={className}>
      <div
        role="img"
        aria-label={`500 mL bottles of ProtPure resin side by side: ${list}.`}
        className="flex justify-center overflow-hidden rounded-panel bg-plate px-3 pb-1 pt-3"
      >
        {packs.map((p) => (
          <img
            key={p.slug}
            src={p.image.src}
            srcSet={`${p.image.src} 300w, ${p.image.src2x} 600w`}
            sizes="(min-width: 1024px) 10vw, 26vw"
            width={p.image.width}
            height={p.image.height}
            alt=""
            decoding="async"
            className="-mx-[3.2%] h-auto w-[26.4%] mix-blend-multiply"
          />
        ))}
      </div>
      <figcaption className="mt-2.5 text-[0.8125rem] leading-snug text-ink-3">500 mL packs: {list}</figcaption>
    </figure>
  );
}
