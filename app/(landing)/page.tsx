import SiteHeader from "../components/site/site-header";
import Hero from "./components/home/hero";
import FrameworkFlow from "./components/home/framework-flow";
import Extensions from "./components/home/extensions";
import RealmJourney from "./components/home/realm-journey";
import { GET_STARTED_URL, SOURCE_URL } from "../components/site/links";

export default function Home() {
  return <>
    <a className="skip" href="#main">Skip to content</a>
    <SiteHeader />
    <main id="main">
      <Hero />
      <RealmJourney>
        <FrameworkFlow />
        <Extensions />
      </RealmJourney>
    </main>
    <footer className="closing" aria-labelledby="start-title">
      <div className="section-inner">
        <div className="closing-invitation">
          <h2 id="start-title">Build your<br />first agent.</h2>
          <div><p className="closing-intro">Start with the core. Choose a provider and make the runtime your own.</p><a className="button button-primary" href={GET_STARTED_URL}>Read the guide</a></div>
        </div>
        <div className="closing-signature" aria-label="Tessar">tessar</div>
        <div className="site-footer">
          <small>Apache-2.0. Early 0.x SDK; APIs may change.</small>
          <nav aria-label="Footer navigation">
            <a href={GET_STARTED_URL}>Docs</a>
            <a href={SOURCE_URL}>GitHub</a>
            <a href={`${SOURCE_URL}/blob/release/LICENSE`}>License</a>
          </nav>
        </div>
      </div>
    </footer>
  </>;
}
