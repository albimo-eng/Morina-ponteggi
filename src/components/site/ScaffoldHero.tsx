import { useEffect, useRef } from "react";

/*
 * Line drawing of a facade scaffold that assembles lift by lift.
 * Intro draws the lower lifts on load; scrolling through the hero completes the rest.
 * Each element carries data-t (0..1 build order). Reduced motion: fully drawn, no listeners.
 */

const X0 = 70;
const BAY = 115;
const BAYS = 4;
const LIFT = 96;
const LIFTS = 6;
const BASE = 680;
const xs = Array.from({ length: BAYS + 1 }, (_, i) => X0 + i * BAY);
const X_END = xs[BAYS];

type Line = { x1: number; y1: number; x2: number; y2: number; kind: "std" | "ledger" | "brace" | "deck" | "rail" | "signal" | "base" };
type Label = { x: number; y: number; text: string };

function build() {
  const lines: Line[] = [];
  const labels: Label[] = [];
  const order: (Line | Label)[] = [];

  for (const x of xs) {
    const l: Line = { x1: x - 13, y1: BASE + 4, x2: x + 13, y2: BASE + 4, kind: "base" };
    lines.push(l);
    order.push(l);
  }

  for (let lv = 0; lv < LIFTS; lv++) {
    const y0 = BASE - lv * LIFT;
    const y1 = y0 - LIFT;
    for (const x of xs) {
      const l: Line = { x1: x, y1: y0, x2: x, y2: y1, kind: "std" };
      lines.push(l);
      order.push(l);
    }
    const ledger: Line = { x1: X0, y1, x2: X_END, y2: y1, kind: "ledger" };
    lines.push(ledger);
    order.push(ledger);
    for (let b = 0; b < BAYS; b++) {
      if ((b + lv) % 3 !== 0) continue;
      const fwd = lv % 2 === 0;
      const l: Line = {
        x1: xs[b],
        y1: fwd ? y0 : y1,
        x2: xs[b + 1],
        y2: fwd ? y1 : y0,
        kind: "brace",
      };
      lines.push(l);
      order.push(l);
    }
    const top = lv === LIFTS - 1;
    const deck: Line = { x1: X0, y1: y1 + 5, x2: X_END, y2: y1 + 5, kind: top ? "signal" : "deck" };
    lines.push(deck);
    order.push(deck);
    if (lv > 0) {
      const rail: Line = { x1: X0, y1: y0 - LIFT / 2, x2: X_END, y2: y0 - LIFT / 2, kind: "rail" };
      lines.push(rail);
      order.push(rail);
    }
    const label: Label = { x: 50, y: y1 + 4, text: `+${((lv + 1) * 2).toFixed(2)}` };
    labels.push(label);
    order.push(label);
  }

  // Top guardrail above the last deck
  const topY = BASE - LIFTS * LIFT;
  for (const x of [X0, X_END]) {
    const l: Line = { x1: x, y1: topY, x2: x, y2: topY - 50, kind: "std" };
    lines.push(l);
    order.push(l);
  }
  const guard: Line = { x1: X0, y1: topY - 50, x2: X_END, y2: topY - 50, kind: "signal" };
  lines.push(guard);
  order.push(guard);

  const t = new Map<Line | Label, number>();
  order.forEach((el, i) => t.set(el, i / (order.length - 1)));
  return { lines, labels, t };
}

const MODEL = build();

const STYLE: Record<Line["kind"], { w: number; cls: string }> = {
  base: { w: 3, cls: "text-foreground" },
  std: { w: 2.25, cls: "text-foreground" },
  ledger: { w: 1.6, cls: "text-foreground" },
  brace: { w: 1, cls: "text-muted-foreground" },
  deck: { w: 5, cls: "text-foreground" },
  rail: { w: 1, cls: "text-foreground/70" },
  signal: { w: 5, cls: "text-primary" },
};

const WIDTH = 0.06;
const INTRO = 0.55;
const INTRO_MS = 1800;

