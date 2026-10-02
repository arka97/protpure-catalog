import type { PhotoAsset } from "@/data/photos";
import { cn } from "@/lib/utils";

interface PhotoProps {
  photo: PhotoAsset;
  /** `sizes` attribute: how wide the image is shown at each breakpoint. */
  sizes?: string;
  caption?: string;
  /** Load immediately (above the fold). */
  priority?: boolean;
  className?: string;
  imgClassName?: string;
}

/** One of the client's photographs, responsive, with reserved space and an optional caption. */
export function Photo({
  photo,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  caption,
  priority,
  className,
  imgClassName,
}: PhotoProps) {
  return (
    <figure className={className}>
      <div className="overflow-hidden rounded-panel bg-paper-2">
        <img
          src={photo.src}
          srcSet={photo.srcSet}
          sizes={sizes}
          width={photo.width}
          height={photo.height}
          alt={photo.alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className={cn("h-full w-full object-cover", imgClassName)}
        />
      </div>
      {caption && <figcaption className="mt-3 text-[0.8125rem] text-ink-3">{caption}</figcaption>}
    </figure>
  );
}
