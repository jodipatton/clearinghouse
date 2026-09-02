import type { L10State } from "./types.js";

/**
 * Starting content for the L10 Implementation Review, ported from the
 * L10 Implementation Cockpit artifact (Aug 2026 snapshot). Used only the
 * first time L10Store reads a state file that doesn't exist yet -- after
 * that, the persisted file is the source of truth and this seed is never
 * consulted again. accountName links a row to a tracked account (see
 * routines/l10.ts) for live Reporting refresh and Planhat company
 * resolution; left null for rows that aren't about one specific account.
 */
export const L10_PARTICIPANTS = ["Geetika", "Jess", "Maria", "Ryan"] as const;

export function seedL10State(): L10State {
  return {
    facilitator: "",
    metrics: [
      { id: "m1", name: "Q4 implementations on a credible 1/1/27 compliance path", meta: "Flagships (Empower, Vaya, Oscar) all carry open blockers", owner: "Jodi / Maria", status: "off", accountName: null },
      { id: "m2", name: "SOWs signed vs. drafting / in legal", meta: "Vaya redlines open · Empower drafting · JHHP SDT in legal review", owner: "Nolan / Jodi", status: "off", accountName: null },
      { id: "m3", name: "Overdue Contracting @90% (close date slipped to 7/31)", meta: "Wipro upsell, Priority Health GHC, JHHP, Hamaspik PBM", owner: "Jodi", status: "off", accountName: null },
      { id: "m4", name: "ePA product capacity vs. implementation demand", meta: "PMs absorbed 25+ implementation calls last month (staff mtg 8/18)", owner: "Jeremy / Kyle", status: "off", accountName: null },
      { id: "m5", name: "Core Data production launch gate", meta: "ER false-merge (DNA-2185) + batch-id data-loss (DNA-2240) open", owner: "Core Data", status: "off", accountName: null },
      { id: "m6", name: "BCBSA Hub productionization (Nov target, 3 customers)", meta: "CDS Hooks scope exceeds year-end capacity", owner: "Kyle / Core API", status: "off", accountName: null },
      { id: "m7", name: "On-time deployment train streak", meta: "26.08 shipped on time — 100% since January", owner: "Core UI", status: "ok", accountName: null },
      { id: "m8", name: "MPF go-lives", meta: "MCS + THP live; AHF prod load complete 8/17", owner: "Maria", status: "ok", accountName: null },
    ],
    rocks: [
      { id: "r1", name: "Empower Provider Access + ePA — SOW signed & go-live queued for ~1/1/27", meta: "Oct start target; Empower less optimistic on 1/1", owner: "Jodi", status: "off", accountName: "Empower" },
      { id: "r2", name: "Vaya Partners — SOW signed, migration plan, live by 1/1/27", meta: "Merger effective 10/1; redlines gating", owner: "Jodi / Nolan", status: "off", accountName: "Vaya Health" },
      { id: "r3", name: "Oscar renewal closed + gateway vs. data-hosted decision locked", meta: "Renewal contract issued ($592K, 12/2)", owner: "Jodi", status: "off", accountName: "Oscar" },
      { id: "r4", name: "ePA 1/1/27 compliance baseline (limited CRD/DTR/PAS) delivered", meta: "H2 roadmap repositioned to compliance-first", owner: "Jeremy", status: "ok", accountName: null },
      { id: "r5", name: "Project Prism — 43-account portfolio segmented & on compliance path", meta: "Analytics buckets + AlphaSights VoC validation", owner: "Jodi", status: "ok", accountName: null },
    ],
    issues: [
      { id: "i1", title: "Vaya Partners SOW redlines outstanding — blocking migration & attribution work", raised: "Jodi", area: "Contracts / Delivery", tier: "P1", xfn: true, note: "Merger effective 10/1; attribution-file work paused pending SOW. Partners historical-data migration scope undefined; ePA not started. Racing 1/1/27.", root: "", solutions: "", solved: false, struck: false, accountName: "Vaya Health" },
      { id: "i2", title: "ePA implementation capacity strain — PMs absorbing 25+ calls/mo", raised: "Jeremy", area: "Product / Delivery", tier: "P1", xfn: true, note: "H2 roadmap descoped to 'limited' CRD/DTR/PAS. Systemic — affects every ePA go-live. Need a scalable implementation / triage model.", root: "", solutions: "", solved: false, struck: false, accountName: null },
      { id: "i3", title: "Core Data production-launch blockers gating multiple go-lives", raised: "Core Data", area: "Engineering", tier: "P1", xfn: true, note: "ER household false-merges (DNA-2185); silent data-loss on batch-id collision (DNA-2240, unassigned). These hold the production launch gate.", root: "", solutions: "", solved: false, struck: false, accountName: null },
      { id: "i4", title: "Empower dependencies threaten ~1/1/27 go-live", raised: "Jodi", area: "Delivery / Product", tier: "P2", xfn: true, note: "InfoMC (prior-auth vendor) API delay; member portal OAuth/OIDC support; legacy RX not in NCPDP; SFTP connectivity; data-scope undefined. SOW still drafting for Oct start.", root: "", solutions: "", solved: false, struck: false, accountName: "Empower" },
      { id: "i5", title: "Oscar gateway-vs-data-hosted decision + compliance timing risk", raised: "Jodi", area: "Product / Growth", tier: "P2", xfn: true, note: "Gateway model cutting close to 1/1 compliance. Build-vs-buy tension (Walter Huang). Pricing clarity needed between models. P2P/Provider Access delivery model unresolved.", root: "", solutions: "", solved: false, struck: false, accountName: "Oscar" },
      { id: "i6", title: "BCBSA Hub productionization by Nov — CDS Hooks scope over capacity", raised: "Kyle", area: "Core API / Product", tier: "P2", xfn: true, note: "3 customers (BCBST, Capital BlueCross, Capital Health Plan). Open forks: sender routing, per-plan config, request-body handling. Being surfaced to the Association.", root: "", solutions: "", solved: false, struck: false, accountName: null },
      { id: "i7", title: "Custom-development intake has no guardrails — late asks jeopardize 1/1 go-lives", raised: "Maria", area: "Delivery / Product", tier: "P2", xfn: true, note: "Unplanned customer custom builds (e.g., BCBST) can't start until Q4 → slip to Jan/Feb go-live. Need scoping/slotting policy for late requests.", root: "", solutions: "", solved: false, struck: false, accountName: null },
      { id: "i8", title: "Capital BlueCross member-facing materials ask derailed timeline", raised: "Maria", area: "Delivery", tier: "P3", xfn: true, note: "Go-live 10/15; open-enrollment collateral is a new ask. Hub testing with BCBSA still open. Compliance officer backing urgency.", root: "", solutions: "", solved: false, struck: false, accountName: "Capital Blue Cross" },
      { id: "i9", title: "JHHP env migration due 12/31 (legal) — no recent dev check-in", raised: "Maria", area: "Delivery / Legal", tier: "P3", xfn: true, note: "Data can't remain duplicated across systems long-term. SDT SOW in legal review; end-to-end target before Thanksgiving.", root: "", solutions: "", solved: false, struck: false, accountName: "Johns Hopkins HealthCare" },
      { id: "i10", title: "Jai Medical go-live blocked until data schemas defined", raised: "Anissa", area: "Delivery / Core Data", tier: "P3", xfn: true, note: "Core-Data can't estimate build until schemas confirmed. Data-inventory vs SOW Exhibit A cross-check underway.", root: "", solutions: "", solved: false, struck: false, accountName: "Jai Medical Center" },
      { id: "i11", title: "Wiz secret-scan findings blocking infra PRs across environments", raised: "Infra", area: "Infra", tier: "P3", xfn: true, note: "64 high-severity findings (INFRA-3119) blocking merges QA→Prod. Delivery-velocity risk.", root: "", solutions: "", solved: false, struck: false, accountName: null },
      { id: "i12", title: "FHIR bulk-export OOM risk on Binary resources as volume grows", raised: "Kyle", area: "Core API", tier: "P3", xfn: false, note: "Fallon UAT: ~9.6K resources = 639MB. Watch-item; export chunking by size not yet supported.", root: "", solutions: "", solved: false, struck: false, accountName: "Fallon Community Health Plan" },
    ],
    todos: [
      { id: "t1", text: "Get Vaya SOW in place; greenlight attribution-file work", owner: "Jodi", done: false, isNew: false, accountName: "Vaya Health" },
      { id: "t2", text: "Chase JHHP env-migration status with product dev team", owner: "Maria", done: false, isNew: false, accountName: "Johns Hopkins HealthCare" },
      { id: "t3", text: "Surface BCBSA CDS Hooks capacity gap to the Association", owner: "Jeremy / Kyle", done: true, isNew: false, accountName: null },
      { id: "t4", text: "Assign owner for DNA-2240 (batch-id data-loss blocker)", owner: "Core Data", done: false, isNew: false, accountName: null },
      { id: "t5", text: "Decision due end of Aug: is a 1up-hosted DTR questionnaire needed?", owner: "Jeremy", done: false, isNew: false, accountName: null },
      { id: "t6", text: "Schedule Jai schema working session after Exhibit A cross-check", owner: "Anissa", done: false, isNew: false, accountName: "Jai Medical Center" },
    ],
    segue: Object.fromEntries(L10_PARTICIPANTS.map((p) => [p, { personal: "", professional: "" }])),
    scores: {},
    updatedAt: new Date(0).toISOString(),
  };
}
