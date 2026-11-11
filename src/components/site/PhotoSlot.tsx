import type { GallerySlot } from "@/content/gallery";
import { cn } from "@/lib/utils";

/**
 * Shows a real site photo when provided; otherwise a clearly labeled placeholder.
 * Placeholders must never be replaced with stock images.
 */
export function PhotoSlot({
  slot,
  className,
  ratio = "aspect-[4/5]",
  sizes = "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw",
}: {
  slot: GallerySlot;
  className?: string;
  ratio?: string;
  sizes?: string;
}) {
  if (slot.image) {
    return (
      <figure className={cn("group relative overflow-hidden bg-muted", ratio, className)}>
        <img
          src={slot.image}
          srcSet={slot.srcSet}
          sizes={sizes}
          width={slot.width}
          height={slot.height}
          alt={slot.alt ?? slot.label}
          loading="lazy"
          decoding="async"
          className="size-full object-cover transition-transform duration-700 ease-[var(--ease-precise)] group-hover:scale-[1.03]"
        />
        <figcaption className="absolute inset-x-0 bottom-0 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 bg-gradient-to-t from-ink/80 to-transparent p-4 text-ink-foreground">
          <span className="text-sm font-medium">{slot.label}</span>
          <span className="eyebrow text-ink-muted">{slot.category}</span>
        </figcaption>
      </figure>
    );
  }

  return (
    <figure
      className={cn(
        "relative flex flex-col justify-between overflow-hidden border border-border bg-muted bg-hatch p-4",
        ratio,
        className,
      )}
    >
      {/* crop marks */}
      <span
        aria-hidden="true"
        className="absolute left-2 top-2 h-3 w-3 border-l border-t border-border-strong"
      />
      <span
        aria-hidden="true"
        className="absolute right-2 top-2 h-3 w-3 border-r border-t border-border-strong"
      />
      <span
        aria-hidden="true"
        className="absolute bottom-2 left-2 h-3 w-3 border-b border-l border-border-strong"
      />
      <span
        aria-hidden="true"
        className="absolute bottom-2 right-2 h-3 w-3 border-b border-r border-border-strong"
      />

      <div className="flex items-start justify-between gap-3 px-1 pt-1">
        <span className="eyebrow text-muted-foreground">Foto {slot.id}</span>
        <span className="eyebrow bg-background px-1.5 py-0.5 text-primary">Segnaposto</span>
      </div>
      <figcaption className="px-1 pb-1">
        <span className="eyebrow block text-muted-foreground">{slot.category}</span>
        <span className="mt-1.5 block text-base font-semibold leading-snug text-foreground">
          {slot.label}
        </span>
        <span className="mt-1 block text-xs text-muted-foreground">
          Spazio riservato a una foto reale di cantiere
        </span>
      </figcaption>
    </figure>
  );
}
