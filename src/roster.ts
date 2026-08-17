import { readFileSync, statSync } from "node:fs";

/**
 * Gate 06 — the roster is the entire authorization model, so it is a
 * Git-backed file synced by CI, never a database the running service can
 * write. Deny by default: a missing or malformed roster authorizes no one.
 * The file's mtime is checked on each lookup so a CI sync lands without a
 * restart, and reads are cached between changes.
 */
interface RosterFile {
  members: { email: string; name?: string }[];
}

export class Roster {
  private emails = new Set<string>();
  private members: { email: string; name?: string }[] = [];
  private mtimeMs = -1;

  constructor(private readonly path: string) {}

  private refresh(): void {
    let mtimeMs: number;
    try {
      mtimeMs = statSync(this.path).mtimeMs;
    } catch {
      this.emails = new Set();
      this.members = [];
      this.mtimeMs = -1;
      return;
    }
    if (mtimeMs === this.mtimeMs) return;
    try {
      const raw = JSON.parse(readFileSync(this.path, "utf8")) as RosterFile;
      this.members = raw.members ?? [];
      this.emails = new Set(
        this.members.map((m) => m.email.trim().toLowerCase()),
      );
      this.mtimeMs = mtimeMs;
    } catch {
      this.emails = new Set();
      this.members = [];
      this.mtimeMs = -1;
    }
  }

  isAuthorized(email: string | undefined): boolean {
    if (!email) return false;
    this.refresh();
    return this.emails.has(email.trim().toLowerCase());
  }

  /** Read-only view for the local dashboard's admin tab — never a write path. */
  listMembers(): { email: string; name?: string }[] {
    this.refresh();
    return [...this.members];
  }
}
