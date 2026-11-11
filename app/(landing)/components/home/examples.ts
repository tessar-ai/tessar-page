// Display-only examples, checked against C:/workspace/tessar/examples/guide/.
import { GUIDE_URL } from "../../../components/site/links";
export const examples = {
  "agent": {
    "title": "Run the model and tool loop.",
    "description": "The Agent executes with its configured model, instructions and tools. Run it directly, or use it through a Controller's Sessions.",
    "file": "agent.ts",
    "note": "This example uses the optional @tessar/openai adapter. Install a provider when you choose one.",
    "link": `${GUIDE_URL}/agent.md`,
    "label": "Read the Agent guide",
    "code": "import { Agent } from \"@tessar/core\";\nimport { OpenAIChat } from \"@tessar/openai\";\n\nexport const agent = new Agent({\n  id: \"assistant\",\n  model: new OpenAIChat({\n    apiKey: process.env.OPENAI_API_KEY!,\n    model: process.env.OPENAI_MODEL!,\n  }),\n  instructions: \"Be concise and helpful.\",\n});\n\nconst result = await agent.generate(\"Hello, Tessar.\");\nconsole.log(result.output);"
  },
  "controller": {
    "title": "Own the runtime and its plugins.",
    "description": "A Controller owns an Agent, manages plugin and shared-service lifecycle, and creates Sessions for conversations.",
    "file": "controller.ts",
    "note": "Continues agent.ts. EnvironmentContextPlugin is a local plugin class from the repository examples, not a built-in core export.",
    "link": `${GUIDE_URL}/plugins.md`,
    "label": "Read the plugin guide",
    "code": "import { Controller } from \"@tessar/core\";\nimport { agent } from \"./agent.js\";\nimport { EnvironmentContextPlugin } from\n  \"./plugins/environment-context.js\";\n\nconst controller = new Controller({\n  id: \"my-app\",\n  agent,\n  plugins: [new EnvironmentContextPlugin()],\n});\n\ntry {\n  await controller.initialize();\n  const result = await agent.generate(\"What time is it?\");\n  console.log(result.output);\n} finally {\n  await controller.dispose();\n}"
  },
  "session": {
    "title": "Carry the conversation.",
    "description": "A Session selects a Thread, queues follow-ups and uses its Controller's Agent to execute them. Subscribe to state as the conversation progresses.",
    "file": "conversation.ts",
    "note": "Requires a live, initialized Controller. Awaiting followUp confirms queued input, not the final response. Subscribe for updates; unsubscribe and dispose during your application's cleanup.",
    "link": `${GUIDE_URL}/sessions.md`,
    "label": "Read the Session guide",
    "code": "import { stateChanged } from \"@tessar/core\";\n\n// Your Controller is initialized and still running.\nconst session = await controller.createSession({\n  threadId: \"first-conversation\",\n});\n\nconst unsubscribe = session.subscribe(\n  stateChanged,\n  event => console.log(event.payload.state),\n);\n\nawait session.followUp(\"Hello, Tessar.\");\n// Queue more input in your application's flow.\nawait session.followUp(\"Let's keep going.\");\n\n// Call unsubscribe() when your UI detaches.\n// Dispose the Controller when your app shuts down."
  }
};
export type BuildingBlock = keyof typeof examples;
