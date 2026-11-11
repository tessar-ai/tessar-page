"use client";

import { createContext, useContext, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import Image from "next/image";
import { pluginRunes, PluginRuneIcon } from "./plugin-runes";

type RealmStop = { position: "full" | "half"; rune: string };
const firstStop: RealmStop = { position: "full", rune: "" };
const ActiveRuneContext = createContext("");
export const useActiveRealmRune = () => useContext(ActiveRuneContext);

export default function RealmJourney({ children }: { children: ReactNode }) {
  const journey = useRef<HTMLDivElement>(null);
  const [stop, setStop] = useState(firstStop);
  const activeRune = pluginRunes.find(rune => rune.id === stop.rune);

  useEffect(() => {
    const stops = Array.from(journey.current?.querySelectorAll<HTMLElement>("[data-realm-stop]") ?? []);
    let current: HTMLElement | undefined;
    let frame = 0;
    const update = () => {
      frame = 0;
      let target = stops[0];
      for (const element of stops) {
        if (element.getBoundingClientRect().top > window.innerHeight / 2) break;
        target = element;
      }
      if (!target || target === current) return;
      current = target;
      setStop({
        position: target.dataset.shieldPosition === "half" ? "half" : "full",
        rune: target.dataset.rune || "",
      });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return <div className="realm-journey" data-shield={stop.position} ref={journey}>
    <aside className="rune-rail" aria-hidden="true">
      <div className="rune-shield-stage" data-position={stop.position}>
        <div className="rune-shield" data-active-rune={stop.rune} style={{ "--rune-turn": `${activeRune?.turn ?? 0}deg` } as CSSProperties}>
          <div className="rune-orbit">
            {pluginRunes.map(rune => <span className={`rune-glyph rune-${rune.position}`} data-selected={activeRune?.id === rune.id} key={rune.id} style={{ "--rune-counter-turn": `${-(activeRune?.turn ?? 0)}deg` } as CSSProperties} title={rune.label}><PluginRuneIcon rune={rune} /></span>)}
          </div>
          <div className="rune-medallion"><Image src="/brand/tessar/mark.svg" alt="" width={68} height={72} /></div>
        </div>
      </div>
    </aside>
    <ActiveRuneContext value={stop.rune}><div className="journey-content">{children}</div></ActiveRuneContext>
  </div>;
}
