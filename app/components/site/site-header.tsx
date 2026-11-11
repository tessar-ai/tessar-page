"use client";
import { useEffect, useRef, useState } from "react";
import BrandLogo from "./brand-logo";
import { THEME_KEY } from "./theme";
import { GET_STARTED_URL, SOURCE_URL } from "./links";
export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(true);
  const menu = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const sync = () => setDark(document.documentElement.dataset.theme === "dark");
    sync();
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        menu.current?.focus();
      }
    };
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, [open]);
  function toggleTheme() {
    const theme = dark ? "light" : "dark";
    document.documentElement.dataset.theme = theme;
    setDark(!dark);
    try {
      localStorage.setItem(THEME_KEY, theme);
    }
    catch { }
  }
  return (<header className="site-header" data-menu-open={open}>
    <a href="#main" aria-label="Tessar home">
      <BrandLogo />
    </a>
    <div className="nav-area">
      <button className="icon-button menu-button" id="menu-toggle" ref={menu} onClick={() => setOpen(!open)} aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="site-nav" type="button">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </button>
      <nav className={open ? "open" : ""} onClick={() => setOpen(false)} id="site-nav" aria-label="Main navigation">
        <a href={GET_STARTED_URL}>Docs</a>
        <a href="#framework">Framework</a>
        <a href={SOURCE_URL}>GitHub</a>
      </nav>
      <button className="icon-button" id="theme-toggle" onClick={toggleTheme} aria-label={dark ? "Switch to light mode" : "Switch to dark mode"} aria-pressed={dark} type="button">
        {dark ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <path d="M20.2 15.1A8.5 8.5 0 0 1 8.9 3.8 8.6 8.6 0 1 0 20.2 15.1Z" />
        </svg> : <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>}
      </button>
    </div>
  </header>);
}
