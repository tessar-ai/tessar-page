"use client";
import { Fragment, useEffect, useRef, useState, useSyncExternalStore } from "react";
import CopyButton from "../../../components/site/copy-button";
import { examples, type BuildingBlock } from "./examples";
const SELECTION_DURATION_MS = 260;
const tabLayoutQuery = "(max-width: 760px)";
function subscribeToTabLayout(onChange: () => void) {
  const query = matchMedia(tabLayoutQuery);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}
const getTabOrientation = () => matchMedia(tabLayoutQuery).matches ? "horizontal" : "vertical";
const getServerTabOrientation = () => "vertical" as const;
const nodes = [
  { id: "agent", title: "Agent", hint: "Model and tool execution" },
  { id: "controller", title: "Controller", hint: "Plugins and lifecycle" },
  { id: "session", title: "Session", hint: "Thread and follow-ups" },
] as const;
function Arrow() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <path d="M5 12h14m-6-6 6 6-6 6" />
  </svg>;
}
function Highlight({ code }: {
  code: string;
}) {
  return code.split(/(\/\/[^\n]*|"(?:\\.|[^"\\])*"|\b(?:import|from|export|const|new|await|try|finally)\b)/g).map((token, index) => {
    const kind = token.startsWith("//") ? "comment" : token.startsWith('"') ? "string" : /^(import|from|export|const|new|await|try|finally)$/.test(token) ? "keyword" : "";
    return kind ? <span key={index} className={`syntax-${kind}`}>{token}</span> : token;
  });
}
export default function FrameworkFlow() {
  const orientation = useSyncExternalStore(subscribeToTabLayout, getTabOrientation, getServerTabOrientation);
  const [selected, setSelected] = useState<BuildingBlock>("controller");
  const panel = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const previous = useRef(selected);
  const example = examples[selected];
  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      if (preference.matches) {
        panel.current?.getAnimations().forEach(animation => animation.cancel());
        tabs.current.forEach(tab => tab?.querySelector(".node-symbol")?.getAnimations().forEach(animation => animation.cancel()));
      }
    };
    sync();
    preference.addEventListener("change", sync);
    return () => preference.removeEventListener("change", sync);
  }, []);
  useEffect(() => {
    if (previous.current === selected)
      return;
    previous.current = selected;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    const symbol = tabs.current[nodes.findIndex(node => node.id === selected)]?.querySelector(".node-symbol");
    panel.current?.getAnimations().forEach(animation => animation.cancel());
    tabs.current.forEach(tab => tab?.querySelector(".node-symbol")?.getAnimations().forEach(animation => animation.cancel()));
    const entrance = panel.current?.animate([{ opacity: .5, transform: "translateY(7px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: SELECTION_DURATION_MS, easing: "ease-out" });
    const settle = symbol?.animate([{ transform: "translateX(-4px)" }, { transform: "translateX(0)" }], { duration: SELECTION_DURATION_MS, easing: "ease-out" });
    return () => { entrance?.cancel(); settle?.cancel(); };
  }, [selected]);
  return <section className="framework" id="framework" aria-labelledby="framework-title" data-realm-stop data-shield-position="full"><div className="section-inner framework-workspace">
    <div className="section-intro">
      <h2 id="framework-title">The runtime.</h2>
      <p>Start with an Agent. Add a Controller for plugins and Sessions for conversations. Select a node to see its role and code.</p>
    </div>
    <div className="runtime-volume">
      <div className="flow-tabs" role="tablist" aria-orientation={orientation} aria-label="Explore Tessar building blocks">
        {nodes.map((node, index) => <Fragment key={node.id}>
          {index > 0 && <span key={selected} className="connector" aria-hidden="true"><Arrow /></span>}
          <button ref={element => { tabs.current[index] = element; }} type="button" role="tab" id={`tab-${node.id}`} aria-controls="flow-panel" aria-selected={selected === node.id} tabIndex={selected === node.id ? 0 : -1} onClick={() => setSelected(node.id)} onKeyDown={event => {
            let next: number;
            if (["ArrowRight", "ArrowDown"].includes(event.key))
              next = (index + 1) % nodes.length;
            else if (["ArrowLeft", "ArrowUp"].includes(event.key))
              next = (index - 1 + nodes.length) % nodes.length;
            else if (event.key === "Home")
              next = 0;
            else if (event.key === "End")
              next = nodes.length - 1;
            else
              return;
            event.preventDefault();
            setSelected(nodes[next].id);
            tabs.current[next]?.focus();
          }}>
            <span className="node-symbol" aria-hidden="true" />
            <strong>{node.title}</strong>
            <small>{node.hint}</small>
          </button>
        </Fragment>)}
      </div>
      <div ref={panel} className="flow-panel" id="flow-panel" role="tabpanel" aria-labelledby={`tab-${selected}`} tabIndex={0}>
        <div className="flow-explanation" tabIndex={0} aria-label="Building block explanation and prerequisites">
          <h3 id="flow-title">{example.title}</h3>
          <p id="flow-description">{example.description}</p>
          <a className="text-link" href={example.link}>
            <span>{example.label}</span>
          </a>
          <p className="example-note">{example.note}</p>
        </div>
        <div className="code-pane">
          <div className="code-header">
            <span id="flow-filename">{example.file}</span>
            <CopyButton key={selected} targetId="flow-code" ariaLabel="Copy current code example" />
          </div>
          <pre tabIndex={0} aria-label={`${example.file} code example`}>
            <code id="flow-code">
              <Highlight code={example.code} />
            </code>
          </pre>
          <div className="code-footer">
            <span>TypeScript</span>
            <span>Example · SDK calls in your application</span>
          </div>
        </div>
      </div>
    </div>
  </div></section>;
}
