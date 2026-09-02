import { readFileSync, writeFileSync } from "node:fs";
import type { L10State } from "./types.js";
import { seedL10State } from "./seed.js";

/**
 * Meeting-in-progress state (issues, to-dos, scores, facilitator, segue) for
 * the L10 tab -- a plain JSON file, same "small team tool, no new infra"
 * shape as roster.json, but read-write instead of roster.ts's read-only
 * cached pattern. Single file, synchronous I/O: this is a handful of people
 * editing during one meeting at a time, not a system that needs to survive
 * concurrent writers.
 */
export class L10Store {
  constructor(private readonly path: string) {}

  read(): L10State {
    try {
      return JSON.parse(readFileSync(this.path, "utf8")) as L10State;
    } catch {
      return seedL10State();
    }
  }

  private write(state: L10State): L10State {
    writeFileSync(this.path, JSON.stringify(state, null, 2));
    return state;
  }

  /** Shallow-merges `patch` onto the current state and persists the result -- mirrors the original artifact's own saveShared(patch) shape. */
  patch(patch: Partial<L10State>): L10State {
    const next: L10State = { ...this.read(), ...patch, updatedAt: new Date().toISOString() };
    return this.write(next);
  }
}
