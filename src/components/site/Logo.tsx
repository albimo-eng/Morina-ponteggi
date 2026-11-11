import { cn } from "@/lib/utils";

/** Scaffold-inspired symbol: a single bay — two standards, ledgers, a brace, a red deck. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={cn("size-8 shrink-0", className)}>
      <g fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square">
        <line x1="5" y1="3" x2="5" y2="29" />
        <line x1="27" y1="3" x2="27" y2="29" />
        <line x1="5" y1="5" x2="27" y2="5" />
        <line x1="5" y1="5" x2="27" y2="22" strokeWidth="1.75" />
      </g>
      <rect x="3.75" y="21" width="24.5" height="4" className="fill-primary" />
    </svg>
  );
}

export function Wordmark({ className, inverted }: { className?: string; inverted?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <LogoMark className={inverted ? "text-ink-foreground" : "text-foreground"} />
      <span className="flex flex-col leading-none">
        <span className="font-wide text-[1.15rem] tracking-[-0.01em]">MORINA</span>
        <span
          className={cn(
            "mt-1 font-mono text-[0.6rem] font-medium tracking-[0.42em]",
            inverted ? "text-ink-muted" : "text-muted-foreground",
          )}
        >
          PONTEGGI
        </span>
      </span>
    </span>
  );
}
