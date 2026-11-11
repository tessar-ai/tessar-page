"use client";
import { useEffect, useRef, useState } from "react";
const COPY_FEEDBACK_MS = 1600;
export default function CopyButton({ targetId, ariaLabel }: {
  targetId: string;
  ariaLabel: string;
}) {
  const [feedback, setFeedback] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  async function copy() {
    const target = document.getElementById(targetId);
    if (!target)
      return;
    clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(target.textContent ?? "");
      setFeedback("Copied");
    }
    catch {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(target);
      selection?.removeAllRanges();
      selection?.addRange(range);
      setFeedback("Selected");
    }
    timer.current = setTimeout(() => setFeedback(""), COPY_FEEDBACK_MS);
  }
  return <>
    <button type="button" className="copy-button" aria-label={feedback === "Copied" ? "Copied" : ariaLabel} onClick={copy}>
      {feedback === "Copied" ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="m5 12 4 4L19 6" />
      </svg> : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <rect x="8" y="8" width="12" height="12" rx="2" />
        <path d="M16 8V4H4v12h4" />
      </svg>}
    </button>
    <span className="visually-hidden" role="status">{feedback === "Copied" ? "Copied to clipboard." : feedback === "Selected" ? "Text selected. Use your system copy shortcut." : ""}</span>
  </>;
}
