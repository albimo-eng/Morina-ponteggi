import type { ReactNode } from "react";

export function PageHeader({
  code,
  eyebrow,
  title,
  lead,
  children,
}: {
  code: string;
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="bg-grid relative border-b border-border">
      <div className="container-x pb-14 pt-14 md:pb-20 md:pt-24">
        <div className="animate-rise flex items-center gap-4">
          <span className="eyebrow text-primary">{code}</span>
          <span className="h-px w-10 bg-border-strong" aria-hidden="true" />
          <span className="eyebrow text-muted-foreground">{eyebrow}</span>
        </div>
        <h1 className="animate-rise mt-6 max-w-5xl font-wide text-display-lg [animation-delay:80ms]">
          {title}
        </h1>
        {lead ? (
          <p className="animate-rise mt-6 max-w-2xl text-lead text-muted-foreground [animation-delay:160ms]">
            {lead}
          </p>
        ) : null}
        {children ? <div className="animate-rise mt-8 [animation-delay:220ms]">{children}</div> : null}
      </div>
    </section>
  );
}
