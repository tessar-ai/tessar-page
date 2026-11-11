export const pluginRunes = [
  { id: "notification", label: "Notification", path: "M12 48V6m0 8 18 12-18 8", position: "east", turn: 0 },
  { id: "transformation", label: "Transformation", path: "M12 48V6m0 2 18 12M12 22l18 12", position: "north", turn: 90 },
  { id: "decision", label: "Decision", path: "M20 48V6m0 19L6 10m14 15 14-15", position: "west", turn: 180 },
  { id: "barrier", label: "Barrier", path: "M10 48V6l20 12-20 12m0 0 20 18", position: "south", turn: 270 },
] as const;

export function PluginRuneIcon({ rune }: { rune: (typeof pluginRunes)[number] }) {
  return <svg viewBox="0 0 40 54" aria-hidden="true"><path d={rune.path} /></svg>;
}
