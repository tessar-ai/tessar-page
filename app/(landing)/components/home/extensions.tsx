"use client";

import { PLUGIN_API_URL } from "../../../components/site/links";
import CopyButton from "../../../components/site/copy-button";
import { useActiveRealmRune } from "./realm-journey";

const hookKinds = [
  {
    id: "notification", title: "Notification", hint: "Observe what happened.",
    description: "Track model usage, log tool results or watch runtime events. A notification handler's return value does not control execution.",
    event: "model.end", file: "observe-plugin.ts",
    code: `import {
  model, type Plugin, type PluginContext,
} from "@tessar/core";

export class ObservePlugin implements Plugin {
  readonly id = "observe";

  setup(tessar: PluginContext): void {
    tessar.hook(model.end, event => {
      console.log(event.payload.response.usage);
    });
  }
}`,
    note: "Observe the result. Observer errors are reported as diagnostics.",
  },
  {
    id: "transformation", title: "Transformation", hint: "Shape the next step.",
    description: "Extend model instructions, prepare tool arguments or adjust a provider request. Return a replacement payload; each handler receives the previous result.",
    event: "context.prepare", file: "context-plugin.ts",
    code: `import {
  buildInstruction, context,
  type Plugin, type PluginContext,
} from "@tessar/core";

export class ContextPlugin implements Plugin {
  readonly id = "app-context";

  setup(tessar: PluginContext): void {
    tessar.hook(context.prepare, event => ({
      ...event.payload,
      instructions: buildInstruction([
        ...event.payload.instructions.sections,
        { id: "app:instructions", order: 1000,
          content: "You are the Tessar assistant." },
      ]),
    }));
  }
}`,
    note: "This extends prepared instructions. Stored conversation history stays as it was.",
  },
  {
    id: "decision", title: "Decision", hint: "Apply your policy.",
    description: "Check a tool call before it runs. Return a decision supported by that event's boundary, such as denying a destructive action.",
    event: "tool.before", file: "policy-plugin.ts",
    code: `import {
  tool, type Plugin, type PluginContext,
} from "@tessar/core";

export class PolicyPlugin implements Plugin {
  readonly id = "policy";

  setup(tessar: PluginContext): void {
    tessar.hook(tool.before, event => {
      if (event.payload.tool.name === "delete_file") {
        return { decision: "deny",
          reason: "Deletion disabled" };
      }
    });
  }
}`,
    note: "Allowed decisions depend on the event. This example denies execution of delete_file.",
  },
  {
    id: "barrier", title: "Barrier", hint: "Wait before moving on.",
    description: "Let shutdown wait for pending work to finish, such as flushing traces. The caller waits for the handler's promise.",
    event: "shutdown", file: "flush-plugin.ts",
    code: `import {
  shutdown, type Plugin, type PluginContext,
} from "@tessar/core";
import { flushTraces } from "./telemetry.js";

export class FlushPlugin implements Plugin {
  readonly id = "flush-traces";

  setup(tessar: PluginContext): void {
    tessar.hook(shutdown, async () => {
      await flushTraces();
    });
  }
}`,
    note: "flushTraces is your application's function. Release plugin resources with tessar.defer() or a disposer returned from setup().",
  },
] as const;

function HookExample({ example, codeId }: { example: (typeof hookKinds)[number]; codeId: string }) {
  return <div className="plugin-example">
    <div className="code-header"><span aria-live="polite">{example.file}</span><CopyButton key={example.file} targetId={codeId} ariaLabel={`Copy ${example.file}`} /></div>
    <pre key={example.file} tabIndex={0} aria-label={`${example.file} code example`}><code id={codeId}>{example.code}</code></pre>
    <p className="plugin-note">{example.note}</p>
  </div>;
}

export default function Extensions() {
  const activeRune = useActiveRealmRune();
  const active = hookKinds.find(item => item.id === activeRune) ?? hookKinds[0];
  return <section className="extensions" id="extensions" aria-labelledby="extensions-title" data-realm-stop data-shield-position="half">
    <div className="section-inner">
      <div className="realm-intro">
        <h2 id="extensions-title">A world of<br />possibilities.</h2>
        <p>Four kinds of hook let your plugins observe events, transform data, make decisions and wait for work to finish.</p>
      </div>
      <div className="realm-layout">
        <div className="realm-chapters">
          {hookKinds.map((item, index) => <article className="realm-chapter" id={`hook-${item.id}`} data-realm-stop data-shield-position="half" data-rune={item.id} key={item.id}>
            <span className="chapter-index" aria-hidden="true">0{index + 1}</span>
            <div>
              <h3>{item.title}</h3>
              <p className="chapter-hint">{item.hint}</p>
              <p className="chapter-description">{item.description}</p>
              <code className="chapter-api">{item.event}</code>
              <a className="text-link" href={PLUGIN_API_URL}>Read the hook contracts</a>
              <div className="chapter-example"><HookExample example={item} codeId={`hook-code-${item.id}`} /></div>
            </div>
          </article>)}
        </div>
        <div className="realm-code"><HookExample example={active} codeId="hook-code" /></div>
      </div>
    </div>
  </section>;
}
