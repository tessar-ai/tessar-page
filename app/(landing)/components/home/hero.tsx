import Image from "next/image";
import CopyButton from "../../../components/site/copy-button";
import { GET_STARTED_URL } from "../../../components/site/links";
import { pluginRunes, PluginRuneIcon } from "./plugin-runes";

export default function Hero() {
  return <section className="hero" data-enter aria-labelledby="hero-title"><div className="hero-layout">
    <div className="hero-atmosphere">
      <Image src="/bg.png" alt="" fill priority sizes="100vw" />
      <div className="rune-field">
        {pluginRunes.map((rune, index) => <a className={`plugin-rune rune-${["one", "two", "three", "four"][index]}`} href={`#hook-${rune.id}`} aria-label={`Explore ${rune.label.toLowerCase()} hooks`} key={rune.id}>
          <PluginRuneIcon rune={rune} /><span>{rune.label}</span>
        </a>)}
      </div>
    </div>
    <div className="hero-copy">
      <h1 id="hero-title"><span>Anything</span>{" "}<span>can be plugin</span></h1>
      <p className="hero-intro">The lightweight open-source toolkit for building production agents. Extend the core with the capabilities you choose.</p>
      <div className="hero-actions">
        <a className="button button-primary" href={GET_STARTED_URL}>Read the guide</a>
        <div className="install"><code id="install-command">npm install @tessar/core</code><CopyButton targetId="install-command" ariaLabel="Copy npm install command" /></div>
      </div>
      <p className="hero-fact"><span />Node.js 24.22.1 or newer <i /> TypeScript + ES modules</p>
    </div>
  </div></section>;
}
