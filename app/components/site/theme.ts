export const THEME_KEY = "tessar-theme";

// Apply before paint; storage can be unavailable in private contexts.
export const themeScript = `try{document.documentElement.dataset.theme=localStorage.getItem(${JSON.stringify(THEME_KEY)})==="light"?"light":"dark"}catch{}`;