export function ScaffoldHero({ className }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const items = Array.from(svg.querySelectorAll<SVGElement>("[data-t]")).map((el) => ({
      el,
      t: Number(el.dataset.t),
      text: el.tagName.toLowerCase() === "text",
    }));

    const apply = (p: number) => {
      for (const { el, t, text } of items) {
        const local = Math.min(1, Math.max(0, (p - t * (1 - WIDTH)) / WIDTH));
        if (text) el.style.opacity = String(local);
        else el.style.strokeDashoffset = String(1 - local);
      }
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      apply(1);
      return;
    }

    const hero = svg.closest("section") ?? svg;
    let intro = 0;
    let scrollFrac = 0;
    let last = -1;
    let raf = 0;
    const start = performance.now();

    const readScroll = () => {
      const r = hero.getBoundingClientRect();
      scrollFrac = Math.min(1, Math.max(0, -r.top / (r.height * 0.55)));
    };

    const frame = (now: number) => {
      const k = Math.min(1, (now - start) / INTRO_MS);
      intro = INTRO * (1 - Math.pow(1 - k, 3));
      const p = Math.min(1, intro + (1 - INTRO) * scrollFrac);
      if (Math.abs(p - last) > 0.0005) {
        apply(p);
        last = p;
      }
      raf = k < 1 ? requestAnimationFrame(frame) : 0;
    };

    const onScroll = () => {
      readScroll();
      if (!raf) raf = requestAnimationFrame(frame);
    };

    readScroll();
    raf = requestAnimationFrame(frame);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const facadeTop = BASE - LIFTS * LIFT + 20;

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 600 720"
      className={`scaffold-svg ${className ?? ""}`}
      aria-hidden="true"
      focusable="false"
    >
      {/* Building facade (static, faint) */}
      <g className="text-border" fill="none" stroke="currentColor" strokeWidth="1">
        <rect x={X0 + 22} y={facadeTop} width={X_END - X0 - 44} height={BASE - facadeTop} />
        {Array.from({ length: LIFTS - 1 }, (_, r) =>
          Array.from({ length: 4 }, (_, c) => (
            <rect
              key={`${r}-${c}`}
              x={X0 + 52 + c * 108}
              y={facadeTop + 34 + r * LIFT}
              width="44"
              height="52"
            />
          )),
        )}
      </g>

      {/* Ground line */}
      <line x1="10" y1={BASE + 8} x2="590" y2={BASE + 8} className="text-foreground" stroke="currentColor" strokeWidth="1" />
      <g className="text-muted-foreground" stroke="currentColor" strokeWidth="1">
        {Array.from({ length: 29 }, (_, i) => (
          <line key={i} x1={14 + i * 20} y1={BASE + 8} x2={4 + i * 20} y2={BASE + 18} />
        ))}
      </g>

      {/* Level axis */}
      <line x1="56" y1={BASE} x2="56" y2={BASE - LIFTS * LIFT} className="text-muted-foreground" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2 4" />

      <g fill="none" stroke="currentColor" strokeLinecap="square">
        {MODEL.lines.map((l, i) => {
          const s = STYLE[l.kind];
          return (
            <line
              key={i}
              x1={l.x1}
              y1={l.y1}
              x2={l.x2}
              y2={l.y2}
              strokeWidth={s.w}
              className={s.cls}
              pathLength={1}
              data-t={MODEL.t.get(l)!.toFixed(4)}
            />
          );
        })}
      </g>

      <g className="fill-muted-foreground font-mono" fontSize="11" letterSpacing="0.5">
        {MODEL.labels.map((lb, i) => (
          <text key={i} x={lb.x} y={lb.y} textAnchor="end" data-t={MODEL.t.get(lb)!.toFixed(4)}>
            {lb.text}
          </text>
        ))}
        <text x="590" y={BASE + 40} textAnchor="end" fontSize="10" letterSpacing="1.5">
          SCHEMA ILLUSTRATIVO
        </text>
      </g>
    </svg>
  );
}
