/**
 * Ported verbatim from the "1upHealth Customer Intelligence — CMS-0057
 * Portfolio" artifact's embedded research dataset (43 accounts + the Gong
 * "Analytics Fit" study). Static, point-in-time due diligence -- see
 * PortfolioData in ./types.ts and sfSummary.pulled for when the embedded
 * Salesforce snapshot was taken. Not regenerated from the live/mock
 * Salesforce/Planhat/Gong adapters this server otherwise uses.
 */
import type { PortfolioData } from "./types.js";

export const PORTFOLIO_DATA: PortfolioData = {
  "profiles": [
    {
      "id": 0,
      "name": "Fallon Community Health Plan",
      "quarter": "live",
      "qlabel": "Live / Pre-Q1",
      "seg": "commercial",
      "seglabel": "Commercial / Blues",
      "note": "Flagship · first paid Clinical Connect",
      "full": "Fallon Community Health Plan (Fallon Health, MA-based payer)",
      "dq": "rich",
      "products_and_scope": "Original deal [#arr-services-new-bookings 2021-12-30]: CMS-9115 Patient Access + P2P compliance, 170k lives, $302,400 ARR + $100k implementation (Change Healthcare client steal). 2022-12-15 upsell: Clinical Connectivity + SQL on FHIR, $439,000 (+144%), connecting to ACO partners. Dec 2025: 2-yr renewal, 3% CPI/yr, $36,165 ARR upsell. CMS-0057: Provider Access SOW signed 2025-09-09; PDex Prior Auth EOB data workstream (v2 file format, extracting historical + ongoing PA EOBs from 5 UM vendors) [#account-fallon 2026-05-11]; P2P (formal kickoff end of July 2026); Commercial LOB addition + MPF Remediation SOWs signed June 2026, $28k services (commercial members get no auth app - repository storage only) [Confluence: Fallon Addition of Commercial LOB]. Clinical Connect: FIRST paid Clinical Connect contract company-wide - 1 yr, 6 connection sites, 25,000 member roster, $55,200 ARR (~2026-05-18); one of 5 DPP pilots (Fallon, CHP, Yamhill, Viva, Zing) [#general 2026-06-12]. Also: SQL on FHIR (Redshift/Alteryx/DBeaver for Fallon EDW team), Siftwell analytics vendor exporting Fallon data from 1up platform, and MHDC Quality Measures monthly provider-EMR extract deliverable (PRD dated 7/7/26; zipped pipe-delimited files, monthly SFTP to edi.fallonhealth.org) [Confluence: MHDC for Fallon].",
      "implementation_status": "Live/earliest cohort (matches roster: listed ahead of Q1). Patient Access + P2P (9115) live since ~2022; ~40M claims on platform. Provider Access: LIVE in Production with customer sign-off 2026-06-04 [#account-fallon-implementation-0057-pa]; daily attribution + opt-out files flowing (opt-out files empty until Fallon privacy-officer process generates data). Project had two holds: Oct 2025 (all 0057 paused until 11/6 pending a new Fallon hire) and Mar 17 - Apr 10 2026 (Fallon deprioritized for internal data-quality work). Clinical Connect pilot: internal+customer kickoff 6/9/2026; pre-prod/UAT environment fully configured and lab files ingested into UAT client ID as of 7/7/2026 [Chad Clough, #account-fallon]; Member Directory + Member Profiles went live in production for Fallon (first and only customer) 7/7/2026 [#shout-outs, #team-cx-public]. PDex Prior Auth: v2 extract guides sent, Fallon + external vendor teams building test files, no file-delivery ETA. P2P: not started; mini kickoff planned, formal kickoff end of July 2026. MPF: SOW signed, work begins end of July 2026. Commercial LOB: in progress, Fallon testing internally, test files expected late June 2026. Jan-Feb 2026 EOB Data Quality RedZone: full reingestion of EOBs completed and validated with Lucas.",
      "tech_architecture": "Payer core: QNXT (claims adjudication); UM on Casenet/Zyter TruCare + ProAuth web portal for provider PA intake; Change Healthcare InterQual for 278 batch PA transactions; fax intake still heavy; PA rules engine fed from claims tables, updated monthly [Confluence: 1up/Fallon PA Discovery Call 7/25, Compliance space]. 5 UM vendors hold PA EOB data. ePA call notes also flag UM vendor Zyter TruCare and possible MIRTH use. ACO/provider landscape: Atrius (Epic, ~41k Medicaid), Reliant (~27k), Berkshire (multiple EMRs), CHAN (athenaOne, 15 FQHCs), SoNE [Confluence: Fallon Population Connect]. ADT from an external vendor; provider clinical data arrives in MHDC (MA-specific) format, proprietary flats, CCDA. 1up side: AWS slug 1up-fallonhealth-prod; SFTP bucket 1up-fallonhealth-prod-data-ingest; moved from universal ingest to NBI/standard ingest Dec 2025; FHIR API at api.fallonhealthfhir.com; only STE customer accessing FHIR API through the Gateway [#team-core-api-public 2026-07-08]; protected partition (comm) in prod [Confluence: Fallon Configuration, DNA space]; SQL on FHIR via Redshift + Alteryx; 1up Console with SAML/AD IdP + LaunchDarkly-gated Provider Access screens; temporary fallon-mte tenant created 7/7/26 for member directory (STE+MTE dual access) [Confluence: COREUI page]. Actual membership ~395,992 active members vs 170k contracted (Jan 2025 true-up thread).",
      "financial_signals": "2021-12-30: $302,400 ARR + $100k implementation (new, 170k lives). 2022-12-15: $439,000 Clinical Connectivity + SQL on FHIR upsell (+144%). 2025-12-05: 2-yr renewal w/ 3% CPI/yr, $36,165 ARR upsell. 2026-05-18: Clinical Connect $55,200 ARR (1 yr, 6 sites, 25k roster; first paid CC contract). 2026-06-11: $28,000 services - New LOB (Community Care) + MPF Remediation. Provider Access SOW signed 2025-09-09 (amount not stated). Pending: estimate in progress for Fallon prior auth API work, possibly a separate SOW (Hina Kharbey DM to Jodi, 2026-07-08). Feb 2025 capacity flag: 395,992 active members vs contracted count - over capacity, contract implications unresolved in thread.",
      "key_people": "Fallon: Alicia Ernst (Director IT Service Delivery - primary PM), Lucas Vatano (Technical SME - main technical contact/file developer), Irma Murillo (Sr Dir Information Management), Michelle Fontaine (PM), Nancy Shores (Principal Information Mgmt Analyst - SQL on FHIR/EDW), Harini (membership analyst), John Budaj (VP Enterprise Technology; contract reportedly ended Oct 2025), Tony (new business owner, per Nov 2025 strategy meeting), Jen Bauer (Dir IT Architecture), Angela (exec driving clinical-data-from-providers goal), Emily West (COO), Stacy Coggeshal (VP Risk Adjustment). 1upHealth: Geetika Arora (CSM), Stacy Harris (Sr Implementation Manager, 0057/Provider Access), Maria Baker (Sr Dir Professional Services), Robert Davis + Chad Clough (data engineering), Anissa Nashikkar (IM, covering), Elizabeth McGowan (Product - Provider Access), Daniel Couch (eng), Alice Hwang (Product - Clinical Connect/MHDC), Alisa Haman (Product - Console), Jodi Patton (commercial/Clinical Connect DPP conversion owner), Nolan Kelly (exec relationship).",
      "risks_and_blockers": "1) Long data-quality history: 2024 DIMA mapping issues (patient active flag, Provider Directory duplicates), Jan-Feb 2026 EOB RedZone requiring full ~40M-claim reingestion; Alicia repeatedly demands validation/ingestion reporting and production data visibility - trust is conditional. 2) Fallon resourcing: essentially one file developer (Lucas); repeated test-file delays (sick leave, competing priorities); entire 0057 program paused Oct 2025 pending a hire. 3) P2P barely started with 1/1/2027 deadline: questionnaire returned 5/19/26 with very lightweight responses; kickoff not until end of July 2026; PA EOB (PDex) has no file-delivery ETA and pharmacy-vendor spec questions open. 4) ePA scope undefined: 1up still estimating prior auth API work and whether it needs a separate SOW and pre-1/1/27 delivery (7/8/26 DM). 5) Over-capacity membership (395,992 actual vs 170k contracted) never fully resolved contractually. 6) Relationship depth: Jodi noted 9/16/25 that deeper contacts are needed; John Budaj (exec sponsor) contract ended Oct 2025. 7) Expectation gaps: Fallon expects console SQL/analytics query capability that is still roadmap (Trino discussion 7/1/26); historic struggle to operationalize SQL on FHIR.",
      "points_of_interest": "Fallon is 1upHealth's flagship: first paid Clinical Connect contract, first (and currently only) customer with Member Directory + Member Profiles live in production (7/7/26 heroic-release shout-out), and CEO update names Fallon as the proof point for the whole gemstone-to-product motion. Fallon proposed that 1up facilitate P2P testing across its multi-payer client base (MAHP working session, 6/5/26) - a productizable idea. Siftwell (analytics vendor) builds on Fallon data hosted by 1up; commercial data for Siftwell is a defined workstream. Clinical Connect thesis for Fallon is reducing manual chart chasing for risk adjustment/HEDIS (Jodi pilot scorecard poll 6/23/26); Angela wants clinical data from all providers by 2027. Fallon needs MassHealth RFP attestation paperwork from 1up periodically. MHDC extract makes 1up a distributor of provider EMR data INTO Fallon's EDW - a new integration direction.",
      "expansion_plays": [
        {
          "play": "ePA / Prior Auth API suite (CRD/DTR/PAS) add-on",
          "rationale": "ePA discovery done back in 2023 (TruCare ProAuth + InterQual + fax pain points documented); Compliance notes list Fallon as CRD/DTR/PAS=Yes with UM vendor Zyter TruCare; PA EOB extraction from 5 UM vendors already underway; 1up is actively estimating the Fallon prior auth API work right now (7/8/26) - convert that estimate into a signed ePA SOW before the 1/1/2027 compliance date.",
          "fit": "high"
        },
        {
          "play": "Clinical Connect scale-out + analytics/HDE on the clinical data",
          "rationale": "Pilot is 6 sites/25k members but Angela wants clinical data from all providers by 2027 and the ACO map (Atrius, Reliant, Berkshire, CHAN, SoNE) gives a ready roster; Fallon explicitly asked for care-gap queryability, predictive modeling, and exec reporting on Clinical Connect data (Gong call, #product 7/1/26) and for SQL-style access - package expansion sites plus a quality/risk analytics layer (HEDIS, risk adjustment chart-chase replacement) on data already flowing.",
          "fit": "high"
        },
        {
          "play": "Commercial LOB full-suite extension + managed services (auth app, 1up-managed opt-out, P2P testing facilitation)",
          "rationale": "Commercial LOB currently lands data with no member auth app - extend to full Patient Access/0057 coverage for that LOB; Fallon said it may explore 1up-managed opt-out if volume grows (6/5/26 update); Fallon itself proposed 1up-facilitated cross-payer P2P testing (MAHP), which could be sold as a service to Fallon and other MA plans.",
          "fit": "medium"
        }
      ],
      "plays_hi": 2,
      "sources": [
        "Slack #account-fallon (C02SG58BLPQ), full history read 2024-01 through 2026-07-07",
        "Slack #account-fallon-implementation-0057-pa (C09BQ2HCRSS), full history read 2025-12 through 2026-06-23",
        "Slack #shout-outs 2026-07-07 (Member Directory/Profiles live for Fallon)",
        "Slack #team-cx-public 2026-07-07 and #team-core-api-public 2026-07-08 (Gateway/MTE-STE tenant)",
        "Slack #general 2026-06-12 and 2026-06-30 Mission Minutes; #people_leaders 2026-06-12 CEO update",
        "Slack #product 2026-07-01 (Trino/SQL query interest for Fallon Clinical Connect data)",
        "Slack DM Hina Kharbey to Jodi Patton 2026-07-08 (prior auth API estimate/SOW)",
        "Confluence: 1up / Fallon PA Discovery Call - 7/25 (Compliance space, page 153976841)",
        "Confluence: Fallon Population Connect (CCT space, page 243073090)",
        "Confluence: MHDC for Fallon (PD space, page 2421260312, updated 2026-07-07)",
        "Confluence: 1up <> Fallon 11/13/2025 (PD space, page 1728839873)",
        "Confluence: Fallon Configuration (DNA space, 1793884162); Fallon: Addition of Commercial LOB (CKB, 2214985747); Provider Access meeting-minutes series (CKB); Fallon EOB Data Quality RedZone (CKB, 1928429570)",
        "Cross-account recon extracts provided by orchestrator: #arr-services-new-bookings (2021-12-30, 2022-12-15, 2025-12-05, 2026-05-18, 2026-06-11), #sows-inflight 2025-09-09, #2026-0057-access-api--readiness (2026-02-05, 2026-05-19, 2026-06-05), ePA Customer Call Notes (Compliance space)"
      ],
      "sf": {
        "arr": 309813.50000400003,
        "cumulative": 3702902,
        "product_rev": 3564902,
        "services_rev": 138000,
        "health": 10,
        "temperature": null,
        "nps": null,
        "renewal_sentiment": 5,
        "sentiment_notes": null,
        "flags": [
          "Service Concern"
        ],
        "renewal": "2027-12-31",
        "contract_exp": "2024-12-29",
        "customer_since": "2021-12-30",
        "go_live": "2022-06-16",
        "impl_level": "Level V",
        "products_sold": "Patient Access;Provider Directory;Payer to Payer Send;Request and Ingest",
        "lobs": "Medicare;Medicaid;Medicare Advantage",
        "members_contracted": 334000,
        "members_current": 434286,
        "competitors": null,
        "pbm": null,
        "owner": "Jodi Patton",
        "csm": "Geetika Arora",
        "exec_sponsor": "Nolan Kelly",
        "tier": "Grow",
        "opps": [
          {
            "name": "Fallon Health - New Deal",
            "type": "0125f000000iH45AAE",
            "closed": "2021-12-31",
            "arr": null,
            "services": 110000,
            "amount": 415200,
            "months": 11.96,
            "owner": "Ariana Zamora",
            "won_because": null,
            "competitor": null
          },
          {
            "name": "Fallon Health - Clinical Connectivity",
            "type": "0125f000000iH45AAE",
            "closed": "2022-12-15",
            "arr": null,
            "services": 0,
            "amount": 174000,
            "months": 12.48,
            "owner": "Ariana Zamora",
            "won_because": null,
            "competitor": null
          },
          {
            "name": "Fallon Health - SQL",
            "type": "0125f000000iH45AAE",
            "closed": "2022-12-15",
            "arr": null,
            "services": 0,
            "amount": 265000,
            "months": 12.48,
            "owner": "Ariana Zamora",
            "won_because": null,
            "competitor": null
          },
          {
            "name": "RENEWAL: Fallon Health 22",
            "type": "0125f000000iHVSAA2",
            "closed": "2022-12-30",
            "arr": null,
            "services": 0,
            "amount": 305200,
            "months": 11.96,
            "owner": "Ariana Zamora",
            "won_because": null,
            "competitor": null
          },
          {
            "name": "RENEWAL 2023 - Fallon Health",
            "type": "0125f000000iHVSAA2",
            "closed": "2023-12-18",
            "arr": null,
            "services": 0,
            "amount": 601500,
            "months": 11.99,
            "owner": "Lindsay Parker",
            "won_because": "relationship",
            "competitor": null
          },
          {
            "name": "24-25 Fallon Health Provider Access",
            "type": "Existing Business",
            "closed": "2025-01-06",
            "arr": 601500,
            "services": 0,
            "amount": 80000,
            "months": 11.96,
            "owner": "Jodi Patton",
            "won_because": null,
            "competitor": null
          },
          {
            "name": "24-25 Fallon Health Renewal",
            "type": "Existing Business",
            "closed": "2025-01-06",
            "arr": 601500,
            "services": 0,
            "amount": 521500,
            "months": 11.96,
            "owner": "Jessica Candito",
            "won_because": "2024-2025 Renewal",
            "competitor": null
          },
          {
            "name": "25-27Fallon Health Renewal + CPI Increase - 3%",
            "type": "Existing Business",
            "closed": "2025-12-05",
            "arr": 601500,
            "services": 0,
            "amount": 619627,
            "months": 23.95,
            "owner": "Jodi Patton",
            "won_because": "2025-2026 Renewal",
            "competitor": null
          },
          {
            "name": "26-27 Fallon Health Renewal + CPI Increase - 3%",
            "type": "Existing Business",
            "closed": "2025-12-05",
            "arr": 619627,
            "services": 0,
            "amount": 637675,
            "months": 12.02,
            "owner": "Jodi Patton",
            "won_because": "2025-2026 Renewal",
            "competitor": null
          },
          {
            "name": "Fallon - Clinical Connect - 1 year",
            "type": null,
            "closed": "2026-05-15",
            "arr": null,
            "services": 0,
            "amount": 55200,
            "months": 11.96,
            "owner": "Jodi Patton",
            "won_because": "Clinical Connect",
            "competitor": null
          },
          {
            "name": "Fallon - MPF Remediation",
            "type": null,
            "closed": "2026-06-05",
            "arr": null,
            "services": 3000,
            "amount": 3000,
            "months": 3.58,
            "owner": "Jodi Patton",
            "won_because": "MPF",
            "competitor": null
          },
          {
            "name": "Fallon - New Lobs - Community Care and Summit Elder Care",
            "type": null,
            "closed": "2026-06-05",
            "arr": null,
            "services": 25000,
            "amount": 25000,
            "months": 3.02,
            "owner": "Jodi Patton",
            "won_because": "upsell",
            "competitor": null
          }
        ]
      }
    },
    {
      "id": 1,
      "name": "Capital Health Plan",
      "quarter": "live",
      "qlabel": "Live / Pre-Q1",
      "seg": "commercial",
      "seglabel": "Commercial / Blues",
      "note": "Pop Connect in production",
      "full": "Capital Health Plan (CHP)",
      "dq": "rich",
      "products_and_scope": "New logo Dec 2024: Phase 1 $215,000 ARR = CMS-9115 Patient Access + Provider Directory across 3 LOBs (MA, QHP, COMM); Phase 2 $60,000 ARR = CMS-0057 Provider Access + Payer-to-Payer [#arr-services-new-bookings 2024-12-20]. Population Connect (clinical data) beta was on the original contract as a pilot with Tallahassee Memorial Healthcare (TMH), contracted for 5k patients, now running in production. Medicare Plan Finder (MPF) is on the roster with CHP starting ~Aug/Sep 2026 [#account-capitalhealthplan 2026-06-09 Stacy Harris/Geetika Arora; 2026-04-14 Jodi Patton]. NOT contracted for ePA — \"Jodi is working with them on adding it\" [Nolan Kelly, #account-capitalhealthplan 2026-04-14]. Pop Connect expansion (new providers via Clinical Connectivity) blocked pending contract; CHP agreed to invoicing June 2026 [#account-chp-popconnect-implementation 2026-06-08/09].",
      "implementation_status": "Roster says \"ahead of Q1\" — confirmed. CMS-9115: data go-live 8/26/2025 (slipped from 8/1→8/12 due to customer file issues), member auth go-live ~12/17/2025 after mPulse/HealthTrio IDP troubleshooting (UAT signed off 11/21/2025); handoff to CS/Support 12/2/2025; formal go-live announced in #general; CSM is Geetika Arora [CHP Handoff Confluence page 1099858120; #account-capitalhealthplan-implementation-9115 EOW updates]. CMS-0057 (Provider Access/P2P): kickoff 2/24/2026, questionnaires returned 2/19; weekly calls since 3/10/2026; attribution files for all 3 LOBs ingested May 2026, LOB column shipped, CHP chose 1up-Managed Opt-Out/In; EOB Prior Auth test file in progress June 2026 [#2026-0057-access-api--readiness; #account-capital-healthplan-provideraccesspayertopayer]. Pop Connect: kickoff 11/7/2025, test roster 12/3/2025, prod 5k roster pull started 1/5/2026, pilot closed out 1/16/2026 and moved to production (1up-chp-prod STE); recurring daily-refresh roster of 1,665 patients as of 7/1/2026; June 2026 roster ~90k patients vs 5k contracted [#account-chp-popconnect-implementation]. BCBSA Hub integration targeted for July 2026 implementation, production deadline Nov 2026 (PROD-177); MPF start deferred to Sept 2026 until BCBSA hub finalized [Confluence 2048688151; #account-capitalhealthplan 2026-04-14].",
      "tech_architecture": "Claims/core admin: Cognizant/TriZetto TTAP with TriZetto Payer Prior Auth Solution bolt-on; \"Clarion\" for cancer [Confluence 2048688151, 3/2/2026 notes]. Member portal \"CHP Connect\" powered by HealthTrio/mPulse — OIDC IDP via beta.healthtrioconnect.com for member auth across 3 LOB auth apps (chpma/chpcomm/chpqhp; auth.capitalhealthplanfhir.com) [PACS-9; 9115 channel]. Data flow: PGP-encrypted flat files (Extract Guides) dropped to MTE, decrypted and synced to STE /incoming — CHP was 1upHealth's FIRST MTE customer and first Extract Guides customer, migrated mid-implementation MTE→STE; separate folders per LOB [DNA Confluence 2076377099; 9115 channel]. STE envs: 1up-chp-prod, 1up-chp-pcp-prod (Pop Connect pilot). Pop Connect: Epic at Tallahassee Memorial Healthcare (implemented Epic March 2025), Bulk FHIR export → CHP loads via Iguana integration engine into SQL; TMH roster via SFTP (s3://1up-chp-prod-data-ingest) [#account-chp-popconnect-implementation 2026-01-16, 2025-11-07]. Future EHR targets: an Athena provider (~Feb 2026 ask), Allscripts, NextGen, Cerner — 4-5 providers in 2026 [2026-01-16; 2025-07-11]. HEDIS vendor: CareSeed [2025-11-25]. BCBSA Blues Hub: CHP is Home-plan-only routing. Provider Access files majority Organizations (176) vs Individuals (17).",
      "financial_signals": "New logo 2024-12-20: Phase 1 $215,000 ARR / Phase 2 $60,000 ARR [#arr-services-new-bookings]. 3-yr renewal w/ CPI 2025-12-22: +$25,500 ARR [#arr-services-new-bookings]. Pop Connect STE cost estimate $1,500-$2,500/mo before data charges [#account-capitalhealthplan 2025-08-04]. Pop Connect usage overage: contracted 5k patients, pulling ~90k (June 2026 roster); CHP \"agreed to invoicing\" for expansion, details in progress [#account-chp-popconnect-implementation 2026-06-01/06-09]. Additional-provider Clinical Connectivity expansion pending new contract.",
      "key_people": "CHP: Leon Green (Director of Programming & EDI, sponsor, day-to-day decision maker, llgreen@chp.org), Eric Smith (CIO — very engaged, drives Pop Connect/clinical data strategy), Mary Goble (Director of Clinical Quality/Improvement — HEDIS/NCQA stakeholder), Nicole Day (BI Analyst, primary 0057 contact), Kerri Petrone (BI Analyst), Anthony McClurkin (EDI Analyst, support contact), Amanda (quality/HEDIS side). TMH: Don (departed Dec 2025), Michael, Christy (BAA). Vendors: mPulse/HealthTrio (member portal/IDP), CareSeed (HEDIS). 1upHealth: Jodi Patton (account owner/sales), Nolan Kelly (sales/exec), Stacy Harris (Sr IM — 9115 + Provider Access/P2P), Robert Davis \"Robzzz\" (IM — Pop Connect), Chad Clough (data engineer), Geetika Arora (CSM since Dec 2025), Maria Baker (prior CS lead), Elizabeth McGowan (product, Provider Access), Kyle Brew (product), Justin Therrien/DaQuan Freeman (auth eng), Josh Shoemaker (eng), Hina Kharbey (product — Sapphire).",
      "risks_and_blockers": "1) Pop Connect contract/usage gap: contracted 5k patients but pulling ~90k; can't add new providers until they contract — invoicing being worked (June 2026). 2) TMH got dinged by their cloud team for API-hit volume and was bumped to a higher cloud pricing tier; pulls now spread over ~20 days [popconnect channel 2026-06-01]. 3) Eric wants to POST TMH FHIR data directly back to CHP's Patient Access FHIR APIs (bypassing flat files) — flagged internally as scope/commercial risk needing scoping [2026-02-18 transition call]. 4) MTE file architecture is unique; 0057 API configuration for an MTE-fed customer needs engineering work [handoff page]. 5) PGP keys expired Feb 27, 2026 — renewal process was undefined at handoff. 6) Jan 2026 incidents: prod creds 401/ingestion paused post-security-incident; INC-6 UAT credentials shared with wrong customer, forced credential rotation + UAT purge. 7) mPulse/HealthTrio inexperience delayed member auth go-live (Dec 2 → Dec 15 → 12/17); Provider SSO/IDP for CHP Connect still a gap Leon repeatedly escalated — manual provider sign-ups \"will not work for him.\" 8) BCBSA Hub dependency: Nov 2026 production deadline (PROD-177); MPF start pushed to Sept 2026 pending hub. 9) P2P-722: capital-health-plan member-match route 404 in UAT.",
      "points_of_interest": "CHP is a flagship reference-quality account: first customer on the MTE, first on Extract Guides, moves fast, and CIO Eric Smith sees 1up as central to clinical data acquisition strategy (\"wants 1up as their central Health Data Management platform\" rather than adding vendors — Leon, 7/11/2025). Huge NCQA/HEDIS focus — they stake brand and financials on ratings [Nolan Kelly 1:1 with CIO, 9/23/2025]. Their ask to filter clinical data for HEDIS measures (e.g., blood pressure) and route to CareSeed is feeding 1up's internal \"project Sapphire\" [2025-11-25]. TMH relationship is unusually tight (2 miles away; CIOs lunch together), making CHP an ideal Pop Connect commercialization proving ground. CHP also asked about a 1up customer advisory board (Aug 2025). BCBSA plan: Home-plan-only hub routing simplifies their 0057 scope.",
      "expansion_plays": [
        {
          "play": "ePA add-on (CMS-0057 Prior Auth)",
          "rationale": "Not contracted for ePA and Jodi is already working the add [Nolan Kelly, 2026-04-14]. They own TriZetto TTAP + TriZetto Payer Prior Auth bolt-on and are already wrestling with BCBSA Hub auth routing as a Home plan (hub must send CHP the auth for out-of-state members) — 1up ePA closes the loop on the 0057 suite they're already implementing, and PROD-177 BCBSA ePA work lands Nov 2026.",
          "fit": "high"
        },
        {
          "play": "Pop Connect / Clinical Connectivity commercialization (contract expansion)",
          "rationale": "Pilot converted to production and demand is outrunning contract: 5k contracted vs ~90k patients pulled; Eric is actively asking to connect new providers (an Athena practice, then 4-5 more Epic/Allscripts/Cerner sites in 2026) and CHP agreed to invoicing in June 2026. This is the most immediate revenue: formalize a scaled Clinical Connectivity contract with per-provider/per-member pricing, including the direct-POST-back-to-Patient-Access architecture Eric wants (needs scoping/commercial terms).",
          "fit": "high"
        },
        {
          "play": "HEDIS/quality analytics on the FHIR data (project Sapphire / quality data products)",
          "rationale": "CHP stakes brand and financials on NCQA/HEDIS scores; Mary Goble (Clinical Quality) is a motivated buyer, they asked for ECDS 'sweeps' of connected EMRs and for filtering clinical data (e.g., BP readings) to feed their CareSeed HEDIS vendor — explicitly out of current pilot scope and captured as input to project Sapphire. Package quality-measure extraction/routing on data already flowing through 1up.",
          "fit": "medium"
        },
        {
          "play": "Provider SSO/IDP integration with CHP Connect (HealthTrio/mPulse)",
          "rationale": "Leon has repeatedly escalated that manual provider registration won't work for provider adoption of Provider Access; HealthTrio is interested in a 1up integration ('Now/Next/Later' plan shared by Kyle/Liz). A paid provider-portal SSO/embedded-clinicals integration would deepen stickiness and unblock Provider Access adoption.",
          "fit": "medium"
        }
      ],
      "plays_hi": 2,
      "sources": [
        "#account-capitalhealthplan (C0870R8422Y), 2024-12-31 to 2026-06-09",
        "#account-capitalhealthplan-implementation-9115 (C088ZAPRUTG), 2025-08 to 2026-06 (older history exists, not paginated)",
        "#account-capital-healthplan-provideraccess-payertopayer (C0AKGKRFQ59), 2026-03-10 to 2026-06-29",
        "#account-chp-popconnect-implementation (C09PHBSGS7R), 2025-10-31 to 2026-07-01",
        "#general — Stacy Harris Project Go-Live announcement: Patient Access / Provider Directory",
        "#team-leadership — Maria Baker, go-live delay 8/1 to 8/12",
        "#arr-services-new-bookings, 2024-12-20 (new logo $215k/$60k) and 2025-12-22 (renewal +$25.5k) [cross-account recon extract]",
        "#2026-0057-access-api--readiness, 2026-02-19 to 2026-04-30 [cross-account recon extract]",
        "Confluence: Capital Health Plan CHP (Compliance space, page 2048688151) — BCBSA/systems notes",
        "Confluence: CHP - Handoff to CS and Support (CKB page 1099858120)",
        "Confluence: CHP/1up Weekly Interoperability Call notes (CKB, Sep-Nov 2025); CHP Pop Connect project pages (CKB 1718353930, 1788215301, 1960443908); MTE>STE File Push for CHP (DNA 2076377099)",
        "Jira: PACS-9 (mPulse IDP auth), INC-6 (credential rotation), PROD-177 (BCBSA Hub, Nov 2026 deadline), P2P-722, SRV-3536, TOPS-6860"
      ],
      "sf": {
        "arr": 283250.00000400003,
        "cumulative": 1382999,
        "product_rev": 1245499,
        "services_rev": 137500,
        "health": 10,
        "temperature": null,
        "nps": null,
        "renewal_sentiment": 5,
        "sentiment_notes": null,
        "flags": [],
        "renewal": "2028-12-31",
        "contract_exp": null,
        "customer_since": "2024-12-30",
        "go_live": null,
        "impl_level": null,
        "products_sold": null,
        "lobs": "Medicare;Exchange;Commercial",
        "members_contracted": null,
        "members_current": 124942,
        "competitors": "Health Trio",
        "pbm": null,
        "owner": "Jodi Patton",
        "csm": "Geetika Arora",
        "exec_sponsor": "Stephanie Iheme",
        "tier": "Grow",
        "opps": [
          {
            "name": "Capital Health Plan - Full Platform",
            "type": null,
            "closed": "2024-12-20",
            "arr": null,
            "services": 70000,
            "amount": 285000,
            "months": 11.96,
            "owner": "Ariana Zamora",
            "won_because": "Demos CMS 0057",
            "competitor": null
          },
          {
            "name": "Capital Health Plan - Phase 2",
            "type": null,
            "closed": "2025-01-01",
            "arr": null,
            "services": 0,
            "amount": 60000,
            "months": 4.63,
            "owner": "Ariana Zamora",
            "won_because": "Felt like we had CMS 0057 more figured out than the other vendors.",
            "competitor": null
          },
          {
            "name": "25-26 Capital Health Plan Renewal +CPI increase",
            "type": null,
            "closed": "2025-12-21",
            "arr": 275000,
            "services": 0,
            "amount": 283250,
            "months": 11.96,
            "owner": "Jodi Patton",
            "won_because": "renewal",
            "competitor": null
          },
          {
            "name": "27-28 Capital Health Plan Renewal +CPI increase",
            "type": null,
            "closed": "2025-12-21",
            "arr": 291749,
            "services": null,
            "amount": 300500,
            "months": 12.02,
            "owner": "Jodi Patton",
            "won_because": "renewal",
            "competitor": null
          },
          {
            "name": "26-27 Capital Health Plan Renewal +CPI increase",
            "type": null,
            "closed": "2025-12-21",
            "arr": 283250,
            "services": null,
            "amount": 291749,
            "months": 11.96,
            "owner": "Jodi Patton",
            "won_because": "renewal",
            "competitor": null
          },
          {
            "name": "CHP - MPF",
            "type": null,
            "closed": "2026-05-15",
            "arr": null,
            "services": 2500,
            "amount": 2500,
            "months": 13.96,
            "owner": "Jodi Patton",
            "won_because": "MPF",
            "competitor": null
          },
          {
            "name": "CHP ePA",
            "type": null,
            "closed": "2026-05-15",
            "arr": null,
            "services": 65000,
            "amount": 160000,
            "months": 30,
            "owner": "Jodi Patton",
            "won_because": "0057",
            "competitor": "trizetto"
          }
        ]
      }
    },
    {
      "id": 2,
      "name": "Capital Blue Cross",
      "quarter": "live",
      "qlabel": "Live / Pre-Q1",
      "seg": "commercial",
      "seglabel": "Commercial / Blues",
      "note": "Largest Blues account",
      "full": "Capital Blue Cross (CBC / capbluecross.com) — Blues plan, Pennsylvania; BCBSA plan code 361",
      "dq": "rich",
      "products_and_scope": "Signed Aug 2025: CMS-0057 for ALL LOBs ($995K ARR) + $162.5K services; new Blues logo, 4-month discovery-to-sign [#arr-services-new-bookings 2025-08-04]. Executed SOW covers all of CMS-0057 for CMS LOBs \"data partition\" (MA + CHIP); commercial LOB to be a separate SOW — draft commercial-members SOW sent to Todd Grinaway 2026-01-27 [#account-capital-blue]. Scope in flight: CMS-9115 Patient Access rebuild (Patient, Coverage, CARIN BB EOB pharmacy + medical inpatient/outpatient/professional, Formulary, USCDI clinical incl. Provenance), public Provider Directory (plan-net incl. dental/vision), Sensitive Data Tagging (services-only SOW added Sept 2025), Medicare Plan Finder (MPF) via SOW #3 effective 06/23/2026 (RITM0264228), and 0057 suite (Provider Access, P2P, ePA/CRD-DTR-PAS) not yet started as of June 2026. CBC switched from internal build to vendor-hosted (Dec 2025 sales call documented why). LOBs: MA, CHIP, Commercial (later), FEP excluded per BCBSA. Agreed 01/01/26 sequence: Provider Directory → Provider Access → P2P → ePA (CBC pushed for ePA earlier).",
      "implementation_status": "Roster: listed ahead of Q1 (likely live/earliest). As of 2026-07-08, 9115 Patient Access is in production loading: historical clinical (millions of records MA+CHIP) loaded April 2026; Patient/Coverage/Practitioner/Org prod files loaded; Caremark 5-yr pharmacy EOB ingested May 2026, Prime 5-yr delivered 5/27; gap files loading in prod started 7/1/2026; prod SSO/IDP cutover 7/13 with prod testing 7/14. Medical EOB is the laggard — still in test (outpatient failures over care_team qualification; CBC splitting medical EOBs into 3-month increments due to their memory issues, 7/8/2026). Provider Directory test files in review (dental/vision late); CBC PD go-live target 07/17. MPF: FHIR endpoint URLs delivered to CBC 7/7-7/8/2026 for HPMS submission (CMS deadline 7/10); CMS crawl hard deadline Sept 1. Go-live was pushed multiple times; a formal realignment (May 2026) reset the program — CBC chose to run 9115 + MPF simultaneously with confirmed-dates-only policy. 0057 scoping had not begun as of 6/16/2026; target compliance 01/2027. BCBSA hub testing: CRD/DTR/PAS/Provider Access + P2P with Association Interop Data Hub before Aug 2026; Intersystems connection required by March 2026 (spec gap flagged Aug 2025).",
      "tech_architecture": "Flat-file CSV (header/supplemental/lineitems per 1up extract guides: CARIN BB, US Core, plan-net) via S3 bucket 1up-capitalbluecross-prod-pre-prod-data-ingest; separate 1up data partitions per LOB (cross-partition patient matching promised H2 2026 per SOW note). Claims core: Facets (\"files from facets\" impact incremental Patient/Coverage). Pharmacy: Prime Therapeutics current PBM + Caremark historical (5-yr each; MA and CHIP pharmacy from separate sources); compound drug handling discussed. Dental/vision from external vendors; Magellan BHSA carve-out providers sent as one-time historical file. Member auth: CBC IdP SSO integrated with 1up auth app across CCHP/MA/Commercial. BCBSA Association Interop Data Hub for home/host P2P and 0057 routing (CBC plan code 361, 1up code UPH); Intersystems connection required; subscriber prefix list in progress. Sensitive data tagging codes: EMOTDIS, MH, SPI, ETH, ETHUD, OPIOIDUD, SUD, HIV — R and NOPAT codes unsupported, product request pending. ePA: CBC wants digitized prior-auth policies stored with 1up; asked about 1up InterQual partnership timeline (Jan 2026).",
      "financial_signals": "$995,000 CMS-0057 ARR for all LOBs + $162,500 Services, booked 2025-08-04 [#arr-services-new-bookings]. Sensitive Data Tagging SOW added ~Sept 2025 (services-only cost) [#account-capital-blue 2025-09-12]. MPF SOW #3 executed effective 06/23/2026 (SoW_Capital Blue Cross_1upHealth SOW#3, RITM0264228) [#account-capital-bluecross-implementation-9115 2026-06-26]. Draft commercial-LOB SOW sent for review 2026-01-27 (not yet confirmed signed).",
      "key_people": "CBC: Todd Grinaway (enterprise architect, primary technical champion), Scott Harclerode (owns ePA/clinical; P2P contact; publicly praised Stacy/Simone), Ryan Torborg (VP Tech Operations & Support), Achhar Singh (VP Enterprise Architecture, joined ~Jan 2026), Patty Higgins (Sr VP Healthcare Delivery), Dr. Harr (exec requesting beyond-compliance strategy meeting, June 2026), William Curtin (Data & Analytics), Paulo Nunes (VP Healthcare Analytics), Matt Snyder + Tina Tennant (program managers), Ruby Maldonado (PM), Joe Brunner, Mark Lohr, Ravi Bollampally, Cindy Harber, OraLea, Denise Bower, Karl McManus, Carol (ePA). 1upHealth: Lindsay Parker (AE), Stacy Harris (implementation/TPM lead), Maria Baker (CX/implementation leadership), Simone Graham (data engineering), Robert \"Robzzz\" Davis (SA; left #account-capital-blue 7/6/2026), Anton Pederson (SE on deal), Rachel Schuler + Jeremy Yoon (ePA), Kyle Brew (BCBSA hub/MPF product), Stephanie Iheme, Justin Therrien, Geetika Arora (support).",
      "risks_and_blockers": "1) Medical EOB not in production — chronic laggard; CBC repeatedly missed dates, go-live pushed multiple times; Stacy's June 2026 plan: proceed without Medical EOB, return with hard CBC-committed timeline. 2) CBC planning discipline: \"no updated or confirmed dates on any outstanding deliverables\" (May 2026 exec meeting); everything declared high priority; formal realignment with firm-dates-only policy imposed. 3) Workstream collision risk: 9115 + MPF + Provider Directory + commercial LOB + 0057 overlapping with limited CBC resources. 4) Member Opt-In/Opt-Out file via SFTP: CBC needs prod by Nov 2026 for member outreach; 1up feature likely not available until Q4 — CBC discussing contingency plan. 5) MPF bulk API/CMS endpoint: Sept 1 hard deadline, Todd pressing for firm dates (June 2026). 6) Open item: Provider Access provider-attestation requirement question (CMS DPC pilot ToS citation) — Stacy owes internal follow-up [#2026-0057-access-api--readiness 2026-07-08]. 7) NOPAT/R sensitive-data code support gap (product ticket pending since May 2026). 8) 0057 not yet scoped with 01/2027 deadline — compression risk. 9) BCBSA dependencies: Intersystems specs, prefix codes, hub testing before Aug 2026. 10) Smaller: 3rd-party app page shows other payers (CBC branding concern); FEP inclusion confusion on ePA.",
      "points_of_interest": "Very strong champion sentiment: Scott Harclerode at a networking event (4/20/2026): Stacy and Simone are \"hands down the absolute best.\" Exec-level pull for post-compliance value: Dr. Harr (via Patty Higgins/Ryan Torborg) requested a 1up strategy meeting on \"life beyond compliance\" (June 2026), following a 1/30/2026 exec call on value beyond compliance with VPs of Enterprise Arch, Analytics, Tech Ops. CBC asked in #product (4/24/2026) how 1up can support their shift to DQM for HEDIS — same ask as VNSNY. CBC is a vendor-switch story (internal build → 1up, documented Dec 2025) and a fast 4-month sale — good reference/case-study material. They requested an indefinite post-go-live test environment (potential paid add-on). Note: Capital Health Plan (plan code 095) is a separate related account on the BCBSA hub. ePA is unusually advanced pre-contract: CBC wants digitized policies stored in 1up, sent sample policies for testing (Jan 2026), asked about InterQual.",
      "expansion_plays": [
        {
          "play": "Close the Commercial LOB SOW (all-LOB data + Patient Access for commercial members)",
          "rationale": "Draft SOW sent to Todd 2026-01-27 and commercial file dev was slated to start mid-May 2026; execs explicitly anticipate commercial data flowing into 1up ('life beyond compliance, especially with their commercial data eventually being ingested'). This is in-flight revenue that needs a push to signature and scheduling protection against 9115/MPF congestion.",
          "fit": "high"
        },
        {
          "play": "ePA add-on: digitized policy management + InterQual-backed CRD/DTR",
          "rationale": "CBC wants to store digitized prior-auth policies with 1up, already sent sample policies for testing (Jan 2026), and asked twice about the InterQual partnership timeline; Scott Harclerode owns ePA and is the strongest champion. Package policy digitization services + ePA ahead of the Jan 2027 0057 deadline.",
          "fit": "high"
        },
        {
          "play": "Quality/analytics on the FHIR data: HEDIS digital quality measures (DQM) and beyond-compliance analytics",
          "rationale": "CBC asked how 1up can support their DQM-for-HEDIS shift (4/24/2026, same as VNSNY), and the Dr. Harr/Patty Higgins exec meeting is an open door; buyer-side analytics leaders exist (Paulo Nunes VP Healthcare Analytics, William Curtin Data & Analytics). All 9115 clinical+claims data is already in the 1up FHIR store to power it.",
          "fit": "medium"
        },
        {
          "play": "Paid persistent test environment + operational add-ons (opt-out SFTP feed, member-level usage reporting)",
          "rationale": "CBC formally asked to keep their test environment indefinitely post-live (June 2025, unresolved pricing question), needs an opt-out file over SFTP by Nov 2026, and requested member-level app-authorization reporting — all concrete, already-requested items that can be monetized as services/platform add-ons.",
          "fit": "medium"
        }
      ],
      "plays_hi": 2,
      "sources": [
        "Slack #account-capital-blue (C099ETPGBFU) — full channel history Aug 2025–Jul 2026",
        "Slack #account-capital-bluecross-implementation-9115 (C098Y4DGHMJ) — history Apr–Jul 2026 (older pages exist beyond cursor, not read)",
        "Slack #arr-services-new-bookings (C01KG7PJEDV) 2025-08-04 booking announcement",
        "Slack #bcbs-association-data-hub (C09CHMAA066) — plan code 361, hub testing, prefix codes (Dec 2025–Jun 2026)",
        "Slack #product (C0102AFFS8J) — HEDIS/DQM ask 2026-04-24; MPF bulk 4208 question 2026-05-04; P2P Blues contact list 2026-05-01",
        "Slack #sales-marketing (C08S2H50TB6) 2025-12-18 — internal-build-to-vendor switch writeup",
        "Slack #prior-auth (C08LCE6JYUD) 2026-01-12 — InterQual timeline ask",
        "Slack #security (CJ2BB6LP8) 2026-03-26 — third-party app breach question",
        "Slack #team-leadership (C01C88U2AES) 2025-06-03 — indefinite test environment request",
        "Slack #ask-sales-eng (C05M4D65W0L) 2026-04-21 — cross-partition matching SOW language",
        "Cross-account recon extract: #2026-0057-access-api--readiness 2026-07-08 (Provider Access attestation open item)",
        "Confluence: NOT searched — Atlassian Rovo search tool timed out after 300s (no response); no Confluence findings included",
        "Gmail: not searched (Slack data sufficient)"
      ],
      "sf": {
        "arr": 432307.6923,
        "cumulative": 1157500,
        "product_rev": 995000,
        "services_rev": 162500,
        "health": 7,
        "temperature": null,
        "nps": null,
        "renewal_sentiment": 5,
        "sentiment_notes": null,
        "flags": [],
        "renewal": "2028-07-31",
        "contract_exp": null,
        "customer_since": "2025-08-01",
        "go_live": null,
        "impl_level": null,
        "products_sold": null,
        "lobs": "Medicare;Commercial",
        "members_contracted": 850000,
        "members_current": 707029,
        "competitors": "Edifecs",
        "pbm": null,
        "owner": "Jodi Patton",
        "csm": "Geetika Arora",
        "exec_sponsor": "Stephanie Iheme",
        "tier": "Maintain",
        "opps": [
          {
            "name": "Capital Blue Cross_0057 CMS Lives Only",
            "type": null,
            "closed": "2025-07-31",
            "arr": null,
            "services": 72500,
            "amount": 282500,
            "months": 35.98,
            "owner": "Lindsay Parker",
            "won_because": "1up Expertise",
            "competitor": "availity"
          },
          {
            "name": "Capital BlueCross_Commercial LOBs CMS 0057",
            "type": null,
            "closed": "2025-07-31",
            "arr": null,
            "services": 90000,
            "amount": 875000,
            "months": 26.02,
            "owner": "Lindsay Parker",
            "won_because": "1up's expertise",
            "competitor": "availity"
          }
        ]
      }
    },
    {
      "id": 3,
      "name": "Hamaspik Choice",
      "quarter": "live",
      "qlabel": "Live / Pre-Q1",
      "seg": "medicaid",
      "seglabel": "Medicaid MCO / CCO",
      "note": "",
      "full": "Hamaspik Choice (NY Medicaid/Medicare managed care plan — MLTC, DSNP, MAP, Medicaid HMO LOBs; display name \"Hamaspik Managed Care\")",
      "dq": "rich",
      "products_and_scope": "Base: CMS-9115 Patient Access / EOB claims + Provider Directory since 2021 ($75k ARR + $65k services, 3-yr term start 3/30/2021; renewed 3/2022 at $75k ARR on new order form). Expansion (7/2025): $140K upsell as Beta ePA partner covering ePA (CRD/DTR/PAS per HL7 Da Vinci IGs), Payer-to-Payer, and Provider Access; the P2P/Provider Access/ePA SOW was signed ~9/9/2025, 0057 contract date 12/1/25 (first-wave 0057 customer). 0057 scope also includes EOB Prior Auth additions to the Patient Access API. MPF: $9,500 Provider Directory File Remediation services booked 6/9/2026, but the MPF order form was NOT yet signed as of 5/28/2026 (Jodi: \"She still needs to sign the order form\"). The ePA SOW scopes HealthEdge as the ONLY UM vendor; customer is pushing to add Carelon, DentaQuest/EyeQuest, and ASH. Also in flight: a clinical data gap analysis project (CarePlan files, USCDIv3 uplift). An $18K SOW for a provider-directory file-format change was declined April 2025 (customer chose to do the work themselves).",
      "implementation_status": "Matches roster \"ahead of Q1\": 0057 kickoff held 2/27/26; ePA started earlier as beta — CRD was demoed 12/11/25 and is listed \"CRD - Live in Prod\" in 1/21/26 Confluence provider-outreach notes. As of 6/5–6/25/26: Patient Access EOB Prior Auth — prod files loaded and incrementals automated, but the 6/6 automated prod files failed schema validation (date format changed hyphens to slashes) and corrected files were still pending 6/25. Hamaspik missed the NY-state-accelerated 4/1/26 PA-data deadline (1up reset expectations; federal date 1/1/27). Provider Access — member attribution files in prod with incrementals automated; 1,549 NULL-resource_id errors open 6/25; 1up-managed opt-in/opt-out screens in progress; review/sign-off targeted July 17–24 and full 0057 project projected to close ~Aug 28, 2026. P2P — using 1up screens; NY Medicaid Consent Registry (NY SHIN/GRRHIO Consent API) integration pending, state APIs deploy 10/1/26. ePA — HealthEdge GuidingCare connectivity complete, full validation on track for end of June; Carelon UAT connectivity started 6/16, unblocked 6/18; project flagged off-track 5/8/26 due to customer-added vendors. MPF — first file cut sent 7/1/26, no formal kickoff yet; CMS technical-guidance change pushes MPF testing to late July/August 2026.",
      "tech_architecture": "Claims/data sources: QNXT medical claims engine (837s converted to CSV, SFTP to S3 bucket 1up-hamaspik-prod-data-ingest); Beacon behavioral-health claims (own S3 bucket); Magellan bucket dormant since 2024; Prime Therapeutics PBM for 9115 pharmacy data (PBM change coming 2027 = reimplementation); Truchart historical claims 2016–2018 (one-time load); DentaQuest (dental) and EyeQuest (vision) vendors sending PA files. UM vendors for ePA: HealthEdge GuidingCare (CRD/DTR/PAS = Yes) plus Carelon (BH/MH), DentaQuest/EyeQuest, ASH (chiro/acupuncture); Prime PBM confirmed NOT needed for ePA. ePA decision rules hosted on their 1up-hosted STE FHIR server (POST via client credentials); account being migrated STE-to-MTE (MTE stood up 4/22/26). Provider Directory still on legacy NiFi mapping processor v1.5.7 (implemented 2021, never automated); newer clinical/PA ingest moving to Standard Ingest / extract-guide (EG) schema with Avro validation. No IdP and no member portal — 1up-managed opt-in/opt-out screens for P2P and Provider Access. P2P must integrate with NY external Consent API (qe=GRRHIO, JWT bearer, POST /consent). URLs: gateway.1up.health/v1/hamaspik/... (assigned 12/10/25); UAT console hamaspikfhir.console.1upcoreuat.com. ePA provider pilots: Visiting Docs (eClinicalWorks), TellyHealth via Enable Healthcare EHR, MedGen.",
      "financial_signals": "2021-04-06: $75k ARR + $65k services, 3-yr term starting 3/30/2021. 2022-03-25: renewal $75k ARR on new order form. April 2025: $18K scoped SOW offered and declined. 2025-07-07: $140,000 upsell (Beta ePA + Payer-to-Payer + Provider Access; booked in #arr-services-new-bookings). 0057 contract date 12/1/25. 2026-06-09: $9,500 MPF Provider Directory File Remediation services. MPF ARR order form pending signature as of 5/28/26.",
      "key_people": "Customer: Emily Manning — CTO (primary contact, called \"CIO Emily\" in the 2025 booking post; publicly recognized by 1upHealth on LinkedIn 3/17/26); Divya Gorantla — Technical Quality Engineer (files/SSIS automation); Jonathan Czar — IT SME; earlier contacts Elvin and Judah. 1upHealth: Jodi Patton (account/sales), Holly Fan (Sr. CSM), Rachel Schuler (Sr. Implementation Manager, 0057/ePA), Assiatou \"Assi\" Diallo (Implementation Manager, 0057), Joy He (data engineering/ingestion), Robert Davis \"Robzzz\" (Services), Jeremy Yoon (ePA), Kyle Brew (Director PM, P2P product owner), Elizabeth McGowan (product/screens), Maria Baker (CX leadership), Avi Lessure (MPF/data eng), Juliette Steinkrauss (ePA partnerships), Hina Kharbey (MPF), Geetika Arora.",
      "risks_and_blockers": "1) Chronic customer data-quality issues: UTF-8 BOM/special characters, underscore IDs failing validators, changed file headers, date-format drift in automated prod files, NULL resource_ids (1,549 Provider Access errors), missing coverage_id and procedure_system on PA EOBs, missing DOBs blocking P2P member match (~20% resolved as of 2/13/26). 2) Working style: Emily works \"disjointed... mostly over emails\"; historically resistant to SOWs; Services twice demanded formal project plans/cadence and once refused to review further files (10/30/25). 3) ePA scope creep: SOW covers HealthEdge only, customer added Carelon/DQ/EQ/ASH; project flagged off-track 5/8/26. 4) Missed the NY-state 4/1/26 prior-auth data deadline. 5) MPF: order form unsigned; CMS technical-guidance change delays testing to late July/August 2026, jeopardizing the 4-week timeframe; MPF questions suggest customer hasn't absorbed CMS guidance. 6) PBM change in 2027 forces 9115 pharmacy-data reimplementation with new PBM. 7) NY Consent Registry dependency: state Consent APIs not deployed until 10/1/26 — external timeline risk for P2P go-live before 1/1/27.",
      "points_of_interest": "Flagship/beta account: 1up's first Beta ePA partner and a \"first wave\" 0057 customer; named in the ePA Pilot Program SOW (Q4 2025) and cited as a top ePA customer for 2026 alongside Viva, TN, MMM (#epa-adoption-growth 7/7/26). Emily Manning was publicly recognized by 1upHealth on LinkedIn (3/17/26) — strong champion. First 1up customer doing provider-side ePA outreach (Visiting Docs/eClinicalWorks meeting 11/26/25 was 1up's first provider meeting). One of only 2 customers (with CVS) requiring P2P opt-in app integration with an external state Consent API (NY GRRHIO). NY State accelerated PA-data and consent requirements make this account a template for other NY Medicaid plans. Emily requested product enhancements: consolidated ingestion dashboard for all files, SFTP delivery of opt-in/opt-out statuses into their care-management system, and member attribution derived from claims (slotted as 2027 early adopter).",
      "expansion_plays": [
        {
          "play": "ePA multi-vendor expansion SOW (Carelon BH/MH, DentaQuest/EyeQuest, ASH)",
          "rationale": "Customer is actively pushing to add these UM vendors beyond the HealthEdge-only SOW scope; Rachel explicitly framed the path as \"expand the SOW\" with Jodi (3/17/26), and Carelon connectivity work has already started. Cleanest, customer-initiated paid expansion.",
          "fit": "high"
        },
        {
          "play": "Close MPF ARR order form and formalize the MPF project",
          "rationale": "$9.5k remediation already booked, first MPF file cut delivered 7/1/26, and Emily said she'd \"follow up with Jodi on the contract\" (5/22/26 call) — but the order form is unsigned and there's been no kickoff. Timing note: CMS guidance change delays testing to late July/Aug, so sign now with a realistic plan.",
          "fit": "high"
        },
        {
          "play": "Clinical data / HDE services package: gap-analysis remediation + USCDIv3 uplift + Standard Ingest migration + 2027 PBM reimplementation",
          "rationale": "The CarePlan/clinical-data gap analysis project is already scoped-ish (Emily returned commented gap analysis 10/14/25), legacy NiFi PD pipeline needs migration to Standard Ingest/MTE, and the 2027 PBM change forces a 9115 pharmacy reimplementation — bundle these as a paid data-services/HDE engagement, with member-attribution-from-claims early adoption (Q4/2027 roadmap) as the product hook.",
          "fit": "medium"
        }
      ],
      "plays_hi": 2,
      "sources": [
        "Slack #account-hamaspik (C01S94U77JA), 2024-12 to 2026-05-28",
        "Slack #account-hamaspik-implementation-0057-provider-access-and-patient-access-eob-pa (C0AEQPE5QTV), 2026-02-13 to 2026-06-25",
        "Slack #account-hamaspik-implementation-00057-p2p (C0AEX5TFNUS), 2026-02-13 to 2026-06-05",
        "Slack #account-hamaspik-implementation-epa (C09UU2Q5656), 2025-11-19 to 2026-06-18",
        "Slack #account-hamaspik-mpf-implementation (C0BEP0F4CA1), 2026-07-02",
        "Slack #arr-services-new-bookings (C01KG7PJEDV): 2025-07-07 $140K beta ePA upsell post; 2026-06-09 $9,500 MPF remediation; plus cross-account extracts for 2021/2022 bookings",
        "Slack #epa-adoption-growth (C0AK3790E3C), 2026-07-07 ePA recap (top ePA customers)",
        "Slack #1up-live (C05SUJU3C9H), 2026-03-17 Emily Manning LinkedIn recognition",
        "Confluence CKB: Hamaspik Implementation Details (page 293961758, QNXT/Beacon/Truchart)",
        "Confluence CKB: 6/05/26 - Hamaspik 0057 Implementation Meeting (page 2378006674)",
        "Confluence CKB: 2/27/26 - Hamaspik 0057 Implementation Kickoff (page 2049507340)",
        "Confluence CKB: 1/21/26 - Hamaspik Provider Outreach (page 1926103050, CRD Live in Prod)",
        "Confluence CKB: Hamaspik Provider Directory Update (page 2054717447, legacy NiFi v1.5.7)",
        "Confluence PD: DRAFT - Integrate Member Opt In App with Payer Consent API (page 2275999756)",
        "Confluence PD: Information Needed for CRD Implementation with Hamaspik (page 1629356173)",
        "Jira: EPA-298/EPA-300 (Hamaspik CRD CQL/BDD), DATAQ-62/71 (PA EG mappings), INFF-1468 (vision/dental flow)",
        "Cross-account recon extracts provided by orchestrator (#sows-inflight 2025-09-09; #2026-0057-access-api--readiness 2025-12-10 to 2026-02-27; ePA Customer Implementations PAUTH; ePA Customer Call Notes Compliance)"
      ],
      "sf": {
        "arr": 84823.008852,
        "cumulative": 664500,
        "product_rev": 515000,
        "services_rev": 149500,
        "health": 9,
        "temperature": "Green",
        "nps": null,
        "renewal_sentiment": 5,
        "sentiment_notes": null,
        "flags": [
          "ROI in question"
        ],
        "renewal": "2028-03-01",
        "contract_exp": "2023-04-04",
        "customer_since": "2021-03-30",
        "go_live": null,
        "impl_level": "Level 4.5",
        "products_sold": "Patient Access;Provider Directory",
        "lobs": "Medicare;Medicaid",
        "members_contracted": 50000,
        "members_current": 26235,
        "competitors": null,
        "pbm": null,
        "owner": "Jodi Patton",
        "csm": "Holly Fan",
        "exec_sponsor": "Jodi Patton",
        "tier": "Maintain",
        "opps": [
          {
            "name": "Hamaspik Choice - CMS Patient Access",
            "type": "0125f000000iH45AAE",
            "closed": "2021-04-05",
            "arr": null,
            "services": 65000,
            "amount": 140000,
            "months": 11.96,
            "owner": "Matt Dula",
            "won_because": null,
            "competitor": null
          },
          {
            "name": "RENEWAL: Hamaspik Choice 2022",
            "type": "0125f000000iHVSAA2",
            "closed": "2022-03-23",
            "arr": null,
            "services": 0,
            "amount": 75000,
            "months": 12.19,
            "owner": "Ariana Zamora",
            "won_because": null,
            "competitor": null
          },
          {
            "name": "RENEWAL: Hamaspik Choice 2023",
            "type": "0125f000000iHVSAA2",
            "closed": "2023-04-05",
            "arr": null,
            "services": 0,
            "amount": 75000,
            "months": 11.99,
            "owner": "Ariana Zamora",
            "won_because": null,
            "competitor": null
          },
          {
            "name": "Hamaspik Choice: Renewal 2024",
            "type": "0125f000000iHVSAA2",
            "closed": "2024-03-14",
            "arr": null,
            "services": 0,
            "amount": 75000,
            "months": 11.96,
            "owner": "Drew Arnold",
            "won_because": "Great relationship and happy with us",
            "competitor": null
          },
          {
            "name": "25 -28 Hamaspik Choice: Renewal",
            "type": "0125f000000iHVSAA2",
            "closed": "2025-02-11",
            "arr": null,
            "services": 0,
            "amount": 75000,
            "months": 35.98,
            "owner": "Drew Arnold",
            "won_because": "Great relationship and happy with us",
            "competitor": null
          },
          {
            "name": "25-28 Hamaspik: 0057",
            "type": null,
            "closed": "2025-07-07",
            "arr": null,
            "services": 0,
            "amount": 40000,
            "months": 24.02,
            "owner": "Jodi Patton",
            "won_because": "0057",
            "competitor": null
          },
          {
            "name": "25-28 Hamaspik: ePA",
            "type": null,
            "closed": "2025-07-07",
            "arr": null,
            "services": 75000,
            "amount": 175000,
            "months": 30.09,
            "owner": "Jodi Patton",
            "won_because": "early ePA customer",
            "competitor": null
          },
          {
            "name": "Hamaspik - MPF remediation",
            "type": null,
            "closed": "2026-06-09",
            "arr": null,
            "services": 9500,
            "amount": 9500,
            "months": 2.99,
            "owner": "Jodi Patton",
            "won_because": "MPF",
            "competitor": null
          }
        ]
      }
    },
    {
      "id": 4,
      "name": "BCBST",
      "quarter": "q1",
      "qlabel": "Q1 · Jan–Mar",
      "seg": "commercial",
      "seglabel": "Commercial / Blues",
      "note": "3 phases: Q1 PA+P2P out · Q2 ePA · Q4 P2P in",
      "full": "BCBST (BlueCross BlueShield of Tennessee)",
      "dq": "rich",
      "products_and_scope": "RFP win booked 2025-10-01: Patient Access, Payer-to-Payer, Prior Auth (ePA), Provider Directory, and Provider Access — full CMS-0057 suite plus CMS-9115 Patient Access replatform (replacing incumbent Edifecs). 0057 phasing per roster: Q1 Phase 1 Provider Access + P2P outbound; Q2 Phase 4 ePA; Q4 Phase 3 P2P inbound. Also an early HDE customer: Jira DNA-1225 = \"Implementation 3, new client, BCBS TN, self-service pilot\" with Crawl phase July 2026 (HDE Implementation Playbook, Confluence). Scope covers LOBs Commercial, BlueCare (Medicaid), BlueCare Plus, Medicare, and FEP; Group 44 and CoverKids surfaced as possible new LOBs on 2026-07-07 (#account-bcbst-implementation-0057-epa). FEP Blue DTR hosting added via no-charge change order signed by 1up ~6/29, awaiting BCBST (Erin Wiles) signature — 1up will host/maintain already-created DTR questionnaires (Itiliti makes the policies; digitized policies now due 8/12, slipped from 7/7). 9115 scope includes historical + incremental clinical and claims data: Patient, Person, Coverage, RelatedPerson, Practitioner, Organization, Condition, Encounter, Procedure, and all EOB types (IP, OP, Pharmacy, Prof, Oral), with Sensitive Data Tagging on EOB/Procedure/Condition. In April 2026 they also added EOB Prior Auth data to Patient Access via 1up FHIR mapping (proceeding without SOW).",
      "implementation_status": "9115 go-live essentially achieved on the revised week-of-7/6 target: prod historical load complete (~626,830 files / ~627M resources / 2.1TB, EOB alone 1.8TB), catch-up load complete for EOB/Encounter/Condition/Procedure (awaiting final EOBs from vendor), prod auth app LIVE 7/7, Console RBAC/PHI admin deployed to prod 7/7 (Emily Bible admin), incremental API updates beginning ~7/6; 3rd-party app notification pending BCBST approval (07/07/26 Weekly Implementation Meeting, Confluence). Original go-live was 4/29-5/18, slipped ~7 weeks due to data volume and gap files. ePA (Q2 Phase 4 plan): on track per 5/8 EOW update; CRD logic deployed by 5/15; Evolent integration testing started week of 6/9 (UAT 6/15-7/10); TurningPoint test creds expected week of 7/10; vendor integration window 7/1-11/1, client UAT 8/1-10/31, BCBSA Hub testing 8/1-11/14. Provider Access and Payer-to-Payer UAT both scheduled 9/1-9/30; Interop Hub prod testing 12/20-12/30 — consistent with Q1-per-roster phases actually landing in H2 2026 UAT. HDE: Crawl phase July 2026, Q3 2026 implementation on the FHIR API path (self-service pilot, Services configuring). Customer runs a monthly executive Steering Committee that 1up attends (since Jan 2026) and uses a 1up-branded status slide.",
      "tech_architecture": "Replacing Edifecs as FHIR/interop vendor (prior 9115 vendor; 1up ingested their JSON files). Edifecs MCS (Member Consent Solution) remains and reads data back from 1up FHIR repository via read-only creds through the 1up Gateway (gateway.1upcoreuat.com/v1/bcbstnt) — fullUrl/pagination fix deployed to prod week of 6/29-7/7. Dedicated STE environments (1up-bcbstn-stage/-prod) across Test/Stage/Prod; NiFi ingestion pipelines, S3/SFTP file transfer, Elasticsearch resharding, Sensitive Data Tagging via Redis. Member auth: 1up auth app integrated with BCBST Ping IdP SSO; plans to embed 1up links in member portal and avoid double authentication (#2026-0057-access-api--readiness 6/24). ID strategy: system_member_ids/oneup_user_id crosswalks; large crosswalk file deliverables per resource type. UM/PA vendor mesh for ePA: Cohere (HTI Commercial/BlueCare), Evolent (HTI Medicare Advantage/BlueCare Plus), TurningPoint (MSK Commercial), CVS Health (pharmacy, NCPDP 278 / FHIR PAS or X12 278/275 via SFTP conversion), Cognizant QNXT/TriZetto (product-dependent), WellSky and Tango (static DTR questionnaires), Itiliti (FEP policies/DTR). Internal Care Advance PAS REST API connection to evaluate (ccssvc.test.carekey.bcbst.com). BCBSA interop hub integration (CRD testing target 6/17; prod testing 12/20-12/30). BCBST pushes formulary data via API endpoints.",
      "financial_signals": "Verified directly in #arr-services-new-bookings: $1,608,750 ARR for 3 years (Patient Access, Payer to Payer, Prior Auth, Provider Directory, Provider Access) booked 2025-10-01 (RFP win, Lindsay Parker); services SOW $202,500 booked 2025-11-10 (\"more to scope\" per Lindsay Parker). FEP DTR change order executed at NO charge (Jodi Patton decision 6/16-6/17: FEP was in original contract scope, LOE small). Pricing guidance from Jeremy Yoon/Anton/Ryan Ingram (6/16): a genuinely new LOB would follow standard subscription increase; DTR questionnaire hosting = one-time services fee only. SQL on FHIR carries a monthly cost to 1up on STE and was floated as paid (\"would they be willing to pay?\" — Hina Kharbey, 5/5).",
      "key_people": "Customer: Yuan Li (technical/data lead, drives UAT), Jeff Jacobs (data engineering/cutover), Adam Foust (interop project lead), Joey Whitmire (UAT dates owner), Erin Wiles (contracting/change orders), Emily Bible (Console admin w/ PHI creds; FEP DTR), Tina Waldron (PA logic lists), Emily Haught, Chen Xu (EOB files), Jonathan Hutchins, Aniket Salver, Mirasab Saiyed & Navin (Edifecs side). 70+ attendees on weekly implementation calls. 1upHealth: Lindsay Parker (Account Manager, closed the RFP), Rachel Schuler (Implementation PM, \"Mega-Superstar PM\"), Stephanie Iheme (exec sponsor), Jodi Patton (growth/upsell owner — Lindsay routed all expansion to her 6/12), Jeremy Yoon (ePA lead), Chad Clough (data engineering), Robert Davis \"Robzzz\" (services eng), Maria Baker (implementations), Justin Therrien (auth app/IdP), Rakesh Pankhania (FHIR server/SDT), Kyle Brew (P2P), Anton Pederson (services scoping), Ryan Ingram, Alisa Haman (Console/product), Hina Kharbey (product, SQL on FHIR).",
      "risks_and_blockers": "1) Edifecs read-only access (fullUrl/pagination) was an explicit go-live blocker (\"Go-live blocker for BCBS-TN, and it will get escalated\" — Robert Davis, 6/18); fix deployed to prod week of 6/29 — resolved but consumed eng capacity and even deprioritized internal MTE work (\"STE Client ID Work temporarily deprioritized behind BCBST Core API work\", #proj-velocity 6/24). 2) Consent testing still in progress as of 7/7 (UAT finalized for data, consent team still testing). 3) Data-volume strain: near out-of-disk during historical ingestion (OPSREQ-10382, 6/17), month-long EOB loads, massive crosswalk files. 4) Customer data-quality churn: 6/24 request to delete 2 days of bad EOB NDJSON files; ~6k missing stage files episode in May. 5) SQL on FHIR gap: they want FHIR data in Tableau; not supported on MTE (Trino alternative on Q3-Q4 roadmap) — they lose equivalent Edifecs search 6/30, so Console Data Viewer timing matters. 6) 2027 regulatory expansion: BCBST flagged (4/13) a new reg requiring ePA to cover drugs in 2027 — scope not yet contracted. 7) FEP/Itiliti dynamics: Itiliti charging BCBST for API access pushed them to 1up-hosted static DTR with manual policy-update maintenance — future services burden. 8) Multi-vendor ePA coordination (Cohere/Evolent/TurningPoint/CVS/WellSky/Tango) with data agreements and creds still trickling in.",
      "points_of_interest": "Marquee RFP win against the odds; likely 1up's largest single-account data footprint (~627M FHIR resources, 2.1TB). BCBST shares a 1up-branded status slide at their monthly Executive Steering Committee and invited 1up to attend — strong exec access channel (Stephanie Iheme attending since Jan 2026). BCBSA interop hub involvement means BCBST decisions ripple across Blues plans (they surfaced Association ePA milestone info that reached the Capital BlueCross account). BCBST is also the reference point internally for RBAC/LOB-scoped Console access design and served as sample source for the SDT template for future customers. Their attribution-audit and opt-in/out questions in #2026-0057-access-api--readiness (4/21, 6/18, 6/24) show a sophisticated privacy/security posture — good design-partner candidate. Change-order goodwill (no-charge FEP DTR) has been banked; Jodi owns the growth motion per Lindsay (6/12).",
      "expansion_plays": [
        {
          "play": "SQL on FHIR / analytics access (Trino-based) as a paid add-on",
          "rationale": "Explicit inbound demand: BCBST asked (5/5) to pull their FHIR data into Tableau; Hina Kharbey confirmed STE SQL access is possible now at a monthly cost and MTE support (Trino) is on the Q3-Q4 2026 roadmap; Rachel queued a scoping call with Joey/Jeff after the 9115 project. They are losing equivalent Edifecs search/analytics capability, and with ~627M resources now on 1up, analytics on that data is the natural next dollar. Their data team separately asked for API performance/monitoring reporting — bundle as a data-insights add-on.",
          "fit": "high"
        },
        {
          "play": "ePA drug/pharmacy prior auth expansion for the 2027 rule",
          "rationale": "BCBST themselves flagged (4/13/26) a new regulation requiring ePA to cover drugs in 2027; Jeremy Yoon confirmed 1up is watching the Oct 2027 deadline. CVS Health is already engaged as their pharmacy PA vendor with FHIR PAS / NCPDP 278 integration patterns being discussed — extending the existing CRD/DTR/PAS build to drug PA is a contracted-scope increase with a regulatory deadline, mirroring the FEP add (standard subscription increase per the 6/16 pricing guidance).",
          "fit": "high"
        },
        {
          "play": "HDE from self-service pilot to full production clinical data exchange",
          "rationale": "BCBST is already named an early HDE customer (Jira DNA-1225 self-service pilot, Crawl phase July 2026, Q3 2026 FHIR API implementation). They have clinical resources (Condition, Encounter, Procedure) flowing at scale and a BCBSA interop hub role; converting the Services-configured pilot into a paid production HDE subscription (provider connectivity/clinical data acquisition) is the logical Phase 2 after P2P inbound lands in Q4. Success here is also referenceable across the Blues network.",
          "fit": "medium"
        }
      ],
      "plays_hi": 2,
      "sources": [
        "#account-bcbst (C0A149X5CKV) — full history Dec 2025-Jun 2026, incl. FEP change order thread (2026-06-12) and SQL on FHIR thread (2026-05-05)",
        "#account-bcbst-implementation-9115-0057 (C09PN93DS3T) — history Mar-Jun 2026 (historical load, SDT, Edifecs, auth app/IdP)",
        "#account-bcbst-implementation-0057-epa (C0APWS77UG5) — full history Mar-Jul 2026 (UM vendors, PA logic, LOB coverage)",
        "#arr-services-new-bookings — 2025-10-01 ($1,608,750 ARR/3yr, Lindsay Parker) and 2025-11-10 ($202,500 SOW), verified directly",
        "#product and #proj-velocity — 2026-06-24 Project Velocity updates (BCBST Core API prioritization)",
        "Confluence CKB: 07/07/26 - BCBST Weekly Implementation Meeting (pageId 2478801063) — full status, UAT dates, timeline",
        "Confluence Compliance space: BlueCross BlueShield of Tennessee (BCBST) page 1663893527 — UM vendors by service area",
        "Confluence CKB: weekly BCBST implementation meeting series (3/10/26-07/07/26) and 3/13/26 RBAC page 2095677441 (search results)",
        "Cross-account recon extracts (provided): #2026-0057-access-api--readiness (2026-04-21, 06-18, 06-24); HDE Implementation Playbook + DNA-1225/TOPS-10080..10087; ePA Customer Call Notes (Compliance, 2026-04-06)"
      ],
      "sf": {
        "arr": 536259.999996,
        "cumulative": 1811280,
        "product_rev": 1608780,
        "services_rev": 202500,
        "health": 10,
        "temperature": null,
        "nps": null,
        "renewal_sentiment": null,
        "sentiment_notes": null,
        "flags": [],
        "renewal": "2028-10-01",
        "contract_exp": null,
        "customer_since": "2025-10-01",
        "go_live": null,
        "impl_level": null,
        "products_sold": null,
        "lobs": null,
        "members_contracted": null,
        "members_current": 2579962,
        "competitors": "Edifecs",
        "pbm": null,
        "owner": "Jodi Patton",
        "csm": "Stephanie Iheme",
        "exec_sponsor": "Nolan Kelly",
        "tier": "Maintain",
        "opps": [
          {
            "name": "BCBS TN - CMS 0057",
            "type": "New Business",
            "closed": "2025-10-01",
            "arr": null,
            "services": 0,
            "amount": 1608780,
            "months": 36.01,
            "owner": "Lindsay Parker",
            "won_because": "tech and experience",
            "competitor": "Edifecs & Intersystems"
          },
          {
            "name": "BCBST Services SOW CMS-0057",
            "type": null,
            "closed": "2025-10-10",
            "arr": null,
            "services": 202500,
            "amount": 202500,
            "months": 36.01,
            "owner": "Lindsay Parker",
            "won_because": "Solution and expertise",
            "competitor": null
          }
        ]
      }
    },
    {
      "id": 5,
      "name": "Viva Health",
      "quarter": "q1",
      "qlabel": "Q1 · Jan–Mar",
      "seg": "medadv",
      "seglabel": "Medicare Advantage",
      "note": "UAB-owned · Clinical Connect #4",
      "full": "Viva Health (Triton Health Systems) - HMO owned by UAB Hospital, Birmingham, Alabama; health plan for the University of Alabama Health Care System (Confluence APH 'Viva' page)",
      "dq": "rich",
      "products_and_scope": "Near-full suite built over 3 years: (1) CMS-9115 Patient Access + Provider Directory, bought 2023-06-30 as a Change Healthcare rip-and-replace ($72K ARR + $37K services); handed to Support 2024-02-16. (2) CMS-0057 Provider Access + Payer-to-Payer upsell on renewal 2025-04-22 ($23.2K ARR / $20K services). (3) ePA add-on 2025-08-29 ($110K ARR + $60K services), aligning all 0057 implementations to Jan 1, 2026 commencement; combined P2P/Provider Access/ePA SOW signed 2025-09-09. (4) MPF Provider Directory File Remediation, $8K services (booked 2026-06-11); MPF kickoff held 2026-07-08 (Anissa Nashikkar leading). (5) DPP Clinical Connect pilot - customer #4, 5,000-member roster, 1 connection site (booked 2026-06-15; confirmed 6/26 by Geetika Arora in group DM, Holly Fan shadowing). Viva chose customer-managed opt-out (Provider Access) and customer-file opt-in (P2P), not the 1up-managed UI.",
      "implementation_status": "Roster says Q1 go-live; actual is roughly one quarter behind on Provider Access and further behind on P2P/ePA. Facts: 1/1/26 commencement; questionnaires returned 12/18-1/5; kickoff completed 1/23/26. Original plan (Stacy Harris, 2/3/26) targeted Provider Access live in prod 3/30/26. Reality: first test files 2/24/26; months of file-quality iteration (misspelled filenames, schema errors, 21,129 of 40,293 attribution rows erroring in April, opt-out count confusion); Provider Access enabled in PROD 6/26/26; Provider Access UAT signed off 2026-07-08 (today) with production file delivery ETA the following week - customer wanted live end of June / early July. P2P: still in planning; Viva is building internal opt-in collection under a broader member-preferences project (timing uncertain); asked in June for a demo of expected inbound P2P data and reporting screens. ePA: weekly implementation calls began early June 2026 (Rachel Schuler); CRD logic spreadsheet delivered 6/29/26 and EPAS-6 ticket filed; InterQual integration design unresolved (1up-InterQual meeting set for 7/13/26). MPF: kickoff 7/8/26, gap analysis in progress. Patient Access (9115) has been live since early 2024.",
      "tech_architecture": "Payer side: all UM and care management on home-grown internal systems (no UM vendor); plans X12 integration between 1up ePA stack and internal UM system; InterQual used for criteria/auto-decisioning today (Medicare side, provider portal intake; only ~5 internal criteria); PA intake via phone, provider portal, fax; CVS is PBM. CRD: 1up CRD Server; DTR/PAS approach TBD - 1up presented PAS options 12/2/25 (customer builds PAS API, SFTP folder drop, or custom API); customer wants API-to-API native integration. Provider EHRs: mostly Epic. Provider Access/P2P data flow: CSV extract guides (member-attribution-list header+supplemental v3, provider-access-opt-out v1) dropped to STE, Nifi push STE-to-MTE (UAT MTE partition onboarded 2/2/26); attribution rule = any NPI with a claim in last 24 months. Consoles/URLs: vivahealthfhir.console.1upcoreuat.com (UAT), gateway.1up.health/v1/viva/... (prod, assigned 12/10/25), Keycloak realm 'viva'. First provider group for Provider Access adoption: Complete Health (call 5/20/26). Legacy 9115 pipeline: file-based ingestion (EOB header/pharmacy, CarePlan, Location mapping reviews in Confluence CKB space; DIMA client viva-prod).",
      "financial_signals": "2023-06-30: $72,000 ARR + $37,000 services (Patient Access + Provider Directory, Change rip-and-replace). 2024-06-27: $4,800 ARR upsell + on-time renewal. 2025-04-22: $23,200 ARR / $20,000 services (Provider Access + P2P CARR upsell on renewal). 2025-08-29: $110,000 ARR + $60,000 services (ePA add; aligns all 0057 to Jan 1 2026). 2025-09-09: P2P/Provider Access/ePA SOW signed. 2026-06-11: $8,000 services (MPF Provider Directory File Remediation); MPF SOW signed by 1up (John Lambrecht) 5/22/26 but fully executed countersigned copy not on file as of 6/30/26. 2026-06-15: DPP Clinical Connect customer #4, 5,000-member roster, 1 connection site (no dollars stated). Cumulative ARR from cited bookings: ~$210K.",
      "key_people": "Customer: Anna Strode (Project Manager, main POC), Carl Benton (Director of Provider Engagement), John Owens (Executive Director; interim relationship owner since June 2025 after predecessor Tony left), plus a data resource (Dan) building extracts. Provider group Complete Health: Manji Singh (SVP IT), Jim King (Data Architect), Sunitha Masuram (Lead Developer). 1upHealth: Jodi Patton (account owner/sales), Geetika Arora (CSM since Nov 2025; PTO 7/1-7/10), Stacy Harris (implementation PM, Provider Access/P2P), Rachel Schuler (ePA implementation), Anissa Nashikkar (MPF implementation), Joy He (data engineer), Maria Baker (implementation leadership), Kyle Brew (P2P product), Elizabeth McGowan (Provider Access product), Jeremy Yoon (ePA solutions), Juliette Steinkrauss (ePA vendor agreements), Daniel Couch (eng), Chad Clough (MPF gap analysis), Stephanie Iheme (provider engagement), Holly Fan (shadowing DPP pilot). Prior CSMs: Holly Fan, Joni Dema, Rachel Blair, Annie Kroes.",
      "risks_and_blockers": "1) Timeline slip: Provider Access targeted 3/30/26 live, UAT only signed off 7/8/26 - driven by repeated customer file-quality problems (misspelled filenames, schema errors, invalid NPIs, opt-out confusion). 2) P2P dependent on Viva's internal member-preferences project for opt-in collection; no firm dates; Kyle Brew flagged it could slip to later in the year. 3) ePA complexity: Viva anxious for an end-to-end data-flow diagram of EHR auths + InterQual + internal X12 UM system; InterQual contract with 1up still pending (leadership call on a $10M liability cap per #epa-adoption-growth 7/7/26), which directly impacts Viva's ePA testing timeline. 4) Provider adoption risk: Viva must recruit provider groups; 1up giving them 2 weeks to identify an ePA provider (Jodi, 6/29/26). 5) Admin gap: fully executed MPF SOW not on file as of 6/30/26. 6) Relationship churn: customer exec sponsor Tony departed 2025; four CSM changes on 1up side since 2023.",
      "points_of_interest": "Viva is one of 1up's top ePA bets for 2026 (top ePA customers named 7/7/26: Hamaspik, Viva, TN, MMM - goal to land a provider group). It is also DPP Clinical Connect customer #4 (5,000-member roster pilot), making it both a compliance and clinical-data expansion account. The UAB Hospital ownership is a unique lever: their health system affiliate is a natural first provider connection for Provider Access/ePA/Clinical Connect (their UAT console troubleshooting was even on the UAB side). Viva asked in June 2026 which internal departments should consume P2P inbound data - early signal of appetite for data-value use cases beyond compliance. Note: Viva was an early-2023 win as a Change Healthcare rip-and-replace.",
      "expansion_plays": [
        {
          "play": "Convert DPP Clinical Connect pilot to production clinical data / popconnect contract",
          "rationale": "Pilot already booked (customer #4, 5,000-member roster, 1 connection site) and Viva is owned by UAB Hospital - an in-family health system on Epic that makes site connectivity unusually easy. Success at 1 site scales naturally to the full network and full membership.",
          "fit": "high"
        },
        {
          "play": "Quality/risk analytics (HDE-style) on the FHIR data already flowing",
          "rationale": "Viva explicitly asked what value P2P inbound data has and which departments should access it (6/11/26). With Patient Access live since 2024 and Provider Access/P2P/ePA landing in 2026, 1up already hosts claims + clinical FHIR; packaging Stars/HEDIS/risk-adjustment analytics answers a question the customer is already asking.",
          "fit": "high"
        },
        {
          "play": "ePA scope expansion: PAS/X12 integration services and InterQual Exchange connectivity",
          "rationale": "Their UM is home-grown with no PAS API; 1up presented build options (PAS API, SFTP, custom API) on 12/2/25 and Viva wants API-to-API native integration with X12 to their internal UM. That is a concrete paid-services and product attach opportunity ($60K services already precedent), plus provider-side enablement with Complete Health.",
          "fit": "medium"
        },
        {
          "play": "MPF full product beyond the $8K remediation",
          "rationale": "Current MPF engagement is a small remediation services deal kicked off 7/8/26; if gap analysis (Chad Clough) shows ongoing directory data issues, an ongoing MPF/Provider Directory subscription is the natural follow-on. Fit medium because scope today is small and appetite unproven.",
          "fit": "medium"
        }
      ],
      "plays_hi": 2,
      "sources": [
        "#account-viva (C05GJHD4MGT) - history 2023-07 to 2026-06",
        "#account-viva-implementation-0057-pa-pp (C0A9300G54L) - history 2026-01-15 to 2026-07-08 incl. UAT sign-off message and 6/11 P2P thread",
        "#account-viva-0057-epa (C0B7341N231) - history 2026-06-01 to 2026-07-07 (InterQual/X12 discussion)",
        "#account-viva-mpf-implementation (C0BGL7A3264) - MPF kickoff 2026-07-07/08",
        "#epa-adoption-growth 2026-07-07 recap (top ePA customers; InterQual $10M liability cap)",
        "#provider-access-implementation-party 2026-06-26 (Provider Access enabled in PROD for Viva)",
        "Group DMs: John Lambrecht 6/30/26 (MPF SOW countersign), Geetika Arora 6/26/26 (DPP Pilot for Viva)",
        "Confluence: Compliance1 'Viva' page 1664286734 (ePA notes 5/14/25, 7/22/25, 12/2/25)",
        "Confluence: PD 'Prior Auth Customer Timelines' page 1508147248; APH 'Viva' page 321750582; CKB hand-off page 373391474; CKB file-review pages (EOB, CarePlan, Location)",
        "Jira EPA-285 (Q1 2026 Customer Implementations epic)",
        "#arr-services-new-bookings extracts 2023-06-30, 2024-06-27, 2025-04-22, 2025-08-29, 2026-06-11, 2026-06-15; #sows-inflight 2025-09-09; #2026-0057-access-api--readiness extracts (provided recon, spot-verified against channels)"
      ],
      "sf": {
        "arr": 78899.191224,
        "cumulative": 486104,
        "product_rev": 361104,
        "services_rev": 125000,
        "health": 10,
        "temperature": null,
        "nps": null,
        "renewal_sentiment": 4,
        "sentiment_notes": null,
        "flags": [
          "ROI in question"
        ],
        "renewal": "2028-06-29",
        "contract_exp": "2024-06-29",
        "customer_since": "2023-06-30",
        "go_live": null,
        "impl_level": null,
        "products_sold": null,
        "lobs": "Medicare Advantage",
        "members_contracted": 80000,
        "members_current": 84841,
        "competitors": null,
        "pbm": null,
        "owner": "Jodi Patton",
        "csm": "Geetika Arora",
        "exec_sponsor": "Stephanie Iheme",
        "tier": "Maintain",
        "opps": [
          {
            "name": "Viva Health Plan- New Platform",
            "type": "0125f000000iH45AAE",
            "closed": "2023-06-30",
            "arr": null,
            "services": 37000,
            "amount": 109000,
            "months": 12.02,
            "owner": "Olivia Cleworth",
            "won_because": "1upHealth has superior solutions and a superior roadmap when it comes to FHIR capabilities. Viva felt that 1up was the best choice for a long term partner.",
            "competitor": "Cognizant"
          },
          {
            "name": "Viva Health Plan- Renewal 2024",
            "type": "0125f000000iHVSAA2",
            "closed": "2024-06-27",
            "arr": null,
            "services": 0,
            "amount": 72000,
            "months": 11.96,
            "owner": "Jodi Patton",
            "won_because": "Standard renewal, actively shared renewal documents ahead of the renewal to allow customer time to review.",
            "competitor": null
          },
          {
            "name": "Viva (Triton) Capacity Increase on Renewal",
            "type": null,
            "closed": "2024-06-27",
            "arr": null,
            "services": 0,
            "amount": 4800,
            "months": 11.96,
            "owner": "Drew Arnold",
            "won_because": "capacity increase on renewal",
            "competitor": null
          },
          {
            "name": "25-28 Viva Health Plan Renewal",
            "type": "Existing Business",
            "closed": "2025-05-29",
            "arr": 96393,
            "services": 0,
            "amount": 79104,
            "months": 35.98,
            "owner": "Jessica Candito",
            "won_because": "existing customer",
            "competitor": null
          },
          {
            "name": "25-28 Viva Health Plan P2P and Provider Access",
            "type": "Existing Business",
            "closed": "2025-05-29",
            "arr": null,
            "services": 20000,
            "amount": 43200,
            "months": 32.92,
            "owner": "Jodi Patton",
            "won_because": "existing customer",
            "competitor": null
          },
          {
            "name": "26-28 Viva Health Plan ePA",
            "type": "Existing Business",
            "closed": "2025-08-29",
            "arr": null,
            "services": 60000,
            "amount": 170000,
            "months": 29.9,
            "owner": "Jodi Patton",
            "won_because": "existing customer",
            "competitor": null
          },
          {
            "name": "Viva MPF provider directory file remediation",
            "type": null,
            "closed": "2026-06-01",
            "arr": null,
            "services": 8000,
            "amount": 8000,
            "months": 12.98,
            "owner": "Jodi Patton",
            "won_because": "MPF",
            "competitor": null
          }
        ]
      }
    },
    {
      "id": 6,
      "name": "MMM Holdings",
      "quarter": "q1",
      "qlabel": "Q1 · Jan–Mar",
      "seg": "medadv",
      "seglabel": "Medicare Advantage",
      "note": "Q1 PA+ePA · Q2 P2P in+out",
      "full": "MMM Holdings (MMM Healthcare / \"Medicare y Mucho Más\", San Juan, Puerto Rico — Anthem/Elevance subsidiary; ~600k members; LOBs: Medicare Advantage (MA) and Multi Health GHP Medicaid (MH))",
      "dq": "rich",
      "products_and_scope": "Original platform deal [#arr-services-new-bookings, 2022-06-08]: $1,394,400 ARR + $175,000 implementation — Platform, Patient Access (CMS-9115), Provider Directory, P2P Send, Request & Ingest; Cognizant rip-and-replace. Add-ons: $79K EOB files supplemental services [2023-12-04]; $68,850 Cognizant cutover SOW [2024-03-28]. CMS-0057 upsell signed [#sows-inflight 2025-09-09; #arr-services-new-bookings 2025-12-03]: Prior Auth (ePA: CRD/DTR/PAS), Provider Access API, Payer-to-Payer (inbound + outbound), plus Patient Access updates (EOB Prior Auth) — $553,800 ARR + $140,000 services, contracted through Elevance legal, 1/1/26 commencement. Also in scope: Medicare Plan Finder (MPF) remediation folded into the 0057 project, and an in-flight SDT (sensitive data tagging) expansion request needing a change order. Clinical Data & Coverage file project closed out Feb 2026 [Confluence: 2/19/26 meeting minutes]. Note: MMM did NOT renew original P2P in Sept 2023 [#account-mmm, 2023-09-19] — P2P re-purchased in the 0057 upsell. Roster confirms Q1: Provider Access & ePA; Q2: P2P inbound/outbound; multiple workstreams.",
      "implementation_status": "Active, multiple parallel workstreams, generally on track vs. 1/1/26 commencement (kickoff 2/5/26). As of July 2026: (1) EOB Prior Auth / Patient Access updates — 35 revised NDJSON files ingested; errors down from 1000+ to 109 (missing Provider references) [#...eobpriorauth, 6/24/26]; MMM UAT in progress. (2) Provider Access — member attribution + opt-out test files being iterated; MMM insisting on E2E testing with real MMM data in their UAT environment (1up offered synthetic data); UAT Console IdP setup unresolved [4/2/26]. (3) ePA — MHK integration partially validated: PAS confirmed 6/18/26, awaiting CRD/DTR examples from MHK; connectivity window 6/2–6/29, MMM UAT via Nucural 6/30–7/27; live MHK test session set for 7/13/26; TNPR (2nd UM vendor) routing being scoped (CRD=MHK, DTR=1up static form, PAS=X12). (4) P2P — SOW kickoff June 2026 (Q2 per roster); MMM asked detailed inbound/outbound EG questions in March. (5) MPF — gap analysis delivered (updated 6/18/26); MMM submitted test files early 6/25/26; revised full files due 7/13/26. Earlier: personal-rep/APR project paused June 2025 after MH file stall; third-party app access only cleared by MMM cybersecurity Dec 2025.",
      "tech_architecture": "Sends FHIR data as NDJSON files (legacy of prior Cognizant ETL) rather than 1up flat-file extract guides; files via S3, split by LOB (MA uses 9-digit member card number, MH uses MPI; crosswalk built for unique-ID problem; 3 client IDs/secrets). Clinical source for MH: Excelicare (1up splits combined files by patient-ID pattern). UM vendors: MHK (MedHOK — primary; contacts Terry Campbell PM, Rita Goldberg Interop PM, Parul Rustagi, Prem) with 1up ePA as CRD/DTR/PAS layer and 1up acting largely as passthrough for MHK-specific codified fields; TNPR as delegated 2nd UM vendor (code-based routing); dental auths via dental vendor's own API (no 1up work). Home-grown IdP for member portal (3rd-party form auth, personal rep separate logins, Spanish translation needs); MMM pushing hard to reuse their provider IdP instead of 1up's provider vetting/registration for Provider Access + ePA; Gladys sourcing an EHR contact for IdP-EHR connectivity. Gateway URLs assigned 12/10/25 (gateway.1up.health/v1/mmm-healthcare/...). Admin console: admin.mmmhealthcarefhir.com. Third-party apps: b.well, OneRecord. Confluence APH page notes data-architecture investment since 2017, new payment system + centralized data warehouse budget, and interest in 1up's Blue Flame architecture.",
      "financial_signals": "2022-06-08: $1,394,400 ARR + $175,000 implementation (platform deal). 2023-12-04: $79K supplemental services (EOB files; SOW executed 12/1/23). 2024-03-28: $68,850 services SOW (Cognizant cutover). 2025-12-03: $553,800 ARR + $140,000 services (0057 upsell: Prior Auth, Provider Access, P2P; via Elevance legal; commencement 1/1/26). Pending: SDT change order flagged 6/18/26 — revenue at risk of concession because Gladys claims SDT was promised free since 2022. 2023-09-19: P2P subscription non-renewal (churn later won back).",
      "key_people": "MMM: Gladys Santos Burgos (AVP, project sponsor, final decision maker — forceful negotiator), Marian De Jesus (business PM, Marian.DeJesus@mmmhc.com), Ana E. Gil Matos (source data SME, Ana.Gil@mmmhc.com), Erik Reyes (IT PM), Jose G. Lizardi Ortiz (application architect), Jose Rivera (architect), Nancy De Leon Torres, Jason Lopez (auth manager), Maximiliano Tartabini (data engineer), Marirosa Buendia, Carlos (technical, legacy), Eric Lopez (BA, legacy). Departed: Rachid — left MMM, now Innovation Officer at MCS [#account-mmm, 6/30/26]. 1upHealth: Rachel Schuler (lead IM, 0057), Maria Baker (project sponsor/delivery lead), Tania Gregory (data engineer), Jeremy Yoon (ePA/MHK integration), Kyle Brew (P2P), Assiatou Diallo (IM backup), Geetika Arora & Holly Fan (CS), Robert Davis (delivery/MPF), Jodi Patton (account/commercial, user), Nolan Kelly (sales), Stacy Harris (legacy IM), Elizabeth McGowan (product, Provider Access — departed ~June 2026).",
      "risks_and_blockers": "1) SDT pricing dispute: Gladys \"heatedly\" insists SDT was promised free since 2022 and is \"part of the platform, not a separate product\" [#account-mmm, 6/4/26] — change order unresolved. 2) Provider registration/IdP escalation: MMM formally escalated that 1up won't accept their existing provider IdP for Provider Access/ePA (provider friction, delegate staff) [4/7/26]; recurring security questionnaires (Rachel: \"VERY tired of this topic\", 6/30/26). 3) E2E testing demands: MMM rejects synthetic-data UAT, wants real MMM data loaded into Provider Access UAT + second synthetic NPI [6/26/26] — unscoped work creep (also loaded free test Patient file 7/7/26). 4) MHK dependency: CRD/DTR examples still outstanding; MHK-specific codified fields ownership ambiguous (\"significant lift\" if MHK builds). 5) MPF CMS remediation pressure with CMS emailing deadlines. 6) Relationship attrition: Rachid left MMM; Liz McGowan left 1up mid-Provider-Access build. 7) History: P2P non-renewal 2023, personal-rep project paused 2025, MH file delivery stalls — MMM can deprioritize abruptly. 8) 109 residual Prior Auth ingestion errors pending confirmation.",
      "points_of_interest": "Elevance/Anthem subsidiary — contracts route through Elevance legal, and success here is referenceable across the Elevance family. Puerto Rico's largest MA plan; bilingual (Spanish) UI/consent requirements shaped custom Health History screens. MMM's insistence on real-data UAT drove 1up to build a reusable automated test-data process (test patients, opt-out, attribution files) for future customers [#2026-0057-access-api--readiness, 5/7/26]. MMM prefers NDJSON FHIR files over 1up extract guides — accommodated across all workstreams. Two-UM-vendor ePA topology (MHK + TNPR + dental carve-out) is one of the more complex ePA routing builds. Departed champion Rachid is now Innovation Officer at MCS (another PR payer) — warm intro path. Confluence APH page records MMM interest in Blue Flame architecture and a centralized data warehouse initiative.",
      "expansion_plays": [
        {
          "play": "Close the SDT (sensitive data tagging) change order as a paid expansion, bundled with a goodwill concession",
          "rationale": "MMM has explicitly said they want SDT now (weekly update 6/5/26) and is already asking implementation-level questions (file cadence, full-replace semantics, retro-tagging). Deal risk is pricing emotion, not demand — Gladys claims a 2022 free-of-charge promise. Package SDT with the member-consent-for-sensitive-sharing roadmap item MMM requested (6/17/26 readiness channel) to convert a dispute into a roadmap partnership.",
          "fit": "high"
        },
        {
          "play": "Clinical data analytics / popconnect + HDE on the FHIR data already flowing (quality/risk use cases, Blue Flame)",
          "rationale": "MMM just completed a Clinical Data & Coverage ingestion project (closed Feb 2026), asked for Bulk FHIR export of their data (Nov 2025), has budgeted a centralized data warehouse, and the APH Confluence page records 'considerable interest in the Blue Flame architecture from MMM.' They are an MA plan where Stars/risk-adjustment analytics on clinical+claims FHIR data is directly monetizable.",
          "fit": "high"
        },
        {
          "play": "EHR/provider-network connectivity services: IdP-EHR integration for Provider Access & ePA adoption",
          "rationale": "Gladys personally sourced an EHR contact and asked 1up to scope IdP integration with an EHR for Provider Access/ePA connectivity (6/25/26 call) — this addresses their #1 escalation (provider registration friction) and is a natural paid services + ePA-utilization expansion. Owner gap exists since Liz McGowan's departure; assigning a product owner unlocks it.",
          "fit": "medium"
        },
        {
          "play": "Referral beachhead at MCS via Rachid (now MCS Innovation Officer)",
          "rationale": "Rachid left MMM for MCS as Innovation Officer (6/30/26). MCS is another Puerto Rico payer facing identical CMS-0057 deadlines; a champion who lived the 1up implementation is a low-cost new-logo play adjacent to this account.",
          "fit": "medium"
        }
      ],
      "plays_hi": 2,
      "sources": [
        "#account-mmm (C03LW84NM16) — history 2023-10 through 2026-06-30",
        "#account-mmm-implementation-0057-provider-access-and-patient-access-eobpriorauth (C0A9WAK5LCW) — full history 2026-01-20 to 2026-07-08",
        "#account-mmm-implementation-0057-epa (C0AA1V73A7N) — full history 2026-01-20 to 2026-07-08",
        "#account-mmm-mpf-implementation (C0ASHD55ZU0) — full history 2026-04-08 to 2026-07-02",
        "#account-mmm-implementation-patient-access-and-apr (C04A54XFQ21) — history 2025-04 to 2026-07",
        "#payer-to-payer-public (C08V0J3RN05) — MMM P2P EG questions 2026-03-06/09",
        "#2026-0057-access-api--readiness (C0A36DHR84R) — MMM P2P/SDT questions 2026-03-31, 2026-06-17",
        "Confluence: MMM Customer Success Handoff (CKB space, page 228491368)",
        "Confluence: MMM 0057 Provider Access & Patient Access meeting minutes series (CKB, e.g. pages 2246443027, 2337767438, 2445213699)",
        "Confluence: 4/24/26 ePA MMM / 1up / Med Hoc (MHK) (CKB page 2249424922)",
        "Confluence: 2/19/26 MMM Clinical Data & Coverage File Project minutes (CKB page 2012643346)",
        "Confluence: MMM (APH space, page 321619245)",
        "Cross-account recon extracts: #arr-services-new-bookings (2022-06-08, 2023-12-04, 2024-03-28, 2025-12-03), #sows-inflight (2025-09-09), ePA Customer Call Notes (Compliance space)"
      ],
      "sf": {
        "arr": 603654.746148,
        "cumulative": 5735598,
        "product_rev": 5272748,
        "services_rev": 462850,
        "health": 10,
        "temperature": null,
        "nps": null,
        "renewal_sentiment": 5,
        "sentiment_notes": null,
        "flags": [],
        "renewal": "2028-06-07",
        "contract_exp": "2023-06-07",
        "customer_since": "2022-06-08",
        "go_live": null,
        "impl_level": "Level IV",
        "products_sold": "FHIR Interoperability Platform;Patient Access;Provider Directory;Payer to Payer Send;Request and Ingest",
        "lobs": "Medicaid;Medicare Advantage",
        "members_contracted": 1250000,
        "members_current": 807091,
        "competitors": null,
        "pbm": null,
        "owner": "Jodi Patton",
        "csm": "Geetika Arora",
        "exec_sponsor": "Andrew Boyd",
        "tier": "Maintain",
        "opps": [
          {
            "name": "MMM Holdings - Full Platform",
            "type": "0125f000000iH45AAE",
            "closed": "2022-06-10",
            "arr": null,
            "services": 175000,
            "amount": 1507548,
            "months": 11.96,
            "owner": "Bobby Fredrickson",
            "won_because": null,
            "competitor": null
          },
          {
            "name": "RENEWAL - MMM Holdings - Full Platform 2023",
            "type": "0125f000000iHVSAA2",
            "closed": "2023-06-08",
            "arr": null,
            "services": 0,
            "amount": 1128800,
            "months": 12.02,
            "owner": "Annie Kroes",
            "won_because": "moving SOW forward",
            "competitor": null
          },
          {
            "name": "SOW: EOB Supplemental Implementation Services",
            "type": "0125f000000FCKeAAO",
            "closed": "2023-12-01",
            "arr": null,
            "services": 79000,
            "amount": 79000,
            "months": 11.99,
            "owner": "Drew Arnold",
            "won_because": "Our relationship as a customer and the need to move these EOB files into our platform in order to be compliant",
            "competitor": null
          },
          {
            "name": "SOW: Cognizant Cutover",
            "type": "0125f000000FCKeAAO",
            "closed": "2024-03-28",
            "arr": null,
            "services": 68850,
            "amount": 68850,
            "months": 11.99,
            "owner": "Drew Arnold",
            "won_because": "A good relationship and partnership",
            "competitor": null
          },
          {
            "name": "MMM: Renewal 2024",
            "type": "0125f000000iHVSAA2",
            "closed": "2024-08-30",
            "arr": null,
            "services": 0,
            "amount": 1128800,
            "months": 11.96,
            "owner": "Drew Arnold",
            "won_because": "A good relationship and continued partnership",
            "competitor": null
          },
          {
            "name": "25-28 MMM Renewal",
            "type": "0125f000000iHVSAA2",
            "closed": "2025-09-30",
            "arr": null,
            "services": null,
            "amount": 1128800,
            "months": 35.98,
            "owner": "Jodi Patton",
            "won_because": "A good relationship and continued partnership",
            "competitor": null
          },
          {
            "name": "25-28 MMM Provider Access, P2P, ePA",
            "type": "0125f000000iHVSAA2",
            "closed": "2025-12-03",
            "arr": null,
            "services": 140000,
            "amount": 693800,
            "months": 29.17,
            "owner": "Jodi Patton",
            "won_because": "A good relationship and continued partnership",
            "competitor": null
          }
        ]
      }
    },
    {
      "id": 7,
      "name": "CVS Health",
      "quarter": "q1",
      "qlabel": "Q1 · Jan–Mar",
      "seg": "bespoke",
      "seglabel": "Bespoke / Channel",
      "note": "Bespoke · P2P only",
      "full": "CVS Health (Aetna) — 1upHealth customer since 2020-2021; bespoke single-tenant Payer-to-Payer deal",
      "dq": "rich",
      "products_and_scope": "P2P only, but the deepest bespoke P2P deployment in the book. History: P2P Request & Ingest $420k ARR signed 2021-07-23; FHIR Parser (data acquisition/conversion) $50k ACV 2021-09-27; Clinical Connectivity for Chronic Kidney Disease program $42k ARR 2022-06-01 [#arr-services-new-bookings]. Current contract: P2P Inbound + Outbound with custom GCP convertor — 1-year renewal + upsell finalized 2026-03-19 (+$225K ARR, $50K services); the outbound upsell itself was first booked 2025-12-31 via \"creative contracting\" (one-month extension then full-year contract) [#arr-services-new-bookings, #growth-updates 2026-01-02, Jodi Patton]. The $225K ARR upsell covers the outbound add-on only (Jodi DM to Kyle Brew 2026-03-04). Outbound scope per contract: 1up acts as \"proxy front door\" for CVS's own P2P FHIR APIs hosted in CVS GCP — gateway routes for FHIR multi-member-match and Group Export, OAuth2 client-credentials/JWT auth, mTLS integration to CVS GCP, FHIR AuditEvent capture [Confluence PD: \"CVS Outbound Proxy Requirements\", updated May 2026]. Deliberately excluded from the standard January 0057 customer readiness list as a \"special use case — P2P onboarding only\" [#2026-0057-access-api--readiness, 2025-12-10]. Also drives P2P Member Opt-In app integration with CVS's Consent API and the Dynamic Member Creation enhancement (Jira PROD-21) [Confluence PD draft, May 2026]. Outstanding commitment: push P2P-retrieved data to CVS's downstream system on recurring basis (Jira PROD-61).",
      "implementation_status": "Roster says Q1 2026; actual status: DELAYED. Confluence \"Bi-weekly Product Roadmap Updates\" (PD space) marks \"CVS 0057 P2P Outbound Proxy — delayed — Delayed due to CVS development delays - will push to Q3,\" with \"CVS production go-live (Oct)\" on the roadmap. Test scaffolding for the outbound proxy epic (CA-1522, TOPS-8590–8598: QA/Stage/UAT/Prod test executions) exists but work is queued. Kyle Brew (Product) is personally building/implementing the outbound proxy, not the services team [John Lambrecht DM, 2026-05-04]. Legacy P2P inbound has been live in production for years (19 payer connections; Humana, Florida Blue etc.) and volumes are accelerating: 16 payer connections established Jan–Feb 2026 vs 7 in all of 2025; 2026 FHIR resources ingested already ~2.5x all of 2025, driven by ex-Humana members and Humana now sharing full reference data (Org 94,196 / Practitioner 90,594 / Location 56,349 resources in 2026) [#account-cvsh thread 2026-02-09→02-19, Kyle Brew/Irtiza Mahmud]. Migration plan: once the new P2P MTE solution stands up later in 2026, the CVS single-tenant environment (STE) will simply be decommissioned — no data migration needed [#proj-velocity, Kyle Brew, 2026-05-14]. CMS deadline anchor: P2P must be live 1/1/2027 [Confluence \"ADR Ingestion Pipeline Approach - P2P + Emerald\"].",
      "tech_architecture": "Highly bespoke. Inbound (legacy, live): 1up single-tenant env on AWS (1up-cvshealth-dev/prod; api.cvshealthfhir.com, auth.cvshealthfhir.com; dev: api.cvshealthfhirdev.com) pulls member data from external payers via P2P, runs patient matching + custom \"aetna transfer service\" transformations (appends 3 CVS Patient identifiers: EPH-GLOBAL-ID, IMI-PROXY-ID, SOURCE-MEMBER-ID [Confluence \"CVS Resource Transformations\"]), and lands FHIR into CVS's GCP FHIR store / CDR landing bucket (Google Cloud Healthcare API with HL7 validation on the GCP side). ~24 FHIR resource types delivered (Patient, Coverage, Condition, Encounter, DiagnosticReport, CarePlan, DocumentReference, etc. [#account-cvsh 2026-02-05]). Audit events flow: ACE (DT-CommunicationTracker) → 1up → B2B → EDP → Hadoop DB on CVS side. Opt-in UX: members SSO from CVS/Aetna portal into 1up Member Console P2P Opt-In app via Keycloak (kc_idp_hint=cvs) [Confluence \"CVS Opt-In Authentication Proposal\"]; integrates with CVS's own Consent API. Outbound (new, in build): 1up gateway proxies CVS's GCP-hosted P2P APIs (multi-member-match, Group Export) with OAuth2/mTLS. Other CVS stack facts: CRD + PAS (prior auth) APIs built in-house, integrated with MedCompass UM system; own attribution engine (Ron doubts it for Provider Access); Aetna security uses Imperva; aligning APIs to US Core STU 6.1.0 [#account-cvsh 2025-08-22, 2025-05-27].",
      "financial_signals": "2021-07-23: P2P Request & Ingest $420k ARR. 2021-09-27: FHIR Parser $50k ACV. 2022-06-01: Clinical Connectivity CKD $42k ARR. 2025-12-31: P2P Outbound upsell $225,000 ARR (EOY close, creative contracting). 2026-03-19: full 1-yr renewal + upsell finalized — +$225K ARR, $50K services [all #arr-services-new-bookings]. 2026-05-04: John Lambrecht (finance) notes ~$700K (\"over 600k... sorry, almost 700k\") to invoice, blocked on a CVS PO; Jodi's contact working it [DM D03M9ULEE9X]. Likely total ARR in the ~$650-700K range (inference from $420K base + $225K upsell + prior add-ons).",
      "key_people": "Customer: Ron Wampler (interoperability lead, primary champion, \"full autonomy,\" pro-1up; wants 1up as his full inbound+outbound P2P network; evaluated 17 ePA vendors); Jocelyn Keegan (VP Interoperability at Aetna since Aug 2024, ex-Point of Care Partners, supportive); Jared Morelli (Team Lead, interoperability — requested the P2P Outbound quote June 2025); \"Mark\" (comms escalation contact alongside Ron); Nehal (CVS prioritization contact); Naresh (CVS support/audit-event thread); Sowmya (Aetna Interop Clinical team, US Core 6.1.0 E2E testing). 1upHealth: Jodi Patton (Account Manager, owns renewals); Kyle Brew (Product, P2P lead — personally building the outbound proxy/GCP convertor); Nolan Kelly (Sales exec sponsor); Geetika Arora (CSM, joined Feb 2026); Irtiza Mahmud (implementation/support, day-to-day since Oct 2025); Neha Talnikar (P2P engineering); Ryan Ingram (solutions, helped close upsell); Dan Petersen (contracting); John Lambrecht (finance/invoicing); Robert Davis (former P2P imp support, left channel Jun 2026).",
      "risks_and_blockers": "1) Outbound proxy go-live slipped from Q1 to Q3 2026 (prod go-live targeted Oct) — explicitly \"due to CVS development delays\" [Confluence Bi-weekly Product Roadmap Updates]; CMS 1/1/2027 deadline compresses runway. 2) ~$700K invoice pending a CVS PO as of May 2026 — collection risk/administrative friction. 3) Feb 2026 support friction: CVS escalated millions of audit-event records and \"junk records\" breaking their automated Hadoop load 4x since January; 1up held the line (filter on CVS side) to protect the 0057 roadmap — a fix request could resurface [#account-cvsh thread 2026-02-09, 28 replies]. 4) Legacy STE is a support burden (HL7 validation failures 01/04/2026: 1,578 records; Safari mobile bug 2025; recurring GCP ingest issues) and its decommission depends on the new P2P MTE solution landing later in 2026. 5) CVS IT builds competing capability in-house (CRD/PAS/ePA, RTPBC in their own API library since June 2025) — shrinks whitespace unless Ron's pro-vendor stance wins. 6) Champion concentration risk: relationship heavily routed through Ron Wampler.",
      "points_of_interest": "- The outbound deal is architecturally unique: 1up is contractually the \"proxy front door\" for APIs CVS itself hosts in GCP — a reverse of the normal model, and a template for \"1up as network\" positioning. Ron explicitly asked (Apr 2025) for 1up to be his network for both inbound and outbound P2P, including front-ending Payer Registration.\n- Marketing is producing an anonymous P2P ebook case study featuring the CVS engagement (draft June 2026, Leslie Barthel/Nolan/Jodi) — reusable asset for the portfolio play.\n- CVS planned targeted member comms (Sept 2024) driving enrollees from the 19 connected payers to use P2P — interop is a CEO-level strategic topic since David Joyner became CVS CEO (Oct 2024).\n- P2P volume inflection in 2026 (Humana member wins + full reference data) is concrete usage proof for renewal/expansion conversations.\n- CVS is one of two customers driving the Member Opt-In + external Consent API integration and Dynamic Member Creation (PROD-21) product work.\n- Second CVS-adjacent surface: Cook County switched PBM to CVS; their 0057 scope now includes reimplementing Claims/Formulary/Rx Directory APIs against CVS [#account-cook-county 2026-06-08].",
      "expansion_plays": [
        {
          "play": "ePA / Prior Auth (CMS-0057) add-on",
          "rationale": "Ron Wampler evaluated 17 ePA vendors and wants CVS to use a vendor because he 'doesn't have faith in the internal IT org' [Nolan Kelly, #account-cvsh 2025-04-18]; he attended 1up's 4/29/2025 ePA webinar and recruited colleagues. Counterweight: CVS IT claims all ePA work is in-house and shipped CRD/PAS/RTPBC to sandbox June 2025, integrated with MedCompass. Window exists if MedCompass volume limits bite (Annie noted MedCompass 'could have limitations' as Aetna membership grows).",
          "fit": "medium"
        },
        {
          "play": "Provider Access API — extend P2P-only to fuller 0057 suite",
          "rationale": "Ron has 'lots of questions around Attribution' for Provider Access and isn't confident in CVS/Aetna's own attribution engine [#account-cvsh 2025-04-18]. 1up already holds the member-match + Group Export proxy plumbing for CVS GCP, so Provider Access on the same gateway/bulk-export pattern is a natural adjacency, and CVS's exclusion from the standard 0057 readiness program is the gap to sell against.",
          "fit": "high"
        },
        {
          "play": "P2P Network expansion: payer registration front-end + downstream data push (grow the bespoke footprint)",
          "rationale": "Ron explicitly wants 1up as his network for both inbound and outbound P2P, requiring 1up to front-end Payer Registration and retrieve/return data from CVS GCP [2025-04-18]; there is already an unscoped contractual commitment to push P2P data to CVS's downstream system recurring (PROD-61). Packaging registration/vetting, network connections (Availity/Onyx/Edifecs interconnects), and the downstream push as a paid Phase 2 monetizes work partly promised anyway.",
          "fit": "high"
        },
        {
          "play": "Clinical data / HDE re-entry via the CDR relationship",
          "rationale": "CVS's CDR team already consumes 1up-delivered FHIR clinical data (24 resource types) and CVS previously bought Clinical Connectivity for the CKD program ($42k, 2022). With the Emerald/HDE clinical pipeline maturing at 1up, a quality/risk/clinical-data play on data already flowing into their GCP FHIR store is a credible upsell — but likely requires a new buying center beyond Ron's interop team.",
          "fit": "medium"
        }
      ],
      "plays_hi": 2,
      "sources": [
        "Slack #account-cvsh (CUFUE3NKD) — channel history 2024-06 through 2026-06, incl. threads 2026-02-09 (audit event volume, 28 replies), 2026-01-09 (HL7 validation failures), 2025-04-18 (Ron Wampler meeting notes), 2025-05-27 (in-house CRD/PAS/MedCompass), 2025-06-10 (P2P Outbound quote request from Jared Morelli), 2025-08-22 (US Core STU 6.1.0 E2E testing)",
        "Slack #arr-services-new-bookings (C01KG7PJEDV) — 2026-03-19 Jodi Patton renewal/upsell post (+$225K ARR/$50K services); plus cross-account extracts 2021-07-23, 2021-09-27, 2022-06-01, 2025-12-31",
        "Slack #growth-updates (C07P8HKL52B) — 2026-01-02 EOY wins post (CVS P2P outbound secured, creative contracting)",
        "Slack #proj-velocity (C08A0QU0733) — 2026-05-14 Kyle Brew on CVS STE decommission plan",
        "Slack DM D03M9ULEE9X (John Lambrecht/Jodi) — 2026-05-04 ~$700K invoice pending PO; SOW covers inbound+outbound",
        "Slack DM D03LW6NKRJ4 (Kyle Brew/Jodi) — 2026-03-04/03-09 $225K = outbound-only upsell; single SOW",
        "Slack group DM C09HVRW8ML6 — 2026-06-23 anonymous CVS P2P case study/ebook",
        "Slack #account-cook-county — 2026-06-08 Cook County PBM switch to CVS",
        "Slack #2026-0057-access-api--readiness — 2025-12-10 CVS excluded as P2P-only special case (recon extract)",
        "Slack channels also found: #cvs-incident-response-p2paudit-events (C06GEM2NFA9), #cvs-open-tickets (C088LJUB4GJ)",
        "Confluence PD: CVS Outbound Proxy Requirements (pageId 1926397954, Kyle Brew, updated May 2026)",
        "Confluence PD: CVS Resource Transformations (pageId 2432106517)",
        "Confluence PD: Bi-weekly Product Roadmap Updates (pageId 2341077003) — outbound proxy delayed to Q3, Oct prod go-live",
        "Confluence API space: CVS Opt-In Authentication Proposal (pageId 2440232976)",
        "Confluence PD: P2P Q1 2026 Plan (1702133761), P2P Inbound 2025 Q4 Status (1801453575), ADR Ingestion Pipeline Approach - P2P + Emerald (2230452226), 2024-02-23 CVS P2P Postmortem (387088663), CVS Payer-Not-Found Audit Events (1653538851)",
        "Jira: CA-1522 CVS P2P Outbound Proxy Service epic (TOPS-8590 through 8598 test tickets), PROD-61 (push P2P data to CVS downstream system), PROD-21 (Dynamic Member Creation, from recon extract)"
      ],
      "sf": {
        "arr": 495000,
        "cumulative": 3238552,
        "product_rev": 2992552,
        "services_rev": 246000,
        "health": 10,
        "temperature": "Green",
        "nps": null,
        "renewal_sentiment": 5,
        "sentiment_notes": null,
        "flags": [],
        "renewal": "2026-12-30",
        "contract_exp": "2024-12-31",
        "customer_since": "2019-08-01",
        "go_live": "2020-06-01",
        "impl_level": "Level IV",
        "products_sold": "Request and Ingest;Clinical Connectivity;Health History",
        "lobs": null,
        "members_contracted": 200000,
        "members_current": 24360124,
        "competitors": null,
        "pbm": null,
        "owner": "Jodi Patton",
        "csm": "Geetika Arora",
        "exec_sponsor": "Nolan Kelly",
        "tier": "Maintain",
        "opps": [
          {
            "name": "Aetna New Sale",
            "type": "0125f000000iH45AAE",
            "closed": "2019-08-01",
            "arr": null,
            "services": 0,
            "amount": 200000,
            "months": 11.99,
            "owner": "Ariana Zamora",
            "won_because": "adding to reconcile diff with Maxio",
            "competitor": null
          },
          {
            "name": "Aetna 2020 RENEWAL",
            "type": "0125f000000iHVSAA2",
            "closed": "2020-08-01",
            "arr": null,
            "services": 0,
            "amount": 200000,
            "months": 11.96,
            "owner": "Ariana Zamora",
            "won_because": null,
            "competitor": null
          },
          {
            "name": "Aetna P2P",
            "type": "0125f000000iH45AAE",
            "closed": "2021-07-27",
            "arr": null,
            "services": 135000,
            "amount": 355000,
            "months": 12.29,
            "owner": "Nolan Kelly",
            "won_because": null,
            "competitor": null
          },
          {
            "name": "Aetna FHIR Parser",
            "type": "0125f000000iH45AAE",
            "closed": "2021-09-27",
            "arr": null,
            "services": 24000,
            "amount": 74000,
            "months": 11.96,
            "owner": "Nolan Kelly",
            "won_because": null,
            "competitor": null
          },
          {
            "name": "UPSELL: P2P CVS Health",
            "type": "0125f000000iH4tAAE",
            "closed": "2021-10-05",
            "arr": null,
            "services": 0,
            "amount": 83333,
            "months": 4.99,
            "owner": "Ariana Zamora",
            "won_because": "n/a rev rec az 4/10/24",
            "competitor": null
          },
          {
            "name": "Clinical Connectivity Expansion 021",
            "type": "0125f000000iH4tAAE",
            "closed": "2021-12-15",
            "arr": null,
            "services": 0,
            "amount": 200000,
            "months": 12.45,
            "owner": "Ariana Zamora",
            "won_because": null,
            "competitor": null
          },
          {
            "name": "CVSH/Aetna - clinical providers",
            "type": "0125f000000iH45AAE",
            "closed": "2022-06-01",
            "arr": null,
            "services": 0,
            "amount": 42000,
            "months": 11.96,
            "owner": "Nolan Kelly",
            "won_because": null,
            "competitor": null
          },
          {
            "name": "RENEWAL: CVS Platform Renewal",
            "type": "0125f000000iHVSAA2",
            "closed": "2022-08-01",
            "arr": null,
            "services": 0,
            "amount": 220000,
            "months": 11.96,
            "owner": "Ariana Zamora",
            "won_because": "n/a rev rec 4/10/24",
            "competitor": null
          },
          {
            "name": "RENEWAL: CVS P2P 2022",
            "type": "0125f000000iHVSAA2",
            "closed": "2022-08-01",
            "arr": null,
            "services": 0,
            "amount": 200000,
            "months": 11.96,
            "owner": "Ariana Zamora",
            "won_because": null,
            "competitor": null
          },
          {
            "name": "RENEWAL - Aetna P2P Subscription 2023",
            "type": "0125f000000iHVSAA2",
            "closed": "2023-09-14",
            "arr": null,
            "services": 0,
            "amount": 200000,
            "months": 11.99,
            "owner": "Annie Kroes",
            "won_because": "Set with Renewal in July",
            "competitor": null
          },
          {
            "name": "RENEWAL - Aetna P2P Platform 2023",
            "type": "0125f000000iHVSAA2",
            "closed": "2023-09-14",
            "arr": null,
            "services": 0,
            "amount": 312219,
            "months": 17.02,
            "owner": "Annie Kroes",
            "won_because": "platform and recontracting",
            "competitor": null
          },
          {
            "name": "SOW CA Mandate P2P Microsite changes",
            "type": "0125f000000FCKeAAO",
            "closed": "2023-09-22",
            "arr": null,
            "services": 37000,
            "amount": 37000,
            "months": 11.99,
            "owner": "Ariana Zamora",
            "won_because": "Client need",
            "competitor": null
          },
          {
            "name": "RENEWAL - Aetna P2P Platform 2024",
            "type": "0125f000000iHVSAA2",
            "closed": "2024-12-30",
            "arr": 420400,
            "services": 0,
            "amount": 420000,
            "months": 11.96,
            "owner": "Jodi Patton",
            "won_because": "platform and recontracting",
            "competitor": null
          },
          {
            "name": "25-28 Aetna P2P Outbound",
            "type": "0125f000000iHVSAA2",
            "closed": "2025-12-30",
            "arr": null,
            "services": 50000,
            "amount": 275000,
            "months": 35.98,
            "owner": "Jodi Patton",
            "won_because": "platform and recontracting",
            "competitor": null
          },
          {
            "name": "25-26 Aetna P2P Platform Renewal",
            "type": "0125f000000iHVSAA2",
            "closed": "2025-12-30",
            "arr": 420400,
            "services": null,
            "amount": 420000,
            "months": 11.96,
            "owner": "Jodi Patton",
            "won_because": "platform and recontracting",
            "competitor": null
          }
        ]
      }
    },
    {
      "id": 8,
      "name": "Advanced Health",
      "quarter": "q1",
      "qlabel": "Q1 · Jan–Mar",
      "seg": "medicaid",
      "seglabel": "Medicaid MCO / CCO",
      "note": "",
      "full": "Advanced Health (Western Oregon Advanced Health, LLC; official company name DOCS Management Services, LLC) — Oregon CCO, 1 LOB Managed Medicaid (OHP), ~27k members (contract allows up to 50,000 active members per term). Referred by Cascade Health Alliance.",
      "dq": "rich",
      "products_and_scope": "Phase 1: CMS-9115 Patient Access + Provider Directory (1 LOB Managed Medicaid), including CARIN BB EOBs (inpatient/outpatient/professional/oral/pharmacy), Plan-Net provider directory, US Core CarePlan, and formulary/pharmacy directory via MedImpact [Handoff page 1489436931; #account-advancedhealth-implementation-9115]. Phase 2: full CMS-0057 suite — Provider Access API, Payer-to-Payer, Patient Access Prior Auth EOB, and ePA (CRD/DTR/PAS via X12 278/275 conversion) [0057 kickoff deck 5/11/26 in #account-advancedhealth-implementation-0057-apis; ePA discovery Confluence page 2331901995]. Order Form dated 05-22-25; contract includes a joint press-release clause [#sales-marketing]. SOW was signed by their CFO (flagged internally as a review-process concern, 7/29/25).",
      "implementation_status": "9115 Patient Access + Provider Directory: LIVE — go-live 5/27/2026, handoff to CS/Support 5/28/2026, ~9-month implementation, announced in #general. This slipped from the planned Q1 window (roster says Q1 Jan–Mar; internal status cited \"Go Live ETA of end of January\" on 12/16/25) due to the MedImpact contract/file standstill and multiple rounds of EOB test-file rework. 0057 Access APIs: commencement 1/1/26 (endpoint URLs emailed 12/31/25), kickoff 5/11/26, now in build/test — prior auth, opt-out, and member attribution test files delivered 6/26 and under review; V2-spec test file fixes due 7/10/26; UAT console ticket 00008731 submitted 7/7/26; all Access APIs scoped in Planhat to go live end of August 2026. ePA: separate channel opened 5/13/26, discovery call 5/20/26; 1up recommended starting implementation 7/15/26 with its X12 converter available August 2026.",
      "tech_architecture": "File-based CSV extract-guide (EG) pipeline over SFTP/S3 (bucket 1up-advancedhealth-prod-data-ingest); NiFi ingestion + Avro schema validation + DIMA mapping; Sidewinder used to convert MedImpact fixed-width 112 files to EG format. Claims platform: Plexis (internally hosted UM/claims software; no FHIR APIs, so ePA will use X12 278/275 conversion; integration is with Advanced Health directly, not Plexis). Considering a UM vendor switch, with Essette (Gainwell) the candidate. PBM: MedImpact — sends Pharmacy EOBs (112s), Formulary (FDB), and Pharmacy Directory (PHALIST) via MedImpact FTP (t0809), pulled by a custom NiFi flow into AH's S3; no CoveragePlan file, so 1up hard-coded formulary mapping values with client approval. Dental: Advantage Dental produces dental EOBs in EG format (routes via Advanced Health); dental prior auth files also needed from them for 0057. OHA behavioral-health \"carve-out\" file (FFS drugs billed to Oregon Health Authority) discussed for 9115. Legacy system migration Nov 2021 limits history; previous interop vendor's API sunset 4/30/26. Provider Access bulk export URL: https://gateway.1up.health/v1/advanced-health/bulk-data/r4/$export. Opt-in/opt-out: 1up-managed for both Provider Access (email + file) and P2P.",
      "financial_signals": "No ARR/booking dollar amounts found in Slack/Confluence. Facts found: Order Form dated 05-22-25 (Google Drive copy in #account-advancedhealth); contract cap \"up to 50,000 active members\" per term; per Maria Baker (5/11/26) 1up should have invoiced 0057 in Jan 2026 — subscription URL email sent 12/31/25, but the Services one-time-fee invoice status was unconfirmed and customer (Chris Wilson) asked about invoicing/adjustments at 0057 kickoff; Priority-style dollar figures for this account: none found. Gmail is the user's personal account — no relevant email.",
      "key_people": "Customer: Chris Wilson (Director of Health Information Systems, primary contact), Cory Peacock (Programmer/Technical Lead — sole tech resource building all extracts), Samyukta \"Sam\" Vendrathi (COO, joined ePA discovery), Raya Nematian (Director of Pharmacy, 1/26/26 minutes); CFO signed the SOW. 1upHealth: Stacy Harris (Implementation Manager, 9115 + account lead), Whitney (Data Implementation Engineer, 9115), Tania Gregory (DIE coverage), Assiatou Diallo (IM, 0057 Access APIs), Simone Graham (data eng, 0057), Rachel Schuler (Sr IM, ePA), Jeremy Yoon (Sr PM, ePA), Maria Baker (CS/account), Robert Davis \"Robzzz\" (data architecture), Anissa Nashikkar (MedImpact relationship), Olivia Cleworth (contracts/sales), Matt Leskovar (billing), Holly Fan/Geetika Arora (console, member-website interop guidance), Kyle Brew & Elizabeth McGowan (Product — Provider Access/P2P), Avi Lessure (Product).",
      "risks_and_blockers": "1) MedImpact dependency: no direct 1up–MedImpact contract for AH; Jan 2026 contractual standstill (MedImpact withheld Coverage Plan and Pharmacy Listing, pitched its own interop/API product; AH declined) delayed go-live from ~Jan to May; missing Feb–May formulary files recurred post-go-live (5/27/26). 2) Prior Auth EOB spec gaps: AH does not track dollar-based auth limits (units/visits only) — header allowed-amount blocker raised 6/15–6/26, solved 7/6/26 (amount slice USD-only with quantity alongside). 3) Advantage Dental must produce prior-auth test files for 0057 (open since 6/22/26; dental-providers-in-attribution question open). 4) Single technical resource (Cory) repeatedly split between file creation and UAT; OOO periods stalled progress. 5) Invoicing confusion at 0057 kickoff (services one-time fees possibly never invoiced in Jan). 6) Customer explicitly said they'll \"need help thinking through the new regs\" (12/31/25). 7) Data-quality history: duplicate EOB headers, ~55% inpatient records missing line items, erroneous test patients inflating member counts (81,321 unique member IDs ingested vs ~27k real members vs 50k contract cap — cleanup via delete flags). 8) UM vendor switch (possibly Essette/Gainwell) could force ePA re-scope in 2027.",
      "points_of_interest": "Referred by Cascade Health Alliance and wants to replicate Cascade's member-data-access website setup (11/17/25 notes). Gong calls under \"1upHealth and Advanced Health Weekly Sync\" / account \"Western Oregon Advanced Health, LLC\"; MedImpact plan code DOC01. Mission Alignment call requested June 2026 for Cory Peacock and Chris Wilson. AH is in Rachel's first wave of ePA provider-outreach emails (7/7/26 #epa-adoption-growth). Historical lookback question open: whether Patient Access prior auth historical load is 1 year (raised 6/22 and 7/7). Provider Directory full daily files approved by Robert due to small population. Oregon-specific requirements recur (OAR 410-141-3591 1-business-day Rx adjudication data; OHA 7/11 carve-out file; OHA-assigned specialty codes) — regulatory expertise is a stickiness lever.",
      "expansion_plays": [
        {
          "play": "ePA rules expansion + UM-vendor re-integration SOW (2027)",
          "rationale": "ePA baseline is 1up-hosted CRD/DTR with X12 conversion against Plexis; 1up already flagged that a switch to Essette (Gainwell) or another UM vendor means a scoped 2027 update, and the auth grid needs CQL conversion plus future diagnosis-code and coverage-limit criteria 1up doesn't support yet. A pre-scoped follow-on SOW (new-vendor PAS FHIR integration, diagnosis-code rules, coverage-limit logic) is the most concrete paid expansion on record.",
          "fit": "high"
        },
        {
          "play": "Clinical data / popconnect for CCO quality measures",
          "rationale": "AH already sends US Core CarePlan clinical files and struggled to source clinical data from vendors ('still confirming if they have this data'). As an Oregon CCO they are paid on OHA quality incentive metrics; popconnect/clinical data acquisition on top of the FHIR store already holding claims + provider directory + care plans would fill HEDIS/CCO-metric gaps. Small plan with one tech resource = strong case for 1up doing the data work.",
          "fit": "medium"
        },
        {
          "play": "Analytics/HDE layer on the flowing FHIR data + member-experience services",
          "rationale": "All claims (medical, dental, Rx), provider directory, formulary and prior auth data now flow through 1up. Quality/risk analytics or HDE reporting would monetize data already ingested; softer attach: member website/interop-page services (they explicitly want to replicate Cascade's member data access pages) keeps the account sticky through the Aug 2026 0057 go-live. Note: no expressed analytics demand yet — this is inference.",
          "fit": "low"
        }
      ],
      "plays_hi": 1,
      "sources": [
        "#account-advancedhealth (C0981QHEASY), Jul 2025 – Jun 2026",
        "#account-advancedhealth-implementation-9115 (C094NT6RXL2), Sep 2025 – Jun 2026 (incl. weekly status updates)",
        "#account-advancedhealth-implementation-0057-apis (C0AQXFKSWET), Apr–Jul 2026 call recaps",
        "#account-advancedhealth-implementation-0057-epa (C0B355K29GX), May–Jun 2026",
        "#general — Go-Live announcement, Advanced Health Patient Access + Provider Directory, May 2026",
        "#sales-marketing — joint press-release clause (Melissa Pino)",
        "#epa-adoption-growth — 7/7/26 ePA recap (AH in first outreach wave)",
        "#2026-0057-access-api--readiness — 12/10/25, 12/31/25, 6/26/26 extracts (provided recon)",
        "Confluence: Advanced Health - Handoff to CS and Support (CKB page 1489436931)",
        "Confluence: 5/20/26 ePA Discovery Call (CKB page 2331901995)",
        "Confluence: 0057 APIs call minutes 6/3, 6/10, 6/22 (pages 2379579430, 2402025473, 2479128577); meeting minutes series incl. 1/26/26 (1947369473), 11/17/25 (1747812353)",
        "Gmail searched — personal account, none found"
      ],
      "sf": {
        "arr": 50669.354832,
        "cumulative": 214625,
        "product_rev": 144750,
        "services_rev": 69875,
        "health": 10,
        "temperature": null,
        "nps": null,
        "renewal_sentiment": 4,
        "sentiment_notes": null,
        "flags": [],
        "renewal": "2028-07-31",
        "contract_exp": null,
        "customer_since": "2025-08-01",
        "go_live": null,
        "impl_level": null,
        "products_sold": null,
        "lobs": null,
        "members_contracted": 50000,
        "members_current": 23636,
        "competitors": "Edifecs",
        "pbm": null,
        "owner": "Jodi Patton",
        "csm": "Holly Fan",
        "exec_sponsor": "Stephanie Iheme",
        "tier": "Maintain",
        "opps": [
          {
            "name": "Advanced Health- New Platform, Patient Access and Provider Directory",
            "type": null,
            "closed": "2025-06-23",
            "arr": null,
            "services": 59750,
            "amount": 159500,
            "months": 35.98,
            "owner": "Olivia Cleworth",
            "won_because": "1upHealth expertise and referral from customer, Cascade",
            "competitor": null
          },
          {
            "name": "Advanced Health - 0057 Add On",
            "type": null,
            "closed": "2025-06-23",
            "arr": null,
            "services": 10125,
            "amount": 55125,
            "months": 30.95,
            "owner": "Olivia Cleworth",
            "won_because": "1uphealth expertise and customer referral, cascade",
            "competitor": null
          }
        ]
      }
    },
    {
      "id": 9,
      "name": "Partners Health Management",
      "quarter": "q1",
      "qlabel": "Q1 · Jan–Mar",
      "seg": "medicaid",
      "seglabel": "Medicaid MCO / CCO",
      "note": "ePA pending",
      "full": "Partners Health Management (aka Partners Behavioral Health Management / Partners BHM; NC LME/MCO Tailored Plan; internal key \"phm\", Keycloak realm \"partners-health\")",
      "dq": "rich",
      "products_and_scope": "CMS-9115 Patient Access + Provider Directory (\"Comply\") — original 2021 contract ($100k ARR + $100k Services, 3-yr term), re-implemented 2025-26 after the customer requested data deletion and re-implementation. CMS-0057 Provider Access + Payer-to-Payer purchased with commencement January 2026 (Maria Baker corrected the start from Feb to Jan on 2025-12-10 in #2026-0057-access-api--readiness); 0057 scope also includes a Patient Access Prior Auth EOB feed. March 2025 renewal: capacity increase and CARR upsell of $228,184 + $24,000 Services on a 2-year term. ePA is pending additional scope: on the 4/2/2026 kickoff Partners said they were already talking to Jodi Patton about an ePA contract; Jodi expected it \"early May\" pending their budget finalization — no ePA booking found as of 2026-07-08. Medicaid-only LOB, sending claims only (no clinical) initially. Phased go-live agreed Feb 2026: membership data first, Pharmacy/Formulary + PharmacyDirectory later.",
      "implementation_status": "Two workstreams. (1) 9115 Patient Access/Provider Directory re-implementation: COMPLETE — Maria Baker's 4/18/2026 completion email (posted 5/11/2026 when archiving #account-partnershealthmgmt-implementation) confirms all production data deployed with daily incremental automation (Partners SFTP push 2pm ET daily, 1up processes 6pm ET); public Provider Directory APIs live at api.partnershealthfhir.com. (2) CMS-0057 Provider Access/P2P/Prior Auth: kicked off 4/3/2026, weekly Thursday calls, currently in UAT — versus the roster's Q1 (Jan-Mar) go-live and the January 2026 contract commencement, so running about two quarters behind commencement (still ahead of the 1/1/2027 compliance deadline). Recent progress: member attribution test file passed schema validator 6/22 and was loaded to UAT; Provider Access activated in UAT 7/1; UAT ingestion-console access issue resolved 7/2 (Holly Fan); UAT report review targeted for early July. Prior Auth EOB test file sent 6/22 had errors — Tim editing and resending. Production 0057 endpoints already stood up Dec 2025 (gateway.1up.health/v1/partners-health/ bulk-data $export and member-match). Opt-in/opt-out URLs were due 6/25 and are BLOCKED by the Partners/Vaya merger decision.",
      "tech_architecture": "SQL Server shop: stored procedures + SSIS extracts to pipe-delimited flat files, delivered via SFTP (MoveIT client) to S3 (1up-phm-prod-data-ingest / 1up-phm-prod-pre-prod-data-ingest), ingested via NiFi on dedicated EC2s and mapped to FHIR (CARIN BB EOB Institutional/Professional/Pharmacy, Patient, Coverage, Plan-Net). Pre-prod/prod EC2+RDS environments were reconciled in May 2026 (the \"prod\" instance was a renamed pre-prod box; INFRA-2914). Member data comes from a daily 834 file from the NC state Medicaid system; 270/271 EDI transactions are their attribution source of truth (per 0057 questionnaire). Member portal is mPulse (formerly HealthTrio, \"Impulse for Connect\"); consent will be 1upHealth-managed with member portal integration for both Provider Access and P2P (confirmed 5/7/2026). They exchange data frequently with Trillium and Vaya, both 1up clients. Historical volumes (2023): ~90k patients, ~8M professional + ~1.4M institutional EOBs (5 years history). File naming shows two sub-populations, ALPHA and CCH. Prior Auth EOB approach = flat-file extract into Patient Access, not a UM-system integration (their UM/ePA stack was not identified in sources — a gap to fill for ePA scoping).",
      "financial_signals": "[#arr-services-new-bookings, 2021-03-12] $100k ARR + $100k Services, 3-yr term (initial deal). [Confluence \"Partners BH\" account plan, Jan 2024] ARR $100,000, Comply, 50,000 members, renewal 3/31/2024. [#arr-services-new-bookings, 2025-03-31] Capacity increase & CARR upsell of $228,184 + $24,000 Services as part of a 2-year renewal. [#account-partners-health-management, 2026-04-02] Jodi Patton: ePA contract expected \"early May\" 2026, customer finalizing budget — no ePA booking found since. 2022 friction data point: dispute over ~200,000 extra lives sent/loaded vs. contracted capacity, escalated to their attorney around the 3/29/2022 renewal.",
      "key_people": "Customer: Tim Hunt (data/DBA, thunt2@partnersbhm.org — builds all extracts), Wake Young (Sr Project Management — main PM), Michael Kincaid (CIO), Jeanette Cox (Director), Andrew Walsh (General Counsel), Srinivas Mylarap, Grigg Watha (Purchasing), plus Adam and Mandy on 0057 calls. 1upHealth: Jodi Patton (account owner/sales), Assiatou Diallo (0057 implementation manager), Whitney (data implementation engineer), Maria Baker (implementation lead, ran 9115 re-implementation), Joy He (data engineer on re-implementation; left channel May 2026), Robert Davis \"Robzzz\" (led RedZone re-implementation; left channels Jun-Jul 2026), Holly Fan (console/support), Elizabeth McGowan (Provider Access product), Kyle Brew (P2P endpoints), Rachel Schuler and Geetika Arora (joined May 2026).",
      "risks_and_blockers": "1) Partners/Vaya merger (news broke ~5/28/2026, #industry) is blocking the opt-in/opt-out URL decision that was due 6/25 — unresolved as of the 6/26 recap; merger also creates longer-term contract/consolidation uncertainty since Vaya is also a 1up client. 2) Chronic engagement risk: project put on hold in 2023 for unresponsiveness; Dec 2025 escalation (\"customer is disengaged, not sending source files\") required a Jodi \"help us help you\" email and an SOW amendment limiting feedback to 2 cycles per file. Jodi herself calls them \"historically disorganized.\" 3) Data-quality/staffing: 1up flagged the DBA's proficiency as questionable (repeat errors from test reappearing in prod files); Formulary/PDL blocked because their DBA lacks the PBM data dictionary — pharmacy/formulary deferred via phased go-live and still not visible in 0057 channel. 4) Prior Auth EOB file still failing validation (errors reviewed 6/25; Tim resending). 5) History of legal aggressiveness (2022 attorney involvement over capacity overage) — handle commercial conversations carefully. 6) ePA contract expected early May 2026 has not appeared in bookings — slipping.",
      "points_of_interest": "Roster says Q1 go-live, but 0057 only kicked off 4/3/2026 — the Jan 2026 commencement date is contractual, not operational; UAT is mid-flight in July. The 9115 re-implementation (a full delete-and-reload of 5 years of history) finished 4/18/2026 after ~3 years of stops and starts — a real, recent success to build goodwill on. Partners is one of 3 NC Tailored Plans that are 1up customers (with Trillium and Vaya); Kevin Kowalczyk proposed a 4-plan NC summit (incl. prospect Alliance) in Jan 2026 and Jodi agreed to put out feelers. The Vaya merger could turn one account into the dominant NC behavioral-health interop footprint — or into a vendor-consolidation bake-off. All three plans exchange data with each other, making P2P genuinely useful rather than checkbox compliance.",
      "expansion_plays": [
        {
          "play": "Close the pending ePA add-on",
          "rationale": "Partners told 1up on the 4/2/2026 kickoff they were already discussing an ePA contract with Jodi; contract was expected early May pending budget and has slipped ~2 months. The 0057 implementation already includes a Prior Auth EOB feed, so ePA is a natural extension, and comparable deals (Cascade $55k, Hamaspik $140k, MNSCHA) give pricing/reference ammo. Re-engage now with the completed 9115 project and UAT progress as proof points; scope their UM stack (currently unknown) as the entry conversation.",
          "fit": "high"
        },
        {
          "play": "NC Tailored Plan / Vaya-merger consolidation play",
          "rationale": "Partners is merging with Vaya (announced May 2026) and both are 1up clients, as is Trillium; all exchange data with each other. Get ahead of the merged entity's vendor consolidation by proposing a unified 1up interop platform (shared P2P, Provider Access, consent strategy) — the merger is already forcing joint decisions (opt-in/opt-out URLs). Revive Kevin Kowalczyk's NC summit idea to anchor 1up as the Tailored Plan standard and pull in prospect Alliance.",
          "fit": "high"
        },
        {
          "play": "Clinical data / popconnect (HDE) add-on",
          "rationale": "Partners is claims-only today (0057 questionnaire: sending claims, no clinical initially) yet runs hands-on care management for behavioral health, I/DD, and SUD members — a population where clinical data has outsized care-coordination value. Once 0057 FHIR pipes are live, adding clinical/HDE enriches Provider Access and P2P payloads beyond minimum compliance. Caveat: their thin technical bench (one DBA) means this should be positioned as 1up-managed with minimal extract burden.",
          "fit": "medium"
        }
      ],
      "plays_hi": 2,
      "sources": [
        "#account-partners-implementation-0057-apis (C0AQ0RF6MU5), full history 2026-03-31 to 2026-07-01: kickoff, weekly recaps, UAT progress, Vaya merger opt-out blocker",
        "#account-partners-health-management (C01QZE89ENA), history 2021-2026: 2025-12-03 disengagement escalation thread, 2026-04-02 ePA contract exchange (Maria Baker/Jodi Patton), 2025-11-13 Robert Davis contract-alignment note, 2022 legal/capacity dispute, 2023 hold",
        "#account-partnershealthmgmt-implementation (C04JX0D7N5D, archived 5/11/2026): re-implementation dailies Mar 2026, 4/18/2026 completion email with public API links",
        "#arr-services-new-bookings: 2021-03-12 $100k+$100k booking; 2025-03-31 $228,184 CARR upsell + $24,000 Services 2-yr renewal",
        "#2026-0057-access-api--readiness: 2025-12-10 Kyle Brew production endpoint URLs and Maria Baker January commencement correction; 2026-04-07 kickoff announcement",
        "#industry 2026-05-28: Vaya/Partners merger news (Kevin Yamashita)",
        "#provider-access-implementation-party 2026-05-07: pre-prod/prod EC2-RDS reconciliation plan (INFRA-2914)",
        "DM Jodi Patton/Kevin Kowalczyk 2026-01-20: NC Tailored Plan summit idea",
        "Confluence: Partners BH account plan (APH space, page 321978410 — ARR, contacts, org background)",
        "Confluence: Partners Health RedZone - Migration to Standard Ingest (CKB space, page 1345519664, Jul 2025 re-engagement scope)",
        "Confluence: Partners Health Management Notes (CKB space, page 273514822)"
      ],
      "sf": {
        "arr": 188507.584416,
        "cumulative": 890002,
        "product_rev": 747252,
        "services_rev": 142750,
        "health": 9,
        "temperature": "Green",
        "nps": null,
        "renewal_sentiment": 4,
        "sentiment_notes": null,
        "flags": [
          "ROI in question"
        ],
        "renewal": "2027-03-28",
        "contract_exp": "2023-03-31",
        "customer_since": "2021-03-30",
        "go_live": "2021-07-01",
        "impl_level": "Level 4.5",
        "products_sold": "Patient Access;Provider Directory",
        "lobs": "Medicaid",
        "members_contracted": 50000,
        "members_current": 103926,
        "competitors": null,
        "pbm": null,
        "owner": "Jodi Patton",
        "csm": "Holly Fan",
        "exec_sponsor": "Jodi Patton",
        "tier": "Grow",
        "opps": [
          {
            "name": "Partners Behavioral Health Management",
            "type": "0125f000000iH45AAE",
            "closed": "2021-03-16",
            "arr": null,
            "services": 94750,
            "amount": 194750,
            "months": 11.96,
            "owner": "Matt Dula",
            "won_because": null,
            "competitor": null
          },
          {
            "name": "RENEWAL - Partners Behavioral Health Management 2022",
            "type": "0125f000000iHVSAA2",
            "closed": "2022-03-31",
            "arr": null,
            "services": 0,
            "amount": 100000,
            "months": 11.96,
            "owner": "Annie Kroes",
            "won_because": null,
            "competitor": null
          },
          {
            "name": "RENEWAL - Partners Behavioral Health Management 2023",
            "type": "0125f000000iHVSAA2",
            "closed": "2023-03-30",
            "arr": null,
            "services": 0,
            "amount": 100000,
            "months": 11.99,
            "owner": "Annie Kroes",
            "won_because": null,
            "competitor": null
          },
          {
            "name": "RENEWAL - Partners Behavioral Health Management 2024",
            "type": "0125f000000iHVSAA2",
            "closed": "2024-04-01",
            "arr": null,
            "services": 0,
            "amount": 100000,
            "months": 11.93,
            "owner": "Ariana Zamora",
            "won_because": "Standard renewal",
            "competitor": null
          },
          {
            "name": "25-27 Partners Behavioral Health Management Renewal",
            "type": "Existing Business",
            "closed": "2025-03-31",
            "arr": 248184,
            "services": 0,
            "amount": 248184,
            "months": 23.95,
            "owner": "Jessica Candito",
            "won_because": null,
            "competitor": null
          },
          {
            "name": "25-27 Partners Behavioral Health Management P2P and Provider Access",
            "type": "Existing Business",
            "closed": "2025-03-31",
            "arr": null,
            "services": 24000,
            "amount": 104000,
            "months": 14.82,
            "owner": "Jodi Patton",
            "won_because": null,
            "competitor": null
          },
          {
            "name": "Upsell '26 Finance Recon",
            "type": null,
            "closed": "2025-03-31",
            "arr": null,
            "services": 24000,
            "amount": 43068,
            "months": 2.83,
            "owner": "Ariana Zamora",
            "won_because": "finance recon",
            "competitor": null
          }
        ]
      }
    },
    {
      "id": 10,
      "name": "Trillium",
      "quarter": "q1",
      "qlabel": "Q1 · Jan–Mar",
      "seg": "medicaid",
      "seglabel": "Medicaid MCO / CCO",
      "note": "",
      "full": "Trillium (Trillium Health Resources — NC Medicaid managed care organization; LOBs: Medicaid Direct and Tailored Plan)",
      "dq": "rich",
      "products_and_scope": "Booked 2024-12-31 as a new health plan customer: 1up Platform, Patient Access, Provider Directory, Payer-to-Payer, Provider Access, and Prior Auth in a two-phase implementation [#arr-services-new-bookings, 2024-12-31, Olivia Cleworth]. Phase 1 = CMS-9115 Patient Access + Provider Directory for 2 LOBs (Medicaid Direct \"md\", Tailored Plan \"tp\"), including Sensitive Data Tagging (custom \"NOPAT\" tag — Jira PAC-1231, INFRA-2036). Phase 2 = CMS-0057: Provider Access, Patient Access updates (EOB Prior Auth), P2P, and ePA (CRD/DTR/PAS). Nolan Kelly (#account-trillium, 4/21/25): \"Trillium has purchased all APIs for 0057.\" Separate 9115 Formulary track added via Change Order #1 (customer email approval 12/2/25, logged to SF Opportunity 006TR00000GjmyXYAR); Change Order #2 modified SOW Exhibit A (approved 12/3/25 — removed Dental Claims, Clinical Allergies, Personal Representative; expanded Provider Directory FHIR resources with PractitionerRole, OrganizationAffiliation, HealthcareService, Payer, Location, InsurancePlan, Network; no fee change). A further Formulary change order (revised dates + 1up performing the NDC-to-RxCUI crosswalk) was signed by 1up's John Lambrecht on 7/8/26.",
      "implementation_status": "Phase 1 (9115): kickoff 4/23/25 on STE; Patient Access/Provider Directory went live in STE Dec 2025 (targeted GL 12/1/25; Rachel Schuler in #core-data-support 4/20/26: \"Trillium went live in STE at the end of 2025\"). Phase 2 (0057): order form start date 11/1/25; customer pushed start to 2/1/26 (Jodi Patton, 7/9/25); kickoff held 2/27/26 [Confluence: 2/27/26 Trillium 0057 Project Kickoff] — matches roster Q1 context as a Q1 2026 start/kickoff, not a completed 0057 go-live. Current status (July 2026): Provider Access + Patient Access EOB Prior Auth \"on track\" (EOW update 5/8/26); in test-file iteration — EOB Prior Auth rounds 1-4 (June 2026, round 4 files 6/26), member attribution v3 files 6/30; UAT via Patient Viewer + 1upConsole; 1up-hosted member opt-out screens (email auth) being customized (auth config bug ticket PRVS-6, 6/22/26). P2P: not started — begins when Patient Access and Provider Access are live [Confluence 6/23/26 page]. ePA: was \"at risk\" (5/8/26), effectively paused, resumed 6/22/26; CRD decision made 6/22 (1up hosts CRD as \"front door\"); CRD/routing logic and DTR questionnaires still pending from Trillium (7/6/26). Formulary: SOW window March–June 2026 slipped to July–Sept 2026 with ~October 2026 go-live, contingent on 1up doing NDC-to-RxCUI conversion; test files expected end of July 2026.",
      "tech_architecture": "Single-tenant environment (STE), not MTE/V2 (decision April 2025; a v2 migration was discussed for Oct/Nov 2025 pre-0057 but they went live on STE). Flat-file SFTP ingestion per 1up extract guides into 1up-trillium-prod-data-ingest (folders: test, provider_access); file families: patient-access patient header/supplemental, pdex-prior-authorization header/supplemental/lineitems, pdex-member-attribution-list, formulary drug — all split per LOB (md/tp). UM: internal/homegrown UM system (\"UM = Customer Internal System\" per ePA Customer Call Notes) requiring a Trillium-built FHIR API connection, plus final list of 6 UM vendors (agreed 6/22/26): Carolina Complete Health (CCH), Centene Vision, EviCore, Evolent, Turning Point, and Trillium in-house [Confluence 7/6/26 ePA page]. 1up hosts CRD as the \"front door\" for ePA. Consent/opt-out: 1up-hosted member opt-out screens with email-based authentication — the only customer known to use email-based opt-out (no member portal integration; their public site is trilliumhealthresources.org/member-recipient-portal). IdP integration with 1upConsole + Patient Viewer (live since 9115); Kibana/manual monthly usage reports (built by Irtiza via Postman) as stopgap until the Usage & Reporting app. Formulary source data sits with a third-party vendor whose contract prohibits sharing raw data with 1up (3/13/26), so extract guides are used and 1up performs the NDC-to-RxCUI crosswalk. Sensitive Data Tagging deployed to their STE (Cigna-style, Redis-based; INFRA-2036). Edifecs was suspected (4/22/25 thread) as a competing consent-management vendor courting them. AWS infra note: VPC/NAT Gateway + EC2 data transfer usage spike investigated 12/3/25.",
      "financial_signals": "$360,750 ARR + $152,500 Services, closed 2024-12-31 [#arr-services-new-bookings, Olivia Cleworth]. Change Order #1 (Formulary) and CO #2 (Exhibit A, no additional fees) approved Dec 2025; updated Formulary change order signed by 1up 7/8/26 (NDC-to-RxCUI crosswalk work). Open expansion signal: Theresa Clark requested a quote on 1/7/26 to add a 3rd Line of Business to the 9115 implementation (currently 2 LOBs) — Jodi Patton was following up.",
      "key_people": "Trillium: Theresa Clark (PM, primary contact, owns meeting invites), Mike Lewis (CIO — engaged 5/20/26 call), unnamed IT VP (raised ePA objections, May 2026), Dustin Hunter (Agile Product Owner, files/SFTP), Stacey Henderson (IT Programs Director), Tanya Simons (Project Development Manager), Jessica Scripture (UAT), Janise Speight, Kue Ho, Lauren Rinere, Robert \"Bob\" Stelter, Cham Trowell, Dr. Paul Garcia, Benita Hathaway, Charles LaCavera, Karl Nelson (formulary data questions), Carrie Archer, Susan Metcalfe. 1upHealth: Rachel Schuler (Implementation/CS lead), Maria Baker (Implementation Manager), Jodi Patton (Account Manager, took over from Drew, Mar 2025), Jeremy Yoon (Sales Eng, ePA), Joy He (Data Engineer), Olivia Cleworth (AE who closed the deal), Bobby Fredrickson (sales leadership), Stephanie Iheme, Nolan Kelly, Anton Pederson, Kyle Brew (opt-out/P2P screens), Elizabeth McGowan (docs/Provider Access), John Lambrecht (signed 7/8/26 change order), Annie Kroes (CSM per channel topic since 4/28/25; previously Leilani Sampayan).",
      "risks_and_blockers": "1) ePA is the fragile track: flagged \"at risk\" 5/8/26 — Trillium's internal UM system needs a Trillium-built FHIR API with no committed timeline; they could not initially produce their UM vendor list; an IT VP pushed back hard on the ePA workflow (any-provider submissions via EHR; \"don't reinvent the wheel\" attitude since current PA intake works); project paused, resumed 6/22/26 after a constructive CIO (Mike Lewis) call on a minimally-viable ePA scope. CIO says IT team under \"extreme stress\" from competing priorities and limited bandwidth. 2) Formulary wobble: leadership questioned whether Formulary is required at all under the proposed CMS-0062P rule (raised 5/4/26, Jira DATAQ-85) and their pharmacy vendor contract bars sharing raw data; go-live now ~Oct 2026 and contingent on 1up doing the NDC-to-RxCUI crosswalk (else Trillium must buy datasets and slip further). 3) Compliance scrutiny on consent: only customer using email-based opt-out; asked (4/29/26) for a visibility/history log proving opted-out members' data was not shared; multiple P2P consent-validation questions (3/24/26). 4) Competitive pressure: other vendors (likely incl. Edifecs) pitching P2P/Provider Access opt-in/opt-out consent management to the CIO (4/21/25). 5) Customer insists on hosting all meetings — no call recordings for 1up. 6) History of schedule slips (0057 start pushed from 11/1/25 to 2/1/26; formulary March→July).",
      "points_of_interest": "Trillium prefers 1up-hosted/managed everything where possible (CIO explicitly does not want to build opt-in/opt-out maintenance in-house; chose 1up-hosted opt-out screens and 1up as ePA CRD \"front door\") — good attach surface for managed add-ons. Fellow 1up customers Partners Behavioral Health (and Vaya) named Trillium as a payer they exchange members with frequently — a 1up-to-1up P2P exchange opportunity in NC Medicaid [#2026-0057-access-api--readiness, 2/19/26]. Trillium is on 1up's ePA provider-adoption outreach \"second string\" list and Rachel is setting up live ePA adoption calls including Trillium [#epa-adoption-growth, 7/7/26]. They asked early (Aug 2025) about the CMS Patient Access API report due 1/1/26 — compliance-reporting oriented buyer.",
      "expansion_plays": [
        {
          "play": "Add 3rd Line of Business to Patient Access/Provider Directory (and downstream 0057 APIs)",
          "rationale": "Customer-initiated: Theresa Clark requested a quote on 1/7/26 for a 3rd LOB beyond Medicaid Direct and Tailored Plan; scope confirmation was pending. Cleanest, already-in-motion upsell — price it to include the 0057 API surface so the new LOB is compliant end-to-end.",
          "fit": "high"
        },
        {
          "play": "Managed consent/opt-in screens for P2P (extend the 1up-hosted opt-out pattern)",
          "rationale": "Trillium already chose 1up-hosted opt-out screens with email auth for Provider Access, the CIO explicitly wants to avoid building consent-data maintenance in-house, and competing vendors (likely Edifecs) are pitching consent management. P2P starts after Patient/Provider Access go live — lock in 1up-branded opt-in screens plus the opt-out audit/history log they asked for (4/29/26) as a differentiator.",
          "fit": "high"
        },
        {
          "play": "Expanded ePA scope + clinical data enrichment (popconnect/HDE) once MVP ePA lands",
          "rationale": "ePA is contracted but being descoped to a minimally-viable build (CRD hosted by 1up, 6 UM vendors, digitized-fax-style DTR). Post-MVP there is a natural path: per-vendor DTR questionnaires, PAS routing to all 6 UM vendors, and richer CRD logic — plus clinical data ingestion (they dropped Allergies from scope and send claims-heavy data today) via popconnect/HDE to strengthen both ePA decisioning and P2P payloads. Sequence after the internal UM FHIR build lands; note MPF is not a fit (Medicaid-only plan).",
          "fit": "medium"
        }
      ],
      "plays_hi": 2,
      "sources": [
        "#account-trillium (C086Y8KDHDY), Dec 2024 - Jul 2026",
        "#account-trillium-implementation-0057-provider-access-and-patient-access-updates (C0AKZ5UBDPF), Mar-Jul 2026",
        "#account-trillium-implementation-0057-epa (C0AKZ6NPBC5), Mar-Jun 2026",
        "#account-trillium-implementation-9115-formulary (C0AL8TW28JW), Mar-Jul 2026",
        "#arr-services-new-bookings booking post, 2024-12-31 (Olivia Cleworth)",
        "#core-data-support, 2026-04-20 (STE go-live end of 2025)",
        "#access-api-public, 2025-11-14 and 2025-12-01 (Dec 2025 GL, Kibana/reporting stopgap)",
        "#payer-to-payer-public, 2026-03-06",
        "#2026-0057-access-api--readiness, 2026-01-28 / 2026-02-19 / 2026-03-24",
        "#epa-adoption-growth, 2026-07-07",
        "#legal-and-compliance, 2026-05-04 (CMS-0062P formulary question)",
        "Group DM C0BFF9TMLVB, 2026-07-08 (change order signed)",
        "Confluence CKB: 07/06/26 Trillium 0057 ePA Project (page 2474967041)",
        "Confluence CKB: 06/23/26 Trillium 0057 Provider Access & Patient Access Updates Project (page 2435252296)",
        "Confluence CKB: 2/27/26 Trillium 0057 Project Kickoff (page 2049474561)",
        "Confluence CKB: Trillium Project Meeting Minutes series Oct 2025 - Jan 2026 (pages 1691451393, 1733722113, 1756921860, 1777958913, 1794375682, 1839562753, 1879375873)",
        "Jira: PAC-1231, INFRA-2036, INFF-2121, DATAQ-85, EPA-285",
        "Cross-account recon extracts (ePA Customer Call Notes; #2026-0057-access-api--readiness summary) as provided"
      ],
      "sf": {
        "arr": 371572.5,
        "cumulative": 1267042.18,
        "product_rev": 1115042.18,
        "services_rev": 152000,
        "health": 10,
        "temperature": null,
        "nps": null,
        "renewal_sentiment": 5,
        "sentiment_notes": null,
        "flags": [],
        "renewal": "2028-03-30",
        "contract_exp": "2028-03-30",
        "customer_since": "2025-03-31",
        "go_live": null,
        "impl_level": null,
        "products_sold": null,
        "lobs": "Medicaid",
        "members_contracted": 225000,
        "members_current": 214000,
        "competitors": null,
        "pbm": null,
        "owner": "Jodi Patton",
        "csm": "Geetika Arora",
        "exec_sponsor": "Stephanie Iheme",
        "tier": "Maintain",
        "opps": [
          {
            "name": "Trillium- New Platform 9115",
            "type": null,
            "closed": "2025-01-01",
            "arr": null,
            "services": 115000,
            "amount": 385750,
            "months": 11.96,
            "owner": "Olivia Cleworth",
            "won_because": "1uphealth has the most knowledge and experience in implementing CMS FHIR compliant platforms",
            "competitor": null
          },
          {
            "name": "Trillium - 0057",
            "type": null,
            "closed": "2025-01-01",
            "arr": null,
            "services": 37000,
            "amount": 127000,
            "months": 4.83,
            "owner": "Olivia Cleworth",
            "won_because": "level of expertise",
            "competitor": null
          },
          {
            "name": "Renewal Trillium Yr 3 (27-28)",
            "type": null,
            "closed": "2025-01-01",
            "arr": null,
            "services": null,
            "amount": 382719.68,
            "months": 14.92,
            "owner": "Olivia Cleworth",
            "won_because": "multi-year new logo deal",
            "competitor": null
          },
          {
            "name": "Renewal Trillium Yr 2 (26-27)",
            "type": null,
            "closed": "2025-01-01",
            "arr": null,
            "services": 0,
            "amount": 371572.5,
            "months": 11.96,
            "owner": "Olivia Cleworth",
            "won_because": "multi-year new logo deal",
            "competitor": null
          }
        ]
      }
    },
    {
      "id": 11,
      "name": "Vaya Health",
      "quarter": "q1",
      "qlabel": "Q1 · Jan–Mar",
      "seg": "medicaid",
      "seglabel": "Medicaid MCO / CCO",
      "note": "",
      "full": "Vaya Health",
      "dq": "rich",
      "products_and_scope": "Base: CMS-9115 Patient Access FHIR APIs since ~2021 (legacy ingest; 12 daily Patient Access file types). July 2025 upsell: full CMS-0057 suite - Provider Access, Payer-to-Payer, and ePA (CRD/DTR/PAS) - $300K gross [#arr-services-new-bookings, 2025-07-18, verified]. Implementation order agreed 2/2/2026: 1) Provider Access, 2) P2P, 3) ePA [#account-vaya-implementation-0057-pa, 2026-02-02]. Services SOW for P2P/Provider Access/ePA has been in review with Vaya legal since ~Sept 2025 and is STILL UNSIGNED as of 2026-07-08 [#sows-inflight 2025-09-09; ePA Scoping Call notes 07/08/2026]. Additional scope in motion: 1up-hosted member opt-in/out for P2P (confirmed 2/24/2026), custom CRD in-network-provider-roster logic added to SOW to keep ePA in scope, a Patient Access \"clean up\"/data-quality SOW drafted by Maria Baker/Robzzz (May 2026), Sensitive Data Tagging SOW \"to be scoped\" [Jodi Patton, group DM 2026-06-17], and Provider Directory/Formulary public APIs owed (api.vayahealthfhir.com/r4/public). Historical: $100K ARR + $75K services (2021), $80K renewal+capacity (2022), $67.5K capacity upsell (2023).",
      "implementation_status": "Far behind the roster's Q1 (Jan-Mar) go-live - NOT live on any 0057 API. Kickoff/discovery held 2/5/2026 (questionnaires returned 1/30). Project went Green through Feb, then Vaya formally paused weekly 0057 calls on 4/22/2026 \"until the SOW is signed\" [#account-vaya, Rachel Schuler]. Vaya refused to send 0057 test files until contract signed [Anissa Nashikkar, 2026-05-20]. Partial thaw: two PDex Member Attribution test files delivered to SFTP test folder ~6/8/2026; PA/P2P meetings restarting week of 7/8/2026 per Jodi's direction (6/30: \"they are way too in the weeds on the SOW... start the meetings, I will continue the pressure on signature\"). ePA commencement date reset to July 1 [Geetika Arora, 2026-05-15]; ePA scoping call held 7/8/2026 - 1up cannot begin ePA implementation without signed SOW. Compliance target is 1/1/2027; Geetika flagged (6/30) that ePA dev time makes July start critical.",
      "tech_architecture": "NC Medicaid behavioral-health plan (Medicaid Direct + Tailored Plan LOBs; ~113.6K active members, 310K total patient records; membership declined, driving $102.5K base decrease). Data flow: daily CSVs (Patient + Address/Contact/Language/Phone supplementals, Coverage, EOB Inst Inpatient/Outpatient/Professional, Practitioner, Organization, Location) via CrushFTP SFTP to s3://1up-vaya-health-prod-data-ingest/incoming (IP 3.209.184.204) [Confluence: Vaya Implementation Details]. On LEGACY NiFi ingest (old JSONToFHIR, no DIMA, ~5-yr-old EC2) - internal decision made to eventually migrate to Standard Ingest/pre-prod [Whitney, 2026-02-17]. FHIR endpoint: api.vayahealthfhir.com/r4. Member portal is homegrown with Azure Active Directory B2C IdP; Vaya chose SAML for P2P opt-in/out integration, with 1up hosting the opt-in/out screens. UM stack for ePA: HealthEdge GuidingCare (primary), EviCore (radiology), unnamed vision + dental vendors, MCG auto-auth plus an in-house auto-decision rules engine; no X12 in use today; CRD likely 1up-hosted from a Vaya logic grid since GuidingCare doesn't store PA-required logic (Kevin Davidson) [Confluence: 07/08/2026 ePA Scoping Call; 04/28/2026 Discovery Call]. Notable legacy artifact: EOB insurance[0].coverage.reference still maps to an api.oscarfhir.com query [Whitney, 2026-04-07].",
      "financial_signals": "2021-04-01: $100K ARR + $75K services (initial) [#arr-services-new-bookings]. 2022-08-26: $80K renewal + capacity tier increase. 2023-08-09: $67.5K ARR capacity upsell (verified in channel). 2025-07-18: 0057 upsell w/ ePA - $300K gross, net of $102.5K base-contract decrease from membership drop (verified, posted by Jodi Patton). 2026-05-15: 1up agreed NOT to charge a $25K patient-access file deep-dive fee (goodwill concession). Pipeline: Sensitive Data Tagging SOW to be scoped; Patient Access data-quality SOW drafted; Vaya asked projected cost if ePA removed from SOW (4/8/2026, risk mitigated); Partners BH merger to be handled as future change order (Jodi, 7/8/2026).",
      "key_people": "Vaya: Shivani Bansal (leadership, drives contract/scope re-alignment), Debbie (compliance/ops lead - SDT and opt-out questions, Case 00008655), Charity (legal rep gating test files/SOW), Amy Modi (contracting lead handling SOW), Jonathan Lowman (ePA workstream lead), Kevin Davidson and Kimberly Bradley (ePA/UM technical). 1upHealth: Jodi Patton (account owner/sales, driving SOW signature), Geetika Arora (CSM), Stephanie Iheme (services leadership), Maria Baker (implementation leadership), Anissa Nashikkar (IM - Provider Access/P2P), Rachel Schuler (IM - ePA), Jeremy Yoon (ePA product SME), Kyle Brew (P2P product), Elizabeth McGowan (Provider Access product), Whitney and Trang Derdak (data engineering - ingest fixes), Robert \"Robzzz\" Davis (engineering).",
      "risks_and_blockers": "1) SOW unsigned ~10 months (Sept 2025 legal review -> July 2026): Vaya conflating project plan with SOW, demanding ePA detail in contract; now further delayed by the Partners (Partners Health Management/BH) merger and contracting lead Amy Modi [ePA Scoping Call 07/08/2026; Jodi/Geetika DM 6/30]. 2) ePA nearly removed from SOW (April 2026) over refusal to let out-of-network providers use the ePA API; mitigated via custom CRD provider-roster logic, but reg-compliance tension remains (Jeremy Yoon: payers can't block ePA access; only Provider Access API is in-network-restricted). 3) Sensitive Data Tagging escalation: Vaya discovered no masking/tagging implemented since 2021 and asked pointed remediation questions (Case 00008655, 27-reply thread June 2026) - trust risk and unscoped work. 4) Legacy ingest data-quality debt: ~9K member-count mismatch, never-refreshed materialized view root cause, Location resource count 0 (SUP-826), duplicate Organizations, EOBs missing valid Coverage references, files not sent 12/7/2025-2/27/2026. 5) Customer consumed months of free consulting with no services SOW while withholding test files; IM capacity being pinched (Stephanie Iheme, 6/10). 6) 1/1/2027 compliance timeline at risk, especially ePA.",
      "points_of_interest": "Vaya is acquiring/merging with Partners (Partners Health Management, another NC BH plan) - reviewing the acquisition now; Jodi proposed splitting it into a separate change order [#account-vaya-implementation-0057-epa, 2026-07-08]. Vaya independently found SQL on FHIR in 1up's help center and asked for access (product deprecated for new customers - only GW-AK and Fallon still use it). Siftwell (analytics partner) interested in connecting with Vaya (Nov 2025). Vaya asked about USCDI v1 expiry/v3 plans and 0057 Prior Auth metrics reporting - 1up's answer today is that reporting is the customer's responsibility (DNA-1364). MPF: Trang noted \"the Medicare Plan Finder work we'll end up doing for Vaya (and all other clients)\" with Location required by October. Vaya's legacy mapping still queries Oscar's FHIR endpoint for Coverage references - evidence of copied-mapping tech debt.",
      "expansion_plays": [
        {
          "play": "Sensitive Data Tagging (SDT) SOW",
          "rationale": "Already on Jodi's pipeline list as 'to be scoped' (6/17/2026). Vaya is actively alarmed that data sent since 2021 was never tagged/masked (Case 00008655) and is a behavioral-health/SUD-focused plan where 42 CFR Part 2 sensitivity is core business. Converts an open escalation into paid remediation; JHHP pricing pushback on the same play is the main caution.",
          "fit": "high"
        },
        {
          "play": "Standard Ingest / HDE migration + data-quality services",
          "rationale": "Vaya is the poster child for legacy-ingest debt: never-refreshed materialized views, 9K member mismatch, Location count 0, Oscar-endpoint Coverage references. Internal consensus already exists that 'we need to move them to standard ingest at some point' (Jodi, 5/21) and a data-quality SOW was already drafted by Maria/Robzzz in May after Vaya requested help understanding their source files. Package migration + the waived $25K deep dive into a paid modernization SOW.",
          "fit": "high"
        },
        {
          "play": "Partners Health Management merger change order (membership + capacity expansion)",
          "rationale": "The Partners BH merger is actively delaying the SOW; Jodi already proposed handling Partners integration as a change order once the merger clears (7/8/2026). Merging in Partners' membership would reverse the $102.5K capacity decrease and could extend the full 0057 suite plus ingest to the combined entity.",
          "fit": "high"
        },
        {
          "play": "Medicare Plan Finder / Provider Directory-Formulary completion",
          "rationale": "Trang Derdak referenced 'the Medicare Plan Finder work we'll end up doing for Vaya (and all other clients)' with Location data required by October; Location ingest was just stood up in March 2026 and 1up still owes Vaya Formulary API. Fit depends on Vaya's Medicare (D-SNP/Tailored Plan) footprint - verify LOBs before pitching.",
          "fit": "medium"
        }
      ],
      "plays_hi": 3,
      "sources": [
        "Slack #account-vaya (C01TGE531MJ), full history 2024-02-04 to 2026-07-01",
        "Slack #account-vaya-implementation-0057-pa (C0ACLP558BW), 2026-02-02 to 2026-07-06",
        "Slack #account-vaya-implementation-0057-p2p (C0AC1MVAP71), 2026-02-02 to 2026-07-06",
        "Slack #account-vaya-implementation-0057-epa (C0ACAPNDWCT), 2026-02-02 to 2026-07-08, incl. 13-reply ePA-removal thread (ts 1775677141.916419)",
        "Slack #arr-services-new-bookings (C01KG7PJEDV): 2025-07-18 $300K 0057 upsell, 2023-08-09 $67.5K upsell (both verified)",
        "Slack DMs/group DMs: Jodi Patton x Geetika Arora (D09U2PV57EK), Jodi x Stephanie Iheme (D05AV8WUAT1), Jodi x Maria Baker (D03HLSZUW85), leadership group C0B5PFV1TAL (Leskovar/Lambrecht), May-June 2026",
        "Confluence CKB: 07/08/026 - Vaya/1upHealth ePA Scoping Call (pageId 2480734224)",
        "Confluence CKB: 04/28/2026 - Vaya/1upHealth ePA Discovery Call (pageId 2453831685)",
        "Confluence CKB: Vaya Implementation Details (pageId 1272479755)",
        "Confluence APH: Vaya Health Plan (pageId 321717510)",
        "Cross-account recon extracts provided by orchestrator (Compliance-space ePA Customer Call Notes; #2026-0057-access-api--readiness; #sows-inflight)",
        "Jira refs seen in Slack: DNA-1364, DNA-1366, SUP-826; SF Case 00008655"
      ],
      "sf": {
        "arr": 172471.26436799997,
        "cumulative": 1355000,
        "product_rev": 1220000,
        "services_rev": 135000,
        "health": 10,
        "temperature": "Green",
        "nps": null,
        "renewal_sentiment": 4,
        "sentiment_notes": null,
        "flags": [
          "ROI in question"
        ],
        "renewal": "2028-06-30",
        "contract_exp": "2023-06-30",
        "customer_since": "2021-05-01",
        "go_live": null,
        "impl_level": "Level V",
        "products_sold": "Patient Access;Provider Directory",
        "lobs": "Medicaid",
        "members_contracted": 275000,
        "members_current": 281631,
        "competitors": null,
        "pbm": null,
        "owner": "Jodi Patton",
        "csm": "Geetika Arora",
        "exec_sponsor": "Jodi Patton",
        "tier": "Maintain",
        "opps": [
          {
            "name": "Vaya Health - CMS Patient Access",
            "type": "0125f000000iH45AAE",
            "closed": "2021-05-01",
            "arr": null,
            "services": 75000,
            "amount": 175000,
            "months": 13.96,
            "owner": "Matt Dula",
            "won_because": null,
            "competitor": null
          },
          {
            "name": "Vaya - tier increase",
            "type": "0125f000000iH45AAE",
            "closed": "2022-08-26",
            "arr": null,
            "services": 0,
            "amount": 80000,
            "months": 11.96,
            "owner": "Olivia Cleworth",
            "won_because": null,
            "competitor": null
          },
          {
            "name": "Vaya Health - Capacity Increase",
            "type": "0125f000000iH4tAAE",
            "closed": "2022-08-26",
            "arr": null,
            "services": 0,
            "amount": 100000,
            "months": 11.96,
            "owner": "Jessica Candito",
            "won_because": "Plan over contracted capacity. Needed to increase overhead to accommodate lives in platform.",
            "competitor": null
          },
          {
            "name": "RENEWAL: Vaya Health - 2023",
            "type": "0125f000000iHVSAA2",
            "closed": "2023-08-09",
            "arr": null,
            "services": 0,
            "amount": 247500,
            "months": 11.99,
            "owner": "Ariana Zamora",
            "won_because": "capacity increase",
            "competitor": null
          },
          {
            "name": "RENEWAL: Vaya Health - 2024",
            "type": "0125f000000iHVSAA2",
            "closed": "2024-06-30",
            "arr": null,
            "services": 0,
            "amount": 247500,
            "months": 11.96,
            "owner": "Jessica Candito",
            "won_because": "Multi-year renewal until 2025",
            "competitor": null
          },
          {
            "name": "25-28 Vaya Provider Access, P2P and ePA",
            "type": "Existing Business",
            "closed": "2025-06-30",
            "arr": null,
            "services": 60000,
            "amount": 360000,
            "months": 28.91,
            "owner": "Jodi Patton",
            "won_because": "25-27 Renewal",
            "competitor": null
          },
          {
            "name": "25-28 Vaya Health Renewal",
            "type": "Existing Business",
            "closed": "2025-06-30",
            "arr": 312890,
            "services": 0,
            "amount": 145000,
            "months": 35.98,
            "owner": "Jodi Patton",
            "won_because": "25-28 Renewal",
            "competitor": null
          }
        ]
      }
    },
    {
      "id": 12,
      "name": "Independent Living Systems",
      "quarter": "q1",
      "qlabel": "Q1 · Jan–Mar",
      "seg": "medadv",
      "seglabel": "Medicare Advantage",
      "note": "",
      "full": "Independent Living Systems (ILS) - Miami FL; runs two Florida plans: Florida Community Care (FCC, Medicaid) and Florida Complete Care (FC2, Medicare), LTSS-focused",
      "dq": "rich",
      "products_and_scope": "Phase 1 (sold 6/20/2023): Patient Access API + Provider Directory (CMS-9115), Change Healthcare rip-and-replace; CARIN-BB EOBs, formulary, Patient/Coverage, limited clinical (CarePlan + Goals via follow-on SOW; declined Immunization and vision/dental/pharmacy EOBs). Phase 2 (renewal 6/30/2025, start 2/1/2026): 3-yr renewal adding full CMS-0057 suite - Provider Access, Payer-to-Payer, ePA (CRD/DTR/PAS) plus Patient Access Prior Auth EOB; SOW signed by 9/9/2025. All scope duplicated across both LOBs; 6 plans total: 3 Medicare (I-SNP, IE-SNP, D-SNP) + 3 Medicaid (MMA, LTC, ICMC/IDD). P2P/Provider Access opt-in/opt-out is 1upHealth-managed, no member portal/IDP integration.",
      "implementation_status": "Phase 1 LIVE 4/1/2024 (historical data 2018-present loaded Mar 2024, daily automation running) [CKB Handoff page]. Phase 2 vs roster Q1 2026 go-live: 2/1/26 commencement but kickoff slipped ~7 weeks to 3/23/26. Plan: Provider Access enablement 5/1-7/24, P2P 5/8-6/26, Patient Access Prior Auth EOB 7/24-8/14/26. As of 7/6/26: member attribution file (sent 6/12) still awaiting load to test; awaiting ILS first PDex Prior Auth files; extract timeline has no date until gap fields resolved. UAT console verified 4/29/26. ePA: weekly calls began 6/24/26; CRD logic+DTR June, eCare FHIR API July (test PAS endpoint 8/1), iCare X12/SFTP Aug, UAT Sept, go-live Oct 2026 (ILS wanted Sept). Active ePA tickets: EPAS-7 complex CRD logic review due 7/17; EPAS-8 iCare sample x12 feedback due 8/7 [#account-ils-implementation-0057-epa 7/7-7/8/26].",
      "tech_architecture": "Payer, homegrown Microsoft shop; most prior auths arrive by fax, provider portal (Availity?) [Compliance Confluence page]. UM: internal eCare system (standing up FHIR APIs for PAS; also eClaims with unsupported fields like adjudication_review_number) + iCare eye-care UM vendor requiring X12 278 conversion via 1up X12 Converter (GA Aug 2026) over SFTP; possible 3rd UM vendor unconfirmed. Data delivery: SFTP CSV extracts to 1up FHIR platform (Patient, Coverage, CarePlan, Goals, EOB header/lineitems/diagnosis/procedure, Practitioner/PractitionerRole/Organization, Formulary); FCC sends 2 daily files for member/clinical resources. Separate FCC/FC2 partitions (MTE partitions in UAT); FHIR endpoint api.ilshealthfhir.com; UAT console ilshealthfhir.console.1upcoreuat.com. CRD 1up-hosted; PA rules keyed on CPT + modifiers/POS/diagnoses, updated ~2x/yr (Medicare 1/1, Medicaid 10/1); up to 3 DTR questionnaires with display logic.",
      "financial_signals": "6/20-6/30/2023: new logo $75,000 ARR + $52,000 services (Patient Access + Provider Directory, Change HC rip-and-replace). 2/9/2024: +$5,000 services (additional resources vs original Exhibit A). 6/30/2025: 3-yr renewal +$3,750 ARR (Y1 $78,750) + Provider Access, P2P, ePA = $105,000 CARR, start Feb 1, 2026 [#arr-services-new-bookings]. P2P/ProvAccess/ePA SOW signed by 9/9/2025 [#sows-inflight].",
      "key_people": "ILS: Yamir Armas (VP Applications/eCare Development, main contact), Alison Saucier (Project Manager), Anaily Mederos (Integration Manager), Byron French (Director of eClaims Development), Mike Paseltiner (Chief Innovation Officer), David Gutwald (Senior VP Payer Services), Kevin Claver (Programmer Analyst); also Mayda Antun, Lissette Tobin, Jeanine Lanza, Guillermo Vazquez, Hope McLaren, Michelle Vazquez on weekly calls. 1upHealth: Assiatou Diallo (IM, 0057 access APIs), Rachel Schuler (ePA implementation lead), Whitney Nimitpattana (data eng), Maria Baker (Sr, oversight), Holly Fan (CSM), Jeremy Yoon (ePA product/eng), Robert Davis, Kyle Brew, Elizabeth McGowan, Avi Lessure; Tania Gregory (DIE, Phase 1); Hannah Hewitt (Phase 1 IM, departed).",
      "risks_and_blockers": "1) 0057 kickoff a month+ late (2/1 commencement vs 3/23 kickoff); Patient Access Prior Auth EOB extract has no committed date until gap fields resolved. 2) ePA go-live Oct 2026 vs ILS ask of Sept; hard dependency on 1up X12 Converter (Aug 2026 GA) for iCare, and on ILS standing up eCare FHIR PAS endpoints (test not live until 8/1, prod TBD). 3) CRD logic unusually complex (diagnosis-based exceptions) - Rachel flagged as more complex than any other client; under eng review (EPAS-7). 4) eClaims cannot populate several required PDex fields; auth-without-claim question blocked EOB file progress in May. 5) Dual-LOB duplication doubles config everywhere; co-branding/Spanish-language portal asks are open. 6) Possible unconfirmed 3rd UM vendor. 7) Customer raised concern (Michael/Mike Paseltiner, 4/10/26) that ePA and access APIs felt like separate disjointed implementations. 8) Context: ILS had a major data breach in the news (APH Confluence page); Planhat health score went 10 to null 11/27/25 (likely data gap).",
      "points_of_interest": "Change Healthcare rip-and-replace origin story; health plan only started 2018 so historical load was 2018-present. ILS repeatedly declined to send pharmacy/vision/dental EOBs and most clinical resources in 2023 despite 1up push-back - only CarePlan + Goals flow today. Two lines of business were not documented in original SOW and surfaced mid-implementation (Nov 2023). ILS is one of the first customers exercising the 1up X12 Converter for a 278-based UM vendor. Account grew from $75k ARR to $105k CARR at renewal with full 0057 suite attached.",
      "expansion_plays": [
        {
          "play": "Clinical data expansion / HDE-popconnect",
          "rationale": "In 2023 ILS wanted to send more USCDI clinical data (9 resource types identified from their CHC files) but deferred pending extract guides; only CarePlan+Goals flow today. LTSS/SNP population makes richer clinical exchange valuable for care management and P2P payloads. Concrete, previously-expressed demand - re-open with the now-mature extract guides.",
          "fit": "high"
        },
        {
          "play": "Quality/risk analytics on FHIR data for SNP plans",
          "rationale": "FC2 runs I-SNP/IE-SNP/D-SNP Medicare plans where Stars/HEDIS and risk adjustment are high-dollar; 1up already holds their claims, coverage, care plans and (post-0057) prior auth data in FHIR across both LOBs - natural substrate for quality/risk analytics offerings.",
          "fit": "medium"
        },
        {
          "play": "Expanded X12 conversion / additional UM vendor onboarding",
          "rationale": "iCare 278 conversion is already scoped via the Aug-2026 X12 Converter, a possible 3rd UM vendor is under confirmation, and most PA volume is still fax-based - services + product expansion to route all UM channels (incl. future vendors) through 1up ePA.",
          "fit": "medium"
        },
        {
          "play": "Medicare Plan Finder (MPF)",
          "rationale": "FC2 Medicare LOB with 3 plan types must publish plan/formulary data; ILS already sends formulary files to 1up, so MPF is a low-lift add-on, though no customer signal found for it.",
          "fit": "low"
        }
      ],
      "plays_hi": 1,
      "sources": [
        "#account-ils (C05GE1WEHN1) 2023-07 to 2026-06",
        "#account-ils-implementation (C05HZJD9ZCK) 2024-01 to 2024-04 (Phase 1 ingest/go-live)",
        "#account-ils-implementation-0057-provaccess-p2p-pataccess (C0AM604DMA6) 2026-03-17 to 2026-07-06",
        "#account-ils-implementation-0057-epa (C0AUDEJDJEN) 2026-04-21 to 2026-07-08",
        "#arr-services-new-bookings 2023-06-30, 2024-02-09, 2025-06-30",
        "#sows-inflight 2025-09-09",
        "#2026-0057-access-api--readiness 2026-02-20 to 2026-05-19",
        "Confluence CKB: Independent Living Systems - Handoff to CS and Support (pageId 467664900)",
        "Confluence CKB: 3/23/26 ILS 0057 Implementation Kickoff (2134147073) and weekly call notes 4/3-6/12/26",
        "Confluence CKB: 06/24/26 ILS ePA Alignment Call",
        "Confluence Compliance: Independent Living Systems (ILS) ePA customer page (1663828015)",
        "Confluence APH: ILS (Independent Living Systems) account page (321717707)",
        "Slack search: Planhat #customer-health-updates 2025-11-27"
      ],
      "sf": {
        "arr": 69801.84744000001,
        "cumulative": 470750,
        "product_rev": 333750,
        "services_rev": 137000,
        "health": 10,
        "temperature": null,
        "nps": null,
        "renewal_sentiment": 5,
        "sentiment_notes": null,
        "flags": [
          "ROI in question"
        ],
        "renewal": "2028-06-29",
        "contract_exp": "2024-06-29",
        "customer_since": "2023-06-30",
        "go_live": null,
        "impl_level": null,
        "products_sold": null,
        "lobs": "Medicare;Medicaid;Medicare Advantage",
        "members_contracted": 50000,
        "members_current": 2562,
        "competitors": null,
        "pbm": null,
        "owner": "Jodi Patton",
        "csm": "Holly Fan",
        "exec_sponsor": "Stephanie Iheme",
        "tier": "Maintain",
        "opps": [
          {
            "name": "ILS New Platform",
            "type": "0125f000000iH45AAE",
            "closed": "2023-06-30",
            "arr": null,
            "services": 52000,
            "amount": 127000,
            "months": 12.02,
            "owner": "Olivia Cleworth",
            "won_because": "1upHealth has superior solutions and a superior roadmap when it comes to FHIR capabilities. ILS felt that 1up was the best choice for a long term partner.",
            "competitor": "edifecs"
          },
          {
            "name": "ILS - Change Order - 2024 SOW",
            "type": "0125f000000iH4tAAE",
            "closed": "2024-02-06",
            "arr": null,
            "services": 5000,
            "amount": 5000,
            "months": null,
            "owner": "Ariana Zamora",
            "won_because": null,
            "competitor": null
          },
          {
            "name": "Renewal - Independent Living Systems - 2024",
            "type": "0125f000000iHVSAA2",
            "closed": "2024-06-28",
            "arr": null,
            "services": 0,
            "amount": 75000,
            "months": 11.96,
            "owner": "Jodi Patton",
            "won_because": "renewal",
            "competitor": null
          },
          {
            "name": "25-28 Independent Living Systems P2P, Provider Access, ePA",
            "type": "0125f000000iHVSAA2",
            "closed": "2025-06-29",
            "arr": null,
            "services": 80000,
            "amount": 185000,
            "months": 28.88,
            "owner": "Jodi Patton",
            "won_because": "renewal",
            "competitor": null
          },
          {
            "name": "25-28 Independent Living Systems Renewal",
            "type": "0125f000000iHVSAA2",
            "closed": "2025-06-29",
            "arr": 97381,
            "services": 0,
            "amount": 78750,
            "months": 35.98,
            "owner": "Jodi Patton",
            "won_because": "renewal",
            "competitor": null
          }
        ]
      }
    },
    {
      "id": 13,
      "name": "Health Plan of San Mateo",
      "quarter": "q1",
      "qlabel": "Q1 · Jan–Mar",
      "seg": "medicaid",
      "seglabel": "Medicaid MCO / CCO",
      "note": "",
      "full": "Health Plan of San Mateo (HPSM)",
      "dq": "rich",
      "products_and_scope": "Long-tenured customer (contracted since Feb 2021, ~320,000 contracted members per Account Plan Hub; plan self-reports 150k+ members). Stack: (1) CMS-9115 Patient Access FHIR APIs + Provider Directory + Formulary (original $150k ARR + $100k services deal, 2021-02-04, with clinical provider connections priced at $6k/EHR/yr); (2) Payer-to-Payer \"CMS rule\" send+receive (kickoff Nov 2022, went live via HealthTrio auth flow 2023); (3) capacity increase $10k ARR upsell at Jan 2024 renewal; (4) CMS-0057 suite sold Oct 17, 2025: Provider Access + ePA, $89,000 ARR plus contract extension to 2029 (prior term date was 2/3/2026); 0057 Implementation SOW fully executed 2025-09-29. 0057 scope per implementation channel: Provider Access + Payer-to-Payer implemented simultaneously, Prior Auth EOB added to Patient Access, and ePA (CRD/DTR/PAS via 278 integration); (5) MPF Provider Directory File Updates, $13,000 services (2026-05-07), kickoff held 2026-06-02.",
      "implementation_status": "Roster says Q1 (Jan-Mar) go-live; actual target is CMS-0057 compliance by 1/1/2027 and the project is mid-flight. 0057 kickoff held 2/24/2026 (kickoff deck by Anissa Nashikkar). As of July 2026: member attribution files ingested to UAT and demoed 6/23/2026 (hpsmfhir.console.1upcoreuat.com); production move + incremental loads targeted \"before or on January 1, 2027\". Prior Auth EOB: HPSM submitted file, gap analysis done vs V1 extract guide (57% strictly-required fill, 3% must-support; HPSM was ~60% aligned and updated code); as of 7/6/2026 1up is mapping the custom EOB Auth file in DIMA (non-standard, can't use AVRO schema) and configuring NiFi. Member opt-in/opt-out: HPSM leaning toward 1upHealth-managed opt-in/out; blocked on mPULSE SOW (not complete) and redirect URLs. ePA: channel #account-hpsm-implementation-0057-epa only created 7/6/2026; kickoff being scheduled by Rachel Schuler; Rekha and Vick confirmed as HPSM ePA leads, backend 278 work underway at HPSM. MPF kickoff 6/2/2026; gap analysis being migrated to new template (June 2026).",
      "tech_architecture": "Flat-file (pipe-delimited .txt) legacy pipeline to s3://1up-hpsm-prod-data-ingest, processed via NiFi into 1up FHIR store (OpenSearch, 1up-hpsm-prod AWS account); prod NiFi on a legacy version (ticket ISS-93, blocker for Provider Access in prod, May 2026). Core systems: HealthSuite (claims/UM adjudication — Confluence ePA page lists \"UM Vendor: None,\" PA processing = HealthSuite), HealthTrio (provider portal, creates 278s), DocuStream (fax OCR -> 278 + PDF + XML), DocStar (document repo), mPulse (member portal/IDP — member login for opt-in/out uses mPulse credentials). PA today is fully manual fax/portal; ePA design = FHIR facade producing 278 bundles HPSM loads into HealthSuite (CRD hardcoded \"auth required\"; CRD/DTR/PAS = No per Project Ruby notes). Provider/clinical context: most members at San Mateo County Hospital (was migrating Cerner->Epic in 2023); Stanford and Sutter suggested as first clinical connections. California overlay: CalAIM / DxF data exchange framework, QHIO RFP in flight, Manifest MedEx a looming alternative. Files include EOB_RX (weekly), FormularyDrug_ACE (monthly), Location/Organization/Practitioner_ACE provider directory files, EOB_Auth (sent since Sept 2021 but never ingested until 0057 work).",
      "financial_signals": "2021-02-04: $150k ARR + $100k Services, provider connections @ $6k/EHR/yr (#arr-services-new-bookings). 2024-01-11: $10k ARR capacity increase; account plan notes renewal + $10K upsell signed. 2025-09-29: HPSM 0057 Implementation SOW fully executed (#sows-inflight). 2025-10-17: Provider Access + ePA $89,000 ARR + contract extension until 2029 (Jodi Patton post; HPSM did full competitive assessment). 2026-05-07: MPF Provider Directory File Updates $13,000 Services (\"fastest I've ever seen HPSM turn a contract around\"). ePA budget ceiling: HPSM wanted ePA solution under $250k (Compliance Confluence page). Account plan (Jan 2024) baseline: $150,000 ARR, contract term 2/3/2026. Note: Nov 2025 — San Mateo renewal was missing from SaaS Optics (Mark Wolf/Matt Leskovar thread).",
      "key_people": "HPSM: Eben Yong (CIO, primary decision-maker; pragmatic \"compliance checkbox\" stance on ePA), Dorothy Moyrong (interop lead since 2022), Abjot Kaur (PM for 0057), Rekha Subramanyan + Vick Shaker (ePA leads; Vick doing backend 278 work), Liss Ieong, Vicky (dev on prior auth EOB extracts), Colleen Murphey (COO), Patrick Curran (CEO), Nicole Ford (Dir. Quality Improvement). 1upHealth: Jodi Patton (sales/AE), Assiatou \"Assi\" Diallo (Implementation Manager, 0057), Anissa Nashikkar (PM; left the 0057 channel 6/30/2026), Simone Graham (data engineer), Robert Davis (DE), Maria Baker, Holly Fan (CSM-side), Rachel Schuler (ePA implementation), Jeremy Yoon (ePA/product), Kyle Brew, Elizabeth McGowan, Trang Derdak (support), Geetika Arora; deal team also included Mohammad Jouni, Don Rucker, Nolan Kelly, Andrew, Joe McCaffrey, Anagha Prasad.",
      "risks_and_blockers": "(1) ePA timeline: kickoff only starting July 2026 for a 1/1/2027 deadline; ePA IM was marked N/A in the readiness spreadsheet as of 2/6/2026. (2) ePA is explicitly a compliance checkbox — Confluence: \"HPSM has no desire to change their existing PA process and has no plans to socialize this API unless mandated by CMS\"; expect low usage and renewal scrutiny on that $89k. (3) mPulse dependency: IDP integration flagged as delay risk; HPSM's SOW with mPULSE for member portal opt-in/out screens still not completed (June 2026). (4) Open product issues: MyFHR/IDP connect errors reported March-April 2026 (unresolved for weeks); SFTP extreme slowness with pending staged files (June 2026); Provider Directory pipeline receiving files but not ingesting (Feb 2026, 37-reply thread); prod NiFi legacy-version blocker ISS-93. (5) Strategic churn risk (account plan): CalAIM/DxF alignment, 1up lacks QHIO status, Manifest MedEx alternative; HPSM in confidential QHIO RFP for clinical data (Sept 2025). (6) Planhat health score went 9 -> null Nov 2025 (tracking gap). (7) Historical trust issue: HPSM sent EOB_Auth files for 5+ years that 1up never ingested — Dorothy repeatedly asked why.",
      "points_of_interest": "HPSM was \"one of the OGs\" scoping 1up's prior auth product and ran a full competitor assessment before the Oct 2025 ePA/Provider Access win. Their EOB_Auth prior-auth file has been flowing since Sept 2021, which gave the 0057 Prior Auth EOB work a head start (HPSM was ~60% aligned to the extract guide). Eben pushed back on 2024 Provider Access priority (\"existing clinical data-sharing arrangements in California\") yet bought it in 2025 — the CMS mandate flipped the sale. Eben is vocal as a \"voice of the customer,\" interested in NLP query interfaces for non-technical users and Tableau/Python integration. HPSM is a COHS Medi-Cal plan (sole plan in county), NCQA top-rated — quality team (Nicole Ford) is a known contact. June 23 call: Eben asked about referral scenarios in Provider Access attribution and wants attribution criteria expanded beyond claims + PCP linkage.",
      "expansion_plays": [
        {
          "play": "Clinical data / popconnect via the CA DxF-QHIO wave (Stanford, Sutter, San Mateo County Hospital Epic connections)",
          "rationale": "HPSM is in an RFP with QHIO providers for clinical data (Sept 2025 op-meeting note: 'may result in additional clinical data to ingest for 1up'); provider connections are already contractually priced at $6k/EHR/yr from the 2021 deal; 2023 notes name Stanford/Sutter as starting points and SMCH is now on Epic. Position 1up as the FHIR ingestion/normalization layer for whatever QHIO wins, countering the Manifest MedEx churn threat.",
          "fit": "high"
        },
        {
          "play": "Provider Directory managed service / MPF expansion",
          "rationale": "The $13k MPF file-updates deal closed faster than any HPSM contract ever, and their provider directory pipeline has been a recurring pain (files received but not ingested, Feb 2026 escalation). Convert the one-time services into an ongoing MPF/provider-directory subscription — low friction, proven willingness to buy.",
          "fit": "high"
        },
        {
          "play": "Quality/risk analytics + natural-language query on the FHIR store now filling with prior auth, EOB, and clinical data",
          "rationale": "Eben is 'V interested in NLP interface for non-technical users to query data' and wants Tableau/Python integration (Nov 2023 notes); HPSM is an NCQA top-rated Medicaid plan with a known quality contact (Nicole Ford, Dir. Quality Improvement). Once 0057 goes live 1/1/2027, all EOB/prior-auth/attribution data is in FHIR — sell the analytics layer to the quality team rather than another compliance SKU to IT.",
          "fit": "medium"
        }
      ],
      "plays_hi": 2,
      "sources": [
        "#account-hpsm (C01MFFHCTK5) — history 2021-2026 incl. 2024-04-04 operational touchpoint, 2023-11-14 Lindsay Parker call notes, 2025-09-29 QHIO RFP note, 2026-02-03 Provider Directory pipeline escalation, 2026-06-11 SFTP slowness",
        "#account-hpsm-implementation-0057-apis (C0AG79T5J4X) — kickoff 2/24/2026 through 7/6/2026 status updates (attribution UAT, EOB Auth gap analysis, DIMA mapping, ISS-93)",
        "#account-hpsm-implementation-0057-epa (C0BFF2J8Y5C) — created 7/6/2026, Rachel Schuler canvas",
        "#account-hpsm-mpf-implementation (C0B7NSE1WQM) — MPF kickoff 6/2/2026, gap analysis 6/17/2026",
        "#arr-services-new-bookings — 2025-10-17 $89k Provider Access + ePA post; 2026-05-07 $13k MPF post (both Jodi Patton)",
        "#general 2025-10-31 + #mte-reporting-launch 2025-10-30 (Alisa Haman) — HPSM in console/MTE reporting migration batch",
        "Group DM Mark Wolf/Matt Leskovar/Nolan Kelly/Jodi Patton 2025-11-18 — renewal missing from SaaS Optics",
        "#customer-health-updates (Planhat) 2025-09-26 and 2025-11-27 — health score 8/9 -> null",
        "Confluence: Health Plan of San Mateo (HPSM) — Compliance space p.962396178 (ePA architecture, DocuStream/HealthTrio/HealthSuite/DocStar workflows, $250k cap, 12/5/24-2/13/25 meeting notes)",
        "Confluence: Health Plan of San Mateo — Account Plan Hub p.322011197 ($150k ARR, contacts, churn risk)",
        "Confluence: HPSM Ongoing File Table — CKB p.247988325",
        "Confluence: 5/5/26 and 06/03/26 HPSM 0057 Weekly Implementation Call notes — CKB p.2261319757, p.2301100078",
        "Confluence: Prior Auth Customer Timelines — PD p.1508147248 (HPSM CRD logic: Yes; UM vendor HealthSuite)",
        "Cross-account recon extracts provided by caller (verified against #arr-services-new-bookings and Confluence where possible)"
      ],
      "sf": {
        "arr": 69666.66666,
        "cumulative": 972000,
        "product_rev": 859000,
        "services_rev": 113000,
        "health": 7,
        "temperature": "Yellow",
        "nps": null,
        "renewal_sentiment": 3,
        "sentiment_notes": null,
        "flags": [],
        "renewal": "2029-02-02",
        "contract_exp": "2026-02-03",
        "customer_since": "2021-02-03",
        "go_live": null,
        "impl_level": "Level V",
        "products_sold": "Patient Access;Provider Directory",
        "lobs": "Medicare;Medicaid;Commercial",
        "members_contracted": 330000,
        "members_current": 376070,
        "competitors": null,
        "pbm": null,
        "owner": "Jodi Patton",
        "csm": "Holly Fan",
        "exec_sponsor": "Jodi Patton",
        "tier": "Maintain",
        "opps": [
          {
            "name": "Health Plan of San Mateo (HPSM) - CMS Rule",
            "type": "0125f000000iH45AAE",
            "closed": "2021-02-10",
            "arr": null,
            "services": 100000,
            "amount": 250000,
            "months": 11.96,
            "owner": "Matt Dula",
            "won_because": null,
            "competitor": null
          },
          {
            "name": "RENEWAL: Health Plan of San Mateo (HPSM) - CMS Rule 2022",
            "type": "0125f000000iHVSAA2",
            "closed": "2022-03-31",
            "arr": null,
            "services": 0,
            "amount": 150000,
            "months": 11.96,
            "owner": "Ariana Zamora",
            "won_because": null,
            "competitor": null
          },
          {
            "name": "RENEWAL: Health Plan of San Mateo (HPSM) - CMS Rule 2023",
            "type": "0125f000000iHVSAA2",
            "closed": "2023-02-02",
            "arr": null,
            "services": 0,
            "amount": 150000,
            "months": 11.96,
            "owner": "Ariana Zamora",
            "won_because": null,
            "competitor": null
          },
          {
            "name": "HPSM 2024 Capacity Increase",
            "type": "0125f000000iH4tAAE",
            "closed": "2024-01-10",
            "arr": null,
            "services": 0,
            "amount": 10000,
            "months": 11.99,
            "owner": "Lindsay Parker",
            "won_because": "relationship",
            "competitor": null
          },
          {
            "name": "RENEWAL: Health Plan of San Mateo (HPSM) - CMS Rule - Renewal 2024",
            "type": "0125f000000iHVSAA2",
            "closed": "2024-01-10",
            "arr": null,
            "services": 0,
            "amount": 150000,
            "months": 11.99,
            "owner": "Lindsay Parker",
            "won_because": "existing customer",
            "competitor": null
          },
          {
            "name": "25-27 Health Plan of San Mateo (HPSM) Renewal",
            "type": "0125f000000iHVSAA2",
            "closed": "2025-02-03",
            "arr": null,
            "services": 0,
            "amount": 160000,
            "months": 47.97,
            "owner": "Jodi Patton",
            "won_because": "existing customer",
            "competitor": null
          },
          {
            "name": "25-28 HPSM -  provider access, ePA",
            "type": null,
            "closed": "2025-10-17",
            "arr": 160000,
            "services": 0,
            "amount": 89000,
            "months": 36.01,
            "owner": "Jodi Patton",
            "won_because": "existing customer relationship",
            "competitor": null
          },
          {
            "name": "HPSM - MPF - Provider Directory File Updates",
            "type": null,
            "closed": "2026-05-07",
            "arr": null,
            "services": 13000,
            "amount": 13000,
            "months": 2.83,
            "owner": "Jodi Patton",
            "won_because": "mpf files",
            "competitor": null
          }
        ]
      }
    },
    {
      "id": 14,
      "name": "HealthTeam Advantage",
      "quarter": "q1",
      "qlabel": "Q1 · Jan–Mar",
      "seg": "medadv",
      "seglabel": "Medicare Advantage",
      "note": "",
      "full": "HealthTeam Advantage (HTA)",
      "dq": "rich",
      "products_and_scope": "Phase 1 (new logo, signed ~2024-03-29): \"1up Comply\" — CMS-9115 Patient Access API + Provider Directory, mapping to DIMA, 1 LOB (Medicare Advantage), compliance-only posture (\"interested in compliance only for now\" per internal handoff notes). Data scope grew to include Patient, Coverage, EOB (Professional, Inpatient, Outpatient, Pharmacy, Dental, Vision), Formulary/CoveragePlan, Provider Directory (Practitioner + Organization, medical and pharmacy). Historical claims loaded back to 2016. Phase 2 (renewal, closed 2026-03-18): on-time 3-year renewal with FULL CMS-0057 upsell — Payer-to-Payer, Provider Access, and ePA — commencement date 2026-03-29. Phase 3 (in-flight since 2026-05-27): Medicare Plan Finder (MPF) project for 2027 MA Provider Directory data (dedicated channel #account-healthteamadvantage-mpf-implementation). Plans on file: HealthTeam Advantage Plan I/II (PPO), Diabetes & Heart Care (HMO C-SNP), Cardinal Plan (HMO).",
      "implementation_status": "Roster says Q1 (Jan-Mar) go-live — matches the 0057 contract commencement date of March 29, 2026 (end of Q1), confirmed in #2026-0057-access-api--readiness [2026-04-16]. Access API URLs were only being deployed 2.5 weeks AFTER commencement (Maria Baker requested URL deployment 4/16 so the commencement email could go out; Keycloak realm = healthteam-advantage). Jira shows Provider Access endpoint deploy (PRV-654) and P2P outbound member-match setup in UAT+Prod (P2P-634) in the April 2026 batch. ePA deployment status: none found in Slack/Jira — likely still early (as of Feb 2026 Jodi was still confirming \"where they landed\" on their on-prem prior auth vendor). History: original CMS-9115 implementation kicked off 2024-04-17 with a July 1, 2024 target, but go-live signoff didn't come until ~2025-09-19 (~14 months late; handoff to Customer Care/Holly Fan Sept 2025) due to chronic customer/vendor data quality issues. MPF implementation kicked off 2026-05-28; as of 2026-07-08 HTA is delivering cleaned test files against an updated Gap Analysis, with 1up pushing a fast feedback loop.",
      "tech_architecture": "Flat-file SFTP ingestion architecture: data flows from HTA's EDW and from NirvanaHealth (3rd-party administrator for claims/enrollment/PBM Part C & D; \"Aria\" platform) via SFTP CSVs -> NiFi (AWS t3.xlarge instance, per-customer) -> FHIR server; RDS backing tables (prod_*_mv views), S3 error/complete reports bucket (1up-healthteam-advantage-prod-data-ingest-report), Kibana + 1up Console/Patient Viewer (healthteamadvantagefhir.console.1up.health), public FHIR endpoint api.healthteamadvantagefhir.com (PAS v2, Checkly monitoring TOPS-283), Keycloak realm healthteam-advantage, customer ReadOnly API access via Postman. File cadence: weekly incrementals from Nirvana (Tuesdays ~8-10am ET, 1up ingestion daily 4:30pm ET); non-standard full-replace files for Patient, Coverage, EOB Practitioner/Organization (documented in Confluence \"Ongoing File Table\"). Vendor web: NirvanaHealth (TPA, contact Praneeth), Cloudfire (delivers Provider Directory files direct via SFTP), VSP (vision), dental switched Delta Dental -> Dominion for PY2025, PBM data via Nirvana. Third-party app access live (Flexpa integration, PACS-11).",
      "financial_signals": "2024-03-29: new logo booking, 1up Comply $70,000 ARR + $42,500 services [#arr-services-new-bookings]. 2025-03-27: $3,500 ARR pricing-increase upsell on renewal [#arr-services-new-bookings]. 2026-03-18: on-time 3-YEAR renewal with full 0057 upsell — +$100,000 ARR for 0057 plus $15,640 year-over-year 3% CPI increase (Jodi Patton, credits Jeremy Yoon, Ryan Ingram, Dan Petersen, Matt Leskovar) [#arr-services-new-bookings]. Implied current ARR ~$189k (likely). 0057 commencement 2026-03-29. MPF project surfaced Apr-May 2026 — no booking amount found.",
      "key_people": "Customer: Brendan Hodges (President & CEO), Deanna \"Deena\" (CIO — Part C/D ops, quality Stars), Sikander Soomro (IT oversight), Joleen Katula (original compliance lead/stakeholder — LEFT the company ~July 2025), Bethany Carter and David Short (successor POCs; David Short is the net-new decision maker on the prior auth/0057 conversation per Jodi's 2026-02-25 DM), Alan (hands-on data/provider directory contact). Vendor: Praneeth (NirvanaHealth). 1upHealth: Jodi Patton (AE — owns renewals/upsells), Anissa Nashikkar (IM/CSM, runs weekly calls), Maria Baker (services leadership, 0057 commencement), Simone Graham (data engineer through go-live, left channel Feb 2026), Joy He (DE on MPF), Robert Davis (services/DE lead), Holly Fan (Customer Care — post-go-live owner, also flagged MPF interest), Stephanie Iheme (CS), Jeremy Yoon / Ryan Ingram / Dan Petersen / Matt Leskovar (renewal support). Member of Health Plan Alliance (HPA).",
      "risks_and_blockers": "1) Planhat health score deteriorated sharply in 2026: 7->3 and 4->3 on 2026-02-17, then 6->2 on 2026-03-11 [#customer-health-updates] — cause not stated in channels (none found), timing overlaps the renewal negotiation. 2) May 2026 production incident: HTA ingestion blocked ~1 week by suspected RDS deadlock, possibly related to ZDP (ISS-101, raised in #sev1-helpathome-may19th2026, 2026-05-26). 3) Chronic customer/vendor data quality: historical EOB loads had massive failures (e.g., 221,049/387,674 2018 professional EOBs missing billing_provider_id; all institutional claims 2016-2023 missing claim_subtype); Simone: \"Knowing them, they will not resolve the issue.\" 4) Slow-moving customer/vendor: Nirvana could only commit to files every 3 weeks in 2024; original go-live slipped from Jul 2024 to Sep 2025. 5) Stakeholder churn: Joleen Katula (original champion) gone; POC ambiguity resolved toward David Short/Bethany Carter. 6) 0057 commencement email was late (URLs not deployed until ~4/16 vs 3/29 commencement). 7) MPF timeline pressure with HTA-side PTO delays (Bethany/Alan, June 2026). 8) ePA feasibility question: HTA unsure they can support real-time 2-way exchange (2025-06-12) and has on-prem prior auth vendor tooling.",
      "points_of_interest": "HTA is a small North Carolina MA plan (~37k patient resources / 160k coverage resources in prod, per Sept 2025 Postman counts) that outsources data heavily — NirvanaHealth TPA is the real data counterparty, plus Cloudfire for provider directory; any new data type tends to require a new SOW discussion. They asked in Nov 2024 to have VSP (vision vendor) connect DIRECTLY to 1up instead of flat files — 1up flagged it would need another SOW; never closed (none found since). Dental vendor switch Delta Dental -> Dominion (PY2025) required implementing both. The 18-week SOW became a ~17-month implementation, yet the account still renewed for 3 years with a full 0057 upsell — the relationship survived on Anissa's weekly-call diplomacy. HTA is in the Health Plan Alliance (peer-influence channel for 1up marketing). CIO Deena owns quality Stars and practice performance — a named analytics buyer. New unmapped file HTA_NETWORK_20260310.csv appeared during MPF gap analysis (mappable to Location).",
      "expansion_plays": [
        {
          "play": "ePA implementation land-and-expand: drive the already-contracted ePA to production with a services SOW for payer-side integration (their PA workflow sits with on-prem prior auth vendor tooling and they doubted their ability to support real-time 2-way exchange)",
          "rationale": "ePA is in the March 2026 contract but no deployment activity found; HTA explicitly asked for ePA technical requirements (2025-06-12) and Jodi's Feb 2026 notes say they had 'the on prem version with their prior auth vendors' with David Short as the new decision maker. Every prior phase at HTA generated services revenue because they cannot self-serve integration work.",
          "fit": "high"
        },
        {
          "play": "Vendor direct-connect / HDE SOW: connect VSP (vision) — and potentially Dominion (dental) — directly to 1up instead of HTA-brokered flat files",
          "rationale": "HTA was 'very eager' for VSP to share vision data directly with 1up (2024-11-14) and 1up already told them it needs a separate SOW; it was never closed. VSP also asked about CMS-0057-f implications (2024-12-06). This removes HTA's weakest link (their own file generation) and monetizes work 1up partially does already (Cloudfire SFTP).",
          "fit": "medium"
        },
        {
          "play": "Quality/Stars analytics + clinical data (popconnect) on the FHIR store already flowing",
          "rationale": "Six years of claims (2016-present), formulary, and provider directory data are already in 1up FHIR; CIO Deena explicitly owns 'quality stars and practice performance,' and the C-SNP product line implies HEDIS/risk pressure. Counterweight: account has been 'compliance only for now' since day one and health score is shaky, so lead with a low-lift Stars/quality readout on existing data before pitching clinical data acquisition.",
          "fit": "medium"
        }
      ],
      "plays_hi": 1,
      "sources": [
        "Slack #account-healthteam-advantag (C06Q961TFK8), 2024-03-25 through 2026-03-19 (SOW drafting, handoff notes 2024-04-02, vendor changes, ePA interest 2025-06-12, stakeholder churn 2025-07-24)",
        "Slack #account-hta-implementation (C06V2E9CQQ7), 2025-04 through 2025-09 (historical loads, error stats, go-live arc, handoff to Customer Care)",
        "Slack #account-healthteamadvantage-mpf-implementation (C0B60R44L2K), 2026-05-27 through 2026-07-08 (MPF kickoff, gap analysis, test files)",
        "Slack #arr-services-new-bookings, 2024-03-29 ($70k ARR + $42.5k services new logo), 2025-03-27 ($3.5k pricing increase), 2026-03-18 (3-yr renewal, +$100k 0057 ARR, +$15,640 CPI)",
        "Slack #2026-0057-access-api--readiness (C0A36DHR84R) thread 2026-04-16 (commencement 3/29, P2P + Provider Access + ePA, Keycloak realm healthteam-advantage)",
        "Slack #customer-health-updates (C06FV5ZU5AB) Planhat alerts 2026-02-17 and 2026-03-11 (health score drops to 3 and 2)",
        "Slack #sev1-helpathome-may19th2026 (C0B4LF4GR9R) 2026-05-26 (HTA RDS deadlock / ISS-101)",
        "Slack DM Holly Fan -> Jodi Patton 2026-04-17 (MPF project interest); DM Jodi -> Jeremy Yoon 2026-02-25 (prior auth vendor / David Short)",
        "Confluence CKB space: HealthTeam Advantage Documentation Hub (pageId 508461057), EOB Historical Load (1345749159), Historical Load (1328119944), Ongoing File Table (1616543745), Coverage File Review (684097588), plus per-resource load pages",
        "Confluence SPL: HealthTeam Advantage (941424719) — image-only page, no text content",
        "Jira: PRV-654 (deploy provider access endpoint), P2P-634 (P2P outbound UAT+Prod batch), ISS-101 (RDS deadlock ingestion block), TOPS-283 (Checkly, api.healthteamadvantagefhir.com PAS v2), PACS-11 (Flexpa third-party access issues), UIS-1 (console 500 error), INFRA-2371 (Keycloak read-only clients)"
      ],
      "sf": {
        "arr": 329426.912568,
        "cumulative": 793363,
        "product_rev": 692863,
        "services_rev": 100500,
        "health": 10,
        "temperature": null,
        "nps": null,
        "renewal_sentiment": 5,
        "sentiment_notes": null,
        "flags": [
          "Market Risk"
        ],
        "renewal": "2027-03-28",
        "contract_exp": null,
        "customer_since": "2024-03-29",
        "go_live": null,
        "impl_level": null,
        "products_sold": null,
        "lobs": "Medicare Advantage",
        "members_contracted": 30000,
        "members_current": 26693,
        "competitors": null,
        "pbm": null,
        "owner": "Jodi Patton",
        "csm": "Holly Fan Test",
        "exec_sponsor": "Stephanie Iheme",
        "tier": "Maintain",
        "opps": [
          {
            "name": "HTA- New Platform",
            "type": "0125f000000iH45AAE",
            "closed": "2024-03-29",
            "arr": null,
            "services": 42500,
            "amount": 112500,
            "months": 11.96,
            "owner": "Olivia Cleworth",
            "won_because": "Confidence in solution and company as a long term partner, HPA partnership",
            "competitor": null
          },
          {
            "name": "25-26 HTA Renewal",
            "type": "0125f000000iHVSAA2",
            "closed": "2025-03-27",
            "arr": 73500,
            "services": 0,
            "amount": 73500,
            "months": 11.96,
            "owner": "Jessica Candito",
            "won_because": "25-26 Renewal Term",
            "competitor": null
          },
          {
            "name": "26-28 HTA Upsell - ePA, P2P, Provider Access",
            "type": null,
            "closed": "2026-03-18",
            "arr": null,
            "services": 45000,
            "amount": 145000,
            "months": 11.96,
            "owner": "Jodi Patton",
            "won_because": "0057 upsell",
            "competitor": null
          },
          {
            "name": "26-27 HTA Renewal",
            "type": "0125f000000iHVSAA2",
            "closed": "2026-03-18",
            "arr": 73500,
            "services": 0,
            "amount": 75705,
            "months": 11.96,
            "owner": "Jodi Patton",
            "won_because": "renewal",
            "competitor": null
          },
          {
            "name": "28-29  HTA Renewal",
            "type": "0125f000000iHVSAA2",
            "closed": "2026-03-18",
            "arr": 185068,
            "services": null,
            "amount": 189590,
            "months": 35.98,
            "owner": "Jodi Patton",
            "won_because": "renewal",
            "competitor": null
          },
          {
            "name": "27-28  HTA Renewal",
            "type": "0125f000000iHVSAA2",
            "closed": "2026-03-18",
            "arr": 175155,
            "services": null,
            "amount": 184068,
            "months": 23.98,
            "owner": "Jodi Patton",
            "won_because": "renewal",
            "competitor": null
          },
          {
            "name": "HTA - MPF - Provider Directory File upgrades",
            "type": null,
            "closed": "2026-05-05",
            "arr": null,
            "services": 13000,
            "amount": 13000,
            "months": 1.02,
            "owner": "Jodi Patton",
            "won_because": "MPF",
            "competitor": null
          }
        ]
      }
    },
    {
      "id": 15,
      "name": "MCS Healthcare Holdings",
      "quarter": "q1",
      "qlabel": "Q1 · Jan–Mar",
      "seg": "medadv",
      "seglabel": "Medicare Advantage",
      "note": "Puerto Rico",
      "full": "MCS Healthcare Holdings (Medical Card System, Inc.) — Puerto Rico payer, ~400k members, MCS Classicare (Medicare Advantage) is the only 5-star CMS plan in Puerto Rico; also commercial/Life LOBs. Parent: MHH Healthcare/Kinderhook Industries.",
      "dq": "rich",
      "products_and_scope": "Original (3/30/2023 new logo): 1up Platform + Patient Access (CMS-9115) & Provider Directory, up to 400k members — $606k ARR + $160k Services; file types: Clinical, Medical EOB, Pharmacy/NCPDP, Provider Directory, Formulary (flat file/JSON via SFTP pull). Expansions: $18k Services SOW (1/22/2025) Patient Resource re-ingestion with delete flag (member-ID fix); P2P + Provider Access upsell on renewal (4/30/2025, $209.6k CARR/$56k Services, start 3/30/2026); P2P + Provider Access + ePA SOW signed 9/9/2025; ePA upsell booked 12/31/2025 ($350k ARR + $120k Services); PBM change to MedImpact SOW signed 9/9/2025 (HIGH priority); Provider Directory file updates incl. Medicare Plan Finder $25k Services (6/17/2026); and a June 2026-signed SOW covering additional clinical data resources, full Provider Directory re-do (all LOBs, incl. MPF), and dental claims addition (Maria Baker, #account-mcs 6/3/2026). Total ARR now roughly $1.17M (606k + 209.6k + 350k) plus ~$380k cumulative services — \"likely\" total, summed from bookings posts.",
      "implementation_status": "Original Patient Access/Provider Directory implementation slipped repeatedly through 2023 (Sept→Oct 2023 targets; historical ingestion still underway 1/15/2024); roster confirms Q1 (Jan–Mar) go-live — likely Q1 2024. Provider Directory and Clinical Ingestion projects were placed on hold 11/24/2025 at customer request. CMS-0057 workstream kicked off 3/3/2026, a month ahead of schedule (customer eager). As of July 2026: Provider Access — member attribution UAT PASSED 6/3/2026 (file delivered 5/12, ahead of 5/15 deadline); production pipeline next after MPF. P2P/Provider Access opt-in/opt-out screens — 1up-managed (no portal integration); URLs configured 7/8/2026, troubleshooting an app-access error; completing screens closes out P2P and Provider Access deliverables. MPF — kicked off 6/4/2026, MCS's top priority (CMS testing May–July 2026); provider directory files delivered to SFTP ~June 30. ePA — CRD logic build in progress, ETA 7/31/2026; Zyter integration targeting October 2026 in Stage; Patient Access Prior Auth EOB UAT file slated Sept 9/16 2026. Clinical file delivery pushed to 2027–2028 due to MCS resource constraints.",
      "tech_architecture": "Core claims: Power MHS (legacy, contracted 1990, now Baxter-owned; retiring engineers = strategic risk). Azure-centric with ODS + data warehouse (1,700 reports); in-house HL7 engines; CCD/ADT clearinghouse (Angel Padro); data dictionaries via Innovaccer and SourceEdge. UM: Zyter TruCare integrated to Power MHS. PBM changed to MedImpact (SOW 9/9/2025). ePA involves 4 delegated UM entities: FHC (X12/SFTP today, FHIR \"2027,\" may support neither — gap risk), TNPR (X12/SFTP; 1up X12 converter coming Aug 2026), NetClaim (dental, FHIR APIs Oct 2026), Zyter (direct 1up integration, Oct 2026 stage). Each delegated entity returns its own PA questionnaire — 1up building one static questionnaire per vendor, routed by CPT code. Data exchange: SFTP pull, flat file/JSON; single normalized prior-auth EOB file consolidating delegated entities. FHIR endpoints at api.mcsfhir.com/r4/public/*; console at mcsfhir.console.1upcoreuat.com / 1upcoreprod.com. Friendly provider for ePA/Provider Access testing: Dorado Health (Meditech). Note: PR providers use homegrown EHRs (not Epic/Cerner/athena), a constraint for popconnect-style plays.",
      "financial_signals": "3/30/2023: $606k ARR + $160k Services (new logo). 1/22/2025: $18k Services (Patient Resource delete-flag). 4/30/2025: $209,600 CARR + $56,000 Services P2P/Provider Access upsell, start 3/30/2026. 12/31/2025: ePA upsell $350,000 ARR + $120,000 Services. 6/17/2026: $25,000 Services (Provider Directory file updates incl. MPF). SOW for PD re-do + dental claims + clinical resources signed ~6/3/2026 (amount not stated in sources). Original contract term date 3/29/2024 (renewed).",
      "key_people": "Customer: Gannett Arzuaga (SVP IT, exec sponsor), Aracelis Morales Cruz (PM, day-to-day lead), Vanessa Garcia Colon (technical/interop lead), Tania Liranzo (prior auth/data), Johanna Morales & Carla Ornedo (MPF contacts), Angel Villafane Padro (technical/CCD-ADT), Catherine Valentin, Yara Torres Cordero (PM Director), Javier (MPF technical); execs: Jim O'Drobinak (CEO), José B. Carrión III (President, MCS Healthcare Holdings), Roberto Torres (COO). Departed: Lisa Cassanova Del Moral (VP BI, left ~Sept 2024). 1upHealth: Jodi Patton (account exec), Maria Baker (account/CS lead), Geetika Arora (CSM), Assiatou Diallo (IM, 0057 APIs), Rachel Schuler (IM, ePA), Jeremy Yoon (SE, ePA), Stacy Harris (IM, original build), Robert Davis \"Robzzz\" (DE lead), Tania Gregory (DE), Stephanie Iheme (services), Kyle Brew & Elizabeth McGowan (product), Holly Fan (support).",
      "risks_and_blockers": "1) Chronic customer-side file delivery delays (2023–2025 pattern; projects put on hold 11/2025); clinical files now pushed to 2027–2028 because MCS's data team is only ~4–5 people — Vanessa seeking more resources. 2) FHC (delegated UM entity) may support neither FHIR nor X12 for ePA — MCS's backup is a custom-format integration requiring a change order; would shift cost/schedule. 3) TNPR asked to submit EOB Prior Auth data as X12 278 instead of 1up's EG format — potential change order (Rachel Schuler, 7/2/2026). 4) Sensitive data (behavioral health/addiction) not tagged today; P2P outbound filtering not active until 2H 2026 — compliance exposure flagged by MCS's Vanessa. 5) MPF dual contract-year (2026+2027 directories live simultaneously by Oct 1, 2026) is unresolved scoping (Provider Contract Year-Attribution work in flight). 6) End-of-year file deliveries flagged at risk due to MCS 2027 business-readiness prioritization. 7) Handoff-to-support docs unfinished; support unclear on which resources are live (Irtiza Mahmud, 4/30/2026).",
      "points_of_interest": "MCS formally asked 1up for an AI-enabled prior-auth document analysis / decision-support solution (Jan–Feb 2026, readiness channel). They want ePA gateway PA data to flow directly into Patient/Provider Access & P2P APIs without extracts — 1up (Jeremy Yoon) recommended against for now, but it signals appetite for deeper platform integration. They asked about sending commercial-LOB providers/members in attribution (Medicare-only today) — a whole-book expansion signal. Historical: interest in PR HIE connectivity, Apple Health/Google integration, ADT/CCD conversion services, SQL-on-FHIR, NCQA/HEDIS, Blue Flame architecture, and eventually replacing legacy Power MHS. 1up demoed the Ingestion Reporting console to MCS as a friendly customer. Kickoff deck and gap analyses live in Google Drive; extensive meeting-minutes trail in Confluence CKB space.",
      "expansion_plays": [
        {
          "play": "AI-enabled prior authorization document analysis / decision support add-on",
          "rationale": "MCS formally asked 1up for exactly this (Jan/Feb 2026) because delegated entities each return their own questionnaires and PA centralization is complex. They already bought the full ePA stack ($350k ARR upsell) and have 4 UM vendors generating heterogeneous PA data — an AI review/decisioning layer is a natural, customer-initiated attach.",
          "fit": "high"
        },
        {
          "play": "Sensitive data tagging & segmentation SOW (behavioral health/addiction filtering for P2P and Provider Access)",
          "rationale": "Geetika Arora stated on 5/21/2026 that this requires a dedicated SOW and scoping exercise; MCS's Vanessa raised the confidential-data concern themselves, and 1up's roadmap enables filtering by default in 2H 2026. Pre-scoped, compliance-driven, and time-boxed to their P2P go-live — the most immediate bookable services+ARR item.",
          "fit": "high"
        },
        {
          "play": "Commercial LOB expansion of the 0057 API suite (attribution, P2P, Patient Access beyond Medicare)",
          "rationale": "MCS sends Medicare data only today but asked (4/7/2026) whether commercial-LOB providers can be included in the attribution file and stated interest in sending commercial clients later. The PD re-do SOW already covers all LOBs, so extending attribution/API coverage to the whole book is a natural per-member ARR uplift.",
          "fit": "medium"
        },
        {
          "play": "Quality/risk analytics on the FHIR repository (SQL-on-FHIR, NCQA/HEDIS, popconnect/clinical connectivity)",
          "rationale": "MCS is PR's only 5-star plan and its account plan lists SQL, converters, popconnect, and NCQA/HEDIS as the agreed strategic roadmap tied to their Power MHS modernization and Stars protection. Clinical data + dental claims + PA data will all be in the 1up FHIR repo by 2027. Caveat: clinical ingestion slipping to 2027-2028 and homegrown PR EHRs slow the popconnect angle.",
          "fit": "medium"
        }
      ],
      "plays_hi": 2,
      "sources": [
        "#account-mcs (C051X7L6JUR), 2023-04 to 2026-07",
        "#account-mcs-implementation-0057-apis (C0AHK83K6LX), 2026-03 to 2026-07",
        "#account-mcs-implementation-0057-epa (C0ALFFU9W22), 2026-03 to 2026-07",
        "#account-mcs-mpf-implementation (C0B87TFUEDS), 2026-06 to 2026-07",
        "#account-mcs-implementation (C0513GCVDGX) via search results, 2025",
        "#general go-live search (Fallon announcement confirming MCS not yet live on Provider Access as of 6/8/2026)",
        "Confluence: MCS (Medical Card System) account plan, APH space, page 321750377 (updated Jan 2024)",
        "Confluence: MCS - Patient Access - Handoff to CS and Support (CKB 314769520); MCS Provider Directory and Member ID Handoff (CKB 1606418433)",
        "Confluence: ePA meeting minutes — 3/17/25 MCS/TNPR (CKB 2106884110), 04/15/26 (CKB 2216427521), 06/29/26 (CKB 2452062210), 07/02/26 TNPR vendor call (CKB 2467856385), 03/11/26 0057 APIs minutes (CKB 2086010881), Compliance tracker (1955233838)",
        "Confluence: Provider Contract Year-Attribution Scoping (DNA 2466971649)",
        "Cross-account recon extracts: #arr-services-new-bookings (2023-03-30, 2025-01-22, 2025-04-30, 2025-12-31, 2026-06-17), #sows-inflight (2025-09-09, 2025-09-11, 2026-02-27), #2026-0057-access-api--readiness (2026-01-29 to 2026-04-07)"
      ],
      "sf": {
        "arr": 687600,
        "cumulative": 2922600,
        "product_rev": 2377600,
        "services_rev": 545000,
        "health": 10,
        "temperature": null,
        "nps": null,
        "renewal_sentiment": 4,
        "sentiment_notes": null,
        "flags": [
          "ROI in question"
        ],
        "renewal": "2027-03-29",
        "contract_exp": "2024-03-29",
        "customer_since": "2023-03-30",
        "go_live": null,
        "impl_level": "Level II",
        "products_sold": null,
        "lobs": "Medicare Advantage",
        "members_contracted": 400000,
        "members_current": 468761,
        "competitors": null,
        "pbm": null,
        "owner": "Jodi Patton",
        "csm": "Geetika Arora",
        "exec_sponsor": "Andrew Boyd",
        "tier": "Maintain",
        "opps": [
          {
            "name": "Medical Card System - FHIR Platform",
            "type": "0125f000000iH45AAE",
            "closed": "2023-03-30",
            "arr": null,
            "services": 160000,
            "amount": 766000,
            "months": 11.99,
            "owner": "Bobby Fredrickson",
            "won_because": null,
            "competitor": null
          },
          {
            "name": "MCS - Provider Directory Supp Svcs.",
            "type": "0125f000000iH45AAE",
            "closed": "2023-09-28",
            "arr": null,
            "services": 10000,
            "amount": 10000,
            "months": 12.02,
            "owner": "Jessica Candito",
            "won_because": "Customer needed additional Provider Directory work that was outside of the original sow and contract.",
            "competitor": null
          },
          {
            "name": "MCS: Renewal 2024",
            "type": "0125f000000iHVSAA2",
            "closed": "2024-03-22",
            "arr": null,
            "services": 0,
            "amount": 606000,
            "months": 11.96,
            "owner": "Drew Arnold",
            "won_because": "A happy customer with good relationships",
            "competitor": null
          },
          {
            "name": "SOW: MCS - Member ID",
            "type": null,
            "closed": "2025-01-22",
            "arr": null,
            "services": 18000,
            "amount": 18000,
            "months": -11.96,
            "owner": "Drew Arnold",
            "won_because": "Good relationship",
            "competitor": null
          },
          {
            "name": "25-27 MCS P2P and Provider Access",
            "type": "0125f000000iHVSAA2",
            "closed": "2025-04-04",
            "arr": null,
            "services": 56000,
            "amount": 265600,
            "months": 11.96,
            "owner": "Jodi Patton",
            "won_because": "A happy customer with good relationships",
            "competitor": null
          },
          {
            "name": "25-27 MCS Renewal",
            "type": null,
            "closed": "2025-04-04",
            "arr": null,
            "services": 156000,
            "amount": 762000,
            "months": 23.95,
            "owner": "Jodi Patton",
            "won_because": "existing customer",
            "competitor": null
          },
          {
            "name": "25-28 MCS ePA",
            "type": "0125f000000iHVSAA2",
            "closed": "2025-12-15",
            "arr": null,
            "services": 120000,
            "amount": 470000,
            "months": 23.98,
            "owner": "Jodi Patton",
            "won_because": "A happy customer with good relationships",
            "competitor": null
          },
          {
            "name": "MCS Provider Directory File Updates",
            "type": null,
            "closed": "2026-05-19",
            "arr": null,
            "services": 25000,
            "amount": 25000,
            "months": 12.19,
            "owner": "Jodi Patton",
            "won_because": "services",
            "competitor": null
          }
        ]
      }
    },
    {
      "id": 16,
      "name": "McLaren",
      "quarter": "q1",
      "qlabel": "Q1 · Jan–Mar",
      "seg": "medicaid",
      "seglabel": "Medicaid MCO / CCO",
      "note": "Early HDE customer",
      "full": "McLaren (McLaren Health Plan / MHP, incl. former MDwise subsidiary)",
      "dq": "rich",
      "products_and_scope": "Signed 2025-09-16 (Olivia Cleworth AE): new payer deal, $1,000,480 ARR, 36-month term — Patient Access, Provider Directory, Provider Access, Payer-to-Payer; a MIHIN (Michigan HIE) rip-and-replace [#arr-services-new-bookings]. Phase 1 = CMS-9115 Patient Access + Provider Directory for 3 LOBs (MHPExchangeQHP, MHPManagedMedicaid, MHPMedicareAdvantage) plus MDwise (Indiana Medicaid) environment, later descoped. 0057 P2P + Provider Access contract commencement 3/31/2026 [Nolan Kelly, #account-mclaren 2026-03-27]. ePA add-on signed 2026-06-24: $100,000 ARR (net $30,000 after contraction from losing State of Indiana Medicaid/MDwise contract), displacing Zeomega [#arr-services-new-bookings]. MPF gap analysis completed Mar 2026; MPF work deferred into 0057 implementation. Named early HDE customer: one of first 2-4 HDE implementations (MNSCHA, McLaren, JAI, BCBS TN) and one of first two customers for Patient Access on MTE [Confluence: HDE Implementation Playbook; Patient Access on MTE Capability Overview].",
      "implementation_status": "Roster says Q1 (Jan-Mar) go-live; kickoff page (9/22/25) confirms goal was \"go-live before end of Q1 2026\" — this slipped. Actual timeline: SFTP/env provisioning Oct-Nov 2025; test-file validation Nov 2025-Feb 2026; historical ingest Apr-May 2026 (Patient/Coverage/PD verified; Labs blocked on missing LOINC codes); customer was \"eager to go-live in April\" (go-live = STE) with UAT approval for all resources except EOB [#account-mclaren-9115, 2026-03-25]. 0057 Access APIs deployed 3/27/2026 in time for 3/31 commencement [Maria Baker thread]. As of July 2026: HDE UAT runs started 6/30/2026 (Andrew Berglund pulling STE files, hitting FHIR validation errors); public Provider Directory endpoints configured 7/7/2026 on api.mclarenfhir.com (public-qhp, public-mm, public-ma); ePA implementation kicked off ~7/1/2026 (new channel #account-mclaren-implementation-0057-epa, PM Rachel Schuler). Internal estimate (May 15, 2026 DNA page): MNSCHA + McLaren \"fully implemented, every file type validated end-to-end\" mid-to-late July 2026 at best. Not yet fully live.",
      "tech_architecture": "Core admin system: HealthEdge HealthRules (Patient.identifier system literal \"HealthRules\" causing FHIR URI validation failures in UAT); claims come from their data warehouse via complex queries originally built for MiHIN feeds — McLaren proposed sending historical claims in legacy MiHIN format for 1up to map [#account-mclaren-9115, 2025-12-02]. PBM: MedImpact (daily 112 EOB Rx files; monthly Formulary/CoveragePlan/InsurancePlan/Pharmacy Directory; plans ML110/ML318/ML329; contact Shaahida). Deployment: single-tenant STE on AWS (1up-mclaren-prod/pre-prod + separate 1up-mclaren-mdwise envs, now paused), NiFi ingestion, SFTP flat-file Extract Guide CSVs, Avro schema validation. Custom Sidewinder transformation built for EOB Inpatient/Outpatient/Professional (non-EG raw format; oneup_mclaren branch in impl-data-transform repo). Member counts: Managed Medicaid ~918.6k, Exchange QHP ~25.4k, Medicare Advantage ~6.5k (all active) [#account-mclaren, 2026-05-04]. Parallel MTE/HDE track: McLaren data called \"the most robust data we have so far for any MTE efforts\"; S8 goal (June 2026) Raw→CDM→FHIR for remaining McLaren datasets. Public FHIR domain: api.mclarenfhir.com.",
      "financial_signals": "$1,000,480 ARR new-payer booking 2025-09-16, 36-mo term [#arr-services-new-bookings, verified]. $100,000 ARR ePA add-on 2026-06-24, net $30,000 after MDwise contraction; Nolan Kelly noted \"we thought it was contracting more than it has\" [#arr-services-new-bookings + #general Mission Minute 2026-06-30, both verified]. MDwise (State of Indiana Medicaid) loss communicated mid-Dec 2025 drove SOW contraction/contract update Jan 2026. Patrick Stevenson requested contract/billing-metrics review Feb 2026 after org changes.",
      "key_people": "McLaren: Sara Mavredes (VP of BI and Operations, exec sponsor), Patrick Stevenson (VP Business Info/IT, SME, contract counterpart), Ellen Coppler (Business Information Manager), Maria Sergent (Business Information Manager), Tom Gorton (Information Systems Developer), Andrew (customer tech lead sending data files), unnamed McLaren PM for ePA (met Rachel Schuler June 30 2026). MDwise: Stacy Shireman (PM). MedImpact: Shaahida. 1upHealth: Olivia Cleworth (Sr AE), Anissa Nashikkar (Implementation PM), Whitney Nimitpattana (Data Implementation Engineer, lead DE), Maria Baker (Sr Dir Implementations), Stephanie Iheme (VP Customer Experience), Robert Davis (Sr Mgr Technical Services), Nolan Kelly (exec, contracts), Rachel Schuler (ePA implementation PM), Kevin Yamashita + Daniel Couch (HDE/MTE), Andrew Berglund (1up eng, HDE UAT), Mohammad Jouni (data extraction pilot), Stacy Harris + Simone Graham (implementation coverage).",
      "risks_and_blockers": "1) Contraction: lost State of Indiana Medicaid (MDwise) business Dec 2025; MDwise work formally halted 12/8/2025; environment still provisioned. 2) Go-live slippage: Q1 2026 goal missed; full end-to-end validation estimated mid-late July 2026. 3) Data quality: Observation/Lab historical loads ~95% failure on Medicaid and MA files (missing LOINC codes/units, awaiting McLaren input since May 2026); HealthRules identifier system not a URI — same defect in production files [UAT thread 2026-07-01]; EOB required fully custom Sidewinder transformation. 4) Security assessment open item: McLaren needs evidence AD/SSO was implemented on their 1up instance (promised Q4 2025) — unresolved as of 7/1/2026. 5) Org churn at McLaren (\"a lot of people and organization change\") triggering contract re-review Feb 2026. 6) On the list of 14 clients still needing ePA URLs [#2026-0057-access-api--readiness, 2026-05-22]. 7) MPF: missing 4/7 required resources (Network/Facility Organizations, OrganizationAffiliation, InsurancePlan; PractitionerRole lacks network).",
      "points_of_interest": "Strategic account: first big MIHIN rip/replace after UPHP (\"next up McLaren & BCBSM\" — Bobby Fredrickson, Sept 2024, suggests BCBSM as adjacent target). McLaren is the reference-quality dataset for the HDE/MTE program and one of the first two Patient Access-on-MTE customers, so their success gates 1up's COGS-reduction strategy. Competitive win: ePA pried from Zeomega. Customer proactively ships data early (12M claim records 2016-2024 historical) and asked 1up to absorb MiHIN-format mapping — appetite for services. Patient counts vs contracted counts were being reconciled May 2026 (billing-metric sensitivity after MDwise loss).",
      "expansion_plays": [
        {
          "play": "Medicare Plan Finder (MPF) build-out + services",
          "rationale": "MPF gap analysis already done (Mar 2026) and work explicitly parked 'during the 0057 implementation'; McLaren has an MA LOB and is missing 4/7 required MPF resources plus network data in PractitionerRole — a concrete, pre-scoped services + product attach. Nolan's Mission Minute notes MPF services contracts 'flowing in weekly' across the base.",
          "fit": "high"
        },
        {
          "play": "Clinical data / popconnect + quality-risk analytics on the HDE data already flowing",
          "rationale": "McLaren already sends clinical resources (Immunization ~24M records, Labs, Observations, AllergyIntolerance) and internally is called the most robust dataset for MTE/HDE. Once on HDE CDM, quality/risk analytics and Clinical Connect-style use cases are a natural upsell; multiple customers are 'leaning into DPP/Clinical Connect' per the June 2026 Mission Minute. Blocker to clear first: LOINC data-quality issues on labs.",
          "fit": "high"
        },
        {
          "play": "Expand across the McLaren enterprise / recover contraction with adjacent lines",
          "rationale": "The $70k gross contraction from losing Indiana Medicaid leaves whitespace; McLaren Health Care is a large integrated system (provider side) and the 2024 MIHIN rip/replace roadmap named BCBSM next. Position provider-side HDE/clinical exchange or additional LOB coverage (Medicare Supplement patient files were already sent in Nov 2025 tests but are not a scoped LOB). Labeled inference: likely requires exec-level motion via Patrick Stevenson/Sara Mavredes.",
          "fit": "medium"
        }
      ],
      "plays_hi": 2,
      "sources": [
        "Slack #account-mclaren (C09CQRJSB09) — full history Aug 2025-Jul 2026",
        "Slack #account-mclaren-9115-implementation (C09FGG1GGE9) — history Oct 2025-Jul 2026 (read back to 2025-10-07; older page ~Sep-Oct 2025 kickoff period not read)",
        "Slack #account-mclaren-implementation-0057-epa (C0BEJ4PG9FB) — created 2026-07-01",
        "Slack #arr-services-new-bookings 2025-09-16 booking post (permalink p1758050147820559) and 2026-06-24 ePA add-on post (p1782320168761769) — both verified",
        "Slack #general Mission Minute 2026-06-30 (p1782825066214399)",
        "Slack thread #account-mclaren p1774627319.317509 (0057 API deployment for 3/31 commencement)",
        "Slack thread #account-mclaren-9115-implementation p1782839067.604379 (HDE UAT, HealthRules identifier defect)",
        "Confluence CKB 1629847579 '9/22/25 - Formal Project Kickoff Call w/ McLaren + MDwise' (Q1 2026 go-live goal, participant roster)",
        "Confluence CKB weekly implementation status pages (1861320717, 1908178945, 1725726721, 1680146433, 1685422082, 1692696577, 1664122881)",
        "Confluence DNA 2391867393 'HDE Implementation: Services / Engineering Playbook'",
        "Confluence PD 2073460767 'Patient Access on MTE (parity) - Capability Overview'",
        "Confluence DNA 2381053957 'S8 Kickoff: June 3, 2026' and DNA 2316599298 'May 15, 2026' (HDE timeline)",
        "Jira DNA-1201 / TOPS-10147..10160 (HDE Implementation 2, new client McLaren test suite); PROD-132 (HDE: MNSCHA and McLaren Implemented)",
        "Cross-account recon extract: #2026-0057-access-api--readiness 2026-05-22 (ePA URL list, cited as-is)",
        "Gmail not searched — Slack/Confluence coverage was rich"
      ],
      "sf": {
        "arr": 342741.935484,
        "cumulative": 1259562.5,
        "product_rev": 1100000,
        "services_rev": 159562.5,
        "health": 10,
        "temperature": null,
        "nps": null,
        "renewal_sentiment": 4,
        "sentiment_notes": null,
        "flags": [],
        "renewal": "2028-09-30",
        "contract_exp": "2028-09-29",
        "customer_since": "2025-09-30",
        "go_live": null,
        "impl_level": null,
        "products_sold": null,
        "lobs": null,
        "members_contracted": 650000,
        "members_current": 256700,
        "competitors": "Interopstation",
        "pbm": null,
        "owner": "Jodi Patton",
        "csm": "Stephanie Iheme",
        "exec_sponsor": null,
        "tier": "Maintain",
        "opps": [
          {
            "name": "McLaren Health Plan - Phase 1 9115 Compliance",
            "type": null,
            "closed": "2025-09-16",
            "arr": null,
            "services": 109843.75,
            "amount": 934843.75,
            "months": 36.01,
            "owner": "Olivia Cleworth",
            "won_because": "1upHealth expertise and UPHP reference in MI",
            "competitor": null
          },
          {
            "name": "McLaren Health Plan- Phase 2 0057 Compliance",
            "type": null,
            "closed": "2025-09-16",
            "arr": null,
            "services": 49718.75,
            "amount": 224718.75,
            "months": 31.01,
            "owner": "Olivia Cleworth",
            "won_because": "1upHealth expertise and UPHP reference in MI",
            "competitor": null
          },
          {
            "name": "McLaren ePA",
            "type": null,
            "closed": "2026-06-22",
            "arr": 100000,
            "services": 0,
            "amount": 100000,
            "months": 15.28,
            "owner": "Nolan Kelly",
            "won_because": null,
            "competitor": null
          }
        ]
      }
    },
    {
      "id": 17,
      "name": "VNS Choice",
      "quarter": "q1",
      "qlabel": "Q1 · Jan–Mar",
      "seg": "medadv",
      "seglabel": "Medicare Advantage",
      "note": "ePA · PA · P2P pending",
      "full": "VNS Choice (VNS Health, formerly VNSNY — Slack alias \"vns\"/\"vnsny\"; LOBs: VNS Health Medicare \"Choice\" + Select Health Medicaid)",
      "dq": "rich",
      "products_and_scope": "Long-tenured customer, single-tenant deployment. Bookings history: [#arr-services-new-bookings 2021-02-04] $150k ARR + $45k services (original CMS-9115 Patient Access platform); [2021-09-10] $87.5k ARR Provider Network API w/ SQL pipe, 25K members; [2022-01-10] $70k ARR + $20k impl for P2P Send API + Request & Ingest (v1 P2P, live — email-auth Health History flow for both VNS Health Choice and VNS Health Select, confirmed in Confluence \"P2P Implementation - Customer Status and Info\" and 2/8/24 discovery notes: \"implemented both P2P inbound and Send APIs\"); [2025-01-29] Provider Access added with renewal, $75,000 CARR, ARR live 8/1/25. Smaller add-on SOW (2023): Active/Inactive member flag file processing. Pending/in-flight: CMS-0057 Payer-to-Payer + Provider Access SOW (Google-doc SOW final-reviewed by Anton Pederson 9/18/25, #sows-inflight, yellow/medium priority); ePA deliberately removed from that SOW 9/17/25 (\"Removing ePA for now\" — Jodi Patton) and now tracked as a separate pending upsell (tbd \"maybe July? August?\" per 5/29/26 group DM). MPF: SOW and order form delivered but customer unresponsive (5/22/26 group DM: VNS listed among \"have SOWs and OFs but haven't been responsive\").",
      "implementation_status": "Behind plan. Roster target was Q1 2026 go-live; as of [#2026-0057-access-api--readiness, 2026-02-20] VNS was \"already delayed with Provider Access and P2P\" and either path (with or without ePA) \"will essentially still warrant a new commencement date.\" Timeline: Provider Access API deployed in VNS environment 8/29/25 (Stephanie Iheme alerted Anzhelika Suriano; kickoff pending customer readiness); VNS was one of the first 3 Provider Access customers (Confluence \"Delivering Provider Access for our first three customers\") and Stage-1 MTE migration of VNS prod data completed by 8/1/25 (Mohammad Jouni, #general 8/6/25). But CSM Holly Fan reported \"hard time getting traction from Angela for Provider Access\" (12/9/25 DM) and no kickoff has occurred. USCDI clinical gap analysis completed June 2025 (Tania Gregory, #account-vnsny). Current activity (June–July 2026) is Prior Auth gap analysis: customer's first submission \"unusable\" (Robert Davis 6/9/26), customer responses returned 6/25/26 missing Coverage details; Robert Davis (7/7/26) asks whether there is even a signed SOW/active implementation and says a Coverage crosswalk will be needed \"and we should charge them for this.\" Net: no CMS-0057 component live; ePA upsell stalled (\"VNS I would wrap into their ePA upsell but they are being unresponsive again\" — Jodi Patton DM 6/10/26).",
      "tech_architecture": "From 1up/VNS Discovery Call 2/8/24 (Confluence, Compliance space): claims adjudication on Cognizant TriZetto Facets (Cognizant is also their TPA); UM/care management on HealthEdge GuidingCare (MCG Health clinical rules licensed, MCG<>GuidingCare integration); business rules in CSV fed to Facets; PA status to providers via fax/phone + provider portal with 24hr lag; homegrown member portal; Azure AD internal IdP; Salesforce for provider validation; DataLink contracted for provider-EHR pulls; ~333K providers (~50K in-network). Data to 1up: care mgmt -> nightly data warehouse feeds -> flat files via SFTP; interest in SQL-on-FHIR pumping data to Snowflake. 1up side: single-tenant accounts 1up-vnsny-prod/dev, rebranded FHIR API (api.vnshealthfhirdev.com after VNSNY->VNS Health rebrand, Feb 2023); Provider Directory historically ingested via API-to-API pull from NPPES — RedZone project (Confluence CKB 922910749) replacing it with customer SFTP file incl. active/inactive flags (UAT mid-2025); Stage-1 migration to MTE done 8/1/25; Provider Access bulk export endpoint gateway.1up.health/vns-health. Unique setup: 1 data partition serving 2 LOBs (VNS Health Medicare + Select Health Medicaid) with 2 distinct member-facing brands — only customer configured this way as of Feb 2026 (Confluence \"Lines of Business vs Data Partitions\"). Scale: ~84,121 patients loaded, ~78,416 active (Jan 2025, #account-vnsny).",
      "financial_signals": "[#arr-services-new-bookings] 2021-02-04: $150k ARR + $45k services signed; 2021-09-10: $87,500 ARR Provider Network API w/ SQL pipe (25K members); 2022-01-10: $70,000 ARR + $20,000 implementation for P2P Send API + Request & Ingest; 2025-01-29: Provider Access added with renewal — $75,000 CARR, ARR live 8/1/25. 2025-09-09 #sows-inflight: P2P + Provider Access SOW in flight (medium priority, yellow); ePA upsell unsigned/pending as of 5/29/26 (\"VNS - tbd - maybe July? August?\"). MPF SOW + order form delivered, no customer response (5/22/26). Cumulative booked ARR across lines roughly $300k+ (inference from the above bookings).",
      "key_people": "Customer: Nancy Mozes (VP Information Technology — main operational sponsor), Angela/Anzhelika Suriano (Lead Business Analyst, IT — Provider Access contact, unresponsive since provider-org leadership change), Robert \"Bob\" Orlando (VP IT Solutions — met Jodi 4/20/26; quoted in marketing doc on FHIR), Tim Peng (CTO since ~Mar 2023, historically friendly to 1up), Atul Kumar (Director PMO), Jarvis Martin (Project Coordinator); Dr. Hany Abdelaal (President of Health Plans) departed June 2023. 1upHealth: Holly Fan (Sr. CSM), Jodi Patton (AM; prior AM Drew Arnold), Stephanie Iheme (CS leadership), Geetika Arora (0057 implementation PM), Maria Baker (SOW/delivery), Robert Davis + Tania Gregory (data mapping/gap analysis), Kevin Yamashita (core data/SQL analytics), Kyle Brew (provider access solutioning).",
      "risks_and_blockers": "1) Engagement/responsiveness is the top risk: internal reorg, \"pseudo PM\" project support, and product-team reset (Jodi's 4/20/26 debrief with Bob Orlando); unresponsive on ePA upsell (6/10/26) and on MPF SOW (5/22/26); no traction from Angela on Provider Access since provider-org leadership change (12/9/25). 2) Schedule: Provider Access + P2P already delayed past commencement; new commencement date required (2/20/26); no kickoff a year after Provider Access was deployed in their env (8/29/25). 3) Data readiness: Prior Auth gap analysis first pass \"unusable\" (didn't read Extract Guide/PA IG); Coverage details missing — 1up will need to build a chargeable Coverage crosswalk (7/7/26); engagement model/SOW status for that PA work unclear even internally. 4) History of data-quality issues: active/inactive flag logic mismatches (2022-2025), first/middle-name mapping bug (BUG-154). 5) Compliance posture: leaning \"bare minimum for compliance,\" citing low API usage and booked internal roadmap (Holly Fan, #customer-grand-rounds 8/16/25). 6) Churn-relevant sentiment: Bob Orlando publicly lukewarm on FHIR maturing as the standard (July 2025 quote).",
      "points_of_interest": "- Possible NY state regulation requiring ePA by 4/1/2026 mentioned by Bob Orlando (4/20/26, #account-vnsny; Stephanie Iheme noted same reg raised by Hamaspik) — potential forcing function for the ePA upsell. - VNS raised a non-compliance MSO/Hospice VBID FHIR data-ingest use case in June 2023 (ingest claims/membership from partner plans in FHIR instead of proprietary format) — never pursued, natural popconnect/HDE hook. - Kevin Yamashita built SQL-on-FHIR analytics on their data (Jan 2025): found ~1,600 active patients (~2%) with drug dispenses lacking associated diagnoses — concrete proof-of-value for quality/risk analytics. - Clinical quality team interested in external P2P data to improve HEDIS scores; wants SQL-on-FHIR to Snowflake (2/8/24 discovery). - VNS wants SSO integration of Provider Access into their existing provider portal rather than separate 1up registration (2/8/24 discovery; relevant to #provider-access-webinar roadmap discussion 10/2/25). - Membership growing but ops (case management) struggling to scale (4/20/26).",
      "expansion_plays": [
        {
          "play": "ePA add-on bundled with re-baselined Provider Access + P2P kickoff",
          "rationale": "Already the active internal plan: 2/20/26 strategy was to upsell ePA and kick off all three under a new commencement date; ePA upsell tracked for July/Aug 2026 start. Their stack (GuidingCare UM + Facets claims + MCG rules, fax/phone PA notifications, 24hr-lag portal) is exactly the manual PA workflow ePA replaces, and a possible NY state ePA mandate (4/1/2026 per Bob Orlando) plus CMS-0057 gives dual regulatory pressure. Prior Auth gap analysis is already underway — the Coverage crosswalk work should be folded into a signed ePA/PA SOW rather than done ad hoc.",
          "fit": "high"
        },
        {
          "play": "Clinical data / popconnect + quality analytics on the FHIR data already flowing (HEDIS / SQL-on-FHIR to Snowflake)",
          "rationale": "Customer explicitly wants to pull P2P/1up data into Snowflake via SQL-on-FHIR for clinical quality and HEDIS improvement (2/8/24 discovery), and 1up already demonstrated value with the Jan 2025 SQL analysis finding ~1,600 members with drug-diagnosis gaps. The dormant MSO/Hospice VBID FHIR-ingest requirement from June 2023 is a second concrete popconnect/HDE use case. Positions 1up beyond bare-minimum compliance, which is their stated posture risk.",
          "fit": "medium"
        },
        {
          "play": "Close the delivered MPF (Medicare Plan Finder) SOW",
          "rationale": "SOW and order form are already in VNS's hands (5/22/26) — this is a follow-up/escalation motion, not new scoping. VNS Health Medicare (Choice) is a Medicare plan so MPF is directly applicable; blocker is pure unresponsiveness, so route through Bob Orlando or Tim Peng rather than the stalled working-level contacts.",
          "fit": "medium"
        }
      ],
      "plays_hi": 1,
      "sources": [
        "#account-vnsny (C01G080D3V3) — channel history 2022-2026 incl. PA gap analysis thread 2026-06-09 (ts 1781013393.712619), Jodi Patton Orlando debrief 2026-04-20, member counts Jan 2025, P2P/rebrand/active-flag history",
        "#account-vns-active-inactive-flag-implementation (C065U8R4ZV5) — effectively empty (joins/leaves only)",
        "#2026-0057-access-api--readiness (C0A36DHR84R) — 2026-02-20 delay/ePA-upsell message (ts 1771618009.741759); 2026-05-22 ePA URL request list",
        "#sows-inflight (C09EE0B2V8A) — VNS P2P+Provider Access SOW thread 2025-09-09 (ts 1757464199.424769)",
        "#arr-services-new-bookings extracts (2021-02-04, 2021-09-10, 2022-01-10, 2025-01-29) — provided cross-account recon, not independently re-verified",
        "#customer-grand-rounds (C08ND3SKD8W) — Holly Fan updates 2025-08-16, 2025-08-29 (Provider Access deployed)",
        "#general (C2YPYSZFF) — 2025-08-06 MTE stage-1 migration milestone; 2025-08-28 Provider Access implementation-ready",
        "Group DM Holly/Jodi/Geetika (C0A1EES4U3Z) — 2025-12-09 Angela no-traction; 2026-05-22 MPF SOW unresponsive",
        "DM Jodi/Stephanie (D05AV8WUAT1) — 2026-06-10 ePA upsell unresponsive",
        "Group DM Jodi/Rachel/Jeremy (C09QATYPMBR) — 2026-05-29 pending PA upsells list (VNS July/Aug)",
        "Confluence: 1up / VNS - Discovery Call 2/8/24 (Compliance1, page 314966017) — full vendor/architecture detail",
        "Confluence: VNS-Health RedZone - ProviderDirectory & Inactive/Active Flag (CKB, page 922910749)",
        "Confluence: VNS Inactive Patient Flag SOW Details (CKB, page 206372906)",
        "Confluence: Delivering Provider Access for our first three customers (PD, page 1344045060)",
        "Confluence: Lines of Business vs Data Partitions - Current State (PD, page 1945796609)",
        "Confluence: P2P Implementation - Customer Status and Info (Services, page 100171970)"
      ],
      "sf": {
        "arr": 185000.00000400003,
        "cumulative": 1581245,
        "product_rev": 1436245,
        "services_rev": 95000,
        "health": 9,
        "temperature": "Green",
        "nps": null,
        "renewal_sentiment": 4,
        "sentiment_notes": null,
        "flags": [
          "ROI in question",
          "Relationship Concern"
        ],
        "renewal": "2027-01-31",
        "contract_exp": "2023-01-31",
        "customer_since": "2021-02-01",
        "go_live": "2021-06-30",
        "impl_level": "Level V",
        "products_sold": "Patient Access;Provider Directory;Payer to Payer Send;Request and Ingest;SQL on FHIR;Clinical Connectivity;Health History",
        "lobs": "Medicare;Medicaid",
        "members_contracted": 100000,
        "members_current": 108118,
        "competitors": null,
        "pbm": null,
        "owner": "Jodi Patton",
        "csm": "Holly Fan",
        "exec_sponsor": "Jodi Patton",
        "tier": "Grow",
        "opps": [
          {
            "name": "VNSNY CHOICE Health Plans - CMS Rule",
            "type": "0125f000000iH45AAE",
            "closed": "2021-02-01",
            "arr": null,
            "services": 45000,
            "amount": 195000,
            "months": 11.96,
            "owner": "Matt Dula",
            "won_because": null,
            "competitor": null
          },
          {
            "name": "VNSNY - Provider Connectivity",
            "type": "0125f000000iH45AAE",
            "closed": "2021-09-09",
            "arr": null,
            "services": 0,
            "amount": 87500,
            "months": 11.96,
            "owner": "Drew Arnold",
            "won_because": null,
            "competitor": null
          },
          {
            "name": "VNSNY CHOICE - P2P",
            "type": "0125f000000iH45AAE",
            "closed": "2022-01-10",
            "arr": null,
            "services": 30000,
            "amount": 100000,
            "months": 11.96,
            "owner": "Nolan Kelly",
            "won_because": null,
            "competitor": null
          },
          {
            "name": "RENEWAL VNS Health P2P 2022",
            "type": "0125f000000iHVSAA2",
            "closed": "2022-02-01",
            "arr": null,
            "services": 0,
            "amount": 200000,
            "months": 11.96,
            "owner": "Ariana Zamora",
            "won_because": null,
            "competitor": null
          },
          {
            "name": "RENEWAL - VNS Health SQL on FHIR through 2/1/24",
            "type": "0125f000000iHVSAA2",
            "closed": "2022-09-09",
            "arr": null,
            "services": 0,
            "amount": 52218,
            "months": 16.72,
            "owner": "Annie Kroes",
            "won_because": null,
            "competitor": null
          },
          {
            "name": "VNSNY CHOICE - Supplemental Services: Rebranding to VNS Health",
            "type": "0125f000000FCKeAAO",
            "closed": "2023-01-13",
            "arr": null,
            "services": 20000,
            "amount": 20000,
            "months": 11.96,
            "owner": "Jessica Candito",
            "won_because": null,
            "competitor": null
          },
          {
            "name": "RENEWAL - VNSNY PAI",
            "type": "0125f000000iHVSAA2",
            "closed": "2023-02-17",
            "arr": null,
            "services": 0,
            "amount": 200000,
            "months": 11.96,
            "owner": "Annie Kroes",
            "won_because": null,
            "competitor": null
          },
          {
            "name": "RENEWAL VNS Health P2P 2023",
            "type": "0125f000000iHVSAA2",
            "closed": "2023-02-17",
            "arr": null,
            "services": 0,
            "amount": 74027,
            "months": 12.68,
            "owner": "Annie Kroes",
            "won_because": null,
            "competitor": null
          },
          {
            "name": "VNS: Renewal 2024",
            "type": "0125f000000iHVSAA2",
            "closed": "2024-01-31",
            "arr": null,
            "services": 0,
            "amount": 307500,
            "months": 11.99,
            "owner": "Drew Arnold",
            "won_because": "Legacy customer where we have a good partnership",
            "competitor": null
          },
          {
            "name": "25-27 VNS - Provider Access",
            "type": null,
            "closed": "2025-01-29",
            "arr": null,
            "services": 0,
            "amount": 75000,
            "months": 18,
            "owner": "Ariana Zamora",
            "won_because": null,
            "competitor": null
          },
          {
            "name": "25-27 VNS renewal",
            "type": "0125f000000iHVSAA2",
            "closed": "2025-01-29",
            "arr": null,
            "services": null,
            "amount": 270000,
            "months": 23.95,
            "owner": "Jodi Patton",
            "won_because": "Legacy customer where we have a good partnership",
            "competitor": null
          }
        ]
      }
    },
    {
      "id": 18,
      "name": "The Health Plan of West Virginia",
      "quarter": "q2",
      "qlabel": "Q2 · Apr–Jun",
      "seg": "commercial",
      "seglabel": "Commercial / Blues",
      "note": "",
      "full": "The Health Plan of West Virginia (THP)",
      "dq": "rich",
      "products_and_scope": "Full 1up CMS-0057 product suite plus legacy 9115 stack. History: Apr 2022 initial deal — Platform, Patient Access, Provider Directory, P2P Send, P2P Request & Ingest ($259K ARR + $104K impl; Change Healthcare rip-and-replace); May 2022 expansion to full book — PA/PD/P2P Send/P2P R&I/SQL on FHIR at 1.7M member capacity ($1.75M ARR + $215K impl); Jun 2023 +300K lives + Clinical Connectivity Beta ($308K upsell); Apr 2024 capacity increase; Apr 2025 3-year renewal with CMS-0057 expansion adding Provider Access (+$42K CARR, confirmed in #growth-updates 2025-04-04); Nov 2025 ePA upsell ($160K ARR + $57.5K services) — bookings channel notes this \"completes full 1up 0057 product suite\". Signed SOWs: Provider Access (9/9/25), Provider Access & P2P (9/9/25), Provider Access & ePA Implementation (10/29/25). Also in flight: zero-dollar SOWs for Clinical Data ingestion (~12 new US Core resource types, 100% discounted per Maria Baker 10/17/25) and Medicare Plan Finder (Jodi Patton drafted $0 order form 4/24/26). Lines of business: Medicare, MHT (Mountain Health Trust / WV Medicaid), CHIP.",
      "implementation_status": "Roster says Q2 (Apr-Jun) go-live; in practice THP is running 3 parallel active implementations that extend beyond Q2. (1) 0057 APIs (Provider Access + P2P + ePA): kickoff was 4/17/26; Provider Access UAT environment being set up 5/15/26. (2) ePA: discovery as of 5/8/26, weekly meetings since 5/26/26; CRD (PA-required) logic build on track for 6/30/26 completion (confirmed 6/16 and 6/23); EviCore connectivity testing proposed 7/15-8/15/26 and EviCore/THP testing 8/15-9/15/26 — i.e., ePA runs through Q3 2026; Helios integration timeline TBD. (3) Clinical Data ingestion: kickoff 2/23/26, THP uploaded a \"hopefully final\" clinical file set 6/24/26, 1up ingesting Organization/CareTeam/CarePlan as of 6/26/26, RelatedPerson and Simple Questionnaire blocked on missing DIMA mappings; Postman validation next. (4) MPF: kickoff 5/4/26, iterative file validation through June, upgrading to V2 ProviderDirectory Extract Guides (6/17/26); MPF test files loaded successfully 6/15/26. Prior projects live: PractitionerRole added to all 3 LOBs went live Aug 2025 (7-month project due to client delays); PD for 2 additional LOBs (MHT, CHIP) completed Dec 2024. Net: no 0057 API is fully live yet as of 7/8/26; ePA realistically lands Q3-Q4 2026 ahead of the 1/1/2027 compliance date.",
      "tech_architecture": "Flat-file (CSV) SFTP/S3 ingestion into 1up FHIR platform: buckets 1up-thp-prod-data-ingest and 1up-thp-prod-pre-prod-data-ingest; Avro schema validation, DIMA mapping layer, Postgres/RDS staging, NiFi pipelines. Express Scripts (ESI) pharmacy data ingested monthly via automated NiFi flow (automated Jul 2024). Monitoring via Grafana (data-ingests dashboard) and Kibana; 1upConsole deployed with SSO/IdP via Keycloak (testing as of Jun 2025, SSO outreach again Oct 2025). Origin story: Change Healthcare rip-and-replace (2022). UM vendor stack for ePA: EviCore (specialty Rad, Cardiology, MSK, Sleep — fully funded business only) and Helios/Elligint Health (where UM data is captured; uses InterQual for decisioning; THP negotiating upgrade to IQ Exchange). CRD logic driven by THP's UM Routing Document (Helios vs EviCore routing + PA-required logic; Medical/Behavioral and DME spreadsheets delivered 5/27/26). Known data-model quirks: all members historically loaded under a single client ID (Patient Access files not split by LOB) while Provider Directory files are split by LOB; MPF files not split by LOB, loaded to shared Medicare client ID; group-ID-to-LOB mapping matrix outstanding. P2P outbound member-match set up as beta customer (Jira P2P-374, \"thp (the health plan WV)\").",
      "financial_signals": "Cumulative bookings from #arr-services-new-bookings: 2022-04-05 $259,000 ARR + $104,000 impl; 2022-05-20 $1,750,000 ARR + $215,000 impl (1.7M member capacity); 2023-06-21 $308,000 upsell (+300K lives + CC Beta); 2024-04-01 capacity increase $6,233 prorated + $25,000 ARR at 6/1/24 renewal; 2025-04-02 $42,000 CARR Provider Access upsell (part of 3-year renewal signed ~4/4/25 per #growth-updates); 2025-11-26 ePA upsell $160,000 ARR + $57,500 services. Clinical data ingestion and MPF SOWs done at $0/100% discount (Jodi: \"We have heavy ARR just to manage the API\" — rationale stated for a similar account). Implied ARR base is in the ~$2M+ range on a 3-year term through ~2028.",
      "key_people": "Customer: Jill Medley (Director of Compliance & Government Affairs, jmedley@healthplan.org — primary decision maker, signs SOWs, pushes on Console/reporting); Sharice Mays (Project Manager, smays@healthplan.org — hosts ePA weekly); Heather Jones (owns Helios/InterQual engagement); Brian Cochran (raised FHIR-vs-X12 concern for Helios); Pragathi Kommidi and Tamim Rajendram (technical/vendor resources, vnd* emails); Brittany Wick, Gina Mori, Kylee Panepucci. 1upHealth: Jodi Patton (account exec/renewals), Rachel Schuler (IM — ePA + coverage, rachel.schuler@1up.health), Anissa Nashikkar (IM — clinical data + 0057 APIs), Maria Baker (Services lead), Robert Davis (DE lead, MPF), Whitney and Chad Clough (data engineers), Joy He (DE coverage), Jeremy Yoon (Sr Product — ePA/CRD), Kyle Brew and Elizabeth McGowan (Provider Access/P2P product experts), Juliette Steinkrauss (partnerships — EviCore data sharing agreement), Holly Fan (CSM), Stephanie Iheme (services ops), Assiatou Diallo (kickoff coverage).",
      "risks_and_blockers": "1) Helios/Elligint integration undefined: Brian Cochran (THP) concerned that 1up only offers FHIR API and X12 278; Rachel stated 6/23/26 that anything else requires new scoping, potential charges, and extended timeline; Helios still \"determining how they will support the ePA APIs\" — no dates. 2) DTR blocked on InterQual: THP is still contracting with InterQual for IQ Exchange, no ETA (tracked 6/2-6/23/26). 3) EviCore data sharing agreement not finalized as of 6/18/26 (Juliette Steinkrauss/partnerships chasing); EviCore has not yet confirmed the proposed Jul-Sep testing windows. 4) Chronic client-delay pattern: PractitionerRole took 7 months for a tiny scope \"due to client delays\" (go-live post Aug 2025); Jun 2025 EOW updates flagged \"lack of urgency from THP\" with Maria considering pausing the project. 5) Group-ID-to-LOB mapping matrix open since Oct 2025, resurfaced by THP 6/16/26 — impacts 0057 reporting by LOB (members loaded under one client ID). 6) Clinical file quality/format churn (LOB splitting confusion, lowercase filename and folder conventions, missing must-support fields) has stretched clinical ingestion since Feb 2026. 7) Customer friction on tooling: Jill Medley complained 5/13/26 she must use three dashboards (Console, Kibana, Postman) for usage/resource/file-success metrics.",
      "points_of_interest": "THP is one of 1up's most complete 0057 customers — the Nov 2025 ePA upsell explicitly \"completes full 1up 0057 product suite\". They were an early P2P outbound beta customer (Jira P2P-374). The account originated as a Change Healthcare rip-and-replace in 2022. ESI (Express Scripts) pharmacy ingestion is fully automated via NiFi — an unusual direct-PBM-feed pattern. They returned completed ePA, P2P, and Provider Access readiness questionnaires 4/14/26 and had an open 1up-Managed non-IDP member opt-out/opt-in question in #2026-0057-access-api--readiness as of 7/1/26. Jill Medley is highly engaged on compliance (proactively brought CMS MPF memo to 1up in May 2026) but price-sensitive — historically extracted no-charge SOWs (PractitionerRole, clinical data, MPF). Rachel Schuler's Aug 2025 go-live post and the Anissa OOO plan (Confluence, Services space) are good internal snapshots.",
      "expansion_plays": [
        {
          "play": "Paid scoping for non-standard Helios/Elligint integration (ePA change order)",
          "rationale": "THP's SOW covers only FHIR API and X12 278 integration; Brian Cochran signaled Helios may need a different method, and 1up already told THP on 6/23/26 that this would require scoping and potential charges. This is a live, customer-acknowledged services/ARR expansion path in the next 60 days.",
          "fit": "high"
        },
        {
          "play": "Quality/risk analytics (popconnect/SQL-on-FHIR use cases) on the clinical + claims data now flowing",
          "rationale": "THP already licenses SQL on FHIR (2022) and is ingesting ~12 new US Core clinical resource types plus EOBs, ESI pharmacy, and coverage data across 3 LOBs. Once clinical ingestion completes (Q3 2026), packaging HEDIS/Stars/risk-gap analytics on the FHIR store they already fund is the natural post-compliance value story, and Jill Medley needs better reporting anyway.",
          "fit": "high"
        },
        {
          "play": "Console reporting/ops upsell plus capacity true-up at renewal (~2028)",
          "rationale": "Jill explicitly asked (5/13/26) for consolidated resource-count and file-submission-success reporting instead of three dashboards — a wedge for premium Console/ops reporting. Membership capacity was already trued up twice (2023 +300K lives, 2024 increase), so LOB growth (MHT/CHIP) makes a capacity expansion at the 3-year renewal likely; low net-new product headroom since the 0057 suite is complete.",
          "fit": "medium"
        }
      ],
      "plays_hi": 2,
      "sources": [
        "Slack #account-the-health-plan (C03G54VBQP3), 2024-04 through 2026-06",
        "Slack #account-the-health-plan-implementation-0057-apis (C0AT4B9D1AS), Apr-Jul 2026",
        "Slack #account-the-health-plan-0057-epa (C0B2D6KT03B), May-Jun 2026",
        "Slack #account-the-health-plan-clinical-data-implementation (C0AGJ6Y4B4M), Feb-Jun 2026",
        "Slack #account-implementation-thp-medicareplanfinder (C0B3NB9V9T3), May-Jul 2026",
        "Slack #account-the-health-plan-pd-lobs-implementation (C07TUFNM8S2), 2025-06-06 EOW update",
        "Slack #general, 2025-08-26 PractitionerRole go-live announcement (Rachel Schuler)",
        "Slack #growth-updates, 2025-04-04 (THP 3-yr renewal + $42K CARR) and 2025-01-21 (0057 pipeline)",
        "Slack #customer-grand-rounds, 2025-06-20 (Keycloak/Console) and 2025-10-31 (SSO outreach)",
        "Slack #arr-services-new-bookings extracts 2022-2025 (provided recon, dates 2022-04-05, 2022-05-20, 2023-06-21, 2024-04-01, 2025-04-02, 2025-11-26)",
        "Slack #sows-inflight extracts (2025-09-09, 2025-10-29)",
        "Slack #2026-0057-access-api--readiness extracts (2026-04-14, 2026-07-01)",
        "Confluence CKB: 06/23/26 THP/1upHealth ePA Weekly Implementation Meeting (page 2436300816, full read)",
        "Confluence CKB: 5/26/26 and 06/02/26, 06/16/26 ePA weekly meeting pages; 08/19/25 THP Clinical Data Scoping Call (1570275329); THP PractitionerRole Handoff (1577091171); THP Provider Directory 2 LOBs Handoff (1062862860); 04/27/26 THP Clinical Data Implementation (2256076801)",
        "Confluence Services: Anissa OOO Plan 04/17-05/01 (2177761281)",
        "Jira: P2P-374 (THP P2P outbound beta setup)"
      ],
      "sf": {
        "arr": 185749.28793600004,
        "cumulative": 1415400,
        "product_rev": 1235900,
        "services_rev": 179500,
        "health": 10,
        "temperature": null,
        "nps": null,
        "renewal_sentiment": 5,
        "sentiment_notes": "EPIC",
        "flags": [
          "Competitor engaged",
          "ROI in question",
          "Actively Evaluating Competitor"
        ],
        "renewal": "2027-04-05",
        "contract_exp": "2023-04-04",
        "customer_since": "2022-04-05",
        "go_live": null,
        "impl_level": "Level V",
        "products_sold": "FHIR Interoperability Platform;Patient Access;Provider Directory;Payer to Payer Send;Request and Ingest",
        "lobs": "Medicaid;Medicare Advantage;CHIP",
        "members_contracted": 150000,
        "members_current": 122938,
        "competitors": null,
        "pbm": null,
        "owner": "Jodi Patton",
        "csm": "Holly Fan",
        "exec_sponsor": "Jodi Patton",
        "tier": "Maintain",
        "opps": [
          {
            "name": "The Health Plan - CMS Compliance",
            "type": "0125f000000iH45AAE",
            "closed": "2022-04-05",
            "arr": null,
            "services": 104000,
            "amount": 363000,
            "months": 11.96,
            "owner": "Bobby Fredrickson",
            "won_because": null,
            "competitor": null
          },
          {
            "name": "RENEWAL: The Health Plan -CMS Compliance 2023",
            "type": "0125f000000iHVSAA2",
            "closed": "2023-03-01",
            "arr": null,
            "services": 0,
            "amount": 259000,
            "months": 11.99,
            "owner": "Ariana Zamora",
            "won_because": null,
            "competitor": null
          },
          {
            "name": "THP: Renewal 2024",
            "type": "0125f000000iHVSAA2",
            "closed": "2024-03-07",
            "arr": null,
            "services": 0,
            "amount": 259000,
            "months": 11.96,
            "owner": "Drew Arnold",
            "won_because": "Good standing relationship with the team",
            "competitor": null
          },
          {
            "name": "25-28 THP renewal",
            "type": "0125f000000iHVSAA2",
            "closed": "2025-04-01",
            "arr": null,
            "services": 0,
            "amount": 259000,
            "months": 35.98,
            "owner": "Jodi Patton",
            "won_because": "Good standing relationship with the team",
            "competitor": null
          },
          {
            "name": "25-28 THP - Provider Access",
            "type": "0125f000000iHVSAA2",
            "closed": "2025-04-01",
            "arr": null,
            "services": 18000,
            "amount": 57900,
            "months": 23.98,
            "owner": "Jodi Patton",
            "won_because": "Good standing relationship with the team",
            "competitor": null
          },
          {
            "name": "26-28 THP - ePA",
            "type": "0125f000000iHVSAA2",
            "closed": "2025-11-26",
            "arr": null,
            "services": 57500,
            "amount": 217500,
            "months": 24.11,
            "owner": "Jodi Patton",
            "won_because": "Good standing relationship with the team",
            "competitor": null
          }
        ]
      }
    },
    {
      "id": 19,
      "name": "Upper Peninsula Health Plan",
      "quarter": "q2",
      "qlabel": "Q2 · Apr–Jun",
      "seg": "medicaid",
      "seglabel": "Medicaid MCO / CCO",
      "note": "",
      "full": "Upper Peninsula Health Plan (UPHP)",
      "dq": "rich",
      "products_and_scope": "Phase 1 (booked 2024-09-30, $120K ARR + $69.5K services): Patient Access API (CMS-9115), Provider Directory, 1up Platform for two Michigan LOBs — Managed Medicaid and MHL (MI Health Link duals, ~50,000 members per pre-sales intake). Scope included Patient/Coverage, EOB (7 file types incl. Pharmacy), Formulary (CoveragePlan/FormularyDrug), Provider Directory (Practitioner, PractitionerRole, Organization, Location), and clinical limited to Immunizations only (Stacy Harris, 10/31/24: anything beyond immunizations is extra). Jan 2025 no-charge change order added a second member auth app to split LOBs. Phase 2 (upsell 2025-12-22, $150K, ahead of renewal; 0057 SOW sent green 1/7/26): CMS-0057 suite — Provider Access API, Payer-to-Payer, ePA, plus Patient Access Prior Auth EOB. Phase 3: Medicare Plan Finder (MPF) — kickoff 5/28/26, plus $3K MPF provider directory remediation services (5/19/26). A \"Medicare LOB Change\" SOW for the MHL-to-MICH D-SNP transition (1/1/26) was scoped Sept 2025 but Robert Davis concluded 10/17/25 no work/SOW was needed (member IDs, file structures, data sources unchanged); MICH LOB now appears in 0057 file scope (TEST_MICH opt-out files, 7/1/26).",
      "implementation_status": "Phase 1 (PA/PD, 9115) is LIVE: UAT signoff Aug 2025, historical loads (MHL + Medicaid EOBs) completed Sept 2025, go-live ~end of Sept 2025, handoff to Customer Care 10/21/25 (Confluence CKB 1682997249). CMS-0057 (roster: Q2 Apr-Jun 2026 go-live) is RUNNING LATE into Q3: kicked off 4/6/26; revised targets from 5/5/26 call were Provider Access end of June, P2P mid-July, Patient Access Prior Auth EOB end of August; as of 7/8/26 member attribution files are in review with feedback and opt-out files are still failing validation (Medicaid LOB opt-out failed 7/8/26; filename/org-name formatting issues), P2P opt-in screens just built in UAT (7/8/26). Project close currently 8/28/26 and \"may shift to September\" (Assiatou Diallo, 6/24/26). ePA implementation deliberately deferred to June-July 2026 start, gated on UPHP's HealthEdge GuidingCare UM go-live — which slipped from July to end of August 2026, putting the July 24 Prior Auth EOB target in question. MPF: kickoff 5/28/26, gap analysis migration and mapping questions in progress July 2026.",
      "tech_architecture": "UM: implementing HealthEdge GuidingCare (new; portal go-live slipped July -> end Aug 2026). Claims adjudication: Plexis Claims Manager (PCM) — Prior Auth EOB extract likely sourced from PCM, not HealthEdge-dependent. Dental delegated to Delta Dental (1up may need to create its DTR questionnaire); Part D via Express Scripts (out of 0057 scope). ePA design: CRD likely 1up-hosted, DTR likely vendor-led for GuidingCare (may need data sharing agreement); 1up roadmap item to pull auth data directly from HealthEdge. Integration pattern: DIMA flat-file (CSV/pipe-delimited) batch ingest to S3/SFTP (1up-uphp-prod-data-ingest), single-tenant \"Standard Nested Batch Ingest\" client; Keycloak auth realm; Thales IdP/SSO on UPHP side; FHIR endpoint api.uphpfhir.com/r4 (Checkly-monitored, PAS v2); Patient Viewer console + UAT member console (uphpfhir.member.console.1upcoreuat.com, P2P opt-in screens). Opt flows: payer-managed files for both Provider Access opt-out and P2P opt-in (decided 5/19/26). P2P member experience will need HPS member portal integration (ticket entered 6/24/26). Displaced incumbent: MYHIN (Michigan HIN, Smile CDR-based) — \"rocky implementation, ready to move off\" (pre-sales notes).",
      "financial_signals": "2024-09-30: new logo booking $120,000 ARR + $69,500 services (Patient Access, Provider Directory, 1up Platform) [#arr-services-new-bookings]. 2025-12-22: $150,000 upsell adding Provider Access, P2P, ePA — closed ahead of next-year renewal [#arr-services-new-bookings]. 2026-01-07: UPHP 0057 SOW sent, green [#sows-inflight]. 2026-05-19: $3,000 MPF provider directory remediation services [#arr-services-new-bookings]. 2025-09-09: Medicare LOB Change SOW stalled needing scoping (purple) [#sows-inflight] — subsequently resolved as no-SOW-needed (10/17/25, #account-uphp). Jan 2025: no-charge SOW/change orders (second auth app, split LOBs) executed 1/28/25. Active invoicing as of 7/2/26 (Matt Leskovar group DM re: UPHP invoice for an order form).",
      "key_people": "Customer: Jill Chipelewski (Director of Information Systems, jchipelewski@uphp.com, Marquette MI — primary sponsor), Nathan Larson (IT Business Systems Analyst, day-to-day PM), Kris Lein (Data Infrastructure Manager — files/SFTP), Steven Ludlum (Programmer/Analyst — historical file generation), Maureen Tyrrell (Clinical Services Manager UM — ePA/GuidingCare), Lisa Geyser (PM/app support), Charlie Schaab (developer). 1upHealth: Maria Baker (CS lead), Assiatou Diallo (IM, 0057), Anissa Nashikkar (IM — PA/PD then MPF), Simone Graham (data engineering/file reviews), Robert Davis (services tech lead; left account channels 7/6/26), Rachel Schuler (Sr Product Manager ePA), Jeremy Yoon (ePA), Kyle Brew (P2P product), Elizabeth McGowan (Provider Access product), Holly Fan (Customer Care), Jodi Patton (AM/scoping), Anton Pederson & Olivia Cleworth (sales/pre-sales), Irtiza Mahmud (ingestion monitoring).",
      "risks_and_blockers": "1) HealthEdge GuidingCare go-live slipped to end of Aug 2026 — gates ePA start, puts July 24 Prior Auth EOB target in question, and pushes 0057 project close from 8/28 possibly into September (Q2 roster go-live already missed). 2) 0057 test files still failing as of 7/8/26 (attribution formatting, opt-out file failures for Medicaid LOB). 3) Small IT team with chronic capacity constraints — HealthEdge changeover and UM implementation compete for the same people; Phase 1 saw repeated multi-week file delays (EOB historicals, Formulary). 4) Roadmap gap: UPHP wants hybrid opt-out (payer files + 1up console entry so member services can opt out members who won't use the portal) — feature not available, they settled for payer-managed \"until this feature is available\" [#2026-0057-access-api--readiness, #account-uphp-implementation-0057-apis 4/28/26]. 5) Patient Access ingestion gap flagged 6/16/26 — no files ingested for ~2 weeks (customer-side missing files). 6) P2P needs HPS member portal integration — ticket open. 7) Operational friction: 1up emails to UPHP intermittently quarantined; Planhat invites not reaching Nathan/Jill; internal 1up access churn (Simone repeatedly losing ingestion dashboard/keycloak access). 8) DTR for GuidingCare likely vendor-led — possible data sharing agreement needed; Delta Dental questionnaire may fall to 1up.",
      "points_of_interest": "UPHP is a reference-quality small plan: their extract files were repeatedly praised as among the cleanest of any client (\"UPHP's other files were just SO good... completed ingestion ahead of schedule vs most other clients\", 9/9/25). Anissa demoed the FHIR Test App live in UPHP's state HIDE-SNP readiness review (4/21/25) — 1up interoperability compliance was part of UPHP winning/retaining that D-SNP contract, a strong case-study angle. They bought the full 0057 suite in one $150K upsell before renewal. The whole account journey is a competitive displacement of MYHIN/Smile. Watch the LOB complexity: Medicaid + MHL duals, MHL terming into MICH D-SNP (HIDE-SNP) 1/1/26. They asked unprompted about accessibility/disability-accommodation data in Provider Directory specs (4/22/25) — niche product signal.",
      "expansion_plays": [
        {
          "play": "Clinical data / HDE expansion beyond Immunizations (popconnect)",
          "rationale": "Clinical scope is contractually limited to Immunizations only, and anything more was explicitly flagged as billable extra (10/31/24). Their HIDE-SNP contract (live 1/1/26) carries state data-exchange expectations, and P2P plus Patient Access already require richer clinical payloads over time. The DIMA pipeline, S3 ingest, and FHIR server are already in place — incremental clinical resource types are a low-friction services + ARR add.",
          "fit": "high"
        },
        {
          "play": "HealthEdge GuidingCare direct auth-data connector (ePA phase 2 services)",
          "rationale": "1up's own roadmap includes pulling auth data directly from HealthEdge (Confluence, 4/14/26 ePA page), and UPHP goes live on GuidingCare ~end of Aug 2026. Today's plan is holistic PA data via flat files (electronic + fax + portal). Positioning UPHP as an early adopter of a direct GuidingCare integration — plus the Delta Dental DTR questionnaire build 1up may need to create — is a natural paid follow-on once ePA implementation starts in late 2026.",
          "fit": "high"
        },
        {
          "play": "Console-based opt-out management + quality/analytics on the FHIR data already flowing",
          "rationale": "UPHP settled for payer-managed opt flows only because 1up's console opt-out-on-behalf-of-member feature doesn't exist yet — they said they'd switch when available (4/28/26), making them a committed first buyer for that capability. Layering quality/risk analytics on the EOB, formulary, immunization, and (soon) prior-auth FHIR data for two LOBs plus the new D-SNP is the logical post-0057 value story for a 50K-member plan with a small IT team that wants managed services rather than DIY.",
          "fit": "medium"
        }
      ],
      "plays_hi": 2,
      "sources": [
        "#account-uphp (C07PW3NCX98), Oct 2024 - Jul 2026 full history",
        "#account-uphp-implementation-0057-apis (C0APXSHPDDZ), Mar-Jul 2026 full history",
        "#account-uphp-pa-pd-implementation (C07QGSJK0SF), Feb 2025 - Jul 2026 (older file-review pages remain paginated)",
        "#account-uphp-mpf-implementation (C0B69TZACMR), May-Jul 2026 full history",
        "#provider-access-implementation-party and #it-helpdesk (cross-channel search, Jun-Jul 2026)",
        "Confluence CKB 855965733 'Pre-Sales Notes' (2024-07-15 call)",
        "Confluence CKB 1682997249 'UPHP <> Handoff to Customer Care'",
        "Confluence CKB 2210693121 'UPHP 04/14/26 - 0057 ePA Implementation'",
        "Confluence CKB 2287697921 'UPHP 05/05/26 - 0057 Provider Access, Payer-to-Payer, Patient Access Prior Auth EOB'",
        "Confluence CKB file-review pages (Patient 1004273793, Coverage 1006895240, Dual-Eligibility EOB 1070399489, Formulary 1380810847/1380810753)",
        "Jira TOPS-6830 (Checkly dashboard, api.uphpfhir.com PAS v2)",
        "Cross-account recon extracts: #arr-services-new-bookings (2024-09-30, 2025-12-22, 2026-05-19), #sows-inflight (2025-09-09, 2026-01-07), #2026-0057-access-api--readiness (Mar-Apr 2026)"
      ],
      "sf": {
        "arr": 110000.00000400002,
        "cumulative": 588000,
        "product_rev": 390000,
        "services_rev": 198000,
        "health": 9,
        "temperature": null,
        "nps": null,
        "renewal_sentiment": 4,
        "sentiment_notes": null,
        "flags": [],
        "renewal": "2028-12-31",
        "contract_exp": null,
        "customer_since": "2024-09-30",
        "go_live": null,
        "impl_level": null,
        "products_sold": null,
        "lobs": "Medicare;Medicaid",
        "members_contracted": 75000,
        "members_current": 51755,
        "competitors": "MIHIN Interop Exchange",
        "pbm": null,
        "owner": "Jodi Patton",
        "csm": "Holly Fan",
        "exec_sponsor": "Stephanie Iheme",
        "tier": "Maintain",
        "opps": [
          {
            "name": "UPHP- New Platform",
            "type": null,
            "closed": "2024-09-27",
            "arr": null,
            "services": 67500,
            "amount": 187500,
            "months": 23.98,
            "owner": "Olivia Cleworth",
            "won_because": "1upHealth expertise and market leadership",
            "competitor": null
          },
          {
            "name": "25-28 - UPHP: Provider Access, P2P, ePA",
            "type": null,
            "closed": "2025-12-22",
            "arr": null,
            "services": 60000,
            "amount": 210000,
            "months": 35.98,
            "owner": "Jodi Patton",
            "won_because": "0057 upsell",
            "competitor": null
          },
          {
            "name": "26-29 UPHP Renewal",
            "type": null,
            "closed": "2025-12-22",
            "arr": null,
            "services": 67500,
            "amount": 187500,
            "months": 36.11,
            "owner": "Jodi Patton",
            "won_because": "1upHealth expertise and market leadership",
            "competitor": null
          },
          {
            "name": "UPHP - MPF - Provider Directory File",
            "type": null,
            "closed": "2026-05-19",
            "arr": null,
            "services": 3000,
            "amount": 3000,
            "months": 11.99,
            "owner": "Jodi Patton",
            "won_because": "MPF",
            "competitor": null
          }
        ]
      }
    },
    {
      "id": 20,
      "name": "Cook County Health (CountyCare)",
      "quarter": "q2",
      "qlabel": "Q2 · Apr–Jun",
      "seg": "medicaid",
      "seglabel": "Medicaid MCO / CCO",
      "note": "Evolent-administered",
      "full": "Cook County Health (CountyCare)",
      "dq": "rich",
      "products_and_scope": "Illinois Medicaid MCO (~1.1M members contracted per Account Plan Hub page; part of Cook County Health & Hospitals System). Base: CMS-9115 Comply (Patient Access, Provider Directory, Claims/Formulary/Rx Directory APIs) + P2P, originally $635K ARR 3-yr deal (2021). New CMS-0057 contract: P2P, Provider Access, and ePA (SOW sent 9/9/2025 per #sows-inflight; contract executed ~late March 2026 — Jodi Patton 4/9/2026: \"We executed ~2 weeks ago\", MSA signed by Dan Petersen 3/10/2026). Implementation split into Track 1 (0057 Access APIs: Provider Access, P2P, Prior Auth EOB) and Track 2 (ePA: CRD/DTR/PAS with multi-UM-vendor routing). Contested added scope (customer claims required for 0057): reimplement Claims/Formulary/Rx Directory APIs on new PBM CVS (switched from MedImpact in 2024, APIs non-functional since), plus NEW Dental Claims and Vision Claims — Maria Baker drafting change order, Stephanie Iheme: \"credible case for upcharge\" (6/8/2026, #account-cook-county). Contract also includes software escrow subscription (NCC).",
      "implementation_status": "Roster says Q2 (Apr-Jun) go-live target for kickoff phase; actual: pre-kickoff PMO alignment call 4/10/2026, kickoff originally slated week of May 4 slipped twice (customer scheduling), formal 0057 kickoff held Friday June 5, 2026 (confirmed in #2026-0057-access-api--readiness 6/12: \"Kickoffs that occurred last week... CountyCare!\"). Discovery questionnaires returned 5/12/2026. As of 7/8/2026 project is in early discovery/scoping: first ePA scoping call held 7/8/2026 (Rachel Schuler), UM vendor routing/CRD/DTR/PAS decisions all still open, Planhat portal set up for customer late May. Rachel's stated ePA timeline: ~1 month each for CRD/routing config, questionnaire build, vendor connectivity, then 1 month client-led UAT. Customer (Crissy) already \"concerned about the pace of the project\" (Jodi, 7/8/2026). No 0057 go-live yet — realistic go-live is H2 2026+.",
      "tech_architecture": "Evolent is TPA/IT arm (\"CountyCare with Evolent as their IT team\"). UM vendor stack for ePA: Evolent (3 separate UM groups, wants 3 DTR questionnaires), Avesis (Dental & Vision), EviCore (DME — delegated by Evolent; routing decision open whether 1up routes DME codes via Evolent or direct), Progeny (maternity, in/out of scope TBD) — 1up must build UM routing logic; PAS via FHIR API (Evolent, EviCore support it) or X12 conversion engine (Avesis TBD); CRD hosting (1up vs Evolent) undecided; DTR 1up-hosted for Evolent. PBM: MedImpact until 2024, now CVS — Claims/Formulary/Rx Directory feeds never remapped, APIs stale. Ingestion: SFTP file-based into NiFi pipelines → JSONtoFHIR → FHIR R4 store on OpenSearch (1up-cook-county-prod tenant; also legacy morecare tenant, MoreCare data deleted Jan 2023). Patient Access auth is 1up email-based (no customer IdP; confirmed 10/30/2024), with IDP/console setup for UAT+Prod started Apr 2026 (Geetika Arora). Open ask: EviCore and Avesis want direct SFTP connections to 1up for EOB Prior Auth files (non-standard; flagged 7/8/2026). Customer PMO runs Smartsheet + monthly CEO/COO steering committee.",
      "financial_signals": "2021-04-15: booked $635,000 ARR + $250,000 Services, 3-yr deal, March 1 start (#arr-services-new-bookings). Account plan (Jan 2024): $635K ARR, contract term date 2/8/2024. Contract extension to 2/28/2025 (Nov 2023). 2024-03-19: +$100,000 ARR capacity increase after 5-month renewal (#arr-services-new-bookings). 2024-09: competitive RFP opened (Smile CDR downloaded it); 1up presented 3/21/2025; best-and-final 3-year pricing submitted by 4/11/2025; security review passed June 2025 (contingent on Bridge letter + HITRUST exec summary in Q4). 0057 SOW (P2P/Provider Access/ePA) sent 9/9/2025; redlines finalized 2/27/2026; executed ~late March 2026 — dollar value of the new 3-yr contract not found in Slack/Confluence. Side item: software escrow enrollment gap remediation ~$2,600/customer cost likely absorbed by 1up (3/27/2026).",
      "key_people": "Customer: Cristina \"Crissy\" Turino (Director of Projects & Strategic Initiatives — exec sponsor/decision maker, sits on monthly CEO+COO steering committee), Erika Hall (CountyCare PMO PM, runs kickoffs), Laurie Brinson (Crissy's EA), Safurat Adelekan-Adebayo & Kera Beskin (CountyCare ePA), John Tao (CountyCare Compliance Officer), Esther Macchione (COO Health Plan Services), \"Andrew\" (RFP-era contact). Evolent (TPA): Jackie Dresser (Sr Director Strategic Initiatives & Ops — primary Evolent contact), Sara Polley, Jessamyn Nilan-Axline, Deborah Campbell, Catherine Fitzsimmons, Jake Haunty, Jeslyn Mathew, Aishah Rajab. 1upHealth: Jodi Patton (AM, led renewal/RFP), Anissa Nashikkar (implementation lead, Track 1), Rachel Schuler (ePA lead, Track 2), Maria Baker (Services), Jeremy Yoon (SE/product), Geetika Arora (IDP/console), Stephanie Iheme (exec/commercial), Nolan Kelly (exec sponsor), Dan Petersen (MSA signatory). Historic: Lindsay Parker (AM), Jess (U043WPXU588, RFP AM).",
      "risks_and_blockers": "1) Customer pace concern: Crissy flagged concern about project pace 7/8/2026; delivery team stretched (Rachel: 3 ePA calls in ~10 days, \"i really don't want another call!\"). 2) Scope dispute: customer asserts CVS PBM reimplementation + Dental + Vision claims are 0057-required and should be in-scope; 1up views as change order/upcharge — potential friction. 3) PBM feeds broken since 2024 CVS switch — existing 9115 Claims/Formulary/Rx Directory APIs stale, a compliance exposure for the customer. 4) Multi-UM-vendor ePA complexity (Evolent x3, EviCore, Avesis, maybe Progeny) with routing, CRD/DTR hosting, and Avesis X12 questions all unresolved. 5) Non-standard ask for direct vendor SFTP connections (EviCore, Avesis) — scoping/charging undecided. 6) Software escrow: customer contractually entitled but never enrolled as NCC beneficiary; awkward remediation conversation + ~$2,600 cost. 7) Competitive history: went to full RFP in 2024-25 (Smile CDR sniffing), decision dragged 12+ months; account has churn-scare history (Feb 2025 sunset-notice discussion). 8) Kickoff slipped from early May to June 5, compressing timeline to compliance deadlines.",
      "points_of_interest": "Retained through a hard-fought competitive RFP (presented 3/21/2025, best-and-final 4/11/2025) — strong proof point for public/county Medicaid plans. Account plan positions Cook County as a \"blueprint for expansion across Illinois' Medicaid MCO sector.\" Customer runs a mature PMO (Smartsheet, monthly CEO/COO steering committee) and has asked 1up to provide representation at steering committee — an unusual seat at the exec table. Cook County was an early P2P beta customer (Jira P2P-374, member-match beta). One of the few customers where UM vendors (not the plan) may connect directly to 1up SFTP. Email-based patient auth (no IdP). Deal cycle from SOW sent (9/9/2025) to execution (~3/2026) took ~6.5 months, mostly legal redlines incl. gross-negligence clause escalated to Nolan Kelly.",
      "expansion_plays": [
        {
          "play": "Convert contested scope into a paid change order: CVS PBM reimplementation (Claims, Formulary, Rx Directory) + Dental (Avesis) and Vision claims feeds",
          "rationale": "Already in motion — Crissy requested this scope at the June kickoff claiming 0057 requires it; Maria Baker is drafting the change order and Stephanie Iheme called it 'a credible case for upcharge' (6/8/2026). Their PBM feeds have been dead since the 2024 MedImpact→CVS switch, so the customer has a real compliance gap that must be fixed regardless. Nearest-term revenue on the account.",
          "fit": "high"
        },
        {
          "play": "Billable vendor-connectivity services: direct SFTP onboarding for EviCore and Avesis, plus per-vendor ePA integrations (X12 conversion for Avesis, extra DTR questionnaires for Evolent's 3 UM groups, Progeny if in scope)",
          "rationale": "Customer is actively pushing for 2 extra direct SFTP connections (7/8/2026) and Evolent wants 3 questionnaires vs 1up's standard 1-per-vendor; Anissa already asked Maria whether to charge. Packaging non-standard multi-vendor connectivity as paid services both protects margin and formalizes the sprawling ePA scope.",
          "fit": "high"
        },
        {
          "play": "popconnect / clinical data + quality analytics on the FHIR data already flowing (HEDIS/risk for Medicaid), leveraging the CountyCare–Cook County Health system relationship",
          "rationale": "Account plan explicitly lists 'Connect' as the upsell path and notes the plan's alignment with the Cook County Health hospital system creates a clinical-integration opportunity (Stroger, Provident + FQHC network = provider-side data 1up could connect). As an IL Medicaid MCO they live on HEDIS/withhold quality measures, and post-0057 they will have claims + prior auth + provider FHIR data centralized in 1up. 1up is already piloting popconnect/HEDIS POCs at Capital Health Plan and Fallon to point to. Note: MPF is a non-fit (Medicaid-only, no Medicare LOB).",
          "fit": "medium"
        }
      ],
      "plays_hi": 2,
      "sources": [
        "#account-cook-county (C01Q0TQMJUB) — history 2022-2026 incl. 6/8/2026 change-order thread, 2025 RFP/renewal threads, 2024 SFTP/SSH issues, 2022-23 MoreCare deletion",
        "#account-cook-county-implementation-0057-apis (C0AS7JU7G8Y) — full channel Apr-Jul 2026 incl. 4/10 PMO minutes, kickoff scheduling, 7/8/2026 SFTP-vendors thread and Crissy pace-concern thread",
        "#account-cook-county-implementation-0057-epa (C0BFK11HXAP) — created 7/7/2026, canvas F0BFK156799",
        "#sows-inflight 2025-09-09 (Jodi Patton): Cook County P2P/Provider Access/ePA SOW sent",
        "#arr-services-new-bookings 2024-03-19 (Lindsay Parker): $100K ARR capacity increase; 2021-04-15 booking $635K ARR + $250K services (recon extract)",
        "#2026-0057-access-api--readiness 2026-06-12 (Maria Baker): CountyCare kickoff occurred first week of June; 2026-05-12 (Anissa Nashikkar): discovery questionnaires returned",
        "#growth-updates weekly AM updates 2025-03-14 through 2026-02-27 (RFP presentation 3/21/25, best-and-final due 4/11/25, security review passed 6/22/25, redlines finalized 2/27/26)",
        "#shout-outs 2026-06-08 (Maria Baker): kickoff recap",
        "DM Jodi Patton / Geetika Arora 2026-04-09: contract executed ~2 weeks prior; DM Jodi/Dan Petersen 2026-03-10: MSA signature; DM Jodi/Nolan Kelly 2026-01-30: gross negligence decision; Group DM 2026-03-27 (Stephanie Iheme): software escrow gap",
        "Confluence: Cook County Health Plan (APH space, page 321945788 — account plan, ARR, contacts)",
        "Confluence: 7/8/26 - CountyCare / 1up / Evolent ePA Discovery Call (CKB space, page 2482798593 — UM vendors, CRD/DTR/PAS decisions, timeline)",
        "Confluence: 4/10 Pre-Kickoff PMO Alignment Call (CKB space, page 2201550853)",
        "Confluence: 0057 Access API Implementation Meeting Notes (Services space, page 2265546766)",
        "Confluence: Cook County Implementation Details (CKB page 294125772 — empty body)",
        "Jira: P2P-374 (P2P outbound beta), INFF-1812 (NiFi ingestion), TOPS-150, SRV-802, IMPL-265/277"
      ],
      "sf": {
        "arr": 245000.00000400003,
        "cumulative": 4204012,
        "product_rev": 3319012,
        "services_rev": 250000,
        "health": 8,
        "temperature": "Green",
        "nps": null,
        "renewal_sentiment": 4,
        "sentiment_notes": null,
        "flags": [
          "Competitor engaged",
          "RFP notified",
          "RFP Notification"
        ],
        "renewal": "2029-02-28",
        "contract_exp": "2023-02-28",
        "customer_since": "2021-04-01",
        "go_live": null,
        "impl_level": "Level V",
        "products_sold": "Patient Access;Provider Directory",
        "lobs": "Medicaid",
        "members_contracted": 1500000,
        "members_current": 1181292,
        "competitors": null,
        "pbm": null,
        "owner": "Jodi Patton",
        "csm": "Holly Fan Test",
        "exec_sponsor": "Jodi Patton",
        "tier": "Maintain",
        "opps": [
          {
            "name": "Cook County Health Plan - CMS Patient Access",
            "type": "0125f000000iH45AAE",
            "closed": "2021-04-15",
            "arr": null,
            "services": 250000,
            "amount": 885000,
            "months": 10.94,
            "owner": "Matt Dula",
            "won_because": null,
            "competitor": null
          },
          {
            "name": "RENEWAL: CHG 2022",
            "type": "0125f000000iHVSAA2",
            "closed": "2022-05-13",
            "arr": null,
            "services": 0,
            "amount": 635000,
            "months": 11.96,
            "owner": "Maria Baker",
            "won_because": null,
            "competitor": null
          },
          {
            "name": "Renewal: Cook County Health Plan - CMS Patient Access 2023",
            "type": "0125f000000iHVSAA2",
            "closed": "2023-01-23",
            "arr": null,
            "services": 0,
            "amount": 635000,
            "months": 11.99,
            "owner": "Ariana Zamora",
            "won_because": null,
            "competitor": null
          },
          {
            "name": "Renewal: Cook County Health Plan - CMS Patient Access 2024",
            "type": "0125f000000iHVSAA2",
            "closed": "2024-03-07",
            "arr": null,
            "services": 0,
            "amount": 635000,
            "months": 11.99,
            "owner": "Lindsay Parker",
            "won_because": "relationship",
            "competitor": null
          },
          {
            "name": "Cook County: Capacity increase",
            "type": "0125f000000iH4tAAE",
            "closed": "2024-03-07",
            "arr": null,
            "services": 0,
            "amount": 100000,
            "months": 11.99,
            "owner": "Lindsay Parker",
            "won_because": "relationship",
            "competitor": null
          },
          {
            "name": "25-26 Cook County Health Plan Renewal",
            "type": "0125f000000iHVSAA2",
            "closed": "2025-11-20",
            "arr": null,
            "services": 0,
            "amount": 579012,
            "months": 12.02,
            "owner": "Jodi Patton",
            "won_because": "Selected Vendor of RFP, including a multi-year Renewal.",
            "competitor": null
          },
          {
            "name": "26-29 Cook County - P2P, Provider Access, EPA",
            "type": "0125f000000iHVSAA2",
            "closed": "2026-03-23",
            "arr": null,
            "services": 0,
            "amount": 125250,
            "months": 35.98,
            "owner": "Jodi Patton",
            "won_because": "Selected Vendor of RFP, including a multi-year Renewal.",
            "competitor": null
          },
          {
            "name": "26-29 Cook County Health Plan Renewal",
            "type": "0125f000000iHVSAA2",
            "closed": "2026-03-23",
            "arr": null,
            "services": null,
            "amount": 609750,
            "months": 35.98,
            "owner": "Jodi Patton",
            "won_because": "Selected Vendor of RFP, including a multi-year Renewal.",
            "competitor": null
          }
        ]
      }
    },
    {
      "id": 21,
      "name": "Johns Hopkins HealthCare",
      "quarter": "q2",
      "qlabel": "Q2 · Apr–Jun",
      "seg": "commercial",
      "seglabel": "Commercial / Blues",
      "note": "",
      "full": "Johns Hopkins HealthCare / Johns Hopkins Health Plans (JHHP)",
      "dq": "rich",
      "products_and_scope": "Phase 1 (booked 2023-10-01, verified in #arr-services-new-bookings): 1up Platform + Patient Access/Provider Directory (CMS-9115 Comply) — $580,000 ARR + $158,000 services; a \"Change rip and replace\" (displaced Change Healthcare). Platform capacity: up to 400,000 unique individuals/yr (~1M total active+inactive members sent). Phase 2 (SOW booked 2024-12-09): Clinical files + Personal Representative files services SOW, $74,250 (took >1 year to negotiate). Phase 3 (booked 2026-04-02): CMS-0057 upsell — Provider Access API + Payer-to-Payer API + Prior Auth EOB addition to Patient Access API, +$100,000 ARR + $30,000 services. ePA explicitly NOT in scope of the 0057 deal (kickoff note 4/14/26), despite being JHHP's #1 priority in Aug 2025 planning. In discussion: Sensitive Data Tagging module license — Tyler (JHHP) requested SOW from Jodi Patton, June 2026. Lines of business: Medicare Advantage, Priority Partners (Maryland Medicaid), USFHP/employer plans; ~470k members.",
      "implementation_status": "Roster target was Q2 (Apr-Jun) go-live for 0057, but kickoff was only held 4/15/26 (delayed by contract negotiation that ran into 2026) and go-live is tracking to Q3: Prior Auth Flow set up in Test 6/11/26; test Prior Auth EOB files ingested early June; prod historical files due from JHHP 7/1 with 1up ingest by 7/8; prod incrementals 7/15-7/17; JHHP internal prod testing through 7/24. Provider Access: member attribution file in development, dates due 6/30. P2P: blocked on unstructured-data solution from 1up product (docs promised 6/25). Opt-in/opt-out: flat files (not 1up portal); dates pending JHHP quarterly PI planning. Separately, CMS-9115/Epic clinical project is winding down (JHHP email 5/7/26) but hit setbacks: 1up deleted all Epic test data 6/17 (3 recovery options presented); a full EOB re-ingestion is in progress due to a patient-ID linkage defect — 11,885 files remaining as of 7/8/26, est. ~26 more days as of 7/1. Weekly implementation calls Thursdays + technical calls Mondays.",
      "tech_architecture": "Flat-file (SFTP) ingestion model into 1up FHIR platform — no direct EHR/claims API integration. Epic is the clinical source system (Epic incremental files for 9115; Epic-to-CMS code mapping questions in ePA/PA work). Symplr is the provider directory source (2 feeds being converted; first batch live in prod July 2025). Prior Auth data sent as header/line item/supplemental extract files (v1 extract guide; v2 released June 2026, JHHP deciding v1-then-upgrade vs straight-to-v2). Opt-in/opt-out: MA line captured via JHHP member portal; Priority Partners opt data comes from the State of Maryland; both funneled to Rajasekhar Gudla for extract to 1up. Confluence notes JHHP has \"Itility\" for integration with 1up. Known data issue: unique patient ID structure mismatch between Patient/Coverage file and EOBs broke all EOB-to-Patient linkage (Jan 2026), resolved via 1up-side mapping change + re-ingestion, JHHP fixing IDs in go-forward files. Pending: renaming Payer_name from \"Johns Hopkins HealthCare\" to \"Johns Hopkins Health Plan\" in Insurance file (impact under review, July 2026). Sensitive data tagging planned via JHHP-built sensitive data dictionary applied by 1up.",
      "financial_signals": "All three recon amounts verified in #arr-services-new-bookings: 2023-10-01 — $580,000 ARR + $158,000 services (1up Platform + PA/PD, Change rip-and-replace); 2024-12-09 — $74,250 services SOW (Clinical + Personal Rep files); 2026-04-02 — Provider Access + Payer-to-Payer upsell, +$100,000 ARR + $30,000 services. Running total ~$680k ARR. Renewal date ~Oct 1 (Account Plan Hub page: 10/1/2024; #sows-inflight 2025-09-09: Provider Access/P2P SOW needed to execute the Sept 30, 2025 renewal — signed ~April 2026 after long negotiation). Cost note: 1up absorbed the EOB re-ingestion cost from the Jan 2026 linkage defect and did a no-charge clinical SOW scope change (May 2025) for goodwill.",
      "key_people": "JHHP: Cheri Lamasa (Senior IT PM, PMO — primary PM, clamasa@jhhc.com/jhhp.org), Rajasekhar \"Raj\" Gudla (data/extracts, opt-file funnel), Fred Borchert (Analyst, CMS Interoperability — Provider Access requirements, console escalations), Melissa Mohon (Exec Director / Chief Compliance Officer — raised data-integrity concerns Jan 2026), Aaron Wolff (provider attribution, console access), Osman Arbab (Epic files), Chanene Jackson (prior auth mapping), Alwin Joy (P2P questions), Tyler (Sensitive Data module licensing; USCDIv3 concerns), Brian Ball, Jessica Long, Lauren Green, Sheila Atemnkeng (support). Older contacts: Lee Amoss (Sr Dir IT), Jason Miller (Sr Dir IS), Marja Wilson (VP Medicare). 1upHealth: Jodi Patton (Account Manager — the user), Rachel Schuler (Sr CSM/9115+clinical implementation), Maria Baker (implementations lead), Assiatou \"Assi\" Diallo (0057 implementation manager), Simone Graham (data implementation engineer, prior auth), Robert \"Robzzz\" Davis + Chad Clough (data engineering), Tania Gregory (DIE), Holly Fan (CSM), Stephanie Iheme (services), Kyle Brew (P2P product), Elizabeth McGowan (product, Provider Access), Geetika Arora (console/reporting). Former: Drew Arnold (AM), Stacy Harris (implementation), Tracy (original AE).",
      "risks_and_blockers": "1) Q2 go-live target missed — 0057 kickoff slipped to 4/15/26 due to prolonged contract negotiation (unsigned as of Jan 2026); prod ingestion now July, JHHP testing to 7/24, against the 1/1/2027 CMS deadline. 2) P2P blocker: no 1up solution yet for unstructured prior auth supporting documentation (JHHP demanded federal register citation; escalated 6/4/26; engineering docs promised 6/25). 3) Trust damage: Jan 2026 EOB-to-Patient linkage failure prompted formal concerns from Chief Compliance Officer Melissa Mohon about data integrity/controls; 1up-funded re-ingestion still running (~11.9k files left 7/8/26, ~4 weeks to go). 4) 1up deleted all JHHP Epic test data 6/17/26 — could add ~1 month to the 9115/Epic schedule depending on Steering Committee decision. 5) JHHP is a demanding, process-heavy account (sample-file review loops, slow legal — both prior SOWs took ~1 year); opt-in/opt-out file dates still uncommitted. 6) Pending payer name change to \"Johns Hopkins Health Plan\" needs impact analysis. 7) Console/reporting readiness complaints escalated Dec 2025.",
      "points_of_interest": "JHHP was \"the one that got away\" — a 2-year pursuit before the Oct 2023 Change rip-and-replace win. They planned 0057 priorities in Aug 2025 with ePA as Priority 1, yet the signed 2026 deal excludes ePA — a documented, customer-stated demand left on the table. They are a P2P member-match beta customer (Jira P2P-373, Feb 1 outbound setup alongside Cox, UCare, HPSM). They asked for \"data segmentation\" (Sensitive Data Tagging) unprompted in Dec 2025 and Tyler followed up on licensing in June 2026. Compliance officer involvement means data-quality proof points (referential integrity reporting, MTE observability) matter disproportionately at this account. Confluence CKB space has detailed weekly call pages (through 6/18/26) and the APH account plan (last updated Jan 2024 — stale).",
      "expansion_plays": [
        {
          "play": "Sensitive Data Tagging module license (close the open SOW)",
          "rationale": "JHHP asked to implement data segmentation in Dec 2025, Tyler requested the SOW from Jodi in June 2026, and it is already tracked as a separate workstream with an extract guide forwarded — this is an in-flight, customer-initiated purchase that just needs closing, and it directly addresses compliance officer Melissa Mohon's sensitivity concerns.",
          "fit": "high"
        },
        {
          "play": "ePA (electronic Prior Authorization API) add-on",
          "rationale": "ePA was JHHP's stated Priority 1 in Aug 2025 planning ('October, or asap in 2025') but was excluded from the April 2026 0057 contract; their UM/Epic/Compliance teams already engaged on Prior Auth roadmap calls in 2025, the Prior Auth EOB data pipes are being built now, and the CMS-0057 ePA requirement (2027) gives a hard forcing function — natural attach at the ~Oct 1 renewal.",
          "fit": "high"
        },
        {
          "play": "Clinical data analytics / popconnect (quality-risk use cases on Epic + claims FHIR data)",
          "rationale": "JHHP already flows Epic clinical files, claims/EOBs, and Symplr provider data into 1up across 470k members, and Johns Hopkins' stated strategy emphasizes data-driven decision-making and population health (VP Population Health contact on file); once the re-ingestion and 0057 go-live stabilize, monetizing the assembled FHIR asset for quality/risk analytics is the logical next platform step — but sequencing matters given current data-quality trust repair.",
          "fit": "medium"
        }
      ],
      "plays_hi": 2,
      "sources": [
        "#account-johnshopkins (C05UJP7SBDL) — full history Oct 2023 to Jul 2026",
        "#account-jhhp-implementation-0057-apis (C0ART9ME6PN) — full history Apr-Jul 2026",
        "#arr-services-new-bookings (C01KG7PJEDV) — 2023-10-01 ($580k+$158k), 2024-12-09 ($74,250), 2026-04-02 ($100k+$30k) messages verified",
        "#account-johnshopkins thread 1782739279.998319 — EOB reload status Jun 29-Jul 8, 2026",
        "Confluence APH: Johns Hopkins Health Plan account plan (pageId 321945878)",
        "Confluence CKB: JHHP 0057 Weekly Implementation Call pages 5/5, 5/21, 5/28, 6/4, 6/11, 6/18 2026",
        "Confluence CKB: 8/21/25 - JHHP Planning for 0057 (pageId 1575321627)",
        "Confluence CKB: JHHP - 0057 Data Gap Analysis (pageId 1399652360)",
        "Confluence CKB: Unique Person Id Changes and Impacts (pageId 1877278738, referenced)",
        "Confluence CKB: JHHP Implementation Details (pageId 227508262, referenced)",
        "Jira P2P-373 — JHHP among P2P member-match beta customers",
        "Cross-account recon extracts (#sows-inflight 2025-09-09; #2026-0057-access-api--readiness 2026-01-13, 2026-04-15, 2026-06-04)"
      ],
      "sf": {
        "arr": 232043.010756,
        "cumulative": 2102250,
        "product_rev": 1840000,
        "services_rev": 262250,
        "health": 7,
        "temperature": null,
        "nps": null,
        "renewal_sentiment": 4,
        "sentiment_notes": "EPIC",
        "flags": [
          "Competitor engaged",
          "RFP notified",
          "Pricing Concern"
        ],
        "renewal": "2028-09-29",
        "contract_exp": "2024-09-30",
        "customer_since": "2023-09-30",
        "go_live": null,
        "impl_level": null,
        "products_sold": null,
        "lobs": "Medicare;Medicare Advantage",
        "members_contracted": 400000,
        "members_current": 400000,
        "competitors": null,
        "pbm": null,
        "owner": "Jodi Patton",
        "csm": "Holly Fan Test",
        "exec_sponsor": "Mohammad Jouni",
        "tier": "Maintain",
        "opps": [
          {
            "name": "Johns Hopkins HealthCare - Payer Platform (RFP)",
            "type": "New Business",
            "closed": "2023-10-01",
            "arr": null,
            "services": 158000,
            "amount": 738000,
            "months": 12.02,
            "owner": "Ariana Zamora",
            "won_because": "1up reputation, 2 years of relationship building, no off-shore data storage",
            "competitor": null
          },
          {
            "name": "Johns Hopkins: Renewal 2024",
            "type": "0125f000000iHVSAA2",
            "closed": "2024-11-14",
            "arr": 580000,
            "services": 0,
            "amount": 580000,
            "months": 11.96,
            "owner": "Drew Arnold",
            "won_because": "A good relationship and amazing service experience",
            "competitor": null
          },
          {
            "name": "SOW: Johns Hopkins - Clinical Data & Personal Rep SOW",
            "type": "0125f000000FCKeAAO",
            "closed": "2024-12-09",
            "arr": null,
            "services": 74250,
            "amount": 74250,
            "months": -11.96,
            "owner": "Drew Arnold",
            "won_because": "Good relationship and Joy (CIO) disregarding their redlines",
            "competitor": null
          },
          {
            "name": "25-28 JHHP Renewal",
            "type": "0125f000000iHVSAA2",
            "closed": "2025-10-02",
            "arr": 580000,
            "services": 0,
            "amount": 580000,
            "months": 35.98,
            "owner": "Jodi Patton",
            "won_because": "A good relationship and amazing service experience",
            "competitor": null
          },
          {
            "name": "25-28 JHHP P2P, Provider Access",
            "type": "0125f000000iHVSAA2",
            "closed": "2026-04-01",
            "arr": 580000,
            "services": 30000,
            "amount": 130000,
            "months": 30.98,
            "owner": "Jodi Patton",
            "won_because": "A good relationship and amazing service experience",
            "competitor": null
          }
        ]
      }
    },
    {
      "id": 22,
      "name": "Community Care of Oklahoma",
      "quarter": "q2",
      "qlabel": "Q2 · Apr–Jun",
      "seg": "commercial",
      "seglabel": "Commercial / Blues",
      "note": "Evolent-administered",
      "full": "Community Care of Oklahoma (CCOK) — full name: CommunityCare Managed Healthcare Plans of Oklahoma, Inc.",
      "dq": "rich",
      "products_and_scope": "Contracted for ALL 9115 and 0057 products in a single signed SOW [Confluence \"7/24/25 - Internal Handoff from Sales to IM\"]: Phase 1 (project start 10/1/25): CMS-9115 Patient Access, 9115 Provider Directory, 0057 Payer-to-Payer, 0057 Provider Access. Phase 2 (per Order Form, ePA kickoff 4/1/26): Prior Auth / ePA. Booking announcement [#arr-services-new-bookings, 2025-07-16]: \"New Payer Customer - $255,000 ARR - Patient Access, Provider Directory, Provider Access, Payer to Payer, Prior Auth. Edifecs rip and replace. 36 month term.\" Scope details: up to 120k active members, 4 LOBs / 4 auth apps contracted (only 3 delivering data: Commercial, Self Funded, Medicare; CHIP appears in July 2026 cohort plan), Personal Rep/Delegate included (Medicare only), Formulary via new PBM Navitus, Medicare Plan Finder (MPF) requirements actively discussed for CY2027. Implementation is STE (Maria Baker referenced STE/MTE hybrid question at setup).",
      "implementation_status": "Behind the roster's Q2 (Apr-Jun) go-live — now in UAT/cohort testing with realistic sign-off through late July/early Aug 2026. Timeline: kickoff call 10/27/25; CCOK asked for PAI/PD live by June 1, 2026 because their Edifecs contract expires (they planned to sunset the legacy process in May); Stacy's draft plan targeted April 2026; status reports ran Yellow from Dec 2025 onward due to repeated file-quality feedback cycles (EOBs, Provider Directory, Formulary). As of 2026-06-11 CCOK \"would like to go live by July.\" Current state (7/6-7/8/26): cohort-based UAT per LOB — COMM cohort (185 patients) ingested first; worst-case schedule COMM sign-off 7/13, MA 7/20, Self Funded 7/27, CHIP 8/3 [#account-ccok-implementation-9115]. Batch 20260629 EOB files loaded into RDS without issue 7/7; full-file load (org, practitioner, delegate, care plan) + cohort load (patient, coverage, EOBs) agreed 7/8. Formulary likely excluded from this go-live (unconfirmed). Phase 2 ePA has NOT kicked off despite contractual 4/1/26 start — on 7/1/26 Maria Baker said \"We can start now if they are ready\" [#account-ccok thread 1782920803.196369].",
      "tech_architecture": "Core admin: Amisys (CCOK asked whether 1up's team had Amisys knowledge, 9/16/25). IdP: Identity Server (SAML integration to 1up Keycloak/Patient Viewer). Data exchange: CSV EG-template extracts over 1up-hosted AWS SFTP with PGP encryption (added without change order, 3/12/26), CARIN BB / patient-access / plan-net / us-core file formats; NiFi ingestion, Avro schema validation, dedicated AWS STE (OPSREQ-10134). Partitions/client IDs: CCOK_UAT/PROD_MA, _COMM, _QHP, _MMC. PBM: switching to Navitus for 2026 plan year (replacing prior PBM); Navitus refused to send files directly to 1up — CCOK must transform Navitus formulary/Rx data into EG templates (gap analysis by Joy He found missing required fields, Alt-GPI mapping issues, NULL RxNorm). UM vendor: Evolent (delegated prior auth; ePA integration + DSA question pending; Evolent prepping bulk end-to-end ePA testing per #epa-adoption-growth 6/9/26). Legacy interop vendor being ripped/replaced: Edifecs. Provider-side EHR overlap for ePA: Veradigm (successful 1up test call 6/2/26; CCOK a mutual customer). Provider Access partitions created in 6/26/26 war room [#provider-access-implementation-party].",
      "financial_signals": "$255,000 ARR, new payer, 36-month term, booked 2025-07-16 [#arr-services-new-bookings, Olivia Cleworth]. Project commencement 10/1/25 (Phase 1); ePA kickoff per Order Form 4/1/26. Contract commencement date per Maria Baker's list (1/9/26 DM): \"CCOK - 5/1/26\". Contract includes joint press release (and possibly case study) clause [#sales-marketing, 2025-08-15]. Possible change-order/scope items surfaced: 4 contracted LOBs/auth apps vs 3 delivering; direct Navitus connection (declined by Navitus); PGP encryption absorbed without change order.",
      "key_people": "CCOK: Cammi Hyde and Keena Palmer (PMs, original); Maria Davis (new PM since ~June 2026, mdavis@ccok.com — may not be tracking 0057); Kalynn (project coordination); Don Baldwin (data engineer building the files); Don Graves, James Huckaby, Sam Joels, Jacob Novak, Chanyang Yang (technical SMEs); Ben Strednak, Brian Stahl (IT Infrastructure managers); David Wright (Manager - Clinical Risk); Xavier Ransome (data engineer); Sepideh Shahriary Nezhad (PM, PBM implementation); Denisa (internal approver); Stephen Cote (bounced/inactive contact, 1/13/26). 1upHealth: Olivia Cleworth (AE who closed the deal; left company ~Aug 2025); Anton Pederson (solutions); Nolan Kelly (sales leadership); Maria Baker (Account Management); Stacy Harris (Sr Implementation Manager, lead PM); Anissa Nashikkar (IM coverage); Joy He (data engineer, primary ingestion); Robert \"Robzzz\" Davis (tech lead); Chad Clough (data eng lead, rolled off Jun 2026); Tania Gregory (coverage); Rachel Schuler (ePA); Jeremy Yoon (ePA/provider engagement); Geetika Arora (regulatory/product questions incl. MPF, CMS-0062-P); Avi Lessure (product, provider directory); Kevin (product, MPF for THP/CCOK); Mohammad Jouni (CPTO, streamlined-implementation questionnaire pilot / AI-mapping POC).",
      "risks_and_blockers": "1) Schedule slip: go-live moved April → June 1 → July 2026+, with cohort sign-offs possibly running to 8/3/26; hard external deadline was Edifecs contract expiry (~June 1). 2) Chronic file-quality churn: months of feedback cycles on EOBs, Provider Directory, org/practitioner files, non-UTF characters, naming conventions; CCOK-side data engineer described his own files as \"I would not bet my life on it being perfect.\" 3) Formulary/Navitus gap: Navitus won't send data to 1up directly; files missing required fields (NULL RxNorm, Alt-GPI); formulary likely dropped from initial go-live — compliance exposure for CMS-9115 formulary requirement. 4) MPF CY2027 open question (5/15/26): CMS's May 1, 2026 guidance shifted to hosted/static JSON + index-file crawling; CCOK asked pointedly whether 1up's solution supports this before the CMS testing window closes 9/1/26 — unresolved product answer routed to Geetika/Kevin. 5) ePA/0057 Phase 2 drift: contractual 4/1/26 ePA kickoff hasn't happened; CCOK proactively asked (7/1/26) how their Evolent ePA project impacts Phase 2 0057; Rachel Schuler had no notes of any ePA start. 6) CCOK PM turnover (Cammi Hyde → Maria Davis) with no formal 0057 handoff. 7) Contract mismatch: 4 LOBs/auth apps contracted vs 3 partitions in use (plus late-appearing CHIP). 8) Evolent DSA legal question (5/14/26, #legal-and-compliance) pending confirmation of ePA solution architecture. 9) Customer security concern about URL-based GET requests exposing member data in web logs — earlier flagged as potential hard blocker.",
      "points_of_interest": "Competitive win: Edifecs rip-and-replace (\"Down goes Edifecs!\" — Nolan Kelly). CCOK was the first customer in 1up's restarted Win/Loss interview program (Aug 2025) and is a CAB expansion candidate (Dec 2025). Contract contains a joint press-release clause — a go-live PR opportunity. CCOK volunteered for Mohammad Jouni's implementation-streamlining initiative/questionnaire (Nov 2025) and was considered for MJ's AI file-mapping POC for Navitus vendor data. Veradigm EHR overlap makes CCOK one of the named payers for provider-side ePA end-to-end testing. Note the internal alias collision risk: \"CBC\" (Capital Blue Cross) appears once in a CCOK thread as a typo. Also asked about CMS-0062-P impact (4/28/26) — regulatory-savvy customer.",
      "expansion_plays": [
        {
          "play": "Medicare Plan Finder (MPF) CY2027 hosted-solution package",
          "rationale": "CCOK is already deep in MPF requirements questions (5/15/26 detailed email on CMS's revised hosted-JSON delivery model, PDex Plan-Net 1.2.0, ETag/Last-Modified headers, 9/1/26 testing window) and Kevin's product tracker lists 'MPF - THP/CCOK'. Their Plan-Net provider directory data is already flowing to 1up. Packaging MPF hosting/index-file publication for their MA D-SNP/Medicare contracts as a formal add-on or change order converts an unresolved product question into revenue — but the product answer must land before the 9/1/26 CMS testing deadline or it becomes a churn risk instead.",
          "fit": "high"
        },
        {
          "play": "Formulary/PBM data services: take Navitus files as-is with 1up-side mapping (professional services / managed data add-on)",
          "rationale": "CCOK has struggled for 8+ months to transform Navitus formulary/Rx data into EG templates (missing fields, NULL RxNorm, Alt-GPI logic) and formulary likely misses the initial go-live. 1up already offered to accept files 'as-is' and MJ's AI-mapping POC was floated for exactly this data. A paid services engagement or managed vendor-feed offering closes their CMS-9115 formulary gap, removes their biggest ongoing pain, and creates a repeatable pattern (precedent: MNSCHA v1.1.0 profile approach).",
          "fit": "high"
        },
        {
          "play": "Clinical data / popconnect + quality-risk analytics on the FHIR store",
          "rationale": "CCOK is already sending us-core CarePlan clinical files (they dropped Smoking Status/Clinical Results only because they lack the data), has a 'Manager - Clinical Risk' (David Wright) on the project roster, and runs an MA D-SNP where risk/quality economics matter. With claims, coverage, and clinical data for 3-4 LOBs already normalized in 1up FHIR infrastructure, an HDE/popconnect analytics layer (quality measures, risk capture, dual-eligible coordination) is a natural post-go-live upsell — after Phase 1 stabilizes and Phase 2 ePA kicks off.",
          "fit": "medium"
        }
      ],
      "plays_hi": 2,
      "sources": [
        "#account-ccok (C095X6308NP) — full channel history Jul 2025 - Jul 2026",
        "#account-ccok-implementation-9115 (C09NVMTGND6) — full channel history Oct 2025 - Jul 2026, incl. weekly status updates and 7/7-7/8/26 cohort-load thread (ts 1783437528.479089)",
        "#arr-services-new-bookings booking announcement + thread, 2025-07-16 (ts 1752670173.236479)",
        "Confluence: '7/24/25 - Internal Handoff from Sales to IM' (CKB space, page 1525415963)",
        "Confluence: CommunityCare/1upHealth weekly status meeting notes series (CKB pages 1525186789, 1727594497, 1734344705, 1834156033, 1855848449, 1937014785, 2050293761)",
        "Confluence: 'Stacy Out of Office Plan 06/22 - 07/3' (Services space, page 2419392730)",
        "Confluence: 'Product Team OKR + KPI Tracker' (PD space, page 1974861844) — 'MPF - THP/CCOK'",
        "#legal-and-compliance Evolent DSA thread, 2026-05-14 (ts 1778794677.032289)",
        "#epa-adoption-growth meeting notes 5/21/26 and 6/9/26 (Veradigm/Evolent)",
        "#provider-access-implementation-party war room 6/25-6/26/26 (ts 1782401306.663789)",
        "#shout-outs Veradigm test call, 2026-06-02",
        "#sales-marketing Win/Loss program (2025-08-11) and press-release clause tracking (2025-08-15)",
        "Maria Baker DM/group DM commencement-date list, 2026-01-09 (CCOK - 5/1/26)",
        "#account-ccok ePA/Phase-2 thread, 2026-07-01 (ts 1782920803.196369)"
      ],
      "sf": {
        "arr": 91666.66666799999,
        "cumulative": 347750,
        "product_rev": 255000,
        "services_rev": 92750,
        "health": 10,
        "temperature": null,
        "nps": null,
        "renewal_sentiment": 5,
        "sentiment_notes": null,
        "flags": [],
        "renewal": "2028-10-01",
        "contract_exp": null,
        "customer_since": "2025-10-01",
        "go_live": null,
        "impl_level": null,
        "products_sold": null,
        "lobs": null,
        "members_contracted": 120000,
        "members_current": 15523,
        "competitors": "Edifecs",
        "pbm": null,
        "owner": "Jodi Patton",
        "csm": "Stephanie Iheme",
        "exec_sponsor": "Stephanie Iheme",
        "tier": "Maintain",
        "opps": [
          {
            "name": "CCOK- New Platform and Access APIs",
            "type": null,
            "closed": "2025-07-16",
            "arr": null,
            "services": 92750,
            "amount": 247750,
            "months": 36.01,
            "owner": "Olivia Cleworth",
            "won_because": "1upHealth market and FHIR expertise",
            "competitor": "Edifecs"
          },
          {
            "name": "CCOK- ePA",
            "type": null,
            "closed": "2025-07-16",
            "arr": null,
            "services": 0,
            "amount": 100000,
            "months": 30.03,
            "owner": "Olivia Cleworth",
            "won_because": "1upHealth expertise",
            "competitor": null
          }
        ]
      }
    },
    {
      "id": 23,
      "name": "South Country Health Alliance",
      "quarter": "q2",
      "qlabel": "Q2 · Apr–Jun",
      "seg": "commercial",
      "seglabel": "Commercial / Blues",
      "note": "First X12/HDE build",
      "full": "South Country Health Alliance (MN SCHA / MNSCHA / \"South Country\")",
      "dq": "rich",
      "products_and_scope": "New payer logo closed 2025-09-30: Patient Access, Provider Directory, Provider Access, Payer-to-Payer, ePA; 36-month term; Edifecs rip-and-replace (Edifecs was used through a TPA) [#arr-services-new-bookings 2025-09-30]. Phase 1 = \"MNSCHA Phase 1 Implementation <> 9115 Patient Access, Provider Directory\" kicked off 2025-10-20 [#account-mnscha-9115-implementation], including Medicare Plan Finder scope (MPF remediation docs + mpf_ma_provider_directory technical guide sent Apr 2026; MPF linkage checks run by 1up DE). Phase 2 = CMS-0057: 0057 PA/P2P kickoff ~mid-June 2026 and ePA implementation kickoff 6/17/2026 (agreed to up to 9 non-InterQual questionnaires for DTR). Also named one of the first 2-4 HDE data-platform customers (first customer through the HDE/MTE pipeline) [Confluence HDE Playbook, UAT Data Validation brief]. Add-on: pharmacy claims change order — SOW + Order Form (\"South_Country_Health_Alliance_-_Pharmacy_Claims_Order_Form_-_22May2026\") signed 2026-06-01 to cover historical NCPDP pharmacy claims from SS&C Health that deviated from the original AbarcaRx-spec SOW. 2 LOBs (Medicare Advantage + Managed Medicaid/MinnesotaCare) with 3 formularies (Medicare, Medicaid, Medicaid Wrap).",
      "implementation_status": "Roster says Q2 (Apr-Jun 2026) go-live, but as of 2026-07-08 they are still in UAT — no go-live announcement found, so the Q2 target likely slipped (label: likely). Progress: Phase 1 file work ran Oct 2025-present (SFTP live 11/13/25; Patient, Coverage, EOB Pharmacy, Provider Directory loaded to test env by 3/3/26; UAT instructions delivered ~3/9/26; status was Yellow/Yellow/Medium in March over formulary gaps, later resolved — formulary JSON ingested with no errors 6/22/26). On the HDE side, Patient and Coverage ran clean end-to-end in UAT ~6/10/26 (\"Real customer data, all the way through\" — Kevin Yamashita, #product 6/12/26); EOB (three X12 variants) and formulary were \"close\"; June was the target for fully-in-UAT. Latest clinical files (care plan, care team, goals, related person) loaded 7/8/26 with error feedback outstanding. Console was switched to display Medicaid LOB 6/17/26; historical claims (medical + pharmacy 2016-2022) now arriving. ePA/0057 phase just started: kickoff 6/17/26, scoping call 6/24/26 (\"this one might be super easy\"), PAS via 1up/Zyter TruCare integration slated for Stage October 2026.",
      "tech_architecture": "Provider EHR: mainly Epic (others unknown) [Confluence account page]. UM: Zyter TruCare (internal UM team); TruCare has no FHIR API — all PAS auths will route through the planned 1up/Zyter integration (Stage Oct 2026). CRD: Itiliti PA Checkpoint is CRD source of truth; 1up will proxy to Itiliti's CRD API. DTR: InterQual API under evaluation (not currently used); otherwise 1up builds up to 9 questionnaires. ePA stack per questionnaire response: TruCare, Itiliti, PA Grid; earlier call notes flagged \"uses MIRTH?\". Data exchange: SFTP file drops into S3 (1up-mnscha-prod-pre-prod-data-ingest), NiFi + JSONonFHIR lambda in a dedicated single-tenant AWS env (1up-mnscha-prod), Keycloak/SAML IDP for Console SSO. Sources: X12 837 PACDR EDI for medical claims (Professional 005010X298, Institutional 005010X299, Dental 005010X300 — same feeds sent to prior FHIR vendor Edifecs); AbarcaRx fixed-width pharmacy EOB (2021+); historical Rx claims 2016-May 2022 from SS&C Health in NCPDP PAH 4.2; Provider Directory JSON; formulary/plan JSON following the CMS Marketplace \"Drugs & Health Plans\" schema; CSV extract-guide files for Patient/Coverage/CarePlan/CareTeam/Goals/RelatedPerson/Sensitive Data Codes. Member ID: 8-digit PMI used across systems. MNSCHA's X12 ask drove 1up to build x12 ingestion infra as part of the HDE pilot (Mohammad Jouni, 12/2/25).",
      "financial_signals": "$170,750 ARR, 36-month term, closed 2025-09-30 (Q3 quarter-end); competitive win over Onyx displacing incumbent Edifecs; 4.5-month sales cycle from mid-May 2025 intro; won on vendor-agnostic ePA differentiation [#arr-services-new-bookings, Olivia Cleworth, 2025-09-30]. Additional services revenue: pharmacy claims change order — SOW + Order Form signed 2026-06-01 for the SS&C/NCPDP historical claims work (amount not stated in Slack).",
      "key_people": "Customer side (first names only in Slack): Matt (data/technical lead — provider directory, formulary, coverage files), Larry (developer building extract files), Ruth (clinical/care-team SME), Alana (pushed the 837 EDI/data extraction pilot ask). 1upHealth: Olivia Cleworth (AE, closed the deal), Anton Pederson (SE, whiteboarding), Nolan Kelly (sales leadership), Anissa Nashikkar (Implementation Manager, primary owner), Stacy Harris (IM coverage, since departed channels), Joy He (data engineer, STE + MPF checks), Robert Davis \"Robzzz\" (data architecture/Provider Directory, left channel 7/6/26), Avi Lessure (DE, X12/EOB analysis), Mohammad Jouni (HDE/MTE lead), Kevin Yamashita (HDE product), Rachel Schuler (ePA implementation lead), Jeremy Yoon (ePA product), Juliette Steinkrauss (ePA growth), Maria Baker, Stephanie Iheme (worked with SCHA at a previous employer).",
      "risks_and_blockers": "1) Timeline: Q2 2026 go-live target vs still in UAT as of 7/8/26 with file-quality feedback loops ongoing (likely slipped). 2) PAS dependency on the 1up/Zyter TruCare integration (Stage Oct 2026) — TruCare has no FHIR API, and MNSCHA warned Zyter may charge customers a hefty fee for its FHIR module; 1/1/2027 ePA compliance runway is tight. 3) DTR undecided: InterQual API decision still open (and 1up's InterQual agreement was pending a $10M liability-cap leadership call as of 7/7/26). 4) Data-quality/scope churn: formulary gaps nearly forced fallback to older specs (Mar 2026); NCPDP historical claims surprise deviated from SOW and required a change order; care coordinator/case manager can't be mapped to US Core Practitioner (no NPI) or RelatedPerson types — unresolved modeling question. 5) Provider Access attribution based on Primary Care Clinic assignments with accuracy concerns; no member portal, wants 1up to manage opt-outs and opt-ins [#2026-0057-access-api--readiness 4/30/26]. 6) Recurring Console/IDP SAML issues (OPSREQ-10266, OPSREQ-10376). 7) Economics: small $170K ARR account consuming heavy engineering effort as the first HDE/X12 customer.",
      "points_of_interest": "First customer ever through the HDE pipeline — MNSCHA's 837 EDI ask is why 1up built X12 ingestion, making them the reference implementation for the new data platform (\"the onboarding process for MNSCHA is documented well enough that a second customer could follow it\" — S6 kickoff; McLaren explicitly copies MNSCHA's test-file spreadsheet). Referred to 1up by GenHealth. They call themselves \"South Country,\" not MNSCHA. Asked at 0057 kickoff whether other MN payers are on 1up for P2P — interested in network effects (answer: docs.1up.health payer network page). Engaged customer: attended the April 2026 customer webinar. On the ePA growth team's \"second string\" priority list for 2026 adoption. Sensitive Data Tagging (SDT) is flagged off in core API partly waiting on legit SDT data from MNSCHA or McLaren (CA-357, 7/8/26) — they're slated to send Sensitive Data Code files.",
      "expansion_plays": [
        {
          "play": "Quality/risk analytics (popconnect / clinical data products) on the HDE data already flowing",
          "rationale": "They are the first HDE customer with claims, pharmacy, formulary, AND clinical data (care plans, care teams, goals, sensitive data codes) already normalized to FHIR/CDM, plus 10 years of historical claims (2016-2026) just delivered. An MA + Managed Medicaid plan this size has Stars/HEDIS/risk-adjustment needs and no analytics vendor visible in any channel — monetize the data asset 1up already built for them.",
          "fit": "high"
        },
        {
          "play": "Member consent/engagement layer: managed opt-in/opt-out service plus a member-facing app",
          "rationale": "Their 4/30/26 questionnaire explicitly asked 1upHealth to manage both Provider Access opt-outs and P2P opt-ins, and they have no member portal at all. 1up already hosts their member auth app (logo + privacy verbiage delivered Nov 2025). Productizing consent management + member data access UX is an ask they have already voiced.",
          "fit": "high"
        },
        {
          "play": "ePA depth expansion: InterQual API integration, additional questionnaires beyond the 9 contracted, and provider-side adoption program",
          "rationale": "DTR scope is still open (InterQual decision pending), PAS lands via the new Zyter integration in Oct 2026, and the ePA growth team already lists South Country in its 2026 adoption pipeline. Once live, utilization-driven expansion (more questionnaires, provider outreach, possibly taking over CRD from Itiliti) is the natural upsell for the account that bought specifically on vendor-agnostic ePA.",
          "fit": "medium"
        }
      ],
      "plays_hi": 2,
      "sources": [
        "Slack #account-mnscha (C09JXCUEG7Q) - full history Oct 2025-Jul 2026 (sales handoff, channel rename)",
        "Slack #account-mnscha-9115-implementation (C09LPQK53GS) - full history Oct 2025-Jul 2026 (weekly EOW updates, file/UAT detail, change order)",
        "Slack #account-mnscha-implementation-0057-epa (C0BBC76FZED) - ePA kickoff 6/17/26 and scoping 6/24/26",
        "Slack #account-mnscha-0057-implementation-pa-p2p (C0BB96XUG9G) - empty except member join 6/17/26",
        "Slack #arr-services-new-bookings 2025-09-30 (Olivia Cleworth booking post + Nolan Kelly reply: $170,750 ARR, Onyx/Edifecs, 4.5-mo cycle)",
        "Slack #product 2026-06-12 (Kevin Yamashita HDE Week 16 update: MNSCHA Patient/Coverage clean in UAT)",
        "Slack #epa-adoption-growth 2026-07-07 (South Country on ePA second-string list; InterQual liability cap)",
        "Slack #planhat-project-updates Feb-Mar 2026 (Yellow status, formulary blocker, UAT instructions)",
        "Slack #cloud-devops-core-infra-public Jun 2026 (Keycloak/SAML IDP troubleshooting, OPSREQ-10376)",
        "Slack #team-core-api-public 2026-07-08 (CA-357 SDT waiting on MNSCHA data)",
        "Slack #2026-0057-access-api--readiness (kickoff question 6/17/26; questionnaire 4/30/26 - provided as recon extract)",
        "Confluence: South Country Health Alliance (MNSCHA), Compliance space, page 1663828035 (SOW/Miro links, GenHealth referral, Epic, TruCare/Itiliti)",
        "Confluence: Prior Auth Customer Timelines, PD space, page 1508147248 (CRD via Itiliti PA Checkpoint, UM = Zyter TruCare)",
        "Confluence: MNSCHA Formulary Implementation, DNA space, page 2290122761 (CMS Marketplace Drugs & Health Plans schema)",
        "Confluence: HDE Implementation Services/Engineering Playbook, DNA space, page 2391867393 (first 2-4 HDE implementations)",
        "Confluence: S6/S7 kickoffs + June 5/June 12 2026 HDE weekly pages, DNA space (UAT progress)",
        "Jira TOPS-6906 (Checkly dashboard; env = 1up-mnscha-prod)",
        "Gmail search for South Country/MNSCHA: none found"
      ],
      "sf": {
        "arr": 56916.66667200001,
        "cumulative": 297375,
        "product_rev": 170750,
        "services_rev": 126625,
        "health": 9,
        "temperature": null,
        "nps": null,
        "renewal_sentiment": 5,
        "sentiment_notes": null,
        "flags": [],
        "renewal": "2028-09-30",
        "contract_exp": null,
        "customer_since": "2025-10-01",
        "go_live": null,
        "impl_level": null,
        "products_sold": null,
        "lobs": "Medicare;Medicaid",
        "members_contracted": null,
        "members_current": 24233,
        "competitors": "Edifecs",
        "pbm": null,
        "owner": "Jodi Patton",
        "csm": "Stephanie Iheme",
        "exec_sponsor": "Stephanie Iheme",
        "tier": "Maintain",
        "opps": [
          {
            "name": "MNSCHA- New Platform",
            "type": null,
            "closed": "2025-09-30",
            "arr": null,
            "services": 116625,
            "amount": 287375,
            "months": 35.98,
            "owner": "Olivia Cleworth",
            "won_because": "cms 0057 and epa expertise",
            "competitor": "Onyx"
          },
          {
            "name": "MHSCA - Pharmacy files",
            "type": null,
            "closed": "2026-06-01",
            "arr": null,
            "services": 10000,
            "amount": 10000,
            "months": 11.04,
            "owner": "Jodi Patton",
            "won_because": "pharmacy files",
            "competitor": null
          }
        ]
      }
    },
    {
      "id": 24,
      "name": "BayCare Select Health Plans",
      "quarter": "q2",
      "qlabel": "Q2 · Apr–Jun",
      "seg": "medadv",
      "seglabel": "Medicare Advantage",
      "note": "",
      "full": "BayCare Select Health Plans (BayCare Health Plans) — Medicare Advantage plan (est. 2018) serving Hillsborough, Pasco, Pinellas, and Polk Counties, FL; small plan (~15K active members per Oct 2025 coverage file)",
      "dq": "rich",
      "products_and_scope": "Phase 1 (2023): CMS-9115 Patient Access — new customer Aug 2023, Change Healthcare rip-and-replace ($45K ARR + $38K services). Phase 2 (2025-26): CMS-0057 suite — P2P, Provider Access, ePA SOW signed 9/9/2025 (#sows-inflight); booking closed 12/20/2025 ($95,300 ARR + $65,000 services + $5,722 CPI) after \"a lot of negotiating\". Phase 3 (in flight): Medicare Plan Finder (MPF) — customer flagged MPF as higher near-term priority on 6/26/2026 call; contract execution was the blocker; on 7/8/2026 (today) John Lambrecht confirmed the order form was already signed and was signing the BayCare SOW in DocuSign. Note: the 2026-04-08 $657K RFP-win extract does NOT match this account (no BayCare hit in #arr-services-new-bookings for that date) — it and the \"split Utah opt-in\" extract likely belong to SelectHealth, not BayCare.",
      "implementation_status": "0057 implementation just started: commencement date 6/1/2026, kickoff held 6/12/2026 (Assiatou Diallo + Rachel Schuler assigned; Holly Fan and Rachel were OOO that day so Holly sent an email intro). Discovery questionnaires for ePA, P2P, Provider Access circulated internally 6/3. First weekly call 6/26/2026: covered opt-in/opt-out member experience for Provider Access and P2P; BayCare to confirm whether existing opt-out data collection aligns with CMS Provider Access language and to bring compliance (Joanna) into a future call; next call Friday 7/10. PlanHat working timeline targets September 11, 2026 go-live — BEHIND the roster's Q2 (Apr-Jun) expectation; Q2 has passed with the project only at kickoff stage. History: original 9115 build was slow — kickoff 8/25/2023, project nearly put on HOLD Sep-Oct 2023 because BayCare lacked resources/test-data access; went live with a subset (Patient, Coverage, Practitioner, Organization loaded to prod 1/3/2024); EOB medical/pharmacy and Formulary still in progress through 2024 with weekly calls hosted by Michael King (BayCare).",
      "tech_architecture": "AWS-hosted payer; 1up offered traditional SFTP or AWS-to-AWS VPC (CDPHP cited as precedent) [#account-baycare 2023-08-25]. CSV extract-based integration with FULL-REPLACE files (agreed because member count is low; they were updating vendors/EDW in parallel) [Confluence \"Baycare Implementation Details\"]. PBM: MedImpact (formulary file confusion — sent Pharmacy EOB .dat type 112 instead of Formulary; DIMA vs EOB decision needed SOW change). 1up stack: 1up-baycare-prod OpenSearch cluster (hit 98.8% disk Mar 2025, \"officially over capacity\", disk increased), Kibana admin console. Data quirks: RX claims matching broke when BayCare dropped 2 field values (Nov 2024); RX reprocessing effort Jan 2025; active/enrollment status requires crosswalk from COVERAGE PERIOD_END=9999-12-31 (no crosswalk map exists; Trang Derdak said it needs an additional mapping SOW, Oct 2025). Member portal IDP not confirmed for BayCare (the Ping IDP extract belongs to a different account).",
      "financial_signals": "Verified in #arr-services-new-bookings: 2023-08-09 new customer $45,000 ARR + $38,000 services (Change HC rip-and-replace; Olivia Cleworth/Eden Avraham-Katz); 2024-12-17 price-increase upsell $1,350 on 1-yr renewal; 2025-12-20 $5,722 CPI increase + $95,300 ARR for 0057 + $65,000 services (Ryan Ingram, Jeremy Yoon, Dan Petersen, Matt Leskovar credited). Running ARR ≈ $147K. MPF deal pending: order form signed, SOW in DocuSign 7/8/2026 (dollar amount not visible in Slack). The $657K 2026-04-08 RFP win is NOT this account.",
      "key_people": "BayCare: Michael King (Project Manager, hosts weekly calls), Orlando Hayle (Operations Manager — MPF contract escalation target), Deeann Garey-Roy (COO), Minh Le and Vincent Do (Technical Leads), Sung Lee (analyst, eligibility crosswalk answers), Melanie Harvey (Project Portfolio Mgr), Randy McGlothin (Dir of Analytics), Danielle Smith (UAT), Tia Broadnax (Support/CSR), Christina Ramnauth (Pharmacy SME), Anthony Alston (Enterprise PM); 2026 0057 stakeholders being added to PlanHat: Sarah, Adam, Orlando, Tia, Joanna (compliance). 1upHealth: Jodi Patton (AE/sales), Holly Fan (CSM since Oct 2025), Assiatou Diallo (0057 implementation lead), Rachel Schuler (implementation), Maria Baker (implementation mgmt), Trang Derdak (data), Jeremy Yoon / Elizabeth McGowan / Kyle Brew (0057 questionnaire reviewers), Robert Davis \"Robzzz\" (eng), Frank Nostrame (infra), John Lambrecht (contract signer), Stacy Harris (original 2023 implementation), Olivia Cleworth (original sales).",
      "risks_and_blockers": "1) Timeline: Sept 11, 2026 go-live target vs roster Q2 expectation — already a quarter behind, and 0057 only kicked off 6/12. 2) Customer resourcing history: 2023 project nearly went on hold for lack of data/test resources; watch for repeat on 0057. 3) MPF contract execution delayed — blocked 1up from answering BayCare's MPF questions (escalated to Orlando Hayle 6/26); appears to be resolving 7/8 with SOW in DocuSign. 4) Decision debt: opt-in/opt-out portal integration approach for Provider Access and P2P not decided; compliance stakeholder (Joanna) not yet engaged. 5) Open eligibility/enrollment crosswalk gap from Oct 2025 needs a mapping SOW — no evidence it was scoped. 6) Legacy data-quality issues (RX claim field drops, formulary file never delivered per Feb 2024 page).",
      "points_of_interest": "BayCare asked about MPF unprompted on 6/25/2026 (Maria Baker pinged Jodi for SOW status) and calls it a higher priority than 0057 APIs. The 0057 deal was seeded by the former CSM's \"FOMO\" tactic on a Sep 2025 operational call (\"limited spots for a February kickoff\"). SOW was signed 9/9/2025 but booking only closed 12/20/2025 after heavy negotiation. The account channel was originally named #account-bayhealth (renamed 8/25/2023). Full-replace file architecture was a deliberate concession to their small membership and parallel EDW/vendor modernization — that modernization may open clinical-data conversations.",
      "expansion_plays": [
        {
          "play": "Close and land Medicare Plan Finder (MPF)",
          "rationale": "Customer-pulled demand: BayCare flagged MPF as higher near-term priority than 0057 on the 6/26 call; order form already signed and SOW in DocuSign as of 7/8/2026. As a pure Medicare Advantage plan, MPF provider-directory compliance is existential (CMS can suppress their Plan Finder listing). Follow the MMM playbook: MPF gap analysis + remediation services as a follow-on services attach.",
          "fit": "high"
        },
        {
          "play": "Eligibility/enrollment crosswalk mapping SOW (services upsell)",
          "rationale": "Identified and left open since Oct 2025: active/enrollment status requires crosswalk work off COVERAGE PERIOD_END; Trang Derdak stated it requires an additional SOW and Jodi asked to be kept updated. Small, pre-qualified services deal that also fixes a data-quality gap 0057 Provider Access/P2P payloads will inherit.",
          "fit": "high"
        },
        {
          "play": "Provider-directory / data-quality remediation services layered on MPF + Provider Access",
          "rationale": "BayCare's file history (dropped RX fields, formulary never delivered, full-replace files flagged 'we will need to revisit this for the EOBs') plus the Services MPF Gap Analysis playbook make a tailored remediation engagement a natural attach once MPF data starts failing CMS validation — the MMM account shows this pattern generating recurring meeting-level engagement and SOWs.",
          "fit": "medium"
        },
        {
          "play": "Clinical data / popconnect aligned to their EDW-vendor modernization",
          "rationale": "BayCare has been modernizing vendors/EDW since 2023 (the stated reason for full-replace files) and is AWS-native, so an AWS-AWS VPC clinical data exchange is low-friction. However, no direct clinical-data demand signal found in Slack/Confluence, so treat as a discovery conversation after the Sept go-live, not an active play.",
          "fit": "low"
        }
      ],
      "plays_hi": 2,
      "sources": [
        "Slack #account-baycare (C05PCTJ3K2S) — full history 2023-08-25 to 2026-06-25",
        "Slack #account-baycare-implementation-0057-apis (C0B88SK3USG) — full history 2026-06-03 to 2026-06-26, incl. 6/26 call recap by Assiatou Diallo",
        "Slack #arr-services-new-bookings (C01KG7PJEDV) — messages 2023-08-09 (Olivia Cleworth), 2024-12-17, 2025-12-20 (Jodi Patton)",
        "Slack #sows-inflight (C09EE0B2V8A) — 2025-09-09 P2P/Provider Access/ePA SOW signed",
        "Slack Group DM C0BFF9TMLVB (Maria Baker, John Lambrecht, Jodi Patton, Katie Hogan) — 2026-07-08 SOW/order-form DocuSign exchange",
        "Slack thread in #account-baycare 2025-10-10 (eligibility crosswalk, Trang Derdak)",
        "Confluence CKB: Baycare Implementation Details (pageId 187924549, by Stacy Harris)",
        "Confluence CKB: BayCare/1upHealth Weekly Implementation Meeting notes series, Feb-Jul 2024 (e.g. pageIds 364609684, 512950274, 521207857, 706347086)",
        "Confluence APH: Baycare account overview (pageId 321945863)",
        "Confluence DNA: Medicare Plan Finder on FHIR (pageId 2057895938); Services MPF Gap Analysis (pageId 2084732929) — product context"
      ],
      "sf": {
        "arr": 209721.42856799997,
        "cumulative": 637855,
        "product_rev": 524855,
        "services_rev": 113000,
        "health": 9,
        "temperature": null,
        "nps": null,
        "renewal_sentiment": 5,
        "sentiment_notes": null,
        "flags": [
          "ROI in question",
          "Pricing Concern"
        ],
        "renewal": "2028-12-31",
        "contract_exp": "2024-12-31",
        "customer_since": "2023-08-04",
        "go_live": null,
        "impl_level": null,
        "products_sold": null,
        "lobs": "Medicare Advantage",
        "members_contracted": 25000,
        "members_current": 26404,
        "competitors": "Change",
        "pbm": null,
        "owner": "Jodi Patton",
        "csm": "Holly Fan",
        "exec_sponsor": "Nolan Kelly",
        "tier": "Maintain",
        "opps": [
          {
            "name": "BayCare- New Platform",
            "type": "0125f000000iH45AAE",
            "closed": "2023-08-09",
            "arr": null,
            "services": 38000,
            "amount": 83000,
            "months": 16.92,
            "owner": "Olivia Cleworth",
            "won_because": "Superior compliance solution over competitors",
            "competitor": null
          },
          {
            "name": "25-26 BayCare Renewal",
            "type": "Existing Business",
            "closed": "2024-12-17",
            "arr": 46350,
            "services": 0,
            "amount": 46350,
            "months": 11.96,
            "owner": "Jessica Candito",
            "won_because": "2025 Renewal",
            "competitor": null
          },
          {
            "name": "2027 BayCare Renewal + CPI Increase",
            "type": "Existing Business",
            "closed": "2025-12-18",
            "arr": 141650,
            "services": null,
            "amount": 144483,
            "months": 11.96,
            "owner": "Jodi Patton",
            "won_because": "2025 Renewal",
            "competitor": null
          },
          {
            "name": "2026 BayCare Renewal",
            "type": "Existing Business",
            "closed": "2025-12-18",
            "arr": 46350,
            "services": 0,
            "amount": 46350,
            "months": 11.96,
            "owner": "Jodi Patton",
            "won_because": "2025 Renewal",
            "competitor": null
          },
          {
            "name": "25-26 BayCare P2P, Provider Access, ePA",
            "type": "Existing Business",
            "closed": "2025-12-18",
            "arr": 46350,
            "services": 65000,
            "amount": 160300,
            "months": 7,
            "owner": "Jodi Patton",
            "won_because": "2025 Renewal",
            "competitor": null
          },
          {
            "name": "2028 BayCare Renewal + CPI Increase",
            "type": "Existing Business",
            "closed": "2025-12-18",
            "arr": 144483,
            "services": null,
            "amount": 147372,
            "months": 11.99,
            "owner": "Jodi Patton",
            "won_because": "2025 Renewal",
            "competitor": null
          },
          {
            "name": "Baycare - MPF Provider Directory Remediation",
            "type": null,
            "closed": "2026-06-30",
            "arr": null,
            "services": 10000,
            "amount": 10000,
            "months": 12.02,
            "owner": "Jodi Patton",
            "won_because": "MPF",
            "competitor": null
          }
        ]
      }
    },
    {
      "id": 25,
      "name": "Select Health",
      "quarter": "q2",
      "qlabel": "Q2 · Apr–Jun",
      "seg": "commercial",
      "seglabel": "Commercial / Blues",
      "note": "Intermountain · marquee new logo",
      "full": "Select Health (provider-owned payer, subsidiary of Intermountain Health, Utah; ~550,000 members)",
      "dq": "rich",
      "products_and_scope": "Contracted (RFP win, booked 2026-04-08): Patient Access API (CMS-9115 replacement of homegrown build), Payer-to-Payer, Provider Directory, and Provider Access — $657,000 ARR + $78,750 services [#arr-services-new-bookings 4/8/26]. Contracted to load ALL lines of business over the next year (Medicaid, Medicare Advantage, CHIP, QHP/ACA Exchange) — a strategic decision, not mandated [#arr-services-new-bookings 4/8/26; #account-selecthealth-impl 7/7/26]. NOT contracted for ePA — ZeOmega is their ePA/Prior Auth vendor; PA was included in the RFP only to gauge 1up capabilities [#selecthealth-rfp 12/3/25, 1/22/26]. Priority sequencing per customer: 9115/Patient Access first, then 0057 [impl channel 4/29/26]. Exhibit A excludes AllergyIntolerance, DiagnosticReport, RelatedPerson, Delegate; CareTeam added 4/22/26. Moving from an internal build (\"Change HC rip and replace\" $45K ARR + $38K services booking on 2023-08-09 appears in recon extracts but conflicts with 2026 messages calling SH the \"first new payer logo of the year\"/\"new customer\" — likely a different Select Health entity; unverified).",
      "implementation_status": "Active implementation, NOT yet live. Kickoff 2026-04-13; roster says Q2 go-live but evidence shows Q2 was kickoff/build — data delivery schedule runs into Aug 2026 (Patient/Coverage delivered 6/1, confirmed ~6/13; Clinical confirmed ~6/26; EOBs deliver 6/24, confirm 7/9; Provider Directory deliver 7/6, confirm 7/24; Formulary deliver 7/27, confirm 8/15; Personal Rep/Sensitive Data Tagging confirm 8/25) [impl channel 6/2/26]. As of 7/8/26: Patient, Coverage, CarinBB Coverage, and US Core clinical files (BP, Immunization, BMI, Smoking Status, Lab) ingested to stage and verified in Postman (6/16–6/26); EOB files in iterative feedback loop (EOB Pharmacy/Oral in progress; Care Plan/Care Team and CarinBB Practitioner/Org next); 1up Console set up for Prod and UAT; public endpoint config (single URL for all LOBs at api.selecthealthfhir.com) being finalized 7/8. UAT data readiness report and member cohort testing are next steps. Customer reports 1up is \"the best vendor we've ever worked with\" (Kris Turpin, 6/22) [#shout-outs 6/22/26]. Likely go-live H2 2026 ahead of the CMS-0057 Jan 2027 deadline (inference).",
      "tech_architecture": "Claims engine: TriZetto Facets, heavily customized, with 5-6 primary internal source systems and poor data dictionaries [impl channel 4/13/26 pre-kickoff notes]. Prior internal 9115 build was being migrated from on-prem to Azure Health Data Services with a facade API — abandoned in favor of 1up SaaS [#selecthealth-rfp 11/21/25, Anton]. New EOB source system with migrated historical data [impl 6/2/26]. Integration: Select Health hosts a single SFTP server (IP 4.246.74.97/32) with /DEV /TEST /PROD partitions; 1up pulls via NiFi from STE envs 1up-selecthealth-test and 1up-selecthealth-prod; PGP file encryption; flat files per 1up Extract Guides (flexible ingest) [Confluence CKB \"Select Health Ongoing File Table & Data Integration Details\"; impl 5/5–5/19/26]. Single client ID/single FHIR endpoint for all LOBs with a lineofbusiness column in header files (MA/CHIP/ME/QHP); endpoints selecthealthfhir.com (prod) and selecthealthfhirstage.com (stage); single auth experience across LOBs [impl 5/28, 6/9, 7/8/26]. IDP: Ping for member portal; console SSO via Intermountain (SCTASK1412306, Ben at Intermountain) [#2026-0057 5/6/26; impl 6/11, 7/7/26]. Split P2P opt-in model requested: 1up manages Medicare population opt-ins while the state of Utah collects Medicaid opt-ins and sends a file — Maria confirmed 6/23 that 1up can accept Medicaid opt-outs by file + 1upManaged for Medicare [impl 6/23/26; #2026-0057 6/17/26]. Security review ran through Censinet portal [#selecthealth-rfp 1/30/26].",
      "financial_signals": "$657,000 ARR + $78,750 Services booked 2026-04-08 (Patient Access, P2P, Provider Directory, Provider Access; all LOBs) — first new payer logo of 2026, \"almost 700k\" [#arr-services-new-bookings 4/8/26; #shout-outs 5/1/26]. Sales TCO analysis positioned $1,940,204/yr savings vs internal build (8-16 FTEs avoided) [#sales-team 1/5/26]. Membership ~550,000, used for MSA record-volume sizing [#team-customer-operations 3/19/26]. Recon extract shows a 2023-08-09 booking ($45,000 ARR + $38,000 services, Change Healthcare rip-and-replace) attributed to this alias — could not verify; likely a different entity given 2026 \"new customer\" language.",
      "key_people": "Select Health: Davis Phillips (PM, main day-to-day contact), David Pham (technical/data lead, builds extract files), Kris Turpin (Business Analyst), Erica Smith, Devin Paulsen (SFTP/infra), Roger Hill, Bhimasankar Potturi, Bhupendra Devlekar, Sindhu Ramesh Bharathi (all on Help Center invite list 6/17), Ryan (architect, pro-API), Rebecca Welling (analytics stakeholder, quoted Jan 2026 on consolidating vendor analytics feeds), Andrew Sorenson (Chief Analytics Officer, exec decision audience), Ben (Intermountain, SSO/member auth). 1upHealth: Lindsay Parker (AE, sourced/closed the deal), Stacy Harris (Implementation Manager), Whitney (Data Implementation Engineer), Robert Davis \"Robzzz\" (implementation/services lead), Maria Baker (Services/PM), Anton Pederson (Solutions Architect), Nolan Kelly (sales leadership), Irtiza Mahmud + Geetika Arora (Support/console), Gurdeep Singh (Cloud Ops), Jack Filiault (Help Center), Mike Perillo (security), Leslie Barthel (win-debrief 7/16).",
      "risks_and_blockers": "1) Timeline pressure: file confirmations run through 8/25/26 (Formulary, sensitive-data tagging) leaving a compressed runway to the Jan 2027 0057 deadline; roster \"Q2 go-live\" is not accurate — nothing is live yet. 2) Split P2P opt-in model (1up-managed Medicare + Utah state Medicaid opt-in file) raised as a Product feasibility question 6/17/26 — partially resolved (opt-out file + 1upManaged confirmed 6/23) but the state-file workflow is novel. 3) EOB data from a new source system still being stabilized (capitalization, missing billing providers; Pharmacy/Oral EOBs in progress as of 7/8). 4) Console/SSO setup with Intermountain required support escalation (OPSREQ-10379 urgency ping 6/25). 5) Dual-eligibility/multi-LOB member handling under single client ID was an open design question (dual policies doc shared 6/10). 6) During contracting, SH flagged SOW ambiguity on opt-in/opt-out responsibilities and provider attribution [#selecthealth-rfp 3/17/26]. 7) Scope creep watch: customer suggested wholesale sending of unmapped data; Robzzz pushed back 5/21/26. No open escalations; relationship is very strong.",
      "points_of_interest": "Marquee competitive win: displaced an internal build (Azure HDS migration abandoned) via formal RFP; win-debrief with the customer scheduled 7/16/26 [#sales-marketing 7/6/26]. Customer NPS signal is exceptional (\"best vendor we've ever worked with\" — twice, 6/22). Select Health used what looked like a copy of 1up's own RFP template. Intermountain (parent) currently handles 3rd-party app vetting and wants to offload it — was a demo talking point. SH already emailed about an MPF endpoint (7/7/26) — they have an MA LOB and their internal Provider Directory did not cover Medicare Advantage. The Whitney/Select Health flexible-ingest POC is being reused as the pattern for the JAI account [Confluence 2026 Roundtable Agenda].",
      "expansion_plays": [
        {
          "play": "ePA / Prior Auth add-on (alongside or displacing ZeOmega)",
          "rationale": "SH is not contracted for ePA (ZeOmega holds it) but included PA in the RFP 'because they are interested in our capabilities' and on 6/18/26 proactively asked to meet about digitization of medical policies — Lindsay Parker already proposed opening an upsell opportunity with Jodi Patton. All the FHIR member/claims data ePA needs will already be flowing through 1up.",
          "fit": "high"
        },
        {
          "play": "Medicare Plan Finder (MPF)",
          "rationale": "SH has a Medicare Advantage LOB, is implementing Provider Directory with 1up now, and emailed Stacy on 7/7/26 asking about the endpoint for MPF; their internal Provider Directory did not include Medicare Advantage. Low-lift attach on top of the Provider Directory work already in flight — MPF services contracts are 'flowing in weekly' company-wide.",
          "fit": "high"
        },
        {
          "play": "Analytics / popconnect-clinical data consolidation on the FHIR store",
          "rationale": "Rebecca Welling (Jan 2026): 'We have so many different vendors running different types of analytics... somehow we've got to link all this together so we're not sending duplicate files out to these other vendors that's already going to be in this environment.' Demo audience included the Chief Analytics Officer and SH ranked Advanced Analytics & AI/ML and dashboards as demo priorities. All LOBs' claims + clinical data will be centralized in 1up by end of 2026 — natural platform-expansion pitch, plus offloading Intermountain's 3rd-party app vetting burden.",
          "fit": "medium"
        }
      ],
      "plays_hi": 2,
      "sources": [
        "Slack #account-selecthealth-implementation-patient-access-provider-access-p2p (C0ASE6787TP), full history 2026-04-13 to 2026-07-08 read",
        "Slack #selecthealth-rfp (C09UMA68EKE), full history 2025-11-21 to 2026-04-02 read",
        "Slack #arr-services-new-bookings (C01KG7PJEDV) 2026-04-08 booking post and 2026-06-24 ZeOmega narrative reply",
        "Slack #shout-outs (C01ES2JGZ7Y) 2026-05-01 and 2026-06-22",
        "Slack #sales-team (G01MM5KUS9K) 2026-01-05 TCO analysis, 2026-01-20 exec summary",
        "Slack #sales-marketing (C08S2H50TB6) 2026-07-06 win-debrief",
        "Slack #2026-0057-access-api--readiness (C0A36DHR84R) 2026-05-06/05-08/05-12/05-22 and 2026-06-17 split opt-in",
        "Slack #team-customer-operations (C07FVGHLB9T) 2026-03-19 membership count",
        "Slack #customer-marketing (C08NJV39DS7) 2026-04-08 Rebecca Welling quote",
        "Slack group DM Lindsay Parker/Jodi Patton/Jeremy Yoon 2026-06-18 ePA upsell",
        "Confluence CKB: Select Health Ongoing File Table & Data Integration Details (page 2289041413)",
        "Confluence Services: 2026 Roundtable Agenda (page 1201635330)",
        "Cross-account recon extracts provided by orchestrator (2026-07-08)"
      ],
      "sf": {
        "arr": 219000,
        "cumulative": 736500,
        "product_rev": 657000,
        "services_rev": 79500,
        "health": null,
        "temperature": null,
        "nps": null,
        "renewal_sentiment": null,
        "sentiment_notes": null,
        "flags": [
          "Known churn"
        ],
        "renewal": "2029-04-02",
        "contract_exp": null,
        "customer_since": "2026-04-03",
        "go_live": null,
        "impl_level": null,
        "products_sold": null,
        "lobs": null,
        "members_contracted": null,
        "members_current": 1000000,
        "competitors": null,
        "pbm": null,
        "owner": "Lindsay Parker",
        "csm": "Geetika Arora",
        "exec_sponsor": "Stephanie Iheme",
        "tier": null,
        "opps": [
          {
            "name": "SelectHealth_Access APIs only_all LOBs",
            "type": null,
            "closed": "2026-04-03",
            "arr": null,
            "services": 79500,
            "amount": 736500,
            "months": 35.98,
            "owner": "Lindsay Parker",
            "won_because": "Reg expertise",
            "competitor": null
          }
        ]
      }
    },
    {
      "id": 26,
      "name": "Maryland Care (MPC)",
      "quarter": "q2",
      "qlabel": "Q2 · Apr–Jun",
      "seg": "medicaid",
      "seglabel": "Medicaid MCO / CCO",
      "note": "Evolent-administered",
      "full": "Maryland Care Inc (MPC / Maryland Physicians Care)",
      "dq": "rich",
      "products_and_scope": "Original deal (kickoff Jan 2022): CMS-9115 platform for up to 400k lives (~230k active Medicaid lives at signing), Patient Access API, Provider Directory, P2P send + R&I [#account-mpc 2021-12-21 overview]. Renewal Dec 2022: platform + patient access/provider directory, $302,400 [#arr-services-new-bookings 2022-12-12]. CMS-0057 upsell (SOW signed ~Nov 2025): Provider Access + ePA, plus Payer-to-Payer and Patient Access Prior Auth EOB — 4 workstreams: ePA (led separately by Rachel Schuler), Provider Access, P2P, Patient Access PA EOB. MPC must build 4 extracts: Prior Auth EOB, Provider Access member attribution, Provider Access opt-in/opt-out, P2P opt-in [Confluence 06/29/2026 kickoff page 2453373109; #sows-inflight 2025-11-05].",
      "implementation_status": "Roster says Q2 (Apr-Jun) go-live; 0057 kickoff completed 5/29/2026 (\"one of the smoothest\", Evolent on the call; questionnaires returned 4/6, May commencement) [#2026-0057-access-api--readiness], but delivery runs into Q3: ePA discovery 6/17/2026, PA/P2P/Patient Access kickoff 6/29/2026, formal kickoff confirmed July 10, weekly calls running (July 6 recap posted 7/7). Placeholder project end date September 4, 2026 (6-week concurrent implementation). Milestones: Provider Access opt-out file targeted July 17, Prior Auth EOB extract July 24. Real Maryland state 834 test data not available until fall — MPC engineering mocking data in interim. CMS-9115 platform (Patient Access, EOB, formulary) live in production since 2022.",
      "tech_architecture": "Medicaid-only MCO (Maryland HealthChoice) owned by Ascension Saint Agnes, Holy Cross Health, Meritus Health, UPMC Western Maryland; financially managed by MCMI (Maryland Care Management Inc — the decision-maker). Evolent is TPA/delegated UM vendor and runs operations: handles all authorizations except oncology (Eviti recommendation tool; Evolent staff build auths in Evolent's Identifi system), owns multiple UM subsystems (RadMD etc.) with a single front door and internal routing; Evolent is building the FHIR ePA APIs (CRD/DTR/PAS) and prefers to host CRD for Evolent-managed orders; Evolent has no EHR connectivity today [Confluence \"Maryland Physicians Care (MPC)\" page 1708818433; 06/17/2026 ePA discovery page]. Data flows: Evolent sends medical data (JSON), MCMI sends rx/vision/dental/historical medical; flat-file SFTP/S3 ingest (s3://1up-mpc-prod-data-ingest) processed via NiFi with DIMA mappings; custom Patient Delete flow built April 2025 (RedZone) [#account-mpc; Confluence 1173815329]. Member auth is portal-less; MPC uses the 1up Auth + System Search iFrame / Health History patient-mediated model [Confluence 396427351]. Consent for 0057: State of Maryland captures member consent via the 834 file and passes flags to MPC (P2P default opt-out, Provider Access default opt-in); fully customer/state-managed, no 1up-managed opt collection. Former Change Healthcare client. Tenant id: mpc.",
      "financial_signals": "Dec 2022 renewal: $302,400 (platform + patient access/provider directory) [#arr-services-new-bookings 2022-12-12]. Dec 2025 0057 upsell (Provider Access + ePA): +$190,000 ARR + $65,000 Services + $48,737 CPI [#arr-services-new-bookings 2025-12-08]. Provider Access & ePA Implementation SOW signed [#sows-inflight 2025-11-05]. Member counts (Sept 2023): 175,061 active / 413,932 total, contract allows reducing lives as Medicaid redeterminations shrink enrollment [#account-mpc 2023-09-26].",
      "key_people": "Customer: Jeff Lazar (CIO, MPC/MCMI — main POC, raises compliance/legal questions), Andrea Day (Director of Data, MPC — data side, PlanHat access), Mary Leitch (MPC, on ePA discovery). Evolent (TPA/UM partner): Kevin Lowe (main Evolent POC, routes extract guidance to Evolent data team), Jake Haunty (Sr Director EPMO), Aishah Rajab (Evolent Interop API Product Manager), Jessamyn Nilan-Axline, Charlene Hynan-Smith, S Polley. 1upHealth: Assiatou Diallo (Implementation Manager, PA/P2P/Patient Access), Rachel Schuler (ePA implementation lead), Maria Baker, Jeremy Yoon (solutions/compliance, ePA), Kyle Brew (P2P product owner, joining 7/20 deep-dive), Chad Clough (data engineering), Holly Fan (CSM), Robert Davis (support/pipelines). Historical: Stacy Harris (original IM), Arnav Agarwal (original CSM).",
      "risks_and_blockers": "1) State dependency: Maryland Medicaid owns member consent capture (834 file) and consent language for P2P/Provider Access; real state 834 test data not available until fall 2026 — mocked data in interim; MPC must confirm whether state supplies member/provider-facing language [7/6 and 6/29 call recaps]. 2) HIPAA/consent liability concern: Jeff Lazar flagged risk in trusting other payers' consent attestation on inbound P2P requests; 1up compliance follow-up open [6/29 kickoff]. 3) Eviti oncology workflow scope unresolved — Evolent compliance to rule whether it's in scope for ePA; UM routing logic needed from MPC if multiple systems [6/17 ePA discovery]. 4) Timeline: Sept 4 placeholder end date vs roster Q2 go-live expectation — likely slipping to Q3. 5) Open P2P technical questions (where API response data lands, whether opt-in auto-triggers the call, one-time vs recurring). 6) Medicaid redetermination enrollment shrinkage pressures platform-lives pricing (contract allows reducing lives). 7) Heavy dependency on Evolent for ePA build (CRD hosting, FHIR APIs) — third-party delivery risk.",
      "points_of_interest": "Evolent referred 1up into MPC originally (Empower and Cook) and is now a strategic channel: Jake Haunty noted 1upHealth is the selected 0057 vendor for at least 7 Evolent clients (Blue Shield of CA, BCBS Tennessee, Capital Blue Cross, CCOK, CountyCare, MPC) and wants to organize Evolent's 2026 testing/deployment schedule around 1up [group DM, 2026-01-08]. Gap analysis (Nov 2025) found no major red flags because MPC has no clinical data — a notable product gap. MPC was a former Change Healthcare client. Custom work history: Patient Delete pipeline (RedZone, ~20 hrs, delivered Apr 2025), FlexPa EOB insurer-mapping RedZone (June 2025).",
      "expansion_plays": [
        {
          "play": "Clinical data acquisition / popconnect",
          "rationale": "Holly Fan's Nov 2025 gap analysis explicitly noted MPC has no clinical data. As a Medicaid MCO with four health-system owners (Ascension, Holy Cross, Meritus, UPMC Western MD) there is a natural provider-connectivity path; clinical data would strengthen HEDIS/quality reporting and future P2P payloads beyond claims.",
          "fit": "high"
        },
        {
          "play": "Quality/risk analytics (HDE) on the FHIR data already flowing",
          "rationale": "MPC already ships medical, rx, vision, dental claims plus new prior-auth EOB, attribution, and consent extracts into 1up's FHIR store. Layering HEDIS/quality and utilization analytics on that pipeline monetizes existing data with minimal new lift, and Jeff Lazar (CIO) is engaged and data-oriented.",
          "fit": "medium"
        },
        {
          "play": "Evolent channel replication of the MPC ePA pattern",
          "rationale": "Evolent hosts CRD and builds FHIR ePA APIs for MPC and named 1up as vendor at 7+ mutual clients; productizing the MPC integration pattern (Evolent CRD + 1up PAS/DTR) shortens sales and delivery cycles at the other Evolent-delegated plans. Not an MPC upsell per se but the highest-leverage growth motion from this account.",
          "fit": "high"
        }
      ],
      "plays_hi": 2,
      "sources": [
        "Slack #account-mpc (C02RK5SFP8B) — full history 2021-12 to 2026-07",
        "Slack #account-mpc-implementation-0057-apis (C0B7UNSJCG0) — 2026-05-29 kickoff prep",
        "Slack #account-mpc-implementation-0057-provider-access-patient-access-p2p (C0BFTRZFG7L) — June 29 and July 6 call recaps",
        "Slack group DM C0A76AD9VGX — 2026-01-08 Evolent partnership note (Juliette Steinkrauss)",
        "Slack #arr-services-new-bookings — 2022-12-12 and 2025-12-08 booking extracts (recon)",
        "Slack #sows-inflight — 2025-11-05 SOW signed (recon)",
        "Slack #2026-0057-access-api--readiness — 2026-04-06 and 2026-05-29 (recon)",
        "Confluence: Maryland Physicians Care (MPC), Compliance space, page 1708818433",
        "Confluence: 06/29/2026 Provider Access, Payer to Payer, Patient Access Weekly Implementation Call, page 2453373109",
        "Confluence: 06/17/2026 MPC / 1upHealth ePA Discovery Call, page 2420113444",
        "Confluence: 07/06/2026 Weekly Implementation Call, page 2479423506",
        "Confluence: April 2025 Maryland Care Patient Delete, page 1173815329",
        "Confluence: June 2025 RedZone - MPC FlexPa, page 1415938069",
        "Confluence: [UM] Evolent, page 1762033681",
        "Confluence: Patient Mediated Options and Risks, page 396427351"
      ],
      "sf": {
        "arr": 936352.7691600001,
        "cumulative": 2924602,
        "product_rev": 2457202,
        "services_rev": 165000,
        "health": 10,
        "temperature": null,
        "nps": null,
        "renewal_sentiment": 4,
        "sentiment_notes": null,
        "flags": [
          "ROI in question"
        ],
        "renewal": "2026-12-16",
        "contract_exp": "2024-12-16",
        "customer_since": "2021-12-17",
        "go_live": "2022-07-05",
        "impl_level": "Level V",
        "products_sold": "Patient Access;Provider Directory;Payer to Payer Send;Request and Ingest",
        "lobs": "Medicaid",
        "members_contracted": 400000,
        "members_current": 363410,
        "competitors": null,
        "pbm": null,
        "owner": "Jodi Patton",
        "csm": "Holly Fan",
        "exec_sponsor": "Stephanie Iheme",
        "tier": "Maintain",
        "opps": [
          {
            "name": "Maryland Physicians Care (MPC) - New Deal",
            "type": "0125f000000iH45AAE",
            "closed": "2021-12-20",
            "arr": null,
            "services": 100000,
            "amount": 402400,
            "months": 11.96,
            "owner": "Ariana Zamora",
            "won_because": null,
            "competitor": null
          },
          {
            "name": "RENEWAL - Maryland Physicians Care (MPC) - New Deal",
            "type": "0125f000000iHVSAA2",
            "closed": "2022-12-13",
            "arr": null,
            "services": 0,
            "amount": 302400,
            "months": 11.96,
            "owner": "Ariana Zamora",
            "won_because": null,
            "competitor": null
          },
          {
            "name": "RENEWAL: Maryland Physicians Care (MPC) - Patient Access & P2P",
            "type": "0125f000000iHVSAA2",
            "closed": "2023-12-18",
            "arr": null,
            "services": 0,
            "amount": 302400,
            "months": 11.99,
            "owner": "Ariana Zamora",
            "won_because": "Renewal",
            "competitor": null
          },
          {
            "name": "Maryland Physicians Care - Renewal 2024",
            "type": "0125f000000iHVSAA2",
            "closed": "2024-12-10",
            "arr": 302400,
            "services": 0,
            "amount": 302400,
            "months": 11.96,
            "owner": "Drew Arnold",
            "won_because": "Good relationship and service offering",
            "competitor": null
          },
          {
            "name": "25-28 Maryland Physicians Care - Provider Access, ePA",
            "type": "0125f000000iHVSAA2",
            "closed": "2025-12-08",
            "arr": 302400,
            "services": 65000,
            "amount": 255000,
            "months": 11.96,
            "owner": "Jodi Patton",
            "won_because": "Good relationship and service offering",
            "competitor": null
          },
          {
            "name": "25-26 Maryland Physicians Care - w/ CPI Increase",
            "type": "0125f000000iHVSAA2",
            "closed": "2025-12-08",
            "arr": 302400,
            "services": 0,
            "amount": 311472,
            "months": 11.96,
            "owner": "Jodi Patton",
            "won_because": "Good relationship and service offering",
            "competitor": null
          },
          {
            "name": "26-27  Maryland Physicians Care - w/ CPI Increase",
            "type": "0125f000000iHVSAA2",
            "closed": "2025-12-08",
            "arr": 492400,
            "services": null,
            "amount": 516517,
            "months": 24.02,
            "owner": "Jodi Patton",
            "won_because": "Good relationship and service offering",
            "competitor": null
          },
          {
            "name": "27-28 Maryland Physicians Care Renewal - w/ CPI Increase",
            "type": "0125f000000iHVSAA2",
            "closed": "2025-12-08",
            "arr": 516516,
            "services": null,
            "amount": 532013,
            "months": 36.01,
            "owner": "Jodi Patton",
            "won_because": "Good relationship and service offering",
            "competitor": null
          }
        ]
      }
    },
    {
      "id": 27,
      "name": "Alliant Health Plans",
      "quarter": "q2",
      "qlabel": "Q2 · Apr–Jun",
      "seg": "commercial",
      "seglabel": "Commercial / Blues",
      "note": "",
      "full": "Alliant Health Plans",
      "dq": "rich",
      "products_and_scope": "Phase 1 (booked 2023-09-29): $99,975 ARR + $50,000 Services - platform, Patient Access (CMS-9115), Provider Directory, up to 50k patients; Change Healthcare rip-and-replace won via Health Plan Alliance referral [#arr-services-new-bookings]. Formulary was originally in scope but Alliant paused then dropped it due to their PBM's data limitations, wanting to revisit in 2025 [#account-alliant, Rachel Schuler]. Capacity upsell (booked 2024-09-12) to $29,025 ARR increment (prorated $62,248) after historical load hit 69,718 patients vs 50k scoped [#account-alliant 2024-06-14]. Phase 2 (booked 2025-12-07): CMS-0057 upsell - Payer-to-Payer, Provider Access, ePA plus Patient Access Prior Auth EOB: $95,000 ARR + $112,500 ARR 0057 + $45,000 Services; exchange plan [#arr-services-new-bookings]. 0057 SOW fully executed early April 2026 with 160 services hours [#account-alliant 2026-04-02 executed SOW PDF posted; group DM 2026-06-17 \"Alliant 0057 was signed in April\"]. 0057 scope: Tennessee EPO product only (~3,000 members); Georgia members excluded (state-based exchange, FFE rule does not apply) [#account-alliant-implementation-0057-apis kickoff recap 2026-05-08].",
      "implementation_status": "Roster says Q2 (Apr-Jun) go-live; actual: CMS-0057 kicked off week of 5/4/2026 (first kickoff without Product team), commencement June 2026, weekly Monday 4pm calls run by IM Assiatou Diallo. APIs are already deployed (\"Can we deploy their APIs\" - \"we did\", group DM 2026-06-29) and Alliant has already paid (DM 2026-06-30). However, on the 6/22/2026 call Alliant put ALL Provider Access / Payer-to-Payer / Patient Access Prior Auth EOB file work ON HOLD until October 5, 2026 - a major Q3 third-party implementation (eligibility/billing + open enrollment) takes priority. Scott Millsap committed to Oct 5 start with 8 continuous weeks of file development (member attribution, opt-in, opt-out, prior auth EOB files); Sept 14 full-group readiness check-in [#account-alliant-implementation-0057-apis 2026-06-24 recap]. Maria Baker is issuing a $0 change order timeboxing Oct-Dec, no re-engagement fee, but 1up messaging is explicit: no guarantee of 1/1/2027 go-live (group DM Maria Baker/Jodi Patton/Stephanie Iheme, 2026-06-29/30). ePA continues during the pause: vendor-to-vendor kickoff with Gainwell/ASED held ~6/22; ASED upgrading v4.15 to v4.17 for ePA components (Ken leading); ASED test endpoints expected early August; ePA technical kickoff confirmed July 6, 2026. Decisions made: Alliant will manage opt-in/opt-out tracking internally, NOT using 1upHealth's configurable UI (6/22). Separately, STE-to-MTE platform migration validation was in progress Feb 2026 [Micky Johnston, #account-alliant 2026-02-04].",
      "tech_architecture": "Small exchange plan (GA/TN individual market). Core 0057 architecture: Alliant wants to act as its own middleware/proxy between 1upHealth and its vendors to avoid vendor-to-vendor dependencies (Scott Millsap's design) [kickoff recap 2026-05-08]. UM system: Gainwell asset (ASED) with InterQual criteria; InterQual criteria already housed in ASED via transparency product; exploring InterQual exchange for DTR questionnaires; open question whether FHIR endpoints or X12 exchange can be stood up in time for proxy architecture [6/24 recap]. Provider-network EHRs: Epic, athenahealth, eClinicalWorks, Cerner; Veradigm identified as ePA overlap vendor [#epa-adoption-growth 2026-05-21, 2026-06-09]. Identity: Alliant member ID vs DVK person ID vs 1upHealth FHIR ID was a blocker; resolved - Alliant uses unique_member_id as the FHIR Patient resource ID (Tania Gregory, 6/25). Attribution: EPO with no PCP assignment; deriving attribution from existing risk adjustment/quality algorithms (most-visited-provider logic). Clinical data stored in CCDAs, currently mapped to DIMA specs for Observation, Immunization, AllergyIntolerance; expressed interest in 1up's CCDA-to-FHIR product (Nov 2023). 1up side: NiFi ingestion pipeline (OneUpAdminServiceRecordProcessor), RDS; single-tenant STE migrating to MTE; tenant keys alliant-health-plans / allianth; UAT comm and pubpart partitions created June 2026 [#provider-access-implementation-party 2026-06-11]. Known data-quality issue: broken references in STE (AllergyIntolerance, Coverage, EOB pointing to nonexistent Patient resources) [#account-alliant 2026-02-04].",
      "financial_signals": "2023-09-29: $99,975 ARR + $50,000 Services (platform, Patient Access, Provider Directory, 50k patients). 2024-09-12: capacity upsell to $29,025 ARR (prorated difference $62,248 from previous renewal year). 2025-12-07: 0057 upsell (P2P, Provider Access, ePA) $95,000 ARR + $112,500 ARR for 0057 + $45,000 Services. 0057 SOW (160 hours) signed April 2026; already paid as of June 2026. Pending: $0 change order timeboxing the paused 0057 work Oct-Dec 2026, with language that overruns may incur costs; 1up waiving re-engagement fee [group DM 2026-06-29/30]. All from #arr-services-new-bookings and Maria Baker/Jodi Patton/Stephanie Iheme group DM.",
      "key_people": "Customer: Scott Millsap (Development & Security, formerly Interface Manager - key technical lead and decision-maker on pause/restart), Stephanie Belue (Director, Quality Assurance & Privacy - drives opt-in/opt-out and attribution decisions), Dave Zhang (CIO/VP of IT), Phil Fehlinger (Director, Risk Adjustment & Data Engineering - owns attribution file), Justin Vos (Developer), James Troyer (Director, Medical Management - ePA), Ken Cash (ASED upgrade lead), Michelle Skelly (Director, Marketing & Communications - member education), Erin Malone (Sr Director, Client & Provider Services), Celeste Richards (COO, active in 2023-24 phase). 1upHealth: Assiatou (Assi) Diallo (Implementation Manager, 0057), Maria Baker (Sr Director Implementation), Rachel Schuler (CSM; now driving ePA discovery), Jodi Patton (contracts/SOW), Stephanie Iheme (services leadership), Tania Gregory (data/Patient Access), Jeremy Yoon (ePA engineering), Kyle Brew (product/regulatory - confirmed Medicaid-to-Marketplace P2P in scope), Elizabeth McGowan (attribution guidance), Geetika Arora, Holly Fan (UAT), Bobby Fredrickson and Olivia Cleworth (original 2023 sale).",
      "risks_and_blockers": "1) Schedule risk (top): all 0057 file work paused June-Oct 5, 2026 for Alliant's Q3 eligibility/billing + open enrollment project; 8-week dev window starting Oct 5 lands project close right at the 1/1/2027 compliance deadline; 1up explicitly will not guarantee 1/1/27 go-live and wants that in a signed change order [6/24 recap; group DM 6/29-6/30]. 2) Member attribution: TN EPO assigns no PCPs, so attribution must be derived from risk-adjustment/quality claims logic - novel among 1up customers (no other customer had raised this per Elizabeth McGowan) [#2026-0057-access-api--readiness 5/6]. 3) Resource constraints: \"good customer... just small and resource strapped\" (Jodi Patton, DM 6/30); Scott slow to respond - Rachel sent 3 unanswered emails trying to book the ePA discovery call (5/28). 4) ePA dependency chain: ASED v4.15-to-v4.17 upgrade, test endpoints not expected until early August, FHIR-vs-X12 proxy question unresolved. 5) Data quality: broken Patient references in legacy STE; Sept 2025 ingestion stalled 16 days (SUP-335, NiFi processor stuck); patient count reconciliation question open before loading remaining historical data (Stephanie Iheme DM 5/6/2026). 6) Open compliance question whether self-funded plans are excluded from 0057 (from readiness channel recon).",
      "points_of_interest": "First CMS-0057 kickoff 1up ran without the Product team. Alliant asked to be connected with other 1up customers facing the no-PCP attribution problem, which sparked an internal idea (Maria Baker) for a customer user group; Geetika/Holly explored connecting them with THP. Alliant chose NOT to use 1upHealth's configurable opt-in/opt-out UI - managing tracking internally (lost product surface area but simpler implementation). Alliant serves as its own vendor middleware/proxy - unusual pattern that reduces 1up's vendor-to-vendor coordination burden. Original 2023 deal was a Change Healthcare rip-and-replace via Health Plan Alliance referral - referenceable win pattern. Only ~3,000 members in 0057 scope (TN), one of 1up's smallest 0057 implementations, yet paying ~$207K+ ARR post-upsell. Georgia members excluded from FFE rule via state-based exchange (Georgia Access).",
      "expansion_plays": [
        {
          "play": "CCDA-to-FHIR / clinical data (HDE)",
          "rationale": "Alliant itself asked for an overview and quote of 1up's CCDA-to-FHIR utility in Nov 2023 (clinical data is stored in CCDAs, currently only mapped to DIMA specs for Observation/Immunization/AllergyIntolerance) - a warm, previously-expressed need that was never closed; also cleans up the clinical-data pipeline they need anyway for P2P/Provider Access payloads.",
          "fit": "high"
        },
        {
          "play": "Risk adjustment / quality analytics on FHIR data (popconnect)",
          "rationale": "Phil Fehlinger is Director of Risk Adjustment & Data Engineering and Alliant is already building most-visited-provider attribution from risk/quality algorithms; 1up already holds their claims+clinical FHIR data, so an analytics/popconnect layer (attribution, risk capture, quality measures) maps directly to an existing named buyer and existing internal workload.",
          "fit": "medium"
        },
        {
          "play": "Formulary re-engagement plus Georgia scope expansion",
          "rationale": "Formulary was dropped in 2024 only because of the incumbent PBM's data limitations and Alliant explicitly wanted to revisit; separately Georgia members (the bulk of membership) are excluded from the current 0057 scope only because Georgia runs a state-based exchange - if Georgia Access adopts 0057-like requirements or Alliant wants parity, extending P2P/Provider Access/ePA to GA members is a natural scope upsell. Timing: after the Oct-Dec 2026 crunch, i.e. 2027.",
          "fit": "medium"
        }
      ],
      "plays_hi": 1,
      "sources": [
        "#account-alliant (C05U4QF8TD5) - full channel history 2023-09 to 2026-04",
        "#account-alliant-implementation-0057-apis (C0B2BL2ML0N) - full channel history incl. 5/4 kickoff recap (2026-05-08), 6/1, 6/8, 6/22 call recaps",
        "Thread C0B2BL2ML0N/1782342967.146989 (June 22 recap + Tania Gregory unique_member_id reply)",
        "Thread C0B2BL2ML0N/1778280453.329619 (kickoff recap + Elizabeth McGowan attribution reply)",
        "Group DM C05K0FQFN1F (Maria Baker/Jodi Patton/Stephanie Iheme) 2026-06-17 to 2026-06-30 - SOW, pause, change order, re-engagement terms",
        "#2026-0057-access-api--readiness (C0A36DHR84R) 2026-05-06 thread - attribution, customer user group idea",
        "#epa-adoption-growth (C0AK3790E3C) 2026-05-21 and 2026-06-09 - Veradigm mutual-customer overlap",
        "#provider-access-implementation-party (C0AUHFZ8PAR) 2026-06-11 - UAT partition creation (allianth)",
        "#arr-services-new-bookings extracts 2023-09-29, 2024-09-12, 2025-12-07 (provided recon)",
        "#sows-inflight 2026-01-06 extract (provided recon)",
        "Confluence CKB space: '06/08 - 0057 Provider Access, Payer-to-Payer, Patient Access Prior Auth EOB' (pageId 2393931790, read in full) plus weekly implementation call series 11/2023-07/2024 and 05/18, 06/02 2026 pages (search results)",
        "Jira: SUP-335 (Alliant data ingest fix, Sep 2025)"
      ],
      "sf": {
        "arr": 132500.00000400003,
        "cumulative": 754698,
        "product_rev": 659698,
        "services_rev": 95000,
        "health": 10,
        "temperature": null,
        "nps": null,
        "renewal_sentiment": 5,
        "sentiment_notes": null,
        "flags": [
          "Relationship Concern"
        ],
        "renewal": "2028-12-31",
        "contract_exp": "2024-09-28",
        "customer_since": "2023-09-29",
        "go_live": null,
        "impl_level": null,
        "products_sold": null,
        "lobs": "Exchange",
        "members_contracted": 60000,
        "members_current": 67122,
        "competitors": "Change",
        "pbm": null,
        "owner": "Jodi Patton",
        "csm": "Geetika Arora",
        "exec_sponsor": "Jodi Patton",
        "tier": "Maintain",
        "opps": [
          {
            "name": "Alliant Health Plan- New Platform",
            "type": "0125f000000iH45AAE",
            "closed": "2023-09-29",
            "arr": null,
            "services": 50000,
            "amount": 149975,
            "months": 11.99,
            "owner": "Olivia Cleworth",
            "won_because": "Ease of implementation, time to Go Live, industry expertise, existing HPA relationship",
            "competitor": null
          },
          {
            "name": "Alliant - Upsell (Capacity Increase & Expired HPA discount)",
            "type": null,
            "closed": "2024-09-12",
            "arr": null,
            "services": 0,
            "amount": 62248,
            "months": 15.05,
            "owner": "Jessica Candito",
            "won_because": "2024-2025 Renewal",
            "competitor": null
          },
          {
            "name": "Renewal 2024: Alliant Health Plan",
            "type": null,
            "closed": "2024-09-12",
            "arr": null,
            "services": 0,
            "amount": 99975,
            "months": 15.05,
            "owner": "Jessica Candito",
            "won_because": "Customer renewing for the 2024-2025 term.",
            "competitor": null
          },
          {
            "name": "26-28  Alliant Health Plan - P2P, Provider Access, ePA",
            "type": null,
            "closed": "2025-12-07",
            "arr": null,
            "services": 45000,
            "amount": 157500,
            "months": 35.98,
            "owner": "Jodi Patton",
            "won_because": "0057",
            "competitor": null
          },
          {
            "name": "25-28  Alliant Health Plan Renewal",
            "type": null,
            "closed": "2025-12-07",
            "arr": null,
            "services": null,
            "amount": 285000,
            "months": 36.01,
            "owner": "Jodi Patton",
            "won_because": "3 year renewal",
            "competitor": null
          }
        ]
      }
    },
    {
      "id": 28,
      "name": "Cascade Comprehensive Care",
      "quarter": "q2",
      "qlabel": "Q2 · Apr–Jun",
      "seg": "medicaid",
      "seglabel": "Medicaid MCO / CCO",
      "note": "",
      "full": "Cascade Comprehensive Care, Inc. (dba Cascade Health Alliance) — Medicaid CCO in Klamath Falls, OR (~24K members, 50K contracted; \"a smaller plan\" per 1up engineering)",
      "dq": "rich",
      "products_and_scope": "Phase 1 (2022): $110k ARR + $85k implementation — FHIR Server, Patient Access, Provider Directory, R&I; competitive steal from Change Healthcare [#arr-services-new-bookings, 2022-02-21]. Confluence handoff page confirms Patient Access + Payer-to-Payer implemented (go-live Nov 3, 2023). Customer explicitly declined to share clinical data for Patient Access — claims/coverage/formulary/provider-directory only [#account-cascade, 2023-12-08]. Renewal: 2-yr renewal Feb 2025 with +$11,276 total ARR increase [#arr-services-new-bookings, 2025-02-07]. Phase 2 (Dec 2025 upsell): Provider Access + ePA, $55,000 ARR + $40,000 Services, June 1 2026 commencement [#arr-services-new-bookings, 2025-12-17]; Jodi Patton 2026-04-01: \"Cascade is contracted and starts June 1 (contracted for all 0057 APIs)\". Cascade 0057 SOW sent, green status, 2026-01-07 (Maria Baker / Ryan Ingram / Jeremy Yoon) [#sows-inflight].",
      "implementation_status": "Roster says Q2 (Apr–Jun) go-live, but the contracted 0057 scope (Provider Access + ePA) commences June 1, 2026 — so the 0057 implementation is just starting. 1up-side readiness underway: Cascade was among customers never onboarded in UAT env, flagged 2026-06-08 (INFRA-2990) [#cloud-devops-core-infra-public]; their 0057/ePA URLs were missing from the Active Implementations spreadsheet and were added 2026-06-18 (Kyle Brew, Rachel Schuler) so Holly Fan could send them to the customer [#2026-0057-access-api--readiness thread, 2026-06-17/18]. RED FLAG: as of 2026-07-02 Cascade has been \"radio silent on their 0057 implementation\"; Holly Fan requested an escalation contact and Jodi agreed to ping COO Michael Donarski (cc Steph) [Holly Fan DM, 2026-07-02]. Original Patient Access/P2P went live Nov 3, 2023, handed to support Nov 16, 2023 [Confluence handoff page]. Note: a June 2024 internal question (\"doesn't appear that P2P is deployed\") suggests P2P deployment was ambiguous despite the handoff page listing it [#account-cascade-implementation, 2024-06-05].",
      "tech_architecture": "Batch file-based ingestion: Cascade uploads flat files to 1up SFTP/S3 → Postgres/RDS staging → NiFi → FHIR R4 server (fhir-r4 lambda), mapped to CARIN BB (C4BB) profiles. File feeds: 834 (patient/coverage, weekly Thu), 835 claims + supplemental EOB diagnosis/procedure (bi-weekly), Type 112 CMS member-access pharmacy files from PBM MedImpact (bi-weekly; file prefix type112_ccc01), provider directory CSV (monthly, pipe-delimited), formulary (as updated; 3–6 month gaps are normal per customer). Client refs: cascade_prod_pd (public/provider-directory) and cascade_prod_sh (Patient Access). Historical claims loaded Jan 1, 2018–present; 2016–2017 never loaded (Cascade must generate; would need new SOW). No clinical data flowing. Key vendors: MedImpact (PBM), Gainwell (case management), Essette (Gainwell) as UM vendor — the intended ePA integration point and a partnership opportunity [#arr-services-new-bookings 2025-12-17; #account-cascade 2024-04-09; #account-cascade-implementation 2023].",
      "financial_signals": "2022-02-21: $110,000 ARR + $85,000 implementation (initial deal, Change steal). 2025-02-07: 2-yr renewal, +$11,276 total ARR. 2025-12-17: Provider Access + ePA upsell, $55,000 ARR + $40,000 Services, June 1 2026 start (\"pulling a 2026 upsell opportunity into 2025\"). Upsell signed via Dan Petersen and sent to Michael Donarski 2025-12-16/17 (\"Cascade is in\", 2025-12-17 group DM). Oct 2025: renewal contract with full CMS-0057 scope sent [#growth-updates, 2025-10-24]. Account plan (Jan 2024) listed ARR at $110,000.",
      "key_people": "Customer: Michael Donarski (COO, MichaelD@cascadecomp.com — upsell signatory and planned escalation contact), Cally McCool (Operations PM, main ops contact), Danielle Blout (BI Manager, implementation PM), Danielle Sherman (Health Informatics Database Analyst / BI Manager per email sig), Keoni Roberts (Sr Data Analyst), Tayo Akins (CEO), Chanel Smith (Director of Quality & Health Equity). 1upHealth: Jodi Patton (AM), Maria Baker (implementation lead for 0057), Geetika Arora + Holly Fan (0057 readiness), Kyle Brew (P2P/infra), Robert Davis (data engineering), Tania Gregory (RedZone eng), Ryan Ingram & Jeremy Yoon (deal support), Dan Petersen (exec signature), Nolan Kelly (sales leadership). Historical: Hannah Hewitt (IM), Avi Lessure (DE), Donna Lehr (data consultant) — all departed.",
      "risks_and_blockers": "1) Customer radio silence on 0057 implementation as of 2026-07-02 with a June 1 contract start — escalation to COO in motion [Holly Fan DM]. 2) Provider Directory endpoints empty (RedZone, Mar 2026): Practitioner/PractitionerRole never populated (ingestion errors with blank error reports), Organization returns 0 via API due to user-id misconfiguration (loaded to shared user instead of public), Location stale since Jan 2024, and the last provider directory file (2025-08-04) was empty [#account-cascade, 2026-03-31]. 3) Long history of customer file-quality problems: is_negated flag format change silently converted every ingest into a delete (2023), delimiter/naming-convention changes, missing schemas, months-long file gaps — customer data ops capacity is thin. 4) UAT environment was never created (fixed via INFRA-2990, June 2026). 5) 2016–2017 historical data still unloaded and would need a new SOW.",
      "points_of_interest": "Cascade is a reference machine: they referred Advanced Health, which closed as a new $144,750 ARR full-suite customer in June 2025 [#arr-services-new-bookings, 2025-06-20]. They sit in 1up's Oregon CCO cluster (Yamhill, Advanced, AllCare CCO; Health Share of Oregon prospect cited Cascade as a peer) — success here compounds regionally. The Essette (Gainwell) UM vendor is \"eager to partner\" per the booking note, a possible channel play across other Essette payers. Jan-2024 account plan already flagged SQL on FHIR, Population Connect, and Reg 2.0 as product opportunities. Sep 2025: Cally proactively asked to plan all 0057 projects (P2P, Provider Access, ePA timelines) — customer-initiated demand [#account-cascade, 2025-09-19].",
      "expansion_plays": [
        {
          "play": "Provider Directory remediation bundled with an HDE pipeline modernization",
          "rationale": "Their provider directory is empty in production (RedZone, Mar 2026) and their legacy file pipeline has repeatedly broken on format drift (is_negated bug, delimiters, naming). A paid remediation + migration to HDE fixes a live compliance gap, de-risks the 0057 build they already bought, and converts chronic support burden into services revenue. Also natural moment to finally load 2016-2017 historicals (already flagged as requiring a new SOW).",
          "fit": "high"
        },
        {
          "play": "Clinical data ingestion / popconnect on top of the new 0057 stack",
          "rationale": "Cascade declined to send clinical data at Patient Access kickoff (Dec 2023), but Provider Access and P2P payloads are far more valuable with clinical data, and Danielle asked as early as Apr 2024 about pulling payer/provider data from their Gainwell case management system. Contacts like Chanel Smith (Director of Quality & Health Equity) and the account plan's Population Connect/SQL-on-FHIR notes give a quality/HEDIS use case for a small CCO with state quality incentives.",
          "fit": "medium"
        },
        {
          "play": "Essette (Gainwell) ePA partnership as a wedge — deepen at Cascade, replicate across Essette payers",
          "rationale": "The Dec 2025 booking explicitly notes Essette (Gainwell) is 'eager to partner.' Landing a clean Essette-integrated ePA at Cascade creates a repeatable connector for every Essette UM shop (Gainwell's Medicaid footprint is large) and turns a $55k account into a channel reference; also strengthens the Oregon CCO cluster story that already produced the Advanced Health referral.",
          "fit": "high"
        }
      ],
      "plays_hi": 2,
      "sources": [
        "#account-cascade (C03446UPMGV) — history 2022-12 through 2026-03 incl. 2026-03-31 RedZone provider-directory thread, 2025-09-19 0057 planning, 2023-12 is_negated bug",
        "#account-cascade-implementation (C04BC7RR2LU) — 2023 implementation detail (file feeds, MedImpact Type 112s, provider directory, go-live)",
        "#arr-services-new-bookings (C01KG7PJEDV) — 2022-02-21 initial deal, 2025-02-07 renewal, 2025-12-17 Provider Access + ePA upsell, 2025-06-20 Advanced Health referral",
        "#sows-inflight (C09EE0B2V8A) 2026-01-07 — Cascade 0057 SOW sent (green)",
        "#2026-0057-access-api--readiness (C0A36DHR84R) 2026-06-17 thread — URLs missing/added; 2026-05-22 ePA URL requests",
        "#cloud-devops-core-infra-public (C048KKRA709) 2026-06-08 — UAT env missing, INFRA-2990",
        "Holly Fan DM (D075U3MU2JX) 2026-07-02 — radio silence, escalation to Michael Donarski",
        "Group DM C09F71169UZ 2025-12-16/17 — upsell signature to MichaelD@cascadecomp.com, 'Cascade is in'",
        "Group DM C04CP8C0D7Z 2026-04-01 — contracted for all 0057 APIs, June 1 start",
        "#growth-updates 2025-10-19, 2025-10-24, 2025-12-12, 2025-12-20 — deal progression",
        "Confluence: Cascade - Patient Access - Handoff to CS and Support (CKB/262930543)",
        "Confluence: Cascade Health Alliance account plan (APH/321619433)",
        "Confluence: Cascade mapping review pages (CKB/270106774, 78807345, 82411561, 82903106) — C4BB mappings"
      ],
      "sf": {
        "arr": 256233.547164,
        "cumulative": 746776,
        "product_rev": 621776,
        "services_rev": 125000,
        "health": 10,
        "temperature": "Yellow",
        "nps": null,
        "renewal_sentiment": 4,
        "sentiment_notes": null,
        "flags": [],
        "renewal": "2027-02-17",
        "contract_exp": "2025-02-17",
        "customer_since": "2022-02-18",
        "go_live": null,
        "impl_level": "Level II",
        "products_sold": "Patient Access;Provider Directory",
        "lobs": "Medicaid",
        "members_contracted": 50000,
        "members_current": 46544,
        "competitors": null,
        "pbm": null,
        "owner": "Jodi Patton",
        "csm": "Holly Fan",
        "exec_sponsor": "Jodi Patton",
        "tier": "Maintain",
        "opps": [
          {
            "name": "Cascade Health Alliance - Platform & CMS APIs",
            "type": "0125f000000iH45AAE",
            "closed": "2022-02-21",
            "arr": null,
            "services": 85000,
            "amount": 415000,
            "months": 35.98,
            "owner": "Ariana Zamora",
            "won_because": null,
            "competitor": null
          },
          {
            "name": "25-26 Cascade Health Alliance Renewal",
            "type": "Existing Business",
            "closed": "2025-02-07",
            "arr": 115500,
            "services": 0,
            "amount": 115500,
            "months": 23.95,
            "owner": "Jessica Candito",
            "won_because": "2025-2027  Renewal",
            "competitor": null
          },
          {
            "name": "26-27 Cascade Health Alliance Renewal (CPI Increase)",
            "type": "Existing Business",
            "closed": "2025-02-14",
            "arr": null,
            "services": 0,
            "amount": 121276,
            "months": 11.96,
            "owner": "Jessica Candito",
            "won_because": "2025-2027  Renewal",
            "competitor": null
          },
          {
            "name": "26-28 - Cascade Comprehensive Care -  Provider Access, ePA",
            "type": "Existing Business",
            "closed": "2025-12-17",
            "arr": null,
            "services": 40000,
            "amount": 95000,
            "months": 8.57,
            "owner": "Jodi Patton",
            "won_because": "0057 upsell",
            "competitor": null
          }
        ]
      }
    },
    {
      "id": 29,
      "name": "GlobalHealth Holdings",
      "quarter": "q3",
      "qlabel": "Q3 · Jul–Sep",
      "seg": "medadv",
      "seglabel": "Medicare Advantage",
      "note": "",
      "full": "GlobalHealth Holdings (GlobalHealth — Medicare Advantage plan, Oklahoma + Texas; sister company of MCS; \"Global/MCS\" on some deals)",
      "dq": "rich",
      "products_and_scope": "Phase 1 (Jul 2023 booking, $40K ARR + $50K Services): CMS-9115 Patient Access API + Provider Directory — a \"rip & replace\" of Change Healthcare, following the MCS sister-company relationship. Scope included member Patient/Coverage/EOB (medical inpatient/outpatient/professional, DentaQuest dental, EyeMed vision), Formulary, Pharmacy, Observation, and Personal Representative (RelatedPerson) files; live ~Jan 2024. Platform capacity increase Aug 2024 ($40K ARR/$10.4K Services). Aug 2025: 2-year renewal with CMS-0057 upsell — Provider Access + Payer-to-Payer (+$45K ARR + $30K Services, CARR conversion July 5, 2026). Dec 2025: Supplemental SOW $28.5K for PBM change to MedImpact (Formulary, Pharmacy Directory, Pharmacy Claims). May 2026: ePA upsell $75K ARR + $30K Services (Global/MCS). Jun 2026: MPF (Medicare Plan Finder) SOW — signed by 1up (John Lambrecht) June 4, OF/SOWs circulated June 18 — plus $8K MPF Provider File Remediation services.",
      "implementation_status": "CMS-9115 stack live since ~Jan 2024 (historical ingestion signed off Dec 27, 2023 with \"0 issues\" on test data). PBM change to MedImpact: kicked off 12/9/25, dragged due to MedImpact file-format and MFT issues, effectively complete June 10, 2026 — errors reduced from 844 to 76 acceptable residuals (M3P member-id prefix fix). MPF: kickoff held Monday July 6, 2026, actively in flight (Extract Guides/InsurancePlan_v2 shared). CMS-0057 (Provider Access, P2P, ePA): questionnaire responses returned 6/5/26; implementation slated to start 7/1 per Holly Fan (6/26); CARR conversion dated July 5, 2026 — but as of 7/6/26 the 0057 kickoff is STILL NOT SCHEDULED because the customer is ignoring CSM outreach. Roster target is Q3 (Jul-Sep) go-live; kickoff slippage plus UM-vendor (HealthAxis) ePA unreadiness puts Q3 at material risk, at least for the ePA component.",
      "tech_architecture": "Legacy STE flat-file architecture: pipe-delimited CSVs to S3 (1up-globalhealth-prod-data-ingest) via SFTP, NiFi flows, manual DB table/view mapping, error/complete reports back via S3 report bucket. Two patient tables (Oklahoma and Texas — TX loads first); crosswalk table links pharmacy claims to Patient/Coverage. PBM: MedImpact (since 2026; files pulled from MedImpact shared MFT folder t0809 with \"_gh\" prefix, 90-day password rotation overhead); prior PBM replaced Dec 2025-Jun 2026. Dental: DentaQuest; Vision: EyeMed (separate EOB feeds). UM/core admin vendor: HealthAxis (Rob Bradley's contact = SVP Product) — this is the ePA integration point. Original claims platform replaced: Change Healthcare. No EHR integration (payer flat-file model throughout).",
      "financial_signals": "Jul 5, 2023: $40K ARR + $50K Services (Patient Access + Provider Directory, Change rip & replace). Aug 15, 2024: +$40K ARR / $10,411 Services (capacity increase). Aug 14, 2025: 2-yr renewal + Provider Access & P2P upsell +$45K ARR + $30K Services; CARR conversion July 5, 2026. Dec 2, 2025: $28.5K Services (PBM change SOW). May 7, 2026: ePA upsell $75K ARR + $30K Services (Global/MCS), MPF fast-follow noted. Jun 18, 2026: $8K Services MPF Provider File Remediation. Cumulative ~$200K ARR + ~$157K services (likely, summed from bookings extracts).",
      "key_people": "Customer side: Rahul (GlobalHealth IT lead — file specs, error triage; occasionally confused per 1up team), Migdalia Vazquez Rivera (GlobalHealth — coverage-id construction logic), Kay (GlobalHealth business contact, touchpoints/test data). Vendor side: Becky (MedImpact PM, primary PBM contact), unnamed SVP of Product at HealthAxis (UM vendor, Rob Bradley's contact). 1upHealth side: Jodi Patton (account owner/AE), Holly Fan (CSM — chasing 0057 kickoff), Anissa Nashikkar (PM — PBM + MPF projects), Tania Gregory \"tgreg\" (Data Implementation Engineer), Robert Davis \"Robzzz\" (implementation/solutions architect; left account channels June 2026 but presented at MPF kickoff 7/6), Maria Baker (Implementation leadership), Rob Bradley (partnerships — HealthAxis/ePA), Juliette Steinkrauss (ePA adoption/provider engagement), John Lambrecht (exec — SOW signer), Rachel Schuler (joined account channel May 2026; runs ePA implementations).",
      "risks_and_blockers": "1) ePA readiness — biggest risk: HealthAxis (UM vendor) was acquired ~9 months ago, is \"not investing in ePA for their UM,\" and both GlobalHealth and the HealthAxis SVP are concerned GH \"won't be ready/able to connect with 1up for ePA\" [Group DM, Rob Bradley, 2026-06-26]. Rob Bradley flagged 1up will need to engage HealthAxis within 60 days. 2) 0057 kickoff slippage: customer ignoring CSM emails on scheduling the KO (as of 7/6/26) while CARR already converted 7/5 — revenue recognized against an unstarted implementation. 3) Vendor friction pattern: the MedImpact PBM project ran ~6 months over repeated file-format, MFT-connectivity, and member-id issues — same三-party coordination pattern will recur for MPF pharmacy files (open question 5/12 whether GH/MedImpact will commit to making PBM files MPF-compliant; MedImpact may resist since providers aren't the ones required). 4) Competing priorities: MPF kickoff and 0057 kickoff landing in the same July window with a small customer IT team.",
      "points_of_interest": "GlobalHealth runs everything through 1up as a multi-vendor data hub: separate EOB feeds from DentaQuest (dental), EyeMed (vision), and now MedImpact (pharmacy) all normalized into their FHIR environment — an unusually broad flat-file estate for a plan this size. The account is closely paired with sister company MCS (shared PM at MCS flagged the PBM switch first; ePA sold as Global/MCS combo). Customer historically praised as thorough (\"I wish all customers were as thorough as they are\" — Robert Davis, 2023), but 2026 shows engagement fatigue (ignoring 0057 kickoff outreach). Tania Gregory fixed a GlobalHealth+JHHP ingestion \"deadlock issue\" (June 2026). M3P prefix issue on MedImpact member IDs solved with 1up-side SQL strip logic.",
      "expansion_plays": [
        {
          "play": "HealthAxis ePA integration services + delivery assurance (protect and expand the $75K ePA ARR)",
          "rationale": "ePA is sold but the UM vendor (HealthAxis) is not investing in ePA integration and both sides doubt readiness. 1up is already committed to engaging HealthAxis within 60 days [Rob Bradley, 6/26]. A scoped services engagement (or a productized HealthAxis connector reusable across mutual customers) turns the account's biggest risk into billable work and protects the Q3-Q4 0057 timeline. MCS likely shares the same integration path.",
          "fit": "high"
        },
        {
          "play": "HDE migration / platform modernization off legacy STE pipeline",
          "rationale": "GH runs on the legacy NiFi + manual-mapping STE stack that caused months of pain in the PBM change (manual DB table moves, drift lambda tickets, crosswalk hacks, MFT password rotation overhead). With a 2-yr renewal signed through ~mid-2027 and four active file feeds (medical, dental, vision, pharmacy), migrating to Health Data Engine cuts 1up's own support cost and positions a platform-tier uplift at next renewal.",
          "fit": "medium"
        },
        {
          "play": "Clinical data / popconnect for Stars-HEDIS analytics on the MA population",
          "rationale": "GlobalHealth is a Medicare Advantage plan (OK + TX, MPF buyer) whose 1up environment already holds complete medical + dental + vision + pharmacy claims in FHIR but only thin clinical data (an Observation feed). Adding clinical data acquisition/popconnect enables Stars, risk adjustment, and quality gap-closure use cases on data already flowing — the natural post-0057 value story, and replicable at sister company MCS.",
          "fit": "medium"
        }
      ],
      "plays_hi": 1,
      "sources": [
        "#account-globalhealth (C05GKCLM8GL) — 2023-07 kickoff/SOW, 2023-12 go-live prep, 2025-08-12 PBM switch heads-up (Stacy Harris), 2025-10-14 MedImpact gap-analysis notes, 2025-11-26 Maria Baker PBM staffing",
        "#account-globalhealth-implementation (C05R29DN71C) — 2023-12-27 historical ingestion sign-off, 2024 file feeds list (DentaQuest/EyeMed/OK+TX patients), PersonalRepresentative work, NiFi handoff",
        "#account-globalhealth-implementation-new-pbm (C0A2FFGBCK0) — 2025-12-09 kickoff through 2026-06-10 closure; M3P prefix thread (ts 1778686298.040039); MFT t0809 decision",
        "#account-globalhealth-mpf-implementation (C0BEN71PHU3) — 2026-07-02 kickoff scheduling, 2026-07-06 kickoff artifacts + Holly Fan 0057 KO thread (ts 1783352633.207459)",
        "#arr-services-new-bookings extracts: 2023-07-05, 2024-08-15, 2025-08-14, 2025-12-02, 2026-05-07, 2026-06-18 (as provided in recon)",
        "#2026-0057-access-api--readiness — 2026-06-05 Holly Fan questionnaire responses message (ts 1780683441.262759)",
        "#epa-adoption-growth (C0AK3790E3C) — 2026-05-21 and 2026-06-09 meeting notes (HealthAxis intro, Discovery Questionnaire, July kickoff)",
        "Group DM Holly Fan/Jodi Patton/Rob Bradley (C0BDH6DHLGH) — 2026-06-26 HealthAxis ePA risk, 2026-06-30 60-day engagement flag",
        "Group DM w/ John Lambrecht (C03UD5ZMC8P, C08593E4FAM) — MPF SOW signature trail June 2026",
        "DM Robert Davis/Jodi Patton (D059JR16LKC) — 2026-05-12 MPF PBM-file compliance question",
        "Confluence CKB 2220818434 'GlobalHealth - PBM Change Internal Handoff Info (4.16.26)'",
        "Confluence CKB 1673068587 'Global Health MedImpact Pharmacy Claims'",
        "Confluence CKB 281444615 'GlobalHealth Count Checks Table'; CKB 192413714 'GlobalHealth // Patient File Feedback'; CKB 313262653/314966078 historical load tracking"
      ],
      "sf": {
        "arr": 159585.635352,
        "cumulative": 476911,
        "product_rev": 330411,
        "services_rev": 146500,
        "health": 10,
        "temperature": null,
        "nps": null,
        "renewal_sentiment": 4,
        "sentiment_notes": null,
        "flags": [],
        "renewal": "2027-07-04",
        "contract_exp": "2024-07-04",
        "customer_since": "2023-07-05",
        "go_live": null,
        "impl_level": null,
        "products_sold": null,
        "lobs": "Medicare Advantage",
        "members_contracted": 15000,
        "members_current": 35051,
        "competitors": null,
        "pbm": null,
        "owner": "Jodi Patton",
        "csm": "Holly Fan",
        "exec_sponsor": "Jodi Patton",
        "tier": "Grow",
        "opps": [
          {
            "name": "GlobalHealth - R&R",
            "type": "0125f000000iH45AAE",
            "closed": "2023-07-05",
            "arr": null,
            "services": 50000,
            "amount": 90000,
            "months": 11.99,
            "owner": "Ariana Zamora",
            "won_because": "Urgent need for new vendor and sister company relationship with current customer MCS.",
            "competitor": null
          },
          {
            "name": "GlobalHealth - Capacity Increase 2024",
            "type": null,
            "closed": "2024-08-15",
            "arr": null,
            "services": 0,
            "amount": 10411,
            "months": 3.09,
            "owner": "Drew Arnold",
            "won_because": "Decreased customer abrasion by providing both the capacity increase and the renewal order form together so the customer could go through only one legal review process.",
            "competitor": null
          },
          {
            "name": "GlobalHealth - Renewal 2024",
            "type": "0125f000000iHVSAA2",
            "closed": "2024-08-29",
            "arr": null,
            "services": 0,
            "amount": 80000,
            "months": 11.96,
            "owner": "Drew Arnold",
            "won_because": "Decreased customer abrasion by providing both the capacity increase and the renewal order form together so the customer could go through only one legal review process.",
            "competitor": null
          },
          {
            "name": "25-27 GlobalHealth - Renewal",
            "type": "0125f000000iHVSAA2",
            "closed": "2025-07-03",
            "arr": null,
            "services": 0,
            "amount": 80000,
            "months": 23.95,
            "owner": "Jodi Patton",
            "won_because": "continuing customer",
            "competitor": null
          },
          {
            "name": "25-27 GlobalHealth P2P and Provider Access",
            "type": "0125f000000iHVSAA2",
            "closed": "2025-08-11",
            "arr": null,
            "services": 30000,
            "amount": 75000,
            "months": 11.96,
            "owner": "Jodi Patton",
            "won_because": "0057 upsell",
            "competitor": null
          },
          {
            "name": "MCS/Global - Pharmacy Vendor Change - MedImpact",
            "type": null,
            "closed": "2025-09-29",
            "arr": null,
            "services": 28500,
            "amount": 28500,
            "months": 12.06,
            "owner": "Jodi Patton",
            "won_because": "pbm change",
            "competitor": null
          },
          {
            "name": "25-27 GlobalHealth ePA",
            "type": "0125f000000iHVSAA2",
            "closed": "2026-05-05",
            "arr": null,
            "services": 30000,
            "amount": 105000,
            "months": 12.02,
            "owner": "Jodi Patton",
            "won_because": "0057 upsell",
            "competitor": null
          },
          {
            "name": "Global - MPF - Provider Directory File Updates",
            "type": null,
            "closed": "2026-06-18",
            "arr": null,
            "services": 8000,
            "amount": 8000,
            "months": 2,
            "owner": "Jodi Patton",
            "won_because": "MPF",
            "competitor": null
          }
        ]
      }
    },
    {
      "id": 30,
      "name": "Western Health Advantage",
      "quarter": "q3",
      "qlabel": "Q3 · Jul–Sep",
      "seg": "commercial",
      "seglabel": "Commercial / Blues",
      "note": "",
      "full": "Western Health Advantage (WHA)",
      "dq": "rich",
      "products_and_scope": "Patient Access API + Provider Directory (CMS-9115) live since 2021 (originally Medicare Advantage LOB; $50k ARR renewal 2022-02). Nov 2021: Payer Network API w/ SQL pipe + CMS BCDA data up to 150K members ($45K ARR + $10K impl). Jan 2024 renewal: added P2P Send + P2P Exchange plus Commercial LOB lives, capacity increase 5,000 -> 120,000 members ($156K ARR + $22.5K services) — driven by CA regs deadline 1/2024 [#account-western-health 2023-11-02, 2024-01-29]. Oct 2024: Sensitive Data Tagging SOW ($10K ARR / $15.75K services) plus Dec 2024 CSV-to-Parquet conversion SOW ($5K ARR / $9K services). Commercial LOB implementation completed and handed off Apr 2025; MA LOB fully sunset Apr 2025 — WHA is now ACA/commercial only (\"they only do ACA\" [Jodi Patton DM 2026-05-15]). Current: CMS-0057 ePA SOW drafted/under review May 2026 (WHA electing to meet full CMS requirements even though technically under DMHC/CA), project slated to start Jul 2026 — SOW not yet returned as of 2026-07-08.",
      "implementation_status": "Roster says Q3 (Jul-Sep) 2026 go-live, but the CMS-0057 project has NOT started: the signed SOW is missing as of 2026-07-08 (\"we seem to be missing the SOW for WHA. The project is supposed to start this month\" — Stephanie Iheme, group DM 2026-07-01; on 2026-07-08 she asked whether to hold project kick-off outreach \"as a leverage point for getting the SOW returned\"). No IM assigned yet (Jodi asked Maria Baker \"Who's the IM for WHA?\" 2026-07-08). Groundwork done: 0057 Gap Analysis completed Nov 2025 by Chad Clough (Confluence CKB page 1692860417, IMPL-616) — clinical files done, EOBs finished ~Nov 11 2025. WHA showed active buying interest: one of 5 customers clicking \"learn more\" on 0057 APIs in the 1up Console (#product, 2026-02-27), requested a meeting on their behavioral-health integration for ePA with a deck (invite 5/21/2026). Prior phases: Commercial LOB (PA/PD/P2P + sensitive data tagging) went live Apr 2025 with project completion email 2025-04-25.",
      "tech_architecture": "Flat-file payer: pipe-delimited .txt extracts (PATIENT_COMM, COVERAGE_COMM, EOBHEADER/EOBDIAG/EOBLINE, EOB_PHARMACY, PROVIDER_DIRECTORY, FORMULARY, CORE_* clinical/vitals/labs, RESPONSIBLE_PARTY personal-rep files) delivered via SFTP to S3 (1up-western-health-prod-data-ingest), ingested through NiFi on dedicated EC2 (western-health-prod), DIMA mappings, ElasticSearch/OpenSearch + Kibana, FHIR R4 server at api.westernhealthfhir.com (Carin BB, US Core, PlanNet, DaVinci Formulary profiles). Data volumes (Nov 2025 gap analysis): 19.4M EOBs, 11.2M Observations, 709K Patient docs, 1.6M Coverage, 513K Immunizations. Sensitive data tagging via Parquet-converted sensitive codeset files applied to meta.security at ingestion. Notably sends clinical data (vitals, labs, conditions, immunizations) alongside claims. Prior auth architecture (key for 0057): majority of prior auths are facilitated by delegated Medical Groups — two on Epic, the rest would need X12 or SFTP solutions [Jodi Patton -> Jeremy Yoon, 2026-05-01]. DMHC-regulated CA plan (CoveredCalifornia ACA exchange) choosing to meet CMS requirements conservatively. No EHR-side systems mentioned beyond delegated groups' Epic.",
      "financial_signals": "2021-01-26: $50k ARR + $100k Services (initial). 2021-08: phase 2 payment $25k discussed. 2021-11-11: $45K ARR + $10K impl (Payer Network API w/ SQL pipe, CMS BCDA, up to 150K members). 2022-02-15: renewal $50k ARR (Patient Access & Provider Directory). 2024-01-26: $156,000 ARR capacity increase (5,000 -> 120,000 members) + P2P Send/Exchange + $22,500 Services. 2024-10-24: Sensitive Data Tagging SOW $10,000 ARR / $15,750 Services. 2024-12-20: Parquet work $5,000 ARR / $9,000 Services. 2026: CMS-0057/ePA SOW drafted May 2026, unsigned as of 2026-07-08 (value not visible in sources).",
      "key_people": "Customer: Glenn (long-time exec contact, 2021-2025), Tom (renewal contact 2022), Rick (with Glenn on third-party app promotion, Aug 2025), unnamed Chief Member Experience Officer leaning into interoperability/\"Kill the Clipboard\" (Aug 2025), Jenny (data/files contact, Nov 2025), Samantha (MA LOB sunset), Brandon (branding, 2024). 1upHealth: Jodi Patton (account lead; drafted 0057 SOW language), Holly Fan (CSM since Oct 2025), Jeremy Yoon (SOW review), Maria Baker & Stephanie Iheme (implementation leadership chasing SOW/IM assignment, Jul 2026), Rachel Schuler (IM, in 2026 WHA call group DM; left account channel Mar 2026), Kevin Kowalczyk (sales, using WHA as CA reference), formerly: Stacy Harris (IM for Commercial LOB through Apr 2025 handoff), Tania Gregory (data engineer), Robert Davis (solutions/eng, left channels Jul 2026), Chad Clough (0057 gap analysis + 2025 remediation, left channels Jun 2026), Lindsay Parker (sales 2023-24).",
      "risks_and_blockers": "1) CMS-0057 SOW not returned as of 2026-07-08 while project was supposed to start July 2026 — Q3 go-live is already at risk; team is debating withholding kick-off as leverage [group DM 2026-07-01/07-08]. No IM assigned yet. 2) Delegated prior-auth model complexity: majority of PAs run through delegated Medical Groups (2 on Epic, others need X12/SFTP) — nonstandard ePA connectivity scope that 1up had to add protective SOW language for [2026-05-01]. Jodi also flagged an org-level open question on \"enhancing our capabilities to support states like CA\" [2026-06-12]. 3) Data-quality debt: Case 7663 \"Redzone\" remediation (coverage subscriber.reference/member-matching), global_mem_id uniqueness issue (72 members, may require delete/reload), and personal-rep file member_id remapping were still being worked with WHA as of Nov 2025 [#account-western-health 2025-11-10]. 4) Mar 2026: no 2025 coverage data in the usage-report/tagging pipeline for WHA; re-run ticket ISS-66 covering Oscar + WHA. 5) 1up-side churn on the account: Robert Davis and Chad Clough left the account channels Jun-Jul 2026; both account channels have been quiet since Nov 2025.",
      "points_of_interest": "WHA is a small (~120K member) CA ACA-only plan yet unusually engaged: one of only five customers clicking 0057 API \"learn more\" links in the 1up Console (Feb 2026). Their Chief Member Experience Officer is driving interoperability (\"Kill the Clipboard\" initiative) and CoveredCalifornia is asking them for interoperability metrics (Aug 2025) — a reporting/analytics hook. They proactively brought 1up a behavioral-health integration deck for ePA (May 2026). They are choosing to exceed their legal obligation (DMHC) by meeting CMS-0057 requirements — a strong compliance-champion signal. They also send substantial clinical data (vitals, labs, conditions, immunizations) already, unusual for a claims-file payer. Historical oddity: they sunset their entire MA LOB end of 2024, so all current scope is Commercial/ACA.",
      "expansion_plays": [
        {
          "play": "Close the CMS-0057 ePA SOW and expand to the full 0057 suite (Provider Access + P2P 0057 upgrade)",
          "rationale": "Gap analysis is done (Nov 2025), WHA is clicking 0057 links in the Console, and they voluntarily chose CMS-level compliance over DMHC minimums. Immediate action is getting the unsigned SOW back (blocking July start / Q3 go-live); the same conservative-compliance posture supports attaching Provider Access and upgrading their 9115-era P2P Send/Exchange to 0057 Payer-to-Payer.",
          "fit": "high"
        },
        {
          "play": "Delegated medical group connectivity services (Epic ePA integrations + X12 278/SFTP for non-Epic groups)",
          "rationale": "Majority of WHA prior auths flow through delegated Medical Groups — two on Epic, the rest needing X12 or SFTP. This is scoped-out complexity in the current SOW language and a natural multi-phase services + ARR expansion unique to WHA's delegated model; also a repeatable playbook for other CA delegated-model plans.",
          "fit": "high"
        },
        {
          "play": "Interoperability engagement analytics / member app promotion reporting (popconnect-style analytics on existing FHIR data)",
          "rationale": "Their Chief Member Experience Officer is championing 'Kill the Clipboard,' CoveredCalifornia is requesting interoperability metrics, and Rick/Glenn asked 1up which third-party apps to promote to members. WHA already has 19M EOBs + 11M clinical observations in the 1up FHIR store — usage/engagement reporting and quality analytics on that data monetizes what is already flowing (note: the 2025 usage-report data gap ISS-66 must be fixed first).",
          "fit": "medium"
        }
      ],
      "plays_hi": 2,
      "sources": [
        "#account-western-health (C01HURB2XP0) — history 2021-2026, incl. 2023-11-02 P2P/commercial scoping, 2024-01-29 P2P win, 2025-08-26 CMXO/Kill-the-Clipboard note, 2025-09-25 + 2025-11-10 remediation threads",
        "#account-western-health-implementation (C06KA25NTT2) — history Nov 2024-Nov 2025: SDT build, Commercial LOB historical load, Apr 2025 go-live/handoff, MA LOB sunset, Case 7663 remediation, Nov 2025 0057 gap analysis status",
        "#arr-services-new-bookings extracts (2021-01-26, 2021-11-11, 2022-02-15, 2024-01-26, 2024-10-24, 2024-12-20) — provided cross-account recon, dollar figures",
        "#product (C0102AFFS8J) 2026-02-27 — Western Health clicking 0057 API learn-more links in 1up Console",
        "#core-data-support (C08UMPY9SMQ) 2026-03-02 + #mte-reporting-launch 2026-03-06 — no 2025 coverage data for WHA usage report; ISS-66 re-run ticket",
        "Group DM Maria Baker/Jodi Patton/Stephanie Iheme (C05K0FQFN1F) 2026-07-01 and 2026-07-08 — missing WHA SOW, July project start, kick-off leverage question",
        "DM Jodi Patton -> Jeremy Yoon (D085NBXSATX) 2026-05-01 — WHA 0057 SOW, DMHC vs CMS, delegated medical groups (2 Epic, X12/SFTP)",
        "Group DM Jodi/Rachel Schuler/Jeremy Yoon (C09QATYPMBR) 2026-05-15 — WHA BH integration for ePA meeting + deck",
        "DM Jodi Patton <-> Kevin Kowalczyk (D03Q9K35W3Y) 2026-05-15, 2026-06-12 — WHA CA/ACA-only, CA capabilities question",
        "Confluence: Western Health 0057 Gap Analysis (CKB, page 1692860417, last modified Nov 6 2025, author Chad Clough) — resource counts, ongoing file table, claims types",
        "Confluence refs: Western Health Ongoing Files (page 293765244), WHA Jan 2024 PA/PD/P2P Handoff (page 970162241), WHA Oct 2024 SDT Handoff (page 1350303747)",
        "Jira: IMPL-616 (WHA 0057 gap analysis), SRV-2993 (SDT deployment), ISS-66 (usage report re-run)",
        "Gmail search ('Western Health' 90-120d): none found (personal Gmail, no work email)"
      ],
      "sf": {
        "arr": 390178.66666800005,
        "cumulative": 1878630,
        "product_rev": 1711380,
        "services_rev": 167250,
        "health": 10,
        "temperature": "Green",
        "nps": null,
        "renewal_sentiment": 4,
        "sentiment_notes": null,
        "flags": [
          "ROI in question"
        ],
        "renewal": "2028-01-27",
        "contract_exp": "2023-01-26",
        "customer_since": "2021-01-26",
        "go_live": "2021-06-25",
        "impl_level": "Level V",
        "products_sold": "Patient Access;Provider Directory",
        "lobs": "Medicare Advantage",
        "members_contracted": 120000,
        "members_current": 7554,
        "competitors": null,
        "pbm": null,
        "owner": "Jodi Patton",
        "csm": "Holly Fan",
        "exec_sponsor": "Jodi Patton",
        "tier": "Maintain",
        "opps": [
          {
            "name": "Western Health Advantage (WHA) - CMS Rule",
            "type": "0125f000000iH45AAE",
            "closed": "2021-01-21",
            "arr": null,
            "services": 75000,
            "amount": 125000,
            "months": 11.96,
            "owner": "Matt Dula",
            "won_because": null,
            "competitor": null
          },
          {
            "name": "RENEWAL: Western Health Advantage 2022",
            "type": "0125f000000iHVSAA2",
            "closed": "2022-02-15",
            "arr": null,
            "services": 0,
            "amount": 50000,
            "months": 11.96,
            "owner": "Ariana Zamora",
            "won_because": null,
            "competitor": null
          },
          {
            "name": "RENEWAL - Western Health Advantage (WHA) - CMS Rule",
            "type": "0125f000000iHVSAA2",
            "closed": "2023-01-24",
            "arr": null,
            "services": 0,
            "amount": 50000,
            "months": 11.96,
            "owner": "Ariana Zamora",
            "won_because": null,
            "competitor": null
          },
          {
            "name": "WHA: CA Mandates - Capacity Increase + P2P",
            "type": "0125f000000iH4tAAE",
            "closed": "2024-01-26",
            "arr": null,
            "services": 22500,
            "amount": 178500,
            "months": 12.02,
            "owner": "Lindsay Parker",
            "won_because": "relationship management and guidance through CA mandates",
            "competitor": "CA regs changed - waiting on CMS"
          },
          {
            "name": "Western Health Advantage RENEWAL 2024",
            "type": "0125f000000iHVSAA2",
            "closed": "2024-01-26",
            "arr": null,
            "services": 0,
            "amount": 50000,
            "months": 11.99,
            "owner": "Lindsay Parker",
            "won_because": "Relationship Management!",
            "competitor": null
          },
          {
            "name": "Western Health Advantage: Sensitive Data Tagging",
            "type": null,
            "closed": "2024-10-24",
            "arr": null,
            "services": 15750,
            "amount": 25750,
            "months": 11.99,
            "owner": "Drew Arnold",
            "won_because": "Great relationship and a happy customer needing additional work",
            "competitor": null
          },
          {
            "name": "WHA: SOW - Parquet Files for Sensitive Data Tagging",
            "type": null,
            "closed": "2024-12-20",
            "arr": null,
            "services": 9000,
            "amount": 14000,
            "months": 11.99,
            "owner": "Drew Arnold",
            "won_because": "Great relationship",
            "competitor": null
          },
          {
            "name": "Western Health Advantage - 2025 Renewal",
            "type": "0125f000000iHVSAA2",
            "closed": "2024-12-31",
            "arr": null,
            "services": 0,
            "amount": 221000,
            "months": 11.96,
            "owner": "Drew Arnold",
            "won_because": "relationship management and guidance through CA mandates",
            "competitor": "CA regs changed - waiting on CMS"
          },
          {
            "name": "26-28 Western Health Advantage - Provider Accessf, ePA",
            "type": "0125f000000iHVSAA2",
            "closed": "2025-12-19",
            "arr": null,
            "services": 45000,
            "amount": 195000,
            "months": 35.98,
            "owner": "Jodi Patton",
            "won_because": "relationship management and guidance through CA mandates",
            "competitor": "CA regs changed - waiting on CMS"
          },
          {
            "name": "27-28 WHA Renewal w/ CPI Increase",
            "type": "0125f000000iHVSAA2",
            "closed": "2025-12-19",
            "arr": 356000,
            "services": null,
            "amount": 373044,
            "months": 12.02,
            "owner": "Jodi Patton",
            "won_because": "relationship management and guidance through CA mandates",
            "competitor": "CA regs changed - waiting on CMS"
          },
          {
            "name": "28-29 WHA Renewal w/ CPI Increase",
            "type": "0125f000000iHVSAA2",
            "closed": "2025-12-19",
            "arr": 373045,
            "services": null,
            "amount": 384236,
            "months": 36.01,
            "owner": "Jodi Patton",
            "won_because": "relationship management and guidance through CA mandates",
            "competitor": "CA regs changed - waiting on CMS"
          },
          {
            "name": "26-27 WHA Renewal w/ CPI Increase",
            "type": "0125f000000iHVSAA2",
            "closed": "2025-12-19",
            "arr": null,
            "services": 0,
            "amount": 212100,
            "months": 11.96,
            "owner": "Jodi Patton",
            "won_because": "relationship management and guidance through CA mandates",
            "competitor": "CA regs changed - waiting on CMS"
          }
        ]
      }
    },
    {
      "id": 31,
      "name": "Zing Health",
      "quarter": "q3",
      "qlabel": "Q3 · Jul–Sep",
      "seg": "medadv",
      "seglabel": "Medicare Advantage",
      "note": "",
      "full": "Zing Health",
      "dq": "rich",
      "products_and_scope": "Zing Health (Chicago-based Medicare Advantage plan; LOBs = MA, incl. MAPD and C-SNP) has been a 1up customer since Oct 2021. Product evolution:\n- FOUNDATIONAL (2021): New logo landing on \"Comply\" (CMS-9115 Patient Access / Comply) — $50k ARR on 3-yr commit + $75k implementation [#arr-services-new-bookings 2021-04-13]. Account plan (Confluence \"Zing\", APH space) lists $58,333 ARR, product \"Comply.\"\n- EOB/claims + pharmacy: EOB (ExplanationOfBenefit) ingestion, plus Elixir PBM pharmacy data (RX EOB, Pharmacy Directory, Formulary) after Zing's PBM switch to Elixir (2023).\n- 2026 RFP WIN — 3-yr renewal + FULL CMS-0057 upsell: Provider Access, Patient Access, Payer-to-Payer (P2P), and ePA/Prior Auth. $77,250 ARR with $107,000 ARR increase + $45,000 Services; implementation start July 1 [#arr-services-new-bookings 2026-04-02; \"ZING - 3 Year Renewal with full 0057 upsell - cementing the RFP win\"]. Won competitively vs Onyx; deal involved a PAAS-vs-SAAS model evaluation.\n- MPF (Medicare Plan Finder): separate remediation/implementation workstream, $7,500 Services [2026-05-21]; provider-directory-based.\n- Clinical Connect / Pop Connect (clinical data / popconnect): discussed at product level (MJ + Jodi), not yet contracted.\nNote: 0057 implementation channel was renamed 2026-07-02 from \"...eobpriorauth\" to \"...provider-access-patient-access-p2p,\" indicating scope framing shifted toward P2P/Provider/Patient Access.",
      "implementation_status": "Multiple concurrent workstreams:\n- EOB implementation: COMPLETE — formally closed out with Zing mid-May 2025 (historical + incremental prod loads live; Zing set up automated incremental files) [#account-zing-eob-implementation, 2025-05-16 \"we met one last time... to close out this project\"]. Early 2025 had delays/medium risk due to file formatting/header issues from Zing self-generating files.\n- MPF implementation: IN PROGRESS — pulled forward from July to June 2026 because Zing had a file ready; gap analysis reviewed by Zing, sample file sent, kickoff pending 1up file feedback. Robert Davis flagged Zing's file lacks the CMS Segment Plan number [#account-zing-mpf-implementation, Jun 2026]. Led by Holly Fan / Joy He / Anissa Nashikkar.\n- CMS-0057 (Provider Access, Patient Access, P2P, ePA): KICKOFF scheduled Fri 2026-07-10 2-3pm ET; contractual implementation start 7/1; roster target Q3 (Jul-Sep) go-live. Discovery questionnaires for P2P, ePA, and Provider Access already COMPLETED and returned [#2026-0057-access-api--readiness, 2026-06-30]. Kickoff deck being finalized 7/8 by Assiatou Diallo.\n- Data hygiene ongoing: cleanup of termed members / data ingestion (ISS-69, Case 8142, Nov 2025); member count discrepancy (contracted 50,000 vs ~37,000 actual per account plan).\nQ3 go-live is aggressive given 0057 discovery only just wrapped and kickoff is 7/10.",
      "tech_architecture": "- Pipeline: Legacy STE pipeline — NiFi ingestion -> S3 (bucket 1up-zing-prod-data-ingest) -> Postgres staging tables (DIS schedules) -> FHIR R4 server. FHIR data indexed in ElasticSearch/OpenSearch (queried via Kibana).\n- FHIR server: Smile FHIR server; consolidated during Lasso Healthcare acquisition integration (2022 \"$35,000 additional implementation services - Lasso acquisition; Smile FHIR server consolidation\").\n- File format: pipe-delimited CSV mapping to CARIN BB profiles (Patient, Coverage, EOB Inpatient/Outpatient/Professional, Practitioner, Organization, PractitionerRole). Provider files segmented by LOB: medicare, chip, mht.\n- Approx FHIR resource volumes (Zing STE, 0057 Gap Analysis 2025): ExplanationOfBenefit 440,121; Organization 202,938; Practitioner 140,424; Coverage 130,091; Patient 109,726; PractitionerRole 1,247.\n- Data sources: Claims/EOB historically from Change Healthcare (infoexchange.changehealthcare.com); after the 2024 Change Healthcare breach Zing now SELF-GENERATES EOB files per 1up DIMA specs. Pharmacy from Elixir PBM. SFTP connectivity confusion noted (Change Healthcare endpoint vs IP 18.233.38.35).\n- ePA/provider connectivity: Availity used as provider portal/gateway; CIO Vrajesh Shah sees Availity as a middleman Zing may bypass as 1up's direct EHR integrations mature; some providers on Epic (Tina compiling Epic-enabled provider list).\n- Migration: Zing named as one of the first HDE (Health Data Engine, Dagster/zone-based) migration POCs alongside Yamhill (Product roadmap page) — likely upcoming cutover from STE to HDE.",
      "financial_signals": "- 2021-04-13: New logo $50k ARR (3-yr commit) + $75k implementation; 3k members [#arr-services-new-bookings]. (Account plan later shows $58,333 ARR \"Comply.\")\n- 2022-02-02: $35,000 additional implementation services (Lasso acquisition; Smile FHIR consolidation) — NOT ARR.\n- 2024-08-29: $21,150 Services — ingestion & conversion of customer content (EOB self-generation post-breach).\n- 2026-04-02: 3-yr renewal + full 0057 upsell — $77,250 ARR, $107,000 ARR INCREASE, $45,000 Services; impl start 7/1. RFP win.\n- 2026-05-21: MPF remediation — $7,500 Services.\nPost-renewal ARR is in the ~$77k range with a $107k increase tied to the 0057 upsell; total 2026 services bookings ~$52,500 (0057 $45k + MPF $7.5k).",
      "key_people": "CUSTOMER (Zing Health):\n- Vrajesh Shah — CIO (key economic/technical decision-maker; drove Onyx comparison, Availity POV, RFP)\n- Jinal Marvania — IT Product Manager / PM-IT (day-to-day IT contact; historically low engagement)\n- Kristen Lambert — Head of Enterprise Data Management\n- Robert Roesing — Sr IT Project Management\n- \"Kevin\" — handles EOB file generation (often offshore); \"Adina\" — SFTP/connectivity; \"Tina\" — provider/Epic-access list; \"Vrajesh/Vrajesh's network team\" — provider engagement\n- Ananth Ramkrishnan, Mark Smith — additional IT contacts\n- Execs/founders: Dr. Eric Whitaker (CEO/Founder), Dr. Ken Alleyne (Founder), Garfield Collins (Co-Founder/COO), Mete Sahin (CFO)\n1UPHEALTH:\n- Jodi Patton — Account Manager (owner); Ryan Ingram — sales (0057/RFP); Nolan Kelly — exec (met Zing CIO in Chicago 4/8/2025); Mohammad Jouni (MJ) — platform/Clinical Connect; Jeremy Yoon — ePA\n- Maria Baker — CSM/implementation lead; Holly Fan — CSM (MPF + 0057); Geetika Arora — 0057 coordination\n- Robert Davis (Robzzz) — Implementation Mgr; Anissa Nashikkar — IM (EOB/MPF); Joy He — Impl Engineer; Assiatou Diallo — 0057 impl (kickoff deck); Kyle Brew — P2P/product; Rachel Schuler, Stephanie Iheme, Tania Gregory — impl team; Irtiza Mahmud — data ingestion cleanup",
      "risks_and_blockers": "- Recurring FILE QUALITY issues: EOB files had header/format defects and empty files in early 2025 (project went orange/delayed); MPF file currently missing the CMS Segment Plan number. Zing's reliance on offshore/self-generated files is a recurring quality risk for the 0057 timeline.\n- AGGRESSIVE TIMELINE: 0057 kickoff only 7/10 with a Q3 go-live target; four APIs (Provider Access, Patient Access, P2P, ePA) plus concurrent MPF work strains capacity (Maria flagged June capacity/change-order concerns).\n- HISTORICAL RELATIONSHIP TENSION: account plan notes tension from the Elixir PBM change and \"limited engagement\" from Jinal Marvania; executive support was recommended (partly addressed via Nolan/MJ CIO meeting).\n- DATA HYGIENE: termed members needing deletion; member-count discrepancy (50k contracted vs ~37k actual) — churn/attrition signal.\n- COMPETITIVE/ARCHITECTURE: won RFP vs Onyx but Vrajesh continually benchmarks differentiation; Availity-bypass expectation puts pressure on 1up's direct-EHR ePA roadmap. HDE migration POC introduces cutover risk from the legacy STE/Smile stack.\n- Provider Access depends on Zing's small provider network agreeing to the data-sharing arrangement (Tina/Vrajesh working provider willingness) — external dependency 1up doesn't control.",
      "points_of_interest": "- Zing is an RFP WIN (Feb-Apr 2026) that flipped a tense, low-engagement account into a full-suite 0057 renewal — a reference-able turnaround; Jodi framed it as \"cementing the RFP win.\"\n- The pre-sale conversations were unusually strategic: Vrajesh directly asked how 1up differentiates from Onyx, and the dialogue centered on data QUALITY and \"1up as foundational infrastructure,\" not just compliance [#growth-updates, Jun 2025].\n- Vrajesh's Availity quote (captured in #industry): sees Availity as a middleman Zing may not need long-term once 1up's direct EHR integrations mature — a strategic opening for 1up's direct-connect ePA vision.\n- SDOH-centric mission (founded 2019, Health2047-backed; Papa companionship partnership; Lasso Healthcare acquisition ~6,000 members, rural HDHP/HSA MA) — strong narrative fit for population-health / clinical-data products.\n- Provider-engagement play already in motion: Zing (Tina/Vrajesh) identifying Epic-enabled providers for Provider Access, and Jodi's team offered to help Zing communicate with provider sites.",
      "expansion_plays": [
        {
          "play": "Clinical Connect / Pop Connect (clinical data + popconnect) tied to SDOH/population health",
          "rationale": "Zing's entire brand is SDOH and individualized care for underserved MA seniors (Papa partnership, community networks). MJ and Jodi already ran a product-level Clinical Connect/Pop Connect discussion, and Vrajesh engaged on data quality and 'foundational infrastructure.' With EOB, Coverage, Patient and Provider FHIR data already flowing (and Provider Access lighting up Epic-connected clinical data), layering clinical data ingestion + popconnect for care-gap/SDOH analytics is the most on-mission next sale.",
          "fit": "high"
        },
        {
          "play": "Direct-EHR ePA expansion beyond compliance (reduce/replace Availity)",
          "rationale": "Vrajesh explicitly views Availity as a middleman Zing may bypass as 1up's direct EHR integrations mature. As the ePA go-live proves out, position deeper direct-provider ePA connectivity (and DTR/CRD workflow) as a strategic bypass of the gateway layer — a play the CIO has effectively pre-sold himself.",
          "fit": "high"
        },
        {
          "play": "Quality / risk analytics on the FHIR data already flowing (+ HDE migration as the enabler)",
          "rationale": "Account plan flags Zing as a small plan with limited analytics infrastructure (noted SQL/analytics opportunity). With ~440k EOB, ~130k Coverage and full member/provider FHIR data now normalized — and Zing already tapped as an early HDE migration POC — 1up can upsell quality-measure/risk-adjustment analytics on top of the migrated data platform, valuable for a resource-constrained MA plan's Stars/HEDIS and risk capture.",
          "fit": "medium"
        }
      ],
      "plays_hi": 2,
      "sources": [
        "Slack #account-zinghealth (C01RXGLNQ02) — PBM/Elixir, EOB tables, termed-member cleanup ISS-69/Case 8142, Nolan+MJ CIO Chicago mtg 4/8",
        "Slack #account-zing-implementation-0057-provider-access-patient-access-p2p (C0BEPNM0GDR) — 7/10 kickoff deck, channel rename 7/2, discovery questionnaires",
        "Slack #account-zing-mpf-implementation (C0B736YTVQ9) — MPF gap analysis, missing CMS Segment Plan number, pulled June from July",
        "Slack #account-zing-eob-implementation (C07PV9Y0CJF) — EOB project closed out May 2025, early-2025 file format delays",
        "Slack #arr-services-new-bookings — 2026-04-02 3yr renewal+full 0057 ($77,250 ARR/$107k increase/$45k svcs), 2026-05-21 MPF $7,500",
        "Slack #2026-0057-access-api--readiness — Holly Fan 6/30 kickoff 7/10 + completed questionnaires",
        "Slack #growth-updates / #industry / group DMs — RFP win vs Onyx, PAAS vs SAAS, Vrajesh Availity quote, Clinical Connect discussion, provider-engagement next steps",
        "Confluence CKB 'Zing Additional SOW' (790331459) — post-breach EOB self-generation, Postgres/DIS/NiFi/S3 architecture",
        "Confluence APH 'Zing' account plan (321586729) — company background, $58,333 ARR Comply, 50k contracted/37k actual, stakeholders, Lasso/Papa",
        "Confluence CKB 'Zing - 0057 Gap Analysis' (1435107334) — STE/ElasticSearch FHIR resource counts, CARIN BB pipe-delimited files, LOB segments",
        "Confluence CKB 'Zing Elixir PBM Change - Handoff' (251854915) + Formulary/EOBPharmacy mapping pages",
        "Confluence PD roadmap (2341077003) — Zing named as first HDE migration POC with Yamhill"
      ],
      "sf": {
        "arr": 131893.999992,
        "cumulative": 708650,
        "product_rev": 511500,
        "services_rev": 197150,
        "health": 10,
        "temperature": "Green",
        "nps": null,
        "renewal_sentiment": 5,
        "sentiment_notes": null,
        "flags": [
          "ROI in question",
          "Actively Evaluating Competitor"
        ],
        "renewal": "2027-04-12",
        "contract_exp": "2023-04-05",
        "customer_since": "2021-04-06",
        "go_live": "2021-06-16",
        "impl_level": "Level V",
        "products_sold": "Patient Access;Provider Directory",
        "lobs": "Medicare Advantage",
        "members_contracted": 50000,
        "members_current": 85981,
        "competitors": null,
        "pbm": null,
        "owner": "Jodi Patton",
        "csm": "Holly Fan Test",
        "exec_sponsor": "Nolan Kelly",
        "tier": "Maintain",
        "opps": [
          {
            "name": "Zing Health - CMS Rule",
            "type": "0125f000000iH45AAE",
            "closed": "2021-04-06",
            "arr": null,
            "services": 75000,
            "amount": 250000,
            "months": 35.98,
            "owner": "Ariana Zamora",
            "won_because": null,
            "competitor": null
          },
          {
            "name": "SOW: Zing 2022",
            "type": "0125f000000FCKeAAO",
            "closed": "2022-02-02",
            "arr": null,
            "services": 35000,
            "amount": 35000,
            "months": null,
            "owner": "Ariana Zamora",
            "won_because": null,
            "competitor": null
          },
          {
            "name": "EOB Updates: Environment and Mapping",
            "type": "0125f000000FCKeAAO",
            "closed": "2023-04-03",
            "arr": null,
            "services": 13500,
            "amount": 13500,
            "months": 11.99,
            "owner": "Ariana Zamora",
            "won_because": null,
            "competitor": null
          },
          {
            "name": "RENEWAL - Zing Health - CMS Rule",
            "type": "0125f000000iHVSAA2",
            "closed": "2024-04-29",
            "arr": null,
            "services": 0,
            "amount": 75000,
            "months": 11.96,
            "owner": "Ariana Zamora",
            "won_because": "Standard renewal with new MSA.",
            "competitor": null
          },
          {
            "name": "Zing: Supplemental Services",
            "type": null,
            "closed": "2024-08-29",
            "arr": null,
            "services": 21150,
            "amount": 21150,
            "months": 11.96,
            "owner": "Drew Arnold",
            "won_because": "Good relationship and trusted partner",
            "competitor": null
          },
          {
            "name": "25-26 Zing Renewal",
            "type": null,
            "closed": "2025-03-07",
            "arr": null,
            "services": 0,
            "amount": 77250,
            "months": 11.96,
            "owner": "Drew Arnold",
            "won_because": "Great relationship",
            "competitor": null
          },
          {
            "name": "26-29 Zing Renewal",
            "type": null,
            "closed": "2026-03-30",
            "arr": null,
            "services": 0,
            "amount": 77250,
            "months": 35.98,
            "owner": "Jodi Patton",
            "won_because": "0057",
            "competitor": null
          },
          {
            "name": "26-27 Zing 0057 upsell - ePA, P2P, Provider Access",
            "type": null,
            "closed": "2026-03-30",
            "arr": null,
            "services": 45000,
            "amount": 152000,
            "months": 11.96,
            "owner": "Jodi Patton",
            "won_because": "0057",
            "competitor": null
          },
          {
            "name": "Zing MPF Provider Directory File Remediation",
            "type": null,
            "closed": "2026-05-21",
            "arr": null,
            "services": 7500,
            "amount": 7500,
            "months": 0.49,
            "owner": "Jodi Patton",
            "won_because": "MPF",
            "competitor": null
          }
        ]
      }
    },
    {
      "id": 32,
      "name": "HealthPlan Services (WiPro)",
      "quarter": "q3",
      "qlabel": "Q3 · Jul–Sep",
      "seg": "medadv",
      "seglabel": "Medicare Advantage",
      "note": "TPA channel",
      "full": "HealthPlan Services, Inc. (Wipro) — internal environment name \"Mountain Health\"; aliases: Wipro, HealthPlan Services, Mountain Health (MHC)",
      "dq": "rich",
      "products_and_scope": "Layered relationship. Contracting/legal entity is HealthPlan Services, Inc.; Wipro is the SI/TPA prime and 1up's day-to-day operational counterpart; Mountain Health is the underlying health plan (the \"subprime\"/environment name), largely hands-off day-to-day; RealRx is a third-party pharmacy-data vendor feeding files through Wipro. MSA effective Aug 23, 2024.\n\nPHASE 1 (2024 new logo, sell-through partner): CMS-9115 Patient Access + Provider Directory + 1up Platform for 1 LOB (Medicare Advantage). Bookings [#arr-services-new-bookings 2024-08-26]: $89,500 ARR + $39,500 Services. Went LIVE 2025-10-31 (14-month project). Resources implemented: Patient, Coverage, EOB (Header/LineItem/Diagnosis/Procedure across Medical/Dental/Vision), EOB Practitioner, EOB Organization, EOB Pharmacy*, FormularyDrug*, CoveragePlan*, Provider Directory Practitioner, Provider Directory Organization (*supplied by RealRx via Wipro).\n\nPHASE 2 (2025 renewal + upsell): 4+ year renewal aligned to Wipro's contract term with Mountain Health, adding Provider Access + Payer-to-Payer. Bookings [#arr-services-new-bookings 2025-08-25]: $45,000 new-product ARR + $15,950 CPI ARR + $20,000 Services. Order Form executed Aug 23, 2025; 0057 commencement Aug 23, 2026.\n\nPHASE 3 (CMS-0057, signed): SOW executed Apr 1-2, 2026 (signed by Deana Rhoades, President & CEO of HealthPlan Services, and Andrew Boyd, 1up CEO). Scope: CMS-0057-F Provider Access API; CMS-0057-F Payer-to-Payer (Inbound + Outbound); Patient Access Prior Authorization EOB data elements. $20,000 one-time services (80 manhour estimate). Exhibit A files (all customer SFTP push, .csv): Prior Auth EOB -> ExplanationOfBenefit (DaVinci PDex PA IG); Member Attribution List (PDex Provider Group); Member Opt-out (PDex Provider Access Consent); Member Opt-in (Payer-to-Payer). Still only 1 LOB (Medicare Advantage).",
      "implementation_status": "Phase 1 (9115 Patient Access + Provider Directory) fully LIVE and handed off. Internal IM->Customer Care handoff 2025-10-30; official go-live 2025-10-31; announced in #general as \"officially LIVE on 9115 (Patient Access / Provider Directory).\" Ongoing weekly incremental file ingestion via NIFI running since Nov 2025. Handoff to Customer Care/Geetika Arora (CSM) complete Nov 2025.\n\nPhase 3 (CMS-0057 Provider Access + P2P): SOW signed Apr 2026, but per the executed SOW the project KICKOFF is scheduled for Aug 23, 2026 (the 0057 Commencement Date), with go-live to follow. NOTE DISCREPANCY: roster says Q3 (Jul-Sep) go-live, but the signed SOW does not begin work until Aug 23, 2026 — a Q3 go-live is not achievable if kickoff is late Aug; realistically Q4 2026 / early 2027 (well ahead of the 1/1/2027 CMS deadline). Worth reconciling with the AM.",
      "tech_architecture": "1up-hosted AWS FHIR interoperability platform. Environment: 1up-mountainhealth-prod. FHIR base: https://api.mountainhealthfhir.com/r4 (Checkly Jira TOPS-6263 lists customer type \"Patient Access Standard\", coverage PAS v2). Ingestion: Wipro pushes .csv source files via SFTP into S3 bucket s3://1up-mountainhealth-prod-data-ingest; Apache NiFi flows auto-pick-up and load files (daily trigger, configurable cadence — currently weekly Monday incrementals). RealRx delivers EOB Pharmacy, FormularyDrug, CoveragePlan to Wipro, who forwards. Monitoring: Checkly public dashboard (mountainhealth.checkly-dashboards.com); Kibana proxy + Admin Console for Wipro admin users (Kibana proxy issue open under OPSREQ-10135 at handoff). UAT tooling: 1up Patient Viewer + Postman. For 0057: 1up Console deployment with customer-employee IdP integration; P2P Inbound member portal IdP (OAuth 2.0 / OIDC / SAML); Provider Access requires customer-supplied Provider Attribution + Member Opt-Out files; P2P uses dynamic Group/Match APIs and a Member Opt-in file. Files historically do NOT conform to 1up Extract Guides (recurring naming-convention and delimiter mismatches).",
      "financial_signals": "2024 new logo [#arr-services-new-bookings 2024-08-26]: $89,500 ARR + $39,500 Services (Patient Access, Provider Directory, 1up Platform). 2025 renewal+upsell [#arr-services-new-bookings 2025-08-25]: $45,000 new-product ARR + $15,950 CPI ARR + $20,000 Services; Order Form executed Aug 23, 2025. CMS-0057 SOW (signed Apr 1-2, 2026): $20,000 one-time professional services, invoiced upon 0057 commencement (Aug 23, 2026); 80-manhour estimate. CPI history: 1up waived CPI the first 3 years (as a reseller incentive / to pressure 0057 close); on the 4+ yr renewal Jodi Patton negotiated a ~10% CPI increase in year 4 (16-month final year) with Dan Petersen/Mark Wolf sign-off (Aug 2025). Estimated total current ARR roughly ~$150K (89.5 + 45 + 15.95) — verify in Salesforce.",
      "key_people": "1upHealth: Jodi Patton (Account Manager); Anissa Nashikkar (Implementation Manager, anissa.nashikkar@1up.health); Joy He (Data Implementation Engineer); Geetika Arora (CSM); Robert Davis \"Robzzz\" (Customer Care/data support); Trang Derdak (Customer support outreach); Stephanie Iheme (Services leader); Maria Baker (Implementation lead); Rob Bradley (Partnerships/partner-expansion lead); Jeremy Yoon (SE/ePA); Hannah (original IM, kicked off Aug 2024, transitioned to Anissa Mar 2025); Olivia Cleworth (original New Sales); Andrew Boyd (1up CEO, SOW signatory).\nWipro (operational counterpart): Andres Herrera/Gutierrez (PM Mountain Health, andres.herrera@wipro.com); Brandy Meyers (former PM, brandy.meyers@wipro.com); Lakshmi Mallampalli (data/support, lakshmi.mallampalli@wipro.com); Eric Uhl (pipeline support, eric.uhl@wipro.com); Elizabeth Wallace & Sherri Hentz (implementation contacts); Angela Cooper & Hozefa Shabbir Attarwala (operational contacts); Vicki Jackson, Brian Laks (Wipro); \"Dani\" (Mountain Health account exec at Wipro, leads partner-expansion conversations, described as challenging to communicate with).\nCustomer (HealthPlan Services/Mountain Health): Deana Rhoades (President & CEO, signed the 0057 SOW). Third-party vendor: RealRx (pharmacy data — EOB Pharmacy, FormularyDrug, CoveragePlan).",
      "risks_and_blockers": "1) Contracting friction: Wipro is \"incredibly challenging to deal with\" — Jodi cited 65+ emails and multiple no-show meetings; contracts negotiate out of India; renewal nearly slipped its 10-day expiry window (Aug 2025). 2) Multi-party comms gap: \"communication gets lost between Wipro and Mountain Health\"; 1up rarely reaches the plan directly (Olivia never met the plan during New Sales). 3) Data-quality/compliance gap: as of Mar 2026 (ISS-89 era), Mountain Health had ZERO Provider Directory Practitioner & Organization resources in its public endpoints — Wipro never sent PROD Practitioner/Organization files after go-live despite being in scope for Patient Access; Trang/Anissa opened customer outreach. This is a live 9115/Provider Directory compliance exposure. 4) Recurring file hygiene issues: wrong naming conventions repeatedly; late pipe- vs comma-delimited change (Oct 2025) that Stephanie flagged as a potential chargeable change order; EOB Header/LineItem errors during 2025 historical load caused delays. 5) Kibana proxy issue open at handoff (OPSREQ-10135). 6) ePA blocked: Mountain Health is mid-replacement of their UM system, so not ready to commit to ePA (Aug 2025). 7) 0057 timeline risk: signed SOW kickoff is Aug 23, 2026, which conflicts with the roster's stated Q3 go-live — schedule needs reconciliation.",
      "points_of_interest": "- This is a channel/sell-through partner motion: Wipro is an SI that builds admin/claims/compliance tech for multiple payer clients and selected 1up as the FHIR interop + compliance-API layer; Mountain Health is the first customer instantiated. 1up leadership explicitly views Wipro's \"book of business\" as the expansion prize (Geetika: go-live \"unlocked more of Wipro's BoB\"; Nov 2025 Wipro partner-expansion meetings led by Rob Bradley/Jodi with slides framing \"how we expand partnership by taking this use case to additional customers\").\n- Nov 18, 2025: Maria Baker noted the Wipro AE (\"Dani\") confirmed Mountain Health has other LOBs beyond Medicare Advantage — an in-account LOB-expansion opportunity, plus uncertainty about how viable the broader \"strategic partner path\" is.\n- Compliance/audit posture: Wipro has routed Mountain Health system-audit questionnaires and vendor-audit/evidence requests to 1up (Apr 2025, Sep 2025) — signals plan-level regulatory scrutiny 1up must support.\n- 0057 EOB uses DaVinci PDex PA IG for Prior Auth; P2P built with dynamic Group/Match APIs, inbound driven by a member opt-in file.",
      "expansion_plays": [
        {
          "play": "ePA / Prior Authorization API (Burden Reduction) upsell",
          "rationale": "Jodi has repeatedly flagged 'they need to buy ePA' (Feb 2026 DM) and pulled Jeremy Yoon into ePA discovery calls (Jun 2026). The 0057 SOW already lands Prior Auth EOB data elements, so the DaVinci PAS/CRD/DTR ePA layer is the natural next attach. Currently blocked because Mountain Health is mid-replacement of its UM system — time the play to that UM decision and pre-position pricing (Jodi has signaled she'll raise ePA pricing at contract).",
          "fit": "high"
        },
        {
          "play": "Extend the 9115 + 0057 suite to Mountain Health's additional lines of business",
          "rationale": "Everything to date is a single LOB (Medicare Advantage). The Wipro AE confirmed Mountain Health has other LOBs; adding Patient Access/Provider Directory/Provider Access/P2P for those LOBs is low-friction incremental ARR on an already-live, proven pipeline (S3+NiFi+FHIR stack already stood up).",
          "fit": "high"
        },
        {
          "play": "Replicate the Mountain Health template across Wipro's channel book of business",
          "rationale": "Wipro is an SI serving multiple payer clients and 1up is already treating it as a sell-through partner. The Mountain Health go-live is the reference implementation; leadership (Rob Bradley/Jodi/Geetika) is actively running partner-expansion conversations to package this 9115+0057 use case for Wipro's other health-plan customers. Highest strategic upside but gated by Wipro's difficult contracting behavior and unclear commitment to the 'strategic path.'",
          "fit": "medium"
        }
      ],
      "plays_hi": 2,
      "sources": [
        "Slack #account-wipro (C07JC8BKVGE) — history 2024-2026 (audit questionnaire, vendor-audit POC requests)",
        "Slack #account-wipro-mountainhealth-implementations (C07FS8CG96U) — weekly status updates Jun 2025-Jul 2026; 0057 SOW PDF posted 2026-04-02; Mar 2026 missing PD Practitioner/Org prod-file thread",
        "Slack #general (C2YPYSZFF) 2025-10-31 — Anissa Nashikkar go-live announcement (9115 Patient Access/Provider Directory, 1 LOB, 14-month project)",
        "Slack #growth-updates (C07P8HKL52B) 2025-07-03 — Jodi AM update (Wipro/Mountain Health 0057 scoping)",
        "Slack Group DM (C09RH27Q6KU) Nov 2025 — Wipro partner-expansion planning (Rob Bradley, Maria Baker, Jodi, Anissa); 'Dani' AE, additional LOBs",
        "Slack Group DM (C095THKPH9R) 2025-08-12 — 4+ yr renewal / CPI negotiation (Jodi, Dan Petersen, Mark Wolf, Nolan Kelly)",
        "Slack Group DM (C08TFLEAP7E) 2025-05-21 — Nolan Kelly explains Wipro=SI, Mountain Health=client, 1up=FHIR interop/compliance API layer",
        "Slack #core-data-support / #mte-reporting-launch (Mar 2026) — confirmation mountain health = wipro = HealthPlan Services, Inc.; ISS-58/ISS-89 usage-report account-mapping",
        "Slack DMs — Jodi/Geetika (ePA need), Jodi/Jeremy Yoon (ePA call Jun 2026), Jodi/Rob Bradley (product deep dive Sep 2025)",
        "Confluence CKB page 1688961025 — 'Wipro / Mountain Health <> Handoff to Customer Care' (products, contacts, resources, go-live 10/31/2025, tech variations)",
        "Confluence CKB Wipro project meeting minutes (pages 1060536417, 1115226113, 1126596609, 1174438010, 1273888892, 1369899009, 1556250625, 1592950785, 1621131267) — Wipro/1up contacts",
        "Confluence CKB page 1679982645 — 'Wipro Ongoing Files' table; page 1556250625 8/25/2025 minutes",
        "Jira TOPS-6263 (Checkly dashboard: env 1up-mountainhealth-prod, api.mountainhealthfhir.com/r4, PAS v2); ISS-89 coverage data mapping; OPSREQ-10135 Kibana proxy",
        "Signed SOW '1upHealth_Wipro SOW.pdf' (F0AQKT4LWKY) — CMS-0057 Provider Access + P2P In/Outbound + Patient Access PA EOB; $20,000 services; kickoff/commencement Aug 23, 2026; Exhibit A file list; signed Deana Rhoades (HealthPlan Services) & Andrew Boyd (1up), Apr 1-2 2026"
      ],
      "sf": {
        "arr": 66227.637264,
        "cumulative": 527471,
        "product_rev": 467971,
        "services_rev": 59500,
        "health": 10,
        "temperature": null,
        "nps": null,
        "renewal_sentiment": 4,
        "sentiment_notes": null,
        "flags": [],
        "renewal": "2029-12-31",
        "contract_exp": null,
        "customer_since": "2024-08-26",
        "go_live": null,
        "impl_level": null,
        "products_sold": null,
        "lobs": "Exchange;Commercial",
        "members_contracted": null,
        "members_current": null,
        "competitors": null,
        "pbm": null,
        "owner": "Rob Bradley",
        "csm": "Geetika Arora",
        "exec_sponsor": "Stephanie Iheme",
        "tier": "Grow",
        "opps": [
          {
            "name": "Wipro_Mountain Health Co-Op_Platform, Patient Access, Provider Directory",
            "type": null,
            "closed": "2024-08-07",
            "arr": null,
            "services": 39500,
            "amount": 129000,
            "months": 11.99,
            "owner": "Olivia Cleworth",
            "won_because": "Confidence in a long term partnership with 1upHealth",
            "competitor": null
          },
          {
            "name": "26-27 Wipro P2P, Provider Access",
            "type": null,
            "closed": "2025-08-22",
            "arr": null,
            "services": 20000,
            "amount": 65000,
            "months": 11.96,
            "owner": "Jodi Patton",
            "won_because": "0057",
            "competitor": null
          },
          {
            "name": "25 -26 Wipro Renewal + CPI increase",
            "type": null,
            "closed": "2025-08-25",
            "arr": null,
            "services": null,
            "amount": 92500,
            "months": 52.27,
            "owner": "Jodi Patton",
            "won_because": "renewal",
            "competitor": null
          },
          {
            "name": "27-28 Wipro Renewal + CPI increase",
            "type": null,
            "closed": "2025-08-25",
            "arr": null,
            "services": null,
            "amount": 145099,
            "months": 11.99,
            "owner": "Jodi Patton",
            "won_because": "renewal",
            "competitor": null
          },
          {
            "name": "26-27 Wipro Renewal + CPI increase",
            "type": null,
            "closed": "2025-08-25",
            "arr": null,
            "services": null,
            "amount": 95872,
            "months": 11.96,
            "owner": "Jodi Patton",
            "won_because": "renewal",
            "competitor": null
          }
        ]
      }
    },
    {
      "id": 33,
      "name": "Chinese Community Health Plan",
      "quarter": "q3",
      "qlabel": "Q3 · Jul–Sep",
      "seg": "medadv",
      "seglabel": "Medicare Advantage",
      "note": "",
      "full": "Chinese Community Health Plan (CCHP)",
      "dq": "rich",
      "products_and_scope": "Live since 12/13/2024 (CMS-9115): Patient Access, Provider Directory, Payer-to-Payer Send + Health History (P2P HH). Two lines of business (LOBs): \"CCHP\" (Medicare Advantage) and \"Balance\" (Commercial), each with its own email-based Auth App. Originally contracted for 30K members (actual membership under 13K). Formulary files sourced from MedImpact. Non-DIMA SOW originally, with interest in mapping to DIMA specs.\n\nContract history: 2023 original SOW $87,500 ARR + $72K services (Patient Access, Provider Directory, P2P) [#arr-services-new-bookings 2023-07-31]. Dec 2024: 1-yr renewal, $85K ARR (PA/PD/P2P) [#renewals 2024-12-31]. Sept 2025: an SOW marked \"Signed\" [#sows-inflight 2025-09-09]. Dec 2025: 3-year renewal WITH CMS-0057 — $75,000 ARR upsell (Provider Access + ePA) + $40,000 services, ~$85K total ARR; October 2026 implementation start with executed SOW [#arr-services-new-bookings & #renewals 2025-12-30]. Signer contact: larry.loo@cchphealthplan.com. MPF (Medicare Plan Finder) gap analysis prepared by 1up but not yet contracted; clinical data / Pop Connect discussed repeatedly since 2023 but never closed.",
      "implementation_status": "9115 stack fully LIVE and in production since 12/13/2024 (on time; go-live confirmed in 12/31/24 implementation call notes). Migrated from MTE to STE (single-tenant) — Patient Viewer used for UAT across both LOBs. AWS prod environment 1up-cchp-prod; tenant slug \"cchp\"; console at chinesecommunityhealthplanfhir.console.1up.health. 9115 P2P Send + HH complete for both CCHP and Balance LOBs (Confluence P2P status page).\n\nCMS-0057 (Provider Access + ePA): contracted in the Dec 2025 3-yr renewal but NOT started — implementation scheduled to begin October 2026 (Q3/Q4 boundary). As of 2026, 0057 is effectively ON HOLD: in April 2026 CCHP told CSM Holly Fan they wanted to (1) negotiate a 9115 discount and (2) back out of 0057 due to budget; they had signed the order form containing 0057 but there was likely internal misalignment. As of 6/22/2026, Jodi Patton confirmed \"0057 is on hold\" and MPF has made no progress. AM (Jodi) is actively navigating to keep the 0057 commitment intact.",
      "tech_architecture": "Small SF-based not-for-profit MA + Commercial plan; largely manual, low API maturity (just building their first vendor integration as of May 2026). Core systems: Meditrac (Conduent) = claims adjudication + hub for all prior auth rules/config; InterQual API = ePA/UM decisioning support; MedImpact = PBM/formulary; PointClickCare = ADT; Cozeva = value-based care / HEDIS / risk adjustment / care-gap / provider analytics (also used for Cerner chart retrieval); Essette (Gainwell) = case management (1up has an existing partner relationship here for prior auth); Conduent stack also includes I-Transact member/provider portal and HSP; HIPAAsuite processes EDI 834/837; Optum used for CES (clinical editing) and pricing tools. Provider groups are largely Epic and Cerner shops; many providers use Elation EHR. Delegated relationships with Sutter Health and UCSF, plus affiliated Chinese Hospital. Current PA workflow is very manual (fax/email, entered by a nurse into Meditrac; delegated UMs return approved/denied PAs via batch file for claims adjudication). CCHP wants to stay vendor-agnostic and avoid API lock-in to Meditrac/HSP — expressed interest in a batch-file approach.",
      "financial_signals": "2023 original: $87,500 ARR + $72K services (PA/PD/P2P) [#arr-services-new-bookings 2023-07-31]. Dec 2024: $85,000 ARR 1-yr renewal (PA/PD/P2P) [#renewals 2024-12-31]. Dec 2025: 3-yr renewal with 0057 — $75,000 ARR upsell (Provider Access + ePA) + $40,000 services, ~$85K total ARR; Oct 2026 start [#arr-services-new-bookings & #renewals 2025-12-30]. Note: Dec 2025 renewal was flagged by AM as at-risk in April 2026 (customer wanted to back out of 0057 / discount 9115), so the $75K 0057 upsell ARR is contracted but implementation-at-risk. MPF and Pop Connect/clinical data are open (uncontracted) opportunities.",
      "key_people": "Customer (CCHP): Ketan Gima — COO (repeatedly praised 1up's stewardship/communication; earlier Confluence lists Toni Bonde as COO in Feb 2024, suggesting a leadership change); Christopher Aguirre — Director of IT (primary budget/0057 decision contact, provided the 1up testimonial); Harry (\"Harry Mankabady\") — PM/Business Analyst; Derrick Tai — Lead Analyst; Ting Leong — Analyst; \"Hari\" and \"Larry Loo\" (larry.loo@cchphealthplan.com, contract signer). 1up-side: Jodi Patton — Account Manager (owner, has done 2 onsite visits in SF Chinatown); Holly Fan — current CSM; Rachel Schuler — original Implementation PM; Anissa Nashikkar — implementation (drove go-live); simone — Data Engineer; Jeremy Yoon — prior auth / 0057 scoping; Anton, Ryan Ingram — Sales Engineer; Nolan Kelly — sales leadership; Stephanie Iheme — CS/implementation; Dan Petersen — signer/exec; Melissa Pino — customer marketing (testimonial/case study).",
      "risks_and_blockers": "HIGH RISK on 0057 execution. (1) Budget: small plan (under 13K members, lean ops, tight budget); openly struggled to fund 0057 and in April 2026 asked to back out of 0057 and discount 9115. (2) Internal misalignment/confusion: two order forms (with/without 0057) went out end of 2025; they signed the 0057 version but may have had internal misalignment; AM describes them as \"a mess\" / \"always confused.\" Contacts (Hari, Christopher) didn't recognize what MPF was. (3) Low API/technical maturity — systems largely manual, building their first integration, needs heavy 0057 education (education gaps surfaced across multiple 2025 calls). (4) Vendor lock-in resistance — don't want to be tied to Meditrac/HSP API; prefer vendor-agnostic batch. (5) Stars/HEDIS exposure — CMS Stars 2.5–3.0 on MA contract = bonus-payment risk (a pain point, but also a lever). (6) Scheduling/attendance churn — repeated misaligned/rescheduled calls in 2025. Implementation not starting until Oct 2026 gives runway but also lets momentum stall.",
      "points_of_interest": "Very strong relationship despite operational messiness: CCHP COO gave repeated unsolicited kudos (\"rare and refreshing... owns and proactively communicates outcomes\"), Christopher Aguirre provided a written testimonial and agreed to a case study (customer-marketing, April 2025). CCHP invited Jodi into their internal IT meeting — a strong openness signal. Historical-load overage: 2024 load hit ~38,100 patients vs 30K scoped — a scope/upsell flag. Jodi's explicit strategic thesis (May 2026, #people_leaders): CCHP is actively trying to consolidate vendors, so 1up should position as a simplifier/displacer (targets flagged: MedImpact PBM, Meditrac/Conduent, InterQual) rather than an additive cost — vendor consolidation is the lever that frees budget. Existing 1up partner relationships to leverage: Essette (Gainwell) for prior auth and Conduent. Affiliated with Chinese Hospital (only independent Chinese hospital in US); culturally/linguistically tailored care drives their patient-experience-first vendor evaluation.",
      "expansion_plays": [
        {
          "play": "Rescue and land the already-contracted 0057 (Provider Access + ePA) starting Oct 2026",
          "rationale": "They signed the 3-yr renewal with $75K ARR 0057 upsell but are wobbling on budget/execution. Frame ePA as a manual-PA replacement: today PAs are faxed/emailed and hand-keyed by a nurse into Meditrac with InterQual — 1up ePA + Provider Access directly automates that pain. Lean on the existing Essette (Gainwell) and Conduent partner relationships and a batch/vendor-agnostic option to answer their Meditrac lock-in objection. This is the single highest-value, already-paid-for motion; protecting it is priority #1.",
          "fit": "high"
        },
        {
          "play": "Pop Connect / clinical data for HEDIS & Stars improvement",
          "rationale": "CCHP's CMS Stars are only 2.5–3.0 with real bonus-payment exposure, and HEDIS is a named pain point. Clinical data has been discussed since 2023 (CC demo, Cozeva/Cerner chart retrieval, provider groups on Epic/Cerner). Position Pop Connect clinical-data aggregation on the FHIR pipes already flowing to feed care-gap closure and risk adjustment — tying directly to bonus dollars gives the budget justification they lack.",
          "fit": "medium"
        },
        {
          "play": "Medicare Plan Finder (MPF)",
          "rationale": "CCHP is an MA plan and 1up already has an MPF gap analysis prepared for them, but contacts didn't understand MPF when raised. Requires education-first (CMS memo follow-up already started by Holly). Real but needs demand-creation; sequence it behind stabilizing 0057.",
          "fit": "low"
        }
      ],
      "plays_hi": 1,
      "sources": [
        "Slack #account-chinesecommunityhealthplan (C05K5CNAU6B) — full channel history 2023-2026: kickoff, LOB/Auth App scope, 30K member scope, go-live, ePA/Provider Access pricing requests, 9115 P2P endpoint publication",
        "Slack #people_leaders 2026-05-07 (Jodi Patton onsite recap: plan profile, vendor landscape, Stars 2.5-3.0, consolidation thesis)",
        "Slack #arr-services-new-bookings 2023-07-31 ($87.5K+$72K) and 2025-12-30 ($75K 0057 upsell + $40K services, Oct 2026 start)",
        "Slack #renewals 2024-12-31 ($85K 1-yr) and 2025-12-30 (3-yr with 0057)",
        "Slack #sows-inflight 2025-09-09 (SOW Signed)",
        "Slack #general 2024-12-23 (go-live: PA/PD/P2P Send/HH, 2 LOBs CCHP+Balance, COO Ketan Gima)",
        "Slack Group DM 2026-04-16 (Stephanie Iheme/Jodi/Nolan — customer wants to back out of 0057, discount 9115, MPF gap analysis ready)",
        "Slack DM 2026-06-22 (Holly Fan/Jodi — 0057 on hold, MPF no progress, formulary via Patient Access)",
        "Slack #growth-updates 2025-05 through 2026-01 (repeated CCHP 0057 education gaps, clinical data escalation, renewal close)",
        "Slack #customer-marketing 2025-04-18 (Christopher Aguirre testimonial)",
        "Slack #serving-platform & #foundation-ux-collab (STE migration, Patient Viewer, 2-LOB client-ID mapping, tenant slug cchp)",
        "Confluence: Chinese Community Health Plan (CCHP) — Compliance space, pageId 1955299358 (PA workflow, Meditrac/Conduent/InterQual/HSP/HIPAAsuite/Optum architecture, vendor-agnostic/batch desire)",
        "Confluence: P2P Implementation - Customer Status and Info (pageId 100171970) — CCHP + Balance LOB P2P Send/HH complete",
        "Confluence: 02/21/24 CCHP/1upHealth Technical Call (pageId 397606913) — customer roster: Toni Bonde COO, Christopher Aguirre Dir IT, Ting Leong, Harry Mankabady, Derrick Tai",
        "Confluence: CCHP implementation call notes (Dec 2023 scope page 650379301; go-live 12/31/24 page 1057259610)",
        "Jira: TOPS-247/TOPS-244 (1up-cchp-prod Checkly), SEC-3615 (Patient Viewer IdP), SPL-1283 (Patient Viewer whitelist)"
      ],
      "sf": {
        "arr": 53333.33332800001,
        "cumulative": 442000,
        "product_rev": 330000,
        "services_rev": 112000,
        "health": 1,
        "temperature": null,
        "nps": null,
        "renewal_sentiment": 1,
        "sentiment_notes": null,
        "flags": [
          "ROI in question"
        ],
        "renewal": "2028-12-30",
        "contract_exp": "2024-12-30",
        "customer_since": "2023-12-31",
        "go_live": null,
        "impl_level": null,
        "products_sold": null,
        "lobs": "Medicare;Exchange;Commercial",
        "members_contracted": 30000,
        "members_current": 9581,
        "competitors": null,
        "pbm": null,
        "owner": "Jodi Patton",
        "csm": "Holly Fan Test",
        "exec_sponsor": "Mohammad Jouni",
        "tier": "Maintain",
        "opps": [
          {
            "name": "Chinese Community Health Plan",
            "type": "0125f000000iH45AAE",
            "closed": "2023-10-01",
            "arr": null,
            "services": 72000,
            "amount": 157000,
            "months": 12.02,
            "owner": "Ariana Zamora",
            "won_because": "Relationship with HPA helped moved the deal forward.",
            "competitor": null
          },
          {
            "name": "24-25 CCHP Renewal",
            "type": "Existing Business",
            "closed": "2024-12-31",
            "arr": 85000,
            "services": 0,
            "amount": 85000,
            "months": 11.96,
            "owner": "Jessica Candito",
            "won_because": "2025 Renewal",
            "competitor": null
          },
          {
            "name": "25-28 CCHP Provider Access, ePA",
            "type": "Existing Business",
            "closed": "2025-12-30",
            "arr": 85000,
            "services": 40000,
            "amount": 115000,
            "months": 35.98,
            "owner": "Jodi Patton",
            "won_because": "2025 Renewal",
            "competitor": null
          },
          {
            "name": "25-28 CCHP Renewal",
            "type": "Existing Business",
            "closed": "2025-12-30",
            "arr": 85000,
            "services": 0,
            "amount": 85000,
            "months": 35.98,
            "owner": "Jodi Patton",
            "won_because": "2025 Renewal",
            "competitor": null
          }
        ]
      }
    },
    {
      "id": 34,
      "name": "AIDS Health Foundation",
      "quarter": "q3",
      "qlabel": "Q3 · Jul–Sep",
      "seg": "commercial",
      "seglabel": "Commercial / Blues",
      "note": "",
      "full": "AIDS Healthcare Foundation (AHF) / Positive Healthcare",
      "dq": "rich",
      "products_and_scope": "Long-standing customer (since ~2022) that is unusual: AHF is both a large HIV/AIDS provider org AND a health plan (its \"Positive Healthcare\" Medicaid/Medicare managed-care line, largely CA public sector). Contracted member count ~77,000; Public Sector ~2,809 (AHF Growth Plan). Original footprint (~$20K ARR): Patient Access (two LOBs configured — \"AHF\" and \"Positive Healthcare\"), Provider Directory, and Payer-to-Payer \"Send\" API + P2P Health History (1up Auth + System Search iFrame user). Also ingests clinical/lab data (HL7 -> FHIR). 2026 renewal/upsell (booked 2026-01-30): 2-Year Renewal adding ePA (electronic prior auth) + Provider Access API — $103,000 total ARR with a $40,000 upsell + $35,000 services (#renewals, #arr-services-new-bookings). AHF Implementation SOW sent 2026-01-06 (#sows-inflight, Google Doc). Separately, MPF Provider Directory Remediation — $4,000 services, booked 2026-07-08. Growth Plan flagged upsell targets: SQL, Clinical Connectivity, Reg 2.0.",
      "implementation_status": "2026 ePA + Provider Access upsell is contracted (signed 2026-01-30, countersigned by Dan Petersen). Implementation commencement date is 15 Oct 2026 per Jodi Patton (DM 2026-04-10 and group DM 2026-04-15: \"their implementation is Oct 15th\"), planned as a customer-requested \"light kickoff\" focused on ePA (Maria Baker + Rachel Schuler + Assiatou Diallo attending). DISCREPANCY: the research roster lists a Q3 (Jul-Sep) go-live, but all internal 1up messages point to an Oct 15 (Q4) implementation START — roster may be stale or timing shifted. Provider Access questionnaire was slated to go to AHF alongside Alliant and JHHP on 2026-04-07 (readiness channel). AHF is prepping its prior-auth process (email question 2026-04-10 on required IGs/coding; Jeremy Yoon to advise). MPF Provider Directory remediation/URLs in flight July 2026. No go-live announcement found yet. Existing production integrations (Patient Access, P2P, MedImpact data feeds) are live and in steady-state support.",
      "tech_architecture": "Data sourced largely from MedImpact (PBM) via Axway Managed File Transfer; AHF file prefix \"ahf\", pulled to STAGE first, then prod; feeds include claims, provider directory, and formulary/coverage-plan files (MedImpact MFT Connections page, CKB). NiFi pipeline moves files from MFT to S3 bucket 1up-ahf-prod-data-ingest (/completed folder), governed by a crosswalk pull; AHF has an AWS account with bucket-policy access to their ingest folder. Custom auth domain auth.ahffhir.com (OAuth2) fronting a 1up FHIR tenant (fhir-app.1up.health/ahf-prod-test); P2P endpoints in prod (payer2payer, incl. a \"payer2payer-test-positive\" client). Clinical/lab data arrives as HL7 converted to FHIR; a \"void\" column maps to isDelete for Lab Observation deletes. Two Patient Access LOBs (AHF + Positive Healthcare) — Positive's Auth-app client ID fb1bf2a9577272ba4dcf53047c3f6df8 is NOT in Secrets Manager and has no data loaded. Regulated by California DHCS (Positive Healthcare = CA Medicaid/Medicare). ePA/Provider Access to be built on top of this FHIR tenant.",
      "financial_signals": "~$20,000 original ARR (P2P Send API door-opener, 2022-03-08). 2026-01-30: 2-Year Renewal + ePA + Provider Access = $103,000 total ARR, of which $40,000 is upsell + $35,000 services. 2026-07-08: MPF Provider Directory Remediation = $4,000 services. Contract history: original expiration 10/24/2024; renewal repeatedly lapsed (past due 2024; fully lapsed from Oct 2025) before closing 2026-01-30 — described internally as \"the last lingering renewal from 2025.\" Historical note: AHF had unpaid P2P fees (2023).",
      "key_people": "Customer (AHF): Mohandoss Tychicus (CIO, positive/engaged in 2024 SBR); Yousef \"Joe\" Hayek (Yousef.Hayek@ahf.org) and Sudha Anand (Sudha.Anand@ahf.org) — want inclusion on all emails; \"Claudia\" (data/lab file contact); \"Xing\" (technical/ePA contact driving the light kickoff). 1up: Jodi Patton (AM/Growth, owns contract); Lindsay Parker (prior AM); Maria Baker (implementation lead); Trang Derdak (implementation PM); Kyle Brew & Irtiza Mahmud (engineering); Rob McClary and Robert \"Robzzz\" Davis (data eng); Greg Tempesta (data eng, since left channel); Stephanie Iheme (CSM); Rachel Schuler (ePA implementation); Assiatou Diallo (Provider Access/P2P); Jeremy Yoon & Ryan Ingram (SE); Dan Petersen (exec signer); Geetika Arora (CS).",
      "risks_and_blockers": "1) Historically friction-heavy account: threatened legal action during 2023 renewal; unpaid P2P fees; renewals chronically lapse (2024 late, 2025 lapsed from Oct). 2) DHCS audit (Dec 2025) triggered 3 support tickets — missing claims (25% missing because SNF facility-type-coded claims weren't processed, handled as inpatient after guidance) and third-party app connection failures; AHF \"worried about penalties.\" Audit actually created leverage that helped close the renewal (\"nothing says we do need you like a DHCS audit\"). 3) S3 archival concern: files ingested before 2025-12-02 no longer visible in /completed — possible archival policy / access issue (open Dec 2025). 4) Positive Healthcare LOB ambiguity — client ID absent from Secrets Manager, no data loaded; scope unresolved (Jodi to confirm with AHF). 5) Timing risk: implementation not starting until 15 Oct 2026 (vs roster Q3); thin internal coverage (\"a lot of accounts with not a lot of people\"). 6) Lab flow / void-column work historically dropped by AHF (never sent test files).",
      "points_of_interest": "AHF is a global HIV/AIDS nonprofit (largest HIV/AIDS provider worldwide, 45 countries) — an outspoken advocacy org, which shapes a demanding customer posture. It is simultaneously a provider AND a payer (Positive Healthcare plans, mostly CA public sector), making it a natural fit for BOTH clinical-data and payer-compliance products. Feb 2024 SBR (CIO Mohandoss Tychicus): very positive on the partnership; explicitly asked about HL7->FHIR conversion, Pop Connect, Provider Access, and clinical data OUTSIDE their own practices (\"clinical data exchange seems to be working for AHF practices, but interested in clinical data outside\"). MedImpact is a shared PBM dependency (also affects other 1up customers like VNS, Advanced Health, CHG). The Positive Healthcare P2P had a \"payer2payer-test-positive\" endpoint standing since 2023.",
      "expansion_plays": [],
      "plays_hi": 0,
      "sources": [
        "Slack #account-ahf (C01E9A8BL2X) — full channel history 2023-2026 incl. DHCS audit tickets, S3 /completed access, Positive Healthcare LOB thread (ts 1769105520.821739), 2024 SBR notes, HL7 lab/void-column discussion, P2P history",
        "Slack #renewals (C036YVBJMJS) 2026-01-30 — AHF 2-Year Renewal + ePA + Provider Access $103K ARR / $40K upsell / $35K services",
        "Slack #arr-services-new-bookings (C01KG7PJEDV) — 2026-07-08 MPF Provider Directory Remediation $4K; 2026-01-30 ePA+Provider Access booking",
        "Slack #sows-inflight (C09EE0B2V8A) 2026-01-06 — AHF Implementation SOW sent (Google Doc)",
        "Slack #general (C2YPYSZFF) 2025-12-23 — renewal list: 'AHF - 2 year renewal with 0057'",
        "Slack DM Jodi<>Maria (D03HLSZUW85) 2026-04-10 and group DM (C0ATWLN9TT2) 2026-04-15 — AHF implementation commencement Oct 15",
        "Slack DM Jodi<>Jeremy Yoon (D085NBXSATX) 2026-04-10 — AHF prior-auth IG/coding question",
        "Slack #growth-updates (C07P8HKL52B) 2026-01-11 & 2026-02-06 — AHF lapsed renewal then closed with upsell",
        "Slack #2026-0057-access-api--readiness (C0A36DHR84R) 2026-04-07 — Provider Access questionnaire to AHF",
        "Confluence: AHF Growth Plan (APH/318341187) — ARR, member counts, products, 2023 legal-threat history, CIO/exec contacts",
        "Confluence: MedImpact MFT Connections (CKB/318308543) — AHF file prefix 'ahf', Axway MFT, NiFi/S3, claims+provider directory+formulary",
        "Confluence: Patient Mediated Options and Risks (Ingest/396427351) — AHF listed as iFrame/Health History P2P user",
        "Confluence: Back Filling Tenant->Customer Mapping (API/1903263746) — AHF = AIDS Healthcare Foundation tenant 'ahf'"
      ],
      "sf": {
        "arr": 46742.020944,
        "cumulative": 775356,
        "product_rev": 392356,
        "services_rev": 39000,
        "health": 9,
        "temperature": "Yellow",
        "nps": null,
        "renewal_sentiment": 5,
        "sentiment_notes": "Client concern with current discrepancies given audit at hand.",
        "flags": [
          "ROI in question",
          "Service Concern"
        ],
        "renewal": "2028-10-14",
        "contract_exp": "2024-10-14",
        "customer_since": "2023-03-08",
        "go_live": "2021-06-30",
        "impl_level": "Level V",
        "products_sold": "Patient Access;Provider Directory",
        "lobs": "Medicaid;Medicare Advantage",
        "members_contracted": 100000,
        "members_current": 10642,
        "competitors": null,
        "pbm": null,
        "owner": "Jodi Patton",
        "csm": "Geetika Arora",
        "exec_sponsor": "Jodi Patton",
        "tier": "Maintain",
        "opps": [
          {
            "name": "AIDS Healthcare Foundation (AHF) - CMS Rule",
            "type": "0125f000000iH45AAE",
            "closed": "2020-11-12",
            "arr": null,
            "services": 0,
            "amount": 148000,
            "months": 11.96,
            "owner": "Matt Dula",
            "won_because": null,
            "competitor": null
          },
          {
            "name": "RENEWAL 2021 - AHF Platform",
            "type": "0125f000000iHVSAA2",
            "closed": "2021-10-15",
            "arr": null,
            "services": 0,
            "amount": 98000,
            "months": 11.96,
            "owner": "Matt Dula",
            "won_because": null,
            "competitor": null
          },
          {
            "name": "AHF P2P Send API",
            "type": "0125f000000iH45AAE",
            "closed": "2022-03-08",
            "arr": null,
            "services": 0,
            "amount": 10000,
            "months": -0.03,
            "owner": "Ariana Zamora",
            "won_because": null,
            "competitor": null
          },
          {
            "name": "RENEWAL 2022 - AHF Platform",
            "type": "0125f000000iHVSAA2",
            "closed": "2022-10-15",
            "arr": null,
            "services": 0,
            "amount": 98000,
            "months": 11.96,
            "owner": "Ariana Zamora",
            "won_because": null,
            "competitor": null
          },
          {
            "name": "RENEWAL 2023 - AHF P2P Send API",
            "type": "0125f000000iHVSAA2",
            "closed": "2023-05-11",
            "arr": null,
            "services": 0,
            "amount": 12056,
            "months": 7.23,
            "owner": "Ariana Zamora",
            "won_because": null,
            "competitor": null
          },
          {
            "name": "RENEWAL 2023 - AIDS Healthcare Foundation (AHF)",
            "type": "0125f000000iHVSAA2",
            "closed": "2023-12-18",
            "arr": null,
            "services": 0,
            "amount": 118000,
            "months": 11.99,
            "owner": "Lindsay Parker",
            "won_because": "current relationship",
            "competitor": null
          },
          {
            "name": "RENEWAL 2024 - AIDS Healthcare Foundation (AHF)",
            "type": "0125f000000iHVSAA2",
            "closed": "2024-11-08",
            "arr": 118000,
            "services": 0,
            "amount": 118000,
            "months": 11.96,
            "owner": "Jessica Candito",
            "won_because": "current relationship",
            "competitor": null
          },
          {
            "name": "25-27 AIDS Healthcare Foundation (AHF) - Provider Acces, ePAs",
            "type": "0125f000000iHVSAA2",
            "closed": "2026-01-30",
            "arr": 118000,
            "services": 35000,
            "amount": 69000,
            "months": 11.96,
            "owner": "Jodi Patton",
            "won_because": "25'-26' renewal",
            "competitor": null
          },
          {
            "name": "25-27 AIDS Healthcare Foundation (AHF) Renewal",
            "type": "0125f000000iHVSAA2",
            "closed": "2026-01-30",
            "arr": 118000,
            "services": 0,
            "amount": 100300,
            "months": 23.95,
            "owner": "Jodi Patton",
            "won_because": "25'-26' renewal",
            "competitor": null
          },
          {
            "name": "AHF - MPF Remediation",
            "type": null,
            "closed": "2026-07-08",
            "arr": null,
            "services": 4000,
            "amount": 4000,
            "months": 12.48,
            "owner": "Jodi Patton",
            "won_because": "MPF",
            "competitor": null
          }
        ]
      }
    },
    {
      "id": 35,
      "name": "Cox HealthPlan",
      "quarter": "q4",
      "qlabel": "Q4 · Oct–Dec",
      "seg": "medadv",
      "seglabel": "Medicare Advantage",
      "note": "",
      "full": "Cox HealthPlans",
      "dq": "rich",
      "products_and_scope": "Cox HealthPlans (locally-based Ozarks/Missouri insurer, affiliated with CoxHealth; two lines of business — Medicare Advantage \"MA\" and Individual Exchange/Marketplace \"EX/MP\"). Original 2023 deal (migrated FROM Change Healthcare): $49,500 ARR + $40k Services for Patient Access, Provider Directory, and Payer-to-Payer (P2P) plus platform — internally labeled \"1up Comply\" (Confluence \"Cox Growth Plan\"). Contracted for ~10K members (25K total; ~4,000 MA, ~1,200 Exchange).\nLayered on since: (1) 2024 capacity increase; (2) 2025 Provider Access upsell (0057) — Provider Access SOW fully executed 2025-09-09; (3) 2026 MPF (Medicare Plan Finder / CMS-4208-F2 provider-directory) remediation, $7k services, SOW signed with 9/1/2026 start. CMS-0057 scope for Cox = Provider Access + P2P (ePA/Prior Auth was NOT confirmed purchased for Cox in the data reviewed). Notable scope decisions: no Personal Representative workflow (Cox only keeps PR data in a free-text form field); 1up generates Observation/lab resource IDs since Cox has none. Aug 2025: Cox requested adding two additional MA plans to 1up extracts effective 10/1 — CMH MA and Phelps Health MA (per Alyssa on the call).",
      "implementation_status": "Original Patient Access + Provider Directory go-live: 12/28/2023; handoff to CS/Support 1/29/2024 (Confluence handoff page). That core is LIVE and in production (ongoing MA + EX file ingestion, monitored in Grafana/Kibana). The CMS-0057 Provider Access/P2P work is the active, at-risk workstream: originally committed earlier in 2026 but the account was disengaged — Jodi (2026-04-14): \"Cox... haven't been engaged on implementation. I aligned with services and agreed that we should move their implementation to September.\" A signed amendment/order form pushed Provider Access start from 6/1 to 9/1/2026 (fee pro-rated, ARR pushes to 9/1) and added the MPF project. Jodi confirmed 2026-05-12: \"Cox officially moved their 0057 implementation date to 9/1/2026. They also signed their MPF SOW - start date of 9/1 as well.\" Roster says Q4 (Oct-Dec) go-live — consistent with a 9/1 implementation start feeding a Q4 go-live. MPF: as of mid-2026 MPF SOWs were executing company-wide; Cox's MPF file remediation is the concrete deliverable. Robert Davis (IM) left the #account-cox channel 2026-07-06.",
      "tech_architecture": "Batch/file-based FHIR ingestion. Cox pushes member/compartment files (Patient, Coverage, EOB header/line-items/diagnosis/procedure, Organization, Practitioner, Observation/labs) to S3 (s3://1up-coxhealthplan-prod-data-ingest/incoming/). Pharmacy/PBM data (EOB_Pharmacy, Formulary/FormularyDrug, PharmacyDirectory/PharmacyNetwork) comes from vendor Elixir into .../elixir/. Pipeline: NiFi flow (dedicated \"Cox Nifi\" instance, SSH-accessed) → DIMA mapping tool → RDS (staging tables/views) → FHIR R4 server, fronted by a fhir-r4 Lambda. Data is partitioned by LOB (ma / ex) with separate Patient Access + Shared Resource client_id/secret pairs per LOB per environment (test/prod) — 4 public + 4 shared client IDs. Public-facing Provider Directory API per LOB. Monitoring via Grafana (resource-level Sev tiers, \"With Support\") and Kibana (audit/authorization metrics). Custom engineering: EOB_Pharmacy → Coverage crosswalk (Cox/Elixir cannot supply Coverage ID in the claims extract — same claim-to-coverage crosswalk pattern documented for Cascade); ICD version hardcoding; date-format (YYYYMMDD→YYYY-MM-DD) Groovy transforms. Formulary dependency: MI standard requires a Coverage Plan file that Cox does not send (workaround = hardcode values). Formulary generation moved vendor-side from E1/MMIT to M1, forcing file-format rework (Jan 2025).",
      "financial_signals": "Recon extracts (from #arr-services-new-bookings, cited as-is): 2023-06-01 — $49,500 ARR + $40k Services (Patient Access, Provider Directory, P2P + platform; migrated from Change). 2024-04-01 — capacity increase: $6,233 ARR prorated + $25,000 ARR at 6/1/24 renewal. 2025-04-28 — Provider Access upsell on renewal: $45,000 CARR + $9,000 Services. 2026-05-12 — MPF provider-directory file remediation: $7,000 Services. Confluence \"Cox Growth Plan\": $49,500 ARR base, renewal 5/31/2024. Contract migrated from Change Healthcare. Signature chain 2026: John Lambrecht countersigned the Cox Amendment + Order Form (pushing Provider Access to 9/1, adding $7k MPF services), Katie Hogan handled DocuSign, sent to Susan Sanchez. Note IQVIA is a separate/unrelated payables item, not Cox revenue. Rough current ARR (base + capacity + Provider Access upsell) ≈ $120K+, plus services — figure is inferred, not a single cited total.",
      "key_people": "Customer (Cox HealthPlans): Susan Sanchez (Executive Sponsor, ssanchez@coxhealthplans.com) — primary signature/escalation contact in 2026; Pat Farris/Ferris (Project Manager & data-pipeline support contact, pfarris@coxhealthplans.com); Susan Butts (CIO, sbutts@coxhealthplans.com — \"relationship has been challenging\"); Matthew \"Matt\" Aug (CEO); Melissa Odom; Kaitlyn Hammond; \"Alyssa\" (raised adding CMH MA & Phelps Health MA plans). 1upHealth: Robert Davis (Implementation Manager — left channel 7/6/2026); Tania Gregory (Data Implementation Engineer, primary builder); Rachel Schuler (IM coverage); Chad Clough (client-ID/infra); Avi Lessure (data engineer, formulary/EOB); Maria Baker (CSM/Services); Stephanie Iheme (Services leadership); Geetika Arora (0057 program PM, owns escalation); Holly Fan (implementation); Jodi Patton (account owner/exec sponsor internally); John Lambrecht (exec signer); Katie Hogan (contracts/DocuSign).",
      "risks_and_blockers": "ENGAGEMENT RISK is the headline: Cox went unresponsive on the 0057 implementation. 2026-02-20 (#2026-0057-access-api--readiness, Geetika Arora): \"Cox - Still no response since endpoint URL email was sent, we will need to send a fun escalation email... I want to see who Jodi has connections with there first.\" This forced the whole implementation to slip to a 9/1/2026 start. CIO relationship flagged as \"challenging\" (Growth Plan). Data-quality/vendor-dependency risks are chronic: reliance on Elixir for all pharmacy files; missing Coverage Plan file blocks standard Formulary ingestion; missing required fields historically (icd_version, billing_provider_npi, insurance_focal, payment_status, null Observation codes) forcing crosswalks/hardcoding; formulary vendor switch (E1/MMIT→M1) broke file format. Compliance exposure: Cox underwent a CMS audit (Jul 2025, needed MA client ID for Kibana metrics) and a Marketplace audit (Oct 2024, interop webpage + consent language). Adding CMH MA & Phelps Health MA plans (10/1) may need scoping for logical separation in the FHIR server — not yet scoped. IM Robert Davis leaving the channel just before go-live is a continuity risk.",
      "points_of_interest": "This is a Change Healthcare take-out account — 1up displaced Change for CMS compliance, a proof point. Rare dual-LOB (MA + Exchange) file architecture with per-LOB client-ID partitioning is a reusable template (cited as an example in the internal \"Lines of Business vs Data Partitions\" best-practice page). Cox is effectively a hub for CoxHealth-affiliated plans — it is already absorbing additional MA plans (CMH MA, Phelps Health MA) into 1up's pipeline, i.e. organic member/lives growth inside one contract. The 9/1 date is a triple-stack: Provider Access start, P2P, and MPF SOW all commence 9/1/2026, converging toward a Q4 go-live — a lot riding on one date for a historically disengaged customer. MPF is driven by CMS-4208-F2 (a detail the team itself had to reconcile — MPF/Medicare Plan Finder maps to 4208-F2, not 0057).",
      "expansion_plays": [
        {
          "play": "ePA / Prior Authorization (CMS-0057 API) add-on to complete the 0057 suite",
          "rationale": "Cox bought Provider Access + P2P for 0057 but ePA/Prior Auth was not in scope. They are already paying for the FHIR platform, Provider Directory, and member/claims data flows; ePA is the remaining 0057 pillar and 1up is actively running ePA scoping/SOW motions with other payers (e.g., Vaya). Natural post-0057 attach once the 9/1 Provider Access/P2P go-live stabilizes.",
          "fit": "high"
        },
        {
          "play": "Quality / risk analytics (popconnect / clinical-data) on the FHIR data already flowing",
          "rationale": "Cox already sends 4+ years of MA + Exchange EOB/claims, Coverage, Provider, and Observation/lab data, all normalized to FHIR R4 in 1up's server. That corpus can be monetized as HEDIS/Stars quality reporting or risk-adjustment analytics with minimal new ingestion — a value-add upsell on data 1up is already storing, and a hedge against the account being seen as pure compliance plumbing.",
          "fit": "medium"
        },
        {
          "play": "Land-and-expand additional CoxHealth-affiliated plans + capacity increases",
          "rationale": "Cox is already asking to add CMH MA and Phelps Health MA plans to 1up extracts (10/1), and history shows repeated capacity increases as lives grow (2024 $6,233+$25k). Cox functions as an onboarding hub for affiliated Ozarks plans — each added plan/LOB is incremental ARR (per-member) plus scoping services, and expands switching costs.",
          "fit": "high"
        }
      ],
      "plays_hi": 2,
      "sources": [
        "Slack #account-cox (C05DUQA3T51) — full channel history 2023-11 through 2026-07 (go-live, Elixir files, NiFi handoff, LOB client IDs, EOB/Formulary/Observation mapping, 0057 date move 2026-05-12, adding CMH MA & Phelps Health MA plans 2025-08-27, CMS audit 2025-07-25)",
        "Slack #2026-0057-access-api--readiness (C0A36DHR84R), Geetika Arora 2026-02-20 — Cox unresponsive since endpoint URL email, escalation planned",
        "Slack search 'Cox MPF SOW go-live' — amendment/order-form signing thread (John Lambrecht/Katie Hogan/Susan Sanchez), Provider Access start pushed 6/1→9/1, +$7k MPF services; implementation moved to September (2026-04-14)",
        "Confluence CKB 353501287 — 'Cox HealthPlans - Handoff to CS and Support' (products, go-live 12/28/2023, handoff 1/29/2024, contacts Susan Sanchez & Pat Farris, EOB_Pharmacy→Coverage crosswalk, SF/opportunity links)",
        "Confluence CKB 119373842 — 'Cox Documentation Hub' (no Personal Representative workflow, dual-LOB MA/EX architecture, S3 paths, per-LOB client IDs, Elixir vendor, 1up-generated Observation IDs)",
        "Confluence APH 321619489 — 'Cox Growth Plan' ($49,500 ARR '1up Comply', renewal 5/31/2024, ~10K/25K members, CIO Susan Butts, CEO Matt Aug, contacts)",
        "Confluence CKB 346784104 — 'Cox Health // Ongoing File Tables'; CKB 191365223 — 'Cox File Counts'; CKB 217907277 — 'Cox // Internal Mapping Decisions'; Services 335675542 — 'Claim To Coverage Crosswalk Logic'; PD 1945796609 — 'Lines of Business vs Data Partitions'",
        "Recon extracts (provided) from #arr-services-new-bookings and #sows-inflight — bookings 2023-06-01, 2024-04-01, 2025-04-28, 2026-05-12; Provider Access SOW executed 2025-09-09"
      ],
      "sf": {
        "arr": 44285.71428,
        "cumulative": 334000,
        "product_rev": 269000,
        "services_rev": 65000,
        "health": 9,
        "temperature": "Green",
        "nps": null,
        "renewal_sentiment": 4,
        "sentiment_notes": "EPIC",
        "flags": [
          "Competitor engaged",
          "ROI in question",
          "Relationship Concern"
        ],
        "renewal": "2028-05-31",
        "contract_exp": "2024-05-31",
        "customer_since": "2023-06-01",
        "go_live": "2023-06-01",
        "impl_level": null,
        "products_sold": null,
        "lobs": "Exchange",
        "members_contracted": 15000,
        "members_current": 16655,
        "competitors": null,
        "pbm": null,
        "owner": "Jodi Patton",
        "csm": "Holly Fan",
        "exec_sponsor": "Jodi Patton",
        "tier": "Maintain",
        "opps": [
          {
            "name": "Cox HealthPlan - Change R&R",
            "type": "0125f000000iH45AAE",
            "closed": "2023-06-01",
            "arr": null,
            "services": 40000,
            "amount": 89500,
            "months": 11.99,
            "owner": "Ariana Zamora",
            "won_because": null,
            "competitor": null
          },
          {
            "name": "Cox HealthPlan - 2024 Renewal",
            "type": "0125f000000iHVSAA2",
            "closed": "2024-04-01",
            "arr": null,
            "services": 0,
            "amount": 74500,
            "months": 11.96,
            "owner": "Ariana Zamora",
            "won_because": "Included the renewal with an outstanding capacity increase to lighten the burden of contracting for the customers.",
            "competitor": null
          },
          {
            "name": "Cox HealthPlans: Renewal Capacity Increase 2024",
            "type": "0125f000000iH4tAAE",
            "closed": "2024-04-01",
            "arr": null,
            "services": 0,
            "amount": 25000,
            "months": 1.97,
            "owner": "Ariana Zamora",
            "won_because": "Combined with the renewal paper work to make it easier for the customer.",
            "competitor": null
          },
          {
            "name": "25-28 Cox - Provider Access",
            "type": null,
            "closed": "2025-04-28",
            "arr": null,
            "services": 18000,
            "amount": 63000,
            "months": 27.93,
            "owner": "Jodi Patton",
            "won_because": "current customer",
            "competitor": null
          },
          {
            "name": "25-28 Cox Renewal",
            "type": null,
            "closed": "2025-04-28",
            "arr": null,
            "services": 0,
            "amount": 75000,
            "months": 35.98,
            "owner": "Jodi Patton",
            "won_because": "current customer",
            "competitor": null
          },
          {
            "name": "Cox - MPF - Provider Directory Files",
            "type": null,
            "closed": "2026-05-12",
            "arr": null,
            "services": 7000,
            "amount": 7000,
            "months": 1.45,
            "owner": "Jodi Patton",
            "won_because": "mpf files",
            "competitor": null
          }
        ]
      }
    },
    {
      "id": 36,
      "name": "UCare Minnesota",
      "quarter": "q4",
      "qlabel": "Q4 · Oct–Dec",
      "seg": "commercial",
      "seglabel": "Commercial / Blues",
      "note": "",
      "full": "UCare Minnesota",
      "dq": "rich",
      "products_and_scope": "Long-standing multi-phase customer, 2 LOBs (UCare + Aspirus). (1) Original CMS-9115 deal 2023-09: Patient Access + Provider Directory, \"CHC rip and replace\" — $448,000 ARR + $98,000 Services [#arr-services-new-bookings 2023-09-29]. Phase 2 EOB/claims ingestion was paused during phase 1 to be resumed later. (2) Aspirus LOB added 2024-03: $8,000 ARR + $24,750 Services. (3) Dental vendor-change SOW 2025-02 (Delta Dental -> DentaQuest, claims + provider directory, 2 LOBs, ~80 hrs): $20,000 Services, fully executed 2025-02-11. (4) CMS-0057 upsell 2025-06: ePA + Provider Access + Payer-to-Payer — $404,700 ARR + $40,000 Services + 3-year renewal extension (through 2028); billed as 1upHealth's \"first ePA upsell in the existing customer base.\" 0057 SOW (P2P, Provider Access, ePA) signed 2025-09-09. ePA line specifically priced at $109,940 for the 2/1/26–9/28/26 term (~$167K ARR). (5) Late-2025 scope addition: adding IFP (Individual & Family Plan) LOB members to the ePA solution. (6) Pending/zero-dollar items: IdP (Okta) auth migration for Patient Access promised at $0 SOW; historical-coverage ingestion SOW being scoped (their original PA/PD used Change Healthcare files lacking historical coverage).",
      "implementation_status": "9115 (Patient Access + Provider Directory) live and in production since original deal; Patient Access served via FlexPa consumer app; dental vendor switch went live 5/5/25 (all historical data received, incremental May data from 6/3, ongoing on the 3rd of each month) and was handed off to CS/Support ~5/8/25 (per Confluence handoff page, IM Rachel Schuler, Data Eng Whitney Nimitpattana). CMS-0057 (P2P, Provider Access, ePA) SOW signed 9/9/25 and in implementation targeting the roster's Q4 (Oct-Dec) go-live; through Oct-Nov 2025 the team was still resolving ePA architecture (CRD passthrough decision) and the IFP-LOB data question, so 0057 was NOT yet deployed. Per internal reference-check thread (May 2026), UCare is \"9115 deployed and contracted for 0057\" but not 0057-deployed. CRITICAL: implementation and go-live are now overtaken by UCare entering receivership/liquidation (see risks) — customer emailed to cancel ePA in April 2026 and the 0057 rollout status is effectively frozen/uncertain.",
      "tech_architecture": "UM vendor: HealthEdge GuidingCare — decided Nov 2025 that GuidingCare hosts the CRD server and 1upHealth acts as passthrough (1up is NOT the CRD server), so no Patient/Coverage ingestion required for IFP ePA; HealthEdge also exposes a Member Eligibility API that was considered as an integration path. PBM/pharmacy: Navitus (referenced for RFP/pharmacy data; earlier \"Navitus files were lacking\" flag in 2023). Original claims source system: Change Healthcare (the 2023 deal was a Change Healthcare \"rip and replace\"; CHC files lacked historical coverage). IdP: Okta (planned Patient Access auth migration, still pending). Infrastructure: dedicated UCare environment on AWS running NiFi (1x nifi-ec2 prod + 1x pre-prod-nifi-ec2, June 2025). Patient Access consumer connectivity via FlexPa (source of EOB/Practitioner-reference error logs in mid-2025). Data volumes: member/patient load ran ~900k–1M, well over the order-form scope of \"up to 650,000 unique individuals/yr\"; delete-file and coverage-date cleanup efforts targeted ~700k. Dental claims: DentaQuest (downstream), replicating prior Delta Dental file schema. Data model issues worked in 2025-2026: EOBs referencing careTeam/Practitioner IDs not present in the FHIR server; members mapped to expired plans / unmapped data values.",
      "financial_signals": "2023-09: $448,000 ARR + $98,000 Services (PA/PD). 2024-03: $8,000 ARR + $24,750 Services (Aspirus). 2025-02: $20,000 Services (dental). 2025-06: $404,700 ARR + $40,000 Services + 3-yr renewal extension (0057 upsell). ePA component: $109,940 for 2/1/26–9/28/26 (~$167K ARR). Multi-year contract runs through 2028. Outstanding invoice of $306,105 issued 2/1/26 (P2P, PA, Provider Access + implementation fees per 2025 renewal order form) — flagged as part of ~$3.4M in overdue payments across the book (5/28/26). UCare classified as a \"Level 5\" vendor in the rehab/liquidation plan (last in line for payment). UCare ultimately DID pay (payment confirmed ~6/11/26 per John Lambrecht). Contract amendment sent to the state's receivership agent (Don Roof, examresources.net) and signed ~5/20/26.",
      "key_people": "Customer side: Troy Nelson (VP of IT / Chief Enterprise Architect — economic buyer, cited 1up's regulatory expertise + partnership as the deciding factor; subject of Aug 2025 win/loss interview); Phou (compliance/technical lead, escalation point on ePA, personal-rep access, IFP); Lauren Larson (Project Manager, primary contact); Sam Premsingh (\"Sam\", Data Manager); John Wynn (technical/comms contact). 1upHealth side: Jodi Patton (account/exec owner); Nolan Kelly (Sales/commercial + legal escalation); John Lambrecht (Finance/invoicing); Maria Baker (Implementation/SOW lead); Rachel Schuler (Implementation Manager); Raquel Brainard (prior IM); Whitney Nimitpattana (Data Implementation Engineer); Jeremy Yoon (ePA/product SME); Geetika Arora (current CSM, joined channel 1/13/26); Ryan Ingram, Mohammad Jouni, Anton Pederson (0057 delivery); Robert Davis \"Robzzz\" (data/FHIR eng, left channel 7/6/26); Holly Fan, Alisa Haman (compliance/CS); Clay (outside/legal counsel on receivership). Kyle Brew (data engineering, missing-Practitioner issue).",
      "risks_and_blockers": "EXISTENTIAL: UCare is in receivership and its approved rehabilitation plan will effectively liquidate the company (confirmed 4/20/26). UCare appears to have been acquired by / merged into Medica (per MN SOS, \"UCare Minnesota\" survives as a \"Merger Survivor – Nonprofit Corporation\"); legal counsel Clay advised pushing back on their proposed amendment and argued Medica inherited the guaranteed 3-year contract. UCare announced a planned shutdown (~Aug/Sept 2025) and a Medicare Advantage exit + layoffs (TwinCities article 9/4/25) that may have hit the very staff on active 1up calls. Customer attempted to cancel/amend the ePA scope (April–May 2026). Payment risk: $306,105 invoice, 1up ranked \"Level 5\" (last-in-line) vendor; receiver has the right to cancel any contract deemed \"unnecessary for orderly rehabilitation\" — a live threat to the 2028 contract (ultimately paid ~6/11/26, and amendment signed, but AP/procurement ownership during receivership was unclear). Technical/open items: IFP member data + CRD-passthrough SOW update; historical-coverage ingestion SOW; IdP/Okta migration (member files lack the IdP ID, requiring historical re-ingestion — pricing debate over whether the promised $0 covers the extra work); persistent member-count overage vs. 650k scope; FlexPa EOB/Practitioner-reference data-quality errors; members mapped to expired plans / unmapped values.",
      "points_of_interest": "1upHealth's flagship 0057 reference account and its \"first ePA upsell in the existing customer base\" — heavily used as a sales reference (BCBS TN, County Care, S. Dakota Medicaid RFPs) even while in receivership. Won originally as a Change Healthcare rip-and-replace; win/loss report (Troy Nelson interview, Aug 2025) concludes 1up won because it \"acted like a partner, not a vendor\" — regulatory expertise, thought leadership and transparency beat features/price. Troy had expressed 2024-2025 interest in a mobile app, cloud migration of provider data (Q3 2025), and FHIR-for-internal-integration to support geographic expansion — all now moot given the shutdown. Note the tragic arc: a marquee expansion win (0057 + ePA + 3-yr extension to 2028) landed in mid-2025 just as the company began unwinding, turning the account into a collections/contract-preservation exercise by 2026.",
      "expansion_plays": [
        {
          "play": "Preserve and transfer the contract to Medica (parent/acquirer) rather than treat UCare as an expansion target",
          "rationale": "Counsel's position is that Medica inherited UCare's guaranteed 3-year (through-2028) contract including the 0057/ePA/P2P/Provider Access scope. The real 'expansion' motion is converting the surviving Medica entity into an ongoing 0057 customer and cross-selling the full CMS-0057 suite into Medica's much larger membership book, using the existing GuidingCare/FHIR architecture already stood up for UCare.",
          "fit": "medium"
        },
        {
          "play": "Complete the already-contracted full 0057 suite (P2P + Provider Access + ePA) to deployment",
          "rationale": "UCare is 9115-deployed and already signed/paid for the 0057 upsell but is not yet 0057-live; finishing CRD-passthrough (GuidingCare) ePA, Provider Access and P2P go-live realizes booked ARR and creates the reference proof point — contingent entirely on the entity surviving receivership.",
          "fit": "low"
        },
        {
          "play": "Clinical data / HDE + quality-risk analytics on the FHIR data already flowing",
          "rationale": "9115 Patient/Coverage/Claims plus (paused) EOB and dental claims already land in a dedicated FHIR environment; historically Troy wanted FHIR for internal integration and cloud provider-data migration — a natural HDE/clinical-data and quality/risk-analytics attach on existing pipes. Fit is low near-term purely because of the liquidation, but this is the template to run at Medica.",
          "fit": "low"
        }
      ],
      "plays_hi": 0,
      "sources": [
        "Slack #account-ucare (C05U4QHUFBR) full channel history 2023-2026",
        "Slack #account-ucare thread ts 1761237661.238259 (ePA IFP LOB / CRD passthrough decision, Oct-Nov 2025)",
        "Slack #industry (C493WSYBS) UCare win/loss report 2026-06-01 (Troy Nelson interview) + TwinCities MA-exit article 2025-09-05",
        "Slack #sows-inflight (C09EE0B2V8A) 2025-09-09 — 0057 P2P/Provider Access/ePA SOW Signed",
        "Slack #arr-services-new-bookings (C01KG7PJEDV) 2025-06-05 — $404,700 ARR ePA/PA/P2P upsell",
        "Slack Group DM C03MD999PTN (Kelly/Lambrecht/Patton) Apr-Jun 2026 — receivership, $306,105 invoice, Level 5 vendor, ePA cancellation, Medica",
        "Slack Group DM C0B3XHPNT8X May 2026 — reference-check confirming 9115 deployed + contracted for 0057",
        "Slack DM D03M9ULEE9X / C08593E4FAM May-Jun 2026 — UCare amendment signed, payment received",
        "Confluence CKB 1218904281 — 'UCare - Handoff to CS and Support' (LOBs, IMs, go-live 5/5/25, IdP/historical-coverage future work, contacts)",
        "Confluence Compliance space — ePA Customer Call Notes (HealthEdge GuidingCare, CRD/DTR/PAS=Yes)",
        "Confluence PD 1974861844 — Product Team OKR tracker (Q1 1/20 UCare discovery)"
      ],
      "sf": {
        "arr": 769651.577844,
        "cumulative": 2245130,
        "product_rev": 2062380,
        "services_rev": 182750,
        "health": 2,
        "temperature": null,
        "nps": null,
        "renewal_sentiment": 1,
        "sentiment_notes": "EPIC",
        "flags": [
          "Competitor engaged",
          "ROI in question",
          "M&A Impact"
        ],
        "renewal": "2028-09-28",
        "contract_exp": null,
        "customer_since": "2023-09-29",
        "go_live": "2024-01-01",
        "impl_level": null,
        "products_sold": null,
        "lobs": "Medicare;Medicaid;Medicare Advantage;Commercial",
        "members_contracted": 650000,
        "members_current": 1270999,
        "competitors": null,
        "pbm": null,
        "owner": "Jodi Patton",
        "csm": "Geetika Arora",
        "exec_sponsor": "Nolan Kelly",
        "tier": "Maintain",
        "opps": [
          {
            "name": "UCare - CHG R&R",
            "type": "0125f000000iH45AAE",
            "closed": "2023-09-29",
            "arr": null,
            "services": 98000,
            "amount": 546000,
            "months": 11.99,
            "owner": "Lindsay Parker",
            "won_because": "Price, product and relationships",
            "competitor": "Smile & IS"
          },
          {
            "name": "SOW and ARR: UCare: Aspirus (additional LOB and and auth)",
            "type": "0125f000000FCKeAAO",
            "closed": "2024-03-04",
            "arr": null,
            "services": 24750,
            "amount": 32750,
            "months": 6.83,
            "owner": "Lindsay Parker",
            "won_because": "relationship",
            "competitor": null
          },
          {
            "name": "UCare Renewal 2026",
            "type": null,
            "closed": "2024-09-30",
            "arr": null,
            "services": 0,
            "amount": 469680,
            "months": 11.96,
            "owner": "Ariana Zamora",
            "won_because": "existing customer",
            "competitor": null
          },
          {
            "name": "UCare - CHG R&R - 2024 Renewal",
            "type": "0125f000000iHVSAA2",
            "closed": "2024-09-30",
            "arr": null,
            "services": 0,
            "amount": 456000,
            "months": 11.96,
            "owner": "Drew Arnold",
            "won_because": "Good relationship",
            "competitor": null
          },
          {
            "name": "SOW: UCare - Dental Vendor Change",
            "type": null,
            "closed": "2025-02-11",
            "arr": null,
            "services": 20000,
            "amount": 20000,
            "months": -23.95,
            "owner": "Drew Arnold",
            "won_because": "Good relationship",
            "competitor": null
          },
          {
            "name": "25-28 UCare P2P, Provider Access, ePA",
            "type": null,
            "closed": "2025-06-05",
            "arr": null,
            "services": 40000,
            "amount": 277500,
            "months": 31.87,
            "owner": "Jodi Patton",
            "won_because": "Long term relationship",
            "competitor": null
          },
          {
            "name": "25-28 UCare Renewal",
            "type": "0125f000000iHVSAA2",
            "closed": "2025-06-05",
            "arr": null,
            "services": 0,
            "amount": 443200,
            "months": 35.98,
            "owner": "Jodi Patton",
            "won_because": "Good relationship",
            "competitor": null
          }
        ]
      }
    },
    {
      "id": 37,
      "name": "Yamhill",
      "quarter": "pend",
      "qlabel": "Pending",
      "seg": "medicaid",
      "seglabel": "Medicaid MCO / CCO",
      "note": "Clinical Connect #5",
      "full": "Yamhill CCO (YCCO / Yamhill Community Care Organization) — Oregon Medicaid Coordinated Care Organization (100% Medicaid lives)",
      "dq": "rich",
      "products_and_scope": "Original contract (2023): Patient Access + Provider Directory, sold as a Change Healthcare \"rip and replace\" — $58,500 ARR + $45k Services [#arr-services-new-bookings 2023-06-30; Confluence \"Yamhill PAI - Handoff to CS and Support\" confirms \"Product Implemented: Patient Access, Provider Directory\"]. 2024: capacity-increase upsell $26,325 [#arr-services-new-bookings 2024-06-28]. 2025: 1-year renewal, 3% increase, ARR to $91,739 (+$6,914); 0057 deferred to 2026 [#renewals 2025-06-25]. 2026: 3-year renewal + full CMS-0057 upsell — $95,000 ARR (0057), $55,000 Services, $11,523 CPI, and becoming 1up's fifth DPP/Clinical Connect (clinical-data) customer, \"contracting in signature\" [#arr-services-new-bookings 2026-06-30; #growth-updates 2026-02-06 \"3 year renewal with full 0057 was sent\"]. 0057 scope is Provider Access + Payer-to-Payer [#growth-updates 2025-03-29, 2025-06-13]; ePA has been in discovery since Q1 2025 but not yet contracted. Resources delivered/mapped: Patient, Coverage, EOB (Institutional Inpatient/Outpatient, Professional, Pharmacy), EOB Organization/Practitioner, Provider Directory (Organization + Practitioner) [Confluence \"Yamhill Implementation Details,\" \"On-Going File Table\"]. Clinical resources (CarePlan, Observation, US Core Allergy Intolerance, Goal, Formulary/Coverage Plan) were scoped in 2023 discovery but deferred pending a new SOW; as of Jan 2025 there was still no clinical data loaded [#account-yamhill 2025-01-28].",
      "implementation_status": "Patient Access + Provider Directory are LIVE — PAI handoff to CS/Support completed spring 2024 after a difficult mapping/UAT and file-delivery stabilization; YCCO delivered an EOB gap file 05/06/2024 and restarted incrementals 05/07/2024, other resources daily since 04/11/2024 [Confluence PAI Handoff page]. Daily NiFi ingest scheduled at 1:15pm EST (17:15 UTC) [#account-yamhill-implementation 2024-04-29]. CMS-0057 (Provider Access + P2P): Rod (Sr. Director/\"CIO\") confirmed on a Sept 2025 operational call they were \"ready to move forward with 0057 API contracting\" [#account-yamhill 2025-09-22]; 0057 SOW sent to customer, green status [#sows-inflight 2026-02-04]; 3-yr renewal with full 0057 executed/contracting in signature as of June 2026. Actual 0057 + Clinical Connect implementation is Pending/unscheduled (roster). No 0057 or clinical build activity has appeared in implementation channels yet.",
      "tech_architecture": "Claims adjudication: Ayin (formerly PHTECH), on its cloud CIM (Community Integration Manager) platform — a system somewhat proprietary to Oregon Medicaid CCO plans; PHTECH also provides the provider portal [Confluence Discovery Call 2/29/24; #account-yamhill 2024-04-09]. Care/UM/population-health platform: Helios by VirtualHealth (HITRUST certified), implemented Jan 2024, where prior-auth was brought in-house. Prior auth: EviCore by Evernorth for radiology/cardiology; Helios for remaining auth; provider submissions via PHTECH portal or fax. Internal IdP: Azure AD. Member identifier: state-issued Oregon Medicaid ID. Enrollment: daily 834 files from the State of Oregon (state assigns members to 1 of 16 CCOs, ~99% by geography). Provider network <10K NPIs, 2-3 major Oregon clinic systems; explored OCHIN Epic for provider data sharing. 1up side: SFTP + pipe-delimited .txt files landed in S3 (bucket 1up-yamhill-prod-data-ingest), NiFi daily workflow, DynamoDB + OpenSearch storage; ~5.5M claims, est. ~10k new/changed claims weekly [Confluence \"Ingestion Exception Notes\"]. No member-facing portal.",
      "financial_signals": "ARR trajectory: 2023 $58,500 ARR + $45k Services (initial Patient Access + Provider Directory); 2024 +$26,325 (capacity increase); 2025 $91,739 ARR (+$6,914, 1-yr renewal, 3% uplift, 0057 deferred); 2026 3-yr renewal adding $95,000 ARR for 0057 + $55,000 Services + $11,523 CPI, plus DPP/Clinical Connect (contracting in signature). Sources: #arr-services-new-bookings (2023-06-30, 2024-06-28, 2026-06-30), #renewals (2025-06-25).",
      "key_people": "Customer (Yamhill CCO): Rod Meyer (rmeyer@yamhillcco.org) — Senior Director of Information Systems, referred to as \"CIO\" on ops calls, exec sponsor/champion; Lakeisha Moore — Senior Systems Business Analyst (primary data/ops contact). 1upHealth: Jodi Patton (Account Manager); Ryan Ingram (AM/SE, deal support); Jeremy Yoon (ePA lead); Jessica/\"U043WPXU588\" (former AM, renewals); Stacy Harris (Implementation Manager); Tatyana Lepilova (Data Implementation Engineer); Maria Baker (implementation lead); Stephanie Iheme (CX / exec-sponsor outreach); Avi Lessure (engineering, diff-load design); Holly Fan / Trang Derdak (CX).",
      "risks_and_blockers": "1) Persistent claims data-quality problems rooted in the Ayin/CIM claims system: it reprocesses pended/refunded/voided claims with no delete signal, refunds/adjustments post years after date of service, and there was no mechanism to remove voided claims from 1up — YCCO proposed monthly full-replacement files as a workaround [#account-yamhill-implementation 2024-03-29; Confluence \"Yamhill Incremental Load Request\"]. 2) Multiple 2024 ingestion failures: claim_id mismatches between Procedure and Header files, comma- vs pipe-delimited file errors, headers-only Patient files (60+ days with no new Patient resources), sporadic EOB delivery — the implementation team judged their file-generation process immature. Full weekly replacement of ~5.5M claims was rejected on cost/storage grounds (~60GB/week to DynamoDB). 3) No clinical data currently loaded [#account-yamhill 2025-01-28]. 4) Medicaid-only plan sensitive to federal Medicaid funding uncertainty — this drove the 2025 decision to defer 0057 and take a 1-year renewal [#renewals 2025-06-25]. Note: they have consistently framed all of this as NOT a reflection of the 1up relationship, which remains strong.",
      "points_of_interest": "Strong, loyal relationship despite rocky data ops — Rod Meyer wrote after exec-sponsor outreach that \"one of the driving reasons for selecting your product and team was the future strategic 'intangibles' that your organizational vision and direction represented\" [#account-yamhill 2024-12-30]. Repeatedly described internally as \"solid partners,\" \"so easy to work with,\" and \"an overall great health plan to work with.\" Used as a product migration POC (\"1st migration POCs - Zing, Yamhill\") [Confluence \"Bi-weekly Product Roadmap Updates\"]. YCCO uses their own Teams/SharePoint site for file-feedback workbooks. As a 100% Medicaid Oregon CCO, an anchor reference for the broader Oregon-CCO / state-Medicaid segment (state assigns members across 16 CCOs).",
      "expansion_plays": [
        {
          "play": "Close ePA (Prior Auth API) as the next 0057 add-on",
          "rationale": "ePA has been in active discovery with Yamhill since Q1 2025 (Jeremy Yoon engaged, discovery questions returned) but was never contracted. They run EviCore + Helios(VirtualHealth) for UM and PHTECH provider portal — 1up is positioned as the payer-to-provider ePA link across those systems. Now that full 0057 (Provider Access + P2P) is signed, ePA is the logical fast-follow.",
          "fit": "high"
        },
        {
          "play": "Land clinical data / Clinical Connect (popConnect) via a new SOW",
          "rationale": "Yamhill is already becoming 1up's fifth DPP/Clinical Connect customer (contracting in signature, 2026-06-30). Clinical resources (CarePlan, Observation, Allergy Intolerance, Goal) were scoped in 2023 discovery but deferred for lack of a SOW and still had zero clinical data as of Jan 2025. Their Jan-2024 Helios care-management build creates a concrete need for external clinical/historical member data — a natural popConnect/clinical-acquisition upsell.",
          "fit": "high"
        },
        {
          "play": "Quality/risk analytics and provider data-sharing on the FHIR claims data already flowing",
          "rationale": "P2P + Provider Access + full EOB claims are already normalized to FHIR in 1up. As an Oregon Medicaid CCO measured on state metrics with <10K providers across 2-3 clinic systems (and prior interest in OCHIN Epic and 'reporting/analysis on membership' for providers), Yamhill is a candidate for value-add analytics / provider data-sharing on data they already send us. Lower urgency than ePA/clinical but grounded in existing scope. (MPF is not a fit — Medicaid-only, no Medicare LOB.)",
          "fit": "medium"
        }
      ],
      "plays_hi": 2,
      "sources": [
        "Slack #account-yamhill (C05HW16B5K6) — history 2023-2026 incl. Rod Meyer exec-sponsor quote (2024-12-30), 0057-ready ops call (2025-09-22), no-clinical-data confirmation (2025-01-28)",
        "Slack #account-yamhill-implementation (C05HQKW8NAH) — 2024 EOB gap/incremental and claim_id/delimiter troubleshooting, daily NiFi ingest schedule",
        "Slack #arr-services-new-bookings (C01KG7PJEDV) — bookings 2023-06-30, 2024-06-28, 2026-06-30",
        "Slack #renewals (C036YVBJMJS) 2025-06-25 — 1-yr renewal, 0057 deferral",
        "Slack #growth-updates (C07P8HKL52B) — 2025-03-29 (Provider Access+P2P scope, ePA discovery), 2025-06-13, 2026-02-06 (3-yr full 0057 sent)",
        "Slack #sows-inflight 2026-02-04 — 0057 SOW sent, green",
        "Confluence CKB: Yamhill Implementation Details (187564100), PAI Handoff to CS and Support (535855122), On-Going File Table (456523829), Incremental Load Request (475103281), Ingestion Exception Notes (517308436)",
        "Confluence Compliance1: 1up / Yamhill - Discovery Call 2/29/24 (317358081) — architecture: Ayin/PHTECH CIM, Helios/VirtualHealth, EviCore, Azure AD, 834 enrollment",
        "Confluence PD: Bi-weekly Product Roadmap Updates (2341077003) — Yamhill migration POC"
      ],
      "sf": {
        "arr": 356604.83334,
        "cumulative": 912407,
        "product_rev": 812407,
        "services_rev": 100000,
        "health": 9,
        "temperature": null,
        "nps": null,
        "renewal_sentiment": 4,
        "sentiment_notes": null,
        "flags": [
          "ROI in question"
        ],
        "renewal": "2027-06-30",
        "contract_exp": "2024-06-29",
        "customer_since": "2023-06-30",
        "go_live": null,
        "impl_level": "Level II",
        "products_sold": null,
        "lobs": "Medicaid",
        "members_contracted": 75000,
        "members_current": 85843,
        "competitors": "Change",
        "pbm": null,
        "owner": "Jodi Patton",
        "csm": "Holly Fan",
        "exec_sponsor": "Stephanie Iheme",
        "tier": "Grow",
        "opps": [
          {
            "name": "Yamhill CCO --Full Platform",
            "type": "0125f000000iH45AAE",
            "closed": "2023-06-30",
            "arr": null,
            "services": 45000,
            "amount": 103500,
            "months": 12.02,
            "owner": "Ariana Zamora",
            "won_because": "A significant contributing factor that played a pivotal role in securing this deal was our effort to facilitate a call with John from Fallon Health. This step proved to be the final push needed to seal the deal successfully.",
            "competitor": null
          },
          {
            "name": "Yamhill CCO - Renewal 2024",
            "type": "0125f000000iHVSAA2",
            "closed": "2024-06-28",
            "arr": null,
            "services": 0,
            "amount": 58500,
            "months": 11.96,
            "owner": "Ariana Zamora",
            "won_because": "Decreased customer abrasion by providing both the capacity increase and the renewal order form together so the customer could go through only one legal review process.",
            "competitor": null
          },
          {
            "name": "Yamhill CCO - Capacity Increase - 2024",
            "type": null,
            "closed": "2024-08-08",
            "arr": null,
            "services": 0,
            "amount": 26325,
            "months": 11.96,
            "owner": "Drew Arnold",
            "won_because": "Decreased customer abrasion by providing both the capacity increase and the renewal order form together so the customer could go through only one legal review process.",
            "competitor": null
          },
          {
            "name": "25-26 Yamhill CCO Renewal",
            "type": "Existing Business",
            "closed": "2025-06-25",
            "arr": 84825,
            "services": 0,
            "amount": 91739,
            "months": 11.96,
            "owner": "Jodi Patton",
            "won_because": "2025 renewal",
            "competitor": null
          },
          {
            "name": "27-28 Yamhill CCO Renewal",
            "type": "Existing Business",
            "closed": "2026-06-30",
            "arr": null,
            "services": null,
            "amount": 192491,
            "months": 24.02,
            "owner": "Jodi Patton",
            "won_because": "2026 renewal",
            "competitor": null
          },
          {
            "name": "28-29  Yamhill CCO Renewal",
            "type": "Existing Business",
            "closed": "2026-06-30",
            "arr": null,
            "services": null,
            "amount": 198113,
            "months": 11.99,
            "owner": "Jodi Patton",
            "won_because": "2026 renewal",
            "competitor": null
          },
          {
            "name": "26-29 Yamhill Upsell - Provider Access,  P2P, ePA",
            "type": null,
            "closed": "2026-06-30",
            "arr": null,
            "services": 55000,
            "amount": 150000,
            "months": 35.98,
            "owner": "Jodi Patton",
            "won_because": "0057",
            "competitor": null
          },
          {
            "name": "26-27 Yamhill CCO Renewal",
            "type": "Existing Business",
            "closed": "2026-06-30",
            "arr": null,
            "services": null,
            "amount": 91739,
            "months": 35.98,
            "owner": "Jodi Patton",
            "won_because": "2026 renewal",
            "competitor": null
          }
        ]
      }
    },
    {
      "id": 38,
      "name": "Priority",
      "quarter": "pend",
      "qlabel": "Pending",
      "seg": "commercial",
      "seglabel": "Commercial / Blues",
      "note": "Churn risk → Epic Aug 2026",
      "full": "Priority (health plan) — Priority Health (Michigan), part of Corewell Health; ~530,000 members",
      "dq": "rich",
      "products_and_scope": "Long-standing 9115/CMS platform customer, later expanded to CMS-0057 scope. Original 2021 deal was the full CMS Platform — Patient Access (PA), Provider Directory (PD), and Payer-to-Payer (P2P) — with 530,000 members [#arr-services-new-bookings, 2021-08-27: $795k ARR + $130k implementation]. Data domains ingested over time: Patient Access (claims/EOB, Coverage, Patient), Provider Directory (Location, Organization, OrganizationAffiliation, PractitionerRole via differential/diff views), Pharmacy/Formulary (drug tiers mapped to HL7 MedicationKnowledge, NDC→RX crosswalk built for Priority), and P2P (confirmed in scope per order form). Add-ons: USCDI v3 Clinical Data project layering BP, BMI, Procedure, Body Weight, and Lab onto the already-live Patient Access API [#arr-services-new-bookings 2025-09-17: $24,300 Services; Confluence CKB clinical-data weekly call notes Oct 2025–Jan 2026]. Console-based CMS Patient Access reporting was being set up for the Jan/March 2026 reporting requirement (Holly Fan owning comms; Linda Carpenter's team completing the data-mapping spreadsheet). NEW logo via acquisition: Priority acquired Group Health Coop (GHC) and bought an interim 1up implementation for it — a basic re-do of 9115 plus 0057 layered on top, one-year term [Group DM 2026-06-25; #product/renewals].",
      "implementation_status": "Core Priority Health environment is fully live and in production (was called \"Level 5\" back in Aug 2023 after historical Patient Access load completed; formulary + provider directory automation followed). USCDI v3 Clinical Data project reached completion around Jan 2026 — the 01/22/2026 weekly call notes state Rachel Schuler would cancel the meeting series, transition to Holly Fan (CSM), and point the Console Patient Viewer at Production data, indicating go-live/closeout. Clinical SOW had targeted project completion by 12/1/2025. HOWEVER, the account is on a churn trajectory: Priority is migrating off 1up to Epic Payer Platform (EPP), with churn dated August 2026 [#competitive-intel 2025-10-06 lists \"Priority Health (MI) - August 2026\"]. Priority is separately migrating core admin systems from Facets to Epic Tapestry (claims/member data), with vendor testing Q3–Q4 2025 and full go-live 2026 [Confluence: Facets to Epic Vendor Switch Scoping]. The GHC interim implementation is the active new work as of mid-2026, pricing quoted and amendment under legal review (John Lambrecht/Matt Leskovar) as of April 2026.",
      "tech_architecture": "Flat-file extract ingestion (historical + incremental) from Priority's source systems into 1up's Apache NiFi pipelines, DIMA mappings → FHIR server, backed by OpenSearch/ElasticSearch (+ RDS, DynamoDB). Differential (\"diff\") views used for full-replace Provider Directory files to support dynamic updates/deletes. Formulary/individual-Medicare files partly manual (Don G confirmed Formulary generation is manual, cannot be set to a defined cadence). Source-of-record migration underway: Facets → Epic Tapestry for claims processing and member data; this introduces new Epic member/group IDs requiring a crosswalk that 1up would have to maintain across Patient, Coverage, and ExplanationOfBenefit (flagged as a red flag — services wanted to push crosswalk maintenance back to the source system). Patient Access third-party app connectivity via Flexpa (surfaced a member-record gap: Priority only sends member/patient info once, at portal-account creation, causing missing Patient resources for older members). Anomaly noted by DE: Medication resources in the Priority FHIR server carry a Humana identifier (system: fhir.humana.com) and an unusual meta.source \"1up-external-system:18034\" with no DIMA mapping or NiFi rule found — ingestion path unexplained. Operational: ElasticStorage ran low (upsizing/sharding review needed); NiFi ingestion processors were found OFF for ~2 weeks in Nov 2025 (confirmed to be P2P resources). GHC (acquired plan) runs Zyter TruCare for UM/CM with InterQual embedded; auths manually loaded; Behavioral Health delegated. Priority-side systems architect: Gerald \"G\" De Jong.",
      "financial_signals": "Original CMS Platform deal (2021-08-27): $795k ARR + $130k implementation [#arr-services-new-bookings]. 2025 renewal fully executed ~3 months early (May 2025): $637,313 total, including a 3% annual pricing increase = +$18,563 ARR [#renewals 2025-05-19; also #arr-services-new-bookings 2025-05-19]. USCDI v3 Clinical Data add-on: $24,300 Services (2025-09-17). GHC interim/acquisition deal (quoted April 2026): $65,000 platform + $25,000 partition + $90,000 implementation through the current contract term (ends Aug 26, 2026); on Aug 27 pricing steps to standard rate for total ARR ~$215,000 [Group DM w/ Matt Leskovar & John Lambrecht, 2026-04-21]. Churn exposure: Finance had budgeted the full $637k ARR to churn at the Aug 2026 EPP transition, though non-EPP products (and GHC) may be retained per John Lambrecht's follow-up.",
      "key_people": "Customer (Priority Health): Don G — Director (original Patient Access extract owner); Derek Bernath — Business Program Owner; Linda Carpenter — Compliance Partner (CMS reporting mapping); Gerald \"G\" De Jong — Systems Architect; Miles Dewind — Developer; Mitchell Forsyth — Project Manager; Vinay Pendam — Digital Services Manager; Alicia Stringer — Product Manager; Kristy Thomasma — Manager, Provider Portal; Josh Walma — Developer. 1upHealth: Jodi Patton — Account Manager (owns renewal/GHC amendment); Maria Baker — Services/Implementation lead; Rachel Schuler — Sr. Implementation Manager (clinical data project); Holly Fan — Sr. Customer Success Manager (aligned to Priority + CMS reporting comms); Geetika Arora — CSM; Robert Davis (\"Robzzz\") — DE/Support (NiFi, environment); Joy He — Sr. Data Implementation Engineer; Avi Lessure — DE (original historical loads, formulary/PD mapping); Irtiza Mahmud — DE (pipeline monitoring); Ryan Ingram, Nolan Kelly — account/CS.",
      "risks_and_blockers": "PRIMARY RISK — CHURN: Priority is leaving 1up for Epic Payer Platform, dated August 2026, driven by their move into Epic's ecosystem via their hospital system (Corewell) and Epic bundling 9115/0057 \"as a bonus\" on the net-new Epic implementation [#competitive-intel 2025-10-06; #renewals 2025-05-19: \"churning next year… switching to EPIC Payer Platform\"]. Full $637k ARR was budgeted as churn. Facets→Epic Tapestry migration creates new Epic member/group IDs requiring an ongoing crosswalk 1up would have to maintain across Patient/Coverage/EOB — data-continuity risk. Operational issues: ElasticStorage capacity alerts; P2P NiFi ingestion processors found OFF ~2 weeks (Nov 2025); Flexpa member-record gap (patient info sent only once → missing Patient resources); unexplained Medication ingestion path with Humana identifiers/no mapping. GHC deal is short-term (1-year stopgap) — GHC itself transitions to EPP in Aug 2027 per Compliance page, capping expansion runway.",
      "points_of_interest": "1up used Priority as a reference/design partner for churn-defense intel: Geetika Arora and Holly Fan were tasked (March 2026) with EPP-churn interview outreach to Priority alongside MGBHP and Network Health, feeding Mohammad Jouni's \"Epic Payer Platform Learnings & 1upHealth Positioning\" analysis (EPP cost 1up 4 customers / $1.1MM ARR but 77.5% payvider retention). That analysis documents concrete EPP gaps 1up can exploit for retention: EPP won't ingest/normalize external (non-Epic) clinical data, only does ePA inside its own EMR, has no P2P network/roadmap, won't do cross-EMR Provider Access, and provides no MPI/identity resolution — plus EPP's KLAS score fell 93.7→76.1 and pricing scares buyers. Precedent: churning peers Health First and Network Health are KEEPING the 1up Provider Directory API even after moving most products to EPP; JHHP uses EPP for prior auth but the rest of the APIs with 1up. Nolan Kelly (Jan 2026) framed the retention angle: CMS reporting is a pre-packaged \"easy button\" and a differentiator 1up can lean on. Priority also expressed interest in adding clinical data (realized via the USCDI v3 project).",
      "expansion_plays": [
        {
          "play": "Grow and extend the Group Health Coop (GHC) footprint to the full CMS-0057 suite",
          "rationale": "GHC is net-new via acquisition, already contracted (~$215k ARR standard rate) as a basic 9115+0057 re-implementation, and — critically — GHC does NOT move to EPP until Aug 2027, giving ~12+ months of runway. GHC runs Zyter TruCare (UM/CM) with manual auth loading and delegated behavioral health, a classic fragmented environment where 1up's Provider Access, Payer-to-Payer, and ePA add real workflow value beyond the interim platform/partition. Land the stopgap, then expand to the full 0057 API set and CMS reporting easy-button.",
          "fit": "high"
        },
        {
          "play": "Retention/carve-out: keep Provider Directory + Payer-to-Payer (and CMS reporting) on 1up after the Aug 2026 EPP cutover",
          "rationale": "This is the proven pattern for 1up's EPP-churning accounts — Health First and Network Health both retained the 1up Provider Directory API, and JHHP keeps everything but prior auth. Documented EPP gaps (no P2P network, no cross-EMR provider access, no external clinical-data ingestion, no MPI) map exactly to products Priority already runs with 1up. Position 1up as the EMR-agnostic 'connective tissue' Epic won't be, and preserve a meaningful ARR slice instead of full churn.",
          "fit": "medium"
        },
        {
          "play": "CMS-0057 audit-readiness / Console reporting as a bridge service through 2026–2027",
          "rationale": "Priority's compliance team (Linda Carpenter) is actively completing the CMS Patient Access reporting mapping, and 1up's Console reporting is a pre-packaged 'easy button' Nolan Kelly explicitly flagged as a differentiator. With CMS-0057 enforcement Jan 2027 and Priority mid-migration to Epic, 1up's audit-ready reporting and API audit-log tooling can retain Priority (and cover GHC) during the gap where EPP is not yet fully proven for pharmacy/provider/P2P coverage.",
          "fit": "medium"
        }
      ],
      "plays_hi": 1,
      "sources": [
        "Slack #account-priority-health (C02A29JHP8T) — channel history 2024-2026: clinical data reporting, new LoB file-list question, Medication/Humana anomaly, ElasticStorage, Flexpa, Facets→Epic SOW heads-up",
        "Slack #account-priority-reimplementation (C05CFAQT081) — 2023-2024 historical PAI load, formulary/provider-directory diff views, NDC→RX crosswalk, Level 5",
        "Slack #renewals (C036YVBJMJS) 2025-05-19 — $637,313 1-yr renewal, +$18,563 ARR, churn-to-EPP note",
        "Slack #growth-updates (C07P8HKL52B) 2025-05-26 — renewal + clinical data interest + EPP transition",
        "Slack #competitive-intel (C076022NK8T) 2025-10-06 — Priority Health MI churn to EPP dated Aug 2026; peer retention patterns",
        "Slack #product (C0102AFFS8J) 2026-04-10 — Epic Payer Platform Learnings & 1upHealth Positioning (EPP gaps, $1.1MM/4-customer loss, 77.5% retention)",
        "Slack Group DM (C0ASSE5CTT6) 2026-04-21 — GHC acquisition amendment: $65k platform + $25k partition + $90k impl; $215k standard ARR",
        "Slack Group DM (C03Q6EV0TQC) 2026-06-25 — GHC implementation timeline / 9115+0057 scope, EPP move next August",
        "Slack #arr-services-new-bookings — 2021-08-27 $795k ARR+$130k impl 530k members; 2025-05-19 +$18,563; 2025-09-17 USCDI v3 $24,300",
        "Confluence CKB 1273200767 — Priority Health Facets to Epic Vendor Switch Scoping (crosswalk red flags, testing waves)",
        "Confluence CKB 1931608065 — 01/22/2026 Priority Health Clinical Data Implementation Weekly Call (participants, clinical data go-live/closeout)",
        "Confluence Compliance 2138832915 — GHC & Priority Health (Zyter TruCare, InterQual, EPP Aug 2027 stopgap)",
        "Confluence CKB clinical-data weekly call series (Oct 2025–Jan 2026, pages 1685520459…1931608065)"
      ],
      "sf": {
        "arr": 637313.000004,
        "cumulative": 3649363,
        "product_rev": 3475063,
        "services_rev": 174300,
        "health": 8,
        "temperature": "Green",
        "nps": null,
        "renewal_sentiment": 5,
        "sentiment_notes": "EPIC",
        "flags": [
          "Competitor engaged",
          "ROI in question",
          "Actively Evaluating Competitor"
        ],
        "renewal": "2026-08-26",
        "contract_exp": "2023-08-26",
        "customer_since": "2021-08-27",
        "go_live": null,
        "impl_level": "Level IV",
        "products_sold": "Patient Access;Provider Directory;Payer to Payer Send;Request and Ingest;SQL on FHIR",
        "lobs": "Medicare;Medicare Advantage;Commercial",
        "members_contracted": 530000,
        "members_current": 291962,
        "competitors": null,
        "pbm": null,
        "owner": "Jodi Patton",
        "csm": "Holly Fan Test",
        "exec_sponsor": "Nolan Kelly",
        "tier": "Maintain",
        "opps": [
          {
            "name": "Priority Health 21 SOW",
            "type": "0125f000000FCKeAAO",
            "closed": "2021-07-16",
            "arr": null,
            "services": 20000,
            "amount": 20000,
            "months": null,
            "owner": "Ariana Zamora",
            "won_because": null,
            "competitor": null
          },
          {
            "name": "Priority Health - Platform & CMS Compliance",
            "type": "0125f000000iH45AAE",
            "closed": "2021-08-27",
            "arr": null,
            "services": 130000,
            "amount": 713000,
            "months": 11.96,
            "owner": "Ariana Zamora",
            "won_because": null,
            "competitor": null
          },
          {
            "name": "Upsell - Priority Health 2021",
            "type": "0125f000000iH4tAAE",
            "closed": "2021-12-31",
            "arr": null,
            "services": 0,
            "amount": 212000,
            "months": 8.28,
            "owner": "Ariana Zamora",
            "won_because": null,
            "competitor": null
          },
          {
            "name": "RENEWAL - Priority Health - Full CMS Compliance",
            "type": "0125f000000iHVSAA2",
            "closed": "2022-07-20",
            "arr": null,
            "services": 0,
            "amount": 735000,
            "months": 11.96,
            "owner": "Holly Fan",
            "won_because": "Happy with platform",
            "competitor": null
          },
          {
            "name": "RENEWAL Priority Health 2023",
            "type": "0125f000000iHVSAA2",
            "closed": "2023-07-21",
            "arr": null,
            "services": 0,
            "amount": 689000,
            "months": 11.99,
            "owner": "Holly Fan",
            "won_because": "N/A",
            "competitor": null
          },
          {
            "name": "Priority Health: Renewal 2024",
            "type": "0125f000000iHVSAA2",
            "closed": "2024-08-26",
            "arr": null,
            "services": 0,
            "amount": 618750,
            "months": 11.96,
            "owner": "Drew Arnold",
            "won_because": "Continuing to support the CMS mandate. Next year will be much more difficult I fear",
            "competitor": null
          },
          {
            "name": "25-26 Priority Health: Renewal",
            "type": "0125f000000iHVSAA2",
            "closed": "2025-05-19",
            "arr": null,
            "services": 0,
            "amount": 637313,
            "months": 11.96,
            "owner": "Jodi Patton",
            "won_because": "Continuing to support the CMS mandate. Next year will be much more difficult I fear",
            "competitor": null
          },
          {
            "name": "Priority Health - Clinical Data - USCDI v3",
            "type": null,
            "closed": "2025-09-17",
            "arr": null,
            "services": 24300,
            "amount": 24300,
            "months": 17.94,
            "owner": "Jodi Patton",
            "won_because": "clinical project",
            "competitor": null
          }
        ]
      }
    },
    {
      "id": 39,
      "name": "AultCare",
      "quarter": "pend",
      "qlabel": "Pending",
      "seg": "medadv",
      "seglabel": "Medicare Advantage",
      "note": "",
      "full": "AultCare",
      "dq": "rich",
      "products_and_scope": "AultCare is a long-standing 1upHealth payer customer (Canton, OH health plan affiliated with Aultman Hospital; ~40k members across Medicare Advantage + commercial/QHP LOBs — [#account-aultcare, ricky sahu 2022-07-27]).\n\nOriginal footprint (2021, \"Change rip & replace\"): 1up Platform, Patient Access, Provider Directory, and P2P (Send API) — $175k ARR [#arr-services-new-bookings 2021-10-08; #renewals 2024-10-09]. 2024 capacity increase +$37,500 → $212,500 ARR [#renewals 2024-10-09]. 2025 renewal was a 1-yr term w/ CPI uplift +$6,375 ARR, deliberately short \"while 0057 discussions continue\" [#arr-services-new-bookings 2025-09-25].\n\nNet-new 0057 expansion (the current motion): contracted for Provider Access, Payer-to-Payer (P2P), and ePA. SOW \"Aultcare - Provider Access, P2P, ePA\" sent 2025-09-09 [#sows-inflight]. Pricing approach: Provider Access priced just below their existing P2P; ePA priced higher than the standard pricing calculator; Nolan Kelly approved [DM Jodi/Nolan 2025-05-05]. They also carry a custom Optum/OptumRx formulary integration (FHIR List + MedicationKnowledge) built in the 2022 implementation.",
      "implementation_status": "0057 implementation kicked off Monday 2026-07-06 (1:30-2:30 ET) [#2026-0057-access-api--readiness 2026-06-29; #account-aultcare-implementation-0057-epa 2026-07-06]. Completed readiness questionnaires (Provider Access, P2P, ePA) were returned before kickoff. Original plan was a mid-June 2026 start [#2026-0057-access-api 2026-05-19]; slipped ~3 weeks to early July.\n\nPost-kickoff status (Rachel Schuler, 2026-07-06): Access APIs (Provider Access, P2P) started; ePA handled as a 30-min scoping \"fast-follow\" rather than a separate track because AultCare did not want a separate ePA call — Assi and Rachel will coordinate all updates in one recurring client call. AultCare flagged as a small team, \"hesitant to begin right away due to resource concerns.\"\n\nCustomer goal was to be live before Jan 1 (2026) to create ePA efficiencies [DM 2025-05-05] — that target predates the July 2026 kickoff, so go-live is now well behind the originally hoped-for date; no live/production 0057 date confirmed. A dedicated 0057 Gap Analysis (last modified 2025-12-05) is in progress comparing AultCare's source files to the V2 Extract Guides.\n\nSeparately, a formulary/Optum data-cleanup workstream has been open and unresolved since June 2025 (see risks).",
      "tech_architecture": "Single-tenant environment (\"1up-ault-prod\" FHIR OpenSearch/ElasticSearch; historically ran AWS SageMaker ML models, a leftover from the labs team [#account-aultcare 2023-04-05]).\n\nUM / PA stack (authoritative, from kickoff + Confluence \"Aultcare\" compliance page): UM vendor is TTAP, a Cognizant/QNXT (Q-Next) platform for PAS; also Evicore; UM logic depends on LOB or procedure. Policy vendor: InterQual (AultCare has a direct relationship with InterQual); DTR via InterQual or MCG. Cigna used for some PA logic by product line [Confluence \"Aultcare\" 10/6/25 + 5/5/25 notes; #epa kickoff 2026-07-06; DM 2025-05-05 \"they use Evicore and Cognizant\"]. CRD is a passthrough with direct QNXT integration — explicitly non-standard and \"will require custom work\"; requires AultCare structure their data a certain way [Confluence \"Aultcare\"].\n\nProvider-side EHRs referenced: Cerner, AllScripts, NextGen, Epic [Confluence \"Aultcare\" 5/5/25]. Aultman Hospital uses Cerner as EMR and uses Ellkay to archive/transform legacy EHR data when provider offices join — a pain point AultCare raised as a possible 1up use case in 2024 [#account-aultcare, Lindsay Parker 2024-04-09].\n\nData feeds (0057 Gap Analysis, files as of Nov 2025, all pipe-delimited CSV): Patient, Coverage, EOB (Institutional Inpatient/Outpatient, Professional, Pharmacy), CoveragePlan, FormularyDrug/MedicationKnowledge, and Provider Directory files split by product (FULL_FACILITY, HMO/PPO/PREMSEL/SPPO _FACILITY and _PRACTITIONER) mapped to Organization/Location/Practitioner. Pharmacy EOB + formulary (List, MedicationKnowledge, CoveragePlan) are pulled via a CUSTOM integration to the Optum API (PatientOptumRxCrosswalk) — not a standard STE flow [Confluence \"AultCare - 0057 Gap Analysis\"].",
      "financial_signals": "2021: $175k ARR initial (1up Platform, Patient Access, Provider Directory, P2P) [#arr-services-new-bookings 2021-10-08]. 2024: +$37,500 capacity increase → $212,500 total ARR [#renewals 2024-10-09; #arr-services-new-bookings 2024-10-09]. 2025 renewal: +$6,375 ARR CPI uplift, 1-yr term [#arr-services-new-bookings 2025-09-25]. New 0057 Provider Access + P2P + ePA SOW/Order Form sent 2025-09-09 [#sows-inflight] — specific ARR of the 0057 add-on not found in extracts (Provider Access set just below existing P2P line; ePA above calculator [DM 2025-05-05]). No signed 0057 booking amount confirmed in sources.",
      "key_people": "1upHealth side: Jodi Patton (Account Manager / AM lead); Holly Fan (CSM, primary customer contact — runs the recurring AultCare calls); Nolan Kelly (sales leadership, pricing approver); Robert Davis \"Robzzz\" (implementation engineering / SE on formulary); Joy He (SE); Maria Baker (0057 implementation lead / resourcing); Rachel Schuler + Assiatou \"Assi\" Diallo (assigned 0057 implementation leads — Provider Access/P2P + ePA); Jeremy Yoon, Anton, Mohammad Jouni (0057/ePA scoping & product). Earlier history: Eden Avraham-Katz.\n\nCustomer side: named individuals not surfaced in Slack (contacts referenced generically as \"my contact,\" \"the AultCare consultant,\" and a decision to \"go with option 1\" on formulary). AultCare partners closely with Cognizant on the ePA/PA side (joint 1up+AultCare+Cognizant call held 10/6/25). Note: no customer-side names were recoverable from the available sources.",
      "risks_and_blockers": "1) Resource constraints: AultCare is a small team and was \"hesitant to begin right away due to resource concerns\" at kickoff [#epa 2026-07-06] — top risk to timeline/adoption. 2) Timeline slip: wanted live before Jan 1; kickoff didn't happen until July 2026. 3) Non-standard CRD/QNXT integration requires custom work and specific data structuring [Confluence \"Aultcare\"] — higher LoE than a standard Provider Access/ePA build. 4) Custom Optum formulary feed is stale and unresolved: original 37 drug-plan IDs from 2022 no longer return data, net-new IDs not ingested; AultCare chose \"full replace\" (Option 1) but couldn't provide clean active/inactive plan mapping; as of 2025-12-04 still open, needs SE scoping and possibly a SOW for a new extract/API. Robert Davis flagged need for a requirements doc [#account-aultcare thread through 2025-12-04]. 5) Historical friction: P2P sign-off dragged for months in 2022-2023 requiring internal escalation — pattern of slow customer sign-off to watch.",
      "points_of_interest": "- 1upHealth is positioning AultCare as an early 0057/ePA implementation partner with \"competitive pricing\" and a \"transparency\" narrative — a strategic reference account [#general MOMENTUM 2025, 2025-05-06]. - AultCare is being connected to other 1up customers running Cognizant to de-risk the ePA build (\"connecting them with our customers who are using Cognizant\" — [DM 2026-04-16]). - Cognizant vendor dynamics matter broadly: Cognizant runs standalone per-payer registration portals, a known scaling friction for P2P [#product 2026-06-26]. - AultCare/Aultman relationship gives clinical-data adjacency (Cerner + Ellkay archival pain surfaced in 2024).",
      "expansion_plays": [
        {
          "play": "Managed formulary / Optum-Rx data feed modernization (paid SOW)",
          "rationale": "Their custom 2022 Optum API formulary pull (FHIR List, MedicationKnowledge, CoveragePlan, Pharmacy EOB) is broken/stale and has been an open cleanup item since June 2025 with no standard solution. Robert Davis already suggested a SOW is likely needed for a new full-replace/extract with business-logic mapping. This is a concrete, already-scoped-in-discussion services/product attach that also de-risks their Patient Access compliance.",
          "fit": "high"
        },
        {
          "play": "Clinical data exchange / HDE tied to the Aultman-Cerner archival workflow",
          "rationale": "AultCare surfaced a real pain in 2024: Aultman uses Cerner + Ellkay to archive/transform legacy EHR data (missing data, bad mappings, no validation) as provider offices join. With EOB/Coverage/Provider Directory FHIR data already flowing and an Aultman hospital affiliation, 1up could extend into clinical/HDE data transformation once 0057 is live. Labeled likely — needs re-discovery since the 2024 thread went cold.",
          "fit": "medium"
        },
        {
          "play": "Quality / risk analytics (popconnect) on the FHIR data already flowing",
          "rationale": "AultCare already sends Patient, Coverage, full EOB (institutional/professional/pharmacy) and Provider Directory into a single-tenant FHIR server. That corpus supports HEDIS/quality and risk-adjustment analytics as a post-0057 upsell without new integration. Fit tempered to low-medium by their small-team resource constraints, which may limit appetite for net-new products near-term.",
          "fit": "low"
        }
      ],
      "plays_hi": 1,
      "sources": [
        "Slack #account-aultcare (C02HE14MF3M) — history 2022-2026, incl. Optum formulary cleanup thread ts 1749046316.201139 (through 2025-12-04), P2P sign-off escalations 2022-2023, Aultman/Ellkay archival note 2024-04-09, SageMaker/labs 2023-04-05, ricky sahu member-count note 2022-07-27",
        "Slack #account-aultcare-implementation-0057-epa (C0BFGS7BS9Y) — Rachel Schuler kickoff recap 2026-07-06 (TTAP/Cognizant-QNXT, InterQual, small team, ePA fast-follow)",
        "Slack #account-aultcare-implementation-0057-provider-access-patient-access-p2p (C0BEW0YKXT4) — channel provisioned 2026-07-02",
        "Slack #2026-0057-access-api--readiness — kickoff scheduling 2026-06-29; assignment of Assi & Rachel, mid-June start 2026-05-19",
        "Slack #sows-inflight — Aultcare Provider Access/P2P/ePA SOW Sent 2025-09-09",
        "Slack #renewals 2024-10-09 — $175k + $37.5k = $212,500 ARR renewal",
        "Slack #arr-services-new-bookings — 2021-10-08 ($175k), 2024-10-09 ($37.5k), 2025-09-25 (+$6,375 CPI)",
        "Slack DM Jodi Patton/Nolan Kelly 2025-05-05 — 0057 pricing, Evicore/Cognizant, live-before-Jan-1 goal; 2026-04-16 CS/Cognizant note",
        "Slack #general 2025-05-06 & #growth-updates 2025-05-16 / 2025-10-10 — early-partner positioning, AultCare+Cognizant ePA",
        "Confluence CKB 'AultCare - 0057 Gap Analysis' (pageId 1768620033, mod 2025-12-05) — file/feed inventory, Optum custom flow",
        "Confluence Compliance 'Aultcare' (pageId 1197506608, mod 2026-04-29) — CRD/QNXT non-standard, UM vendors (Cognizant TTAP, Evicore, InterQual/MCG), EHRs Cerner/AllScripts/NextGen/Epic"
      ],
      "sf": {
        "arr": 426616.84781999997,
        "cumulative": 1368875,
        "product_rev": 1218875,
        "services_rev": 150000,
        "health": 2,
        "temperature": "Green",
        "nps": null,
        "renewal_sentiment": 1,
        "sentiment_notes": "EPIC",
        "flags": [
          "Competitor engaged",
          "ROI in question"
        ],
        "renewal": "2026-10-08",
        "contract_exp": "2024-12-31",
        "customer_since": "2021-10-08",
        "go_live": null,
        "impl_level": "Level V",
        "products_sold": "FHIR Interoperability Platform;Patient Access;Provider Directory;Payer to Payer Send;Request and Ingest",
        "lobs": "Medicare",
        "members_contracted": 50000,
        "members_current": 54527,
        "competitors": null,
        "pbm": null,
        "owner": "Jodi Patton",
        "csm": "Holly Fan",
        "exec_sponsor": "Jodi Patton",
        "tier": "Retain",
        "opps": [
          {
            "name": "AultCare - PAI+P2P",
            "type": "0125f000000iH45AAE",
            "closed": "2021-10-08",
            "arr": null,
            "services": 150000,
            "amount": 325000,
            "months": 11.96,
            "owner": "Ariana Zamora",
            "won_because": null,
            "competitor": null
          },
          {
            "name": "AultCare 50k Upsell",
            "type": null,
            "closed": "2021-10-08",
            "arr": null,
            "services": 0,
            "amount": 50000,
            "months": 10.18,
            "owner": "Ariana Zamora",
            "won_because": null,
            "competitor": null
          },
          {
            "name": "RENEWAL - AultCare 22",
            "type": "0125f000000iHVSAA2",
            "closed": "2022-10-08",
            "arr": null,
            "services": 0,
            "amount": 175000,
            "months": 11.96,
            "owner": "Ariana Zamora",
            "won_because": null,
            "competitor": null
          },
          {
            "name": "RENEWAL - AultCare 23",
            "type": "0125f000000iHVSAA2",
            "closed": "2023-10-08",
            "arr": null,
            "services": 0,
            "amount": 175000,
            "months": 11.99,
            "owner": "Holly Fan",
            "won_because": "Auto renew",
            "competitor": null
          },
          {
            "name": "AultCare - 2024 RENEWAL",
            "type": "0125f000000iHVSAA2",
            "closed": "2024-10-09",
            "arr": 212500,
            "services": 0,
            "amount": 212500,
            "months": 11.96,
            "owner": "Drew Arnold",
            "won_because": "Great relationship and happy with our services",
            "competitor": null
          },
          {
            "name": "25-26 Aultcare Renewal",
            "type": "0125f000000iHVSAA2",
            "closed": "2025-09-25",
            "arr": 212500,
            "services": null,
            "amount": 212500,
            "months": 11.96,
            "owner": "Jodi Patton",
            "won_because": "2025 renewal",
            "competitor": null
          },
          {
            "name": "25-26 Aultcare CPI Increase",
            "type": "0125f000000iHVSAA2",
            "closed": "2025-09-25",
            "arr": 212500,
            "services": null,
            "amount": 218875,
            "months": 12.22,
            "owner": "Jodi Patton",
            "won_because": "2025 Renewal",
            "competitor": null
          }
        ]
      }
    },
    {
      "id": 40,
      "name": "Empower",
      "quarter": "pend",
      "qlabel": "Pending",
      "seg": "medicaid",
      "seglabel": "Medicaid MCO / CCO",
      "note": "",
      "full": "Empower (Empower Health / #account-empower-health) — likely Empower Healthcare Solutions, an Arkansas Medicaid/behavioral-health managed care plan (PASSE). Data administered by TPA Evolent (Identifi platform); file prefix \"BHAR\" suggests Behavioral Health Arkansas.",
      "dq": "rich",
      "products_and_scope": "Long-standing legacy customer, live since 2021 (flipped from Edifecs). Original CMS-9115 purchase (cross-account recon, #arr-services-new-bookings 2021-07-01): Patient Access, Provider Directory, P2P Send, P2P Request/Ingest — $220k ARR + $125k Services, 25,852 members. Data enabled today (per 0057 Gap Analysis, Aug 2025): Patient, Coverage, EOB (Institutional Inpatient, Professional, Pharmacy), Observation (Smoking Status only), FormularyDrug, and full Provider Directory (Organization, Practitioner, PractitionerRole, Location). CarePlan/PCSP (Patient-Centered Service Plan — Risk Assessment/Risk Management, nutrition/food-pantry data added by Care Coordinators) has NEVER been ingested; flagged 2022-2024 as un-scoped/un-mapped potential SOW (one-time services fee). Patient-facing app was OneRecord (live Nov 2021). Health History P2P and Health History Lite were implemented. CMS-0057 expansion in flight: (1) Provider Access + P2P SOW in Salesforce \"waiting for customer response\"; (2) Prior Auth/ePA upsell tracked with a \"Sept [2026] start\".",
      "implementation_status": "Original 9115 stack (Patient Access, Provider Directory, P2P) is live and in steady-state ongoing-file operations. CMS-0057 work is pre-contract. A 0057 Gap Analysis was completed (Confluence page last modified 2025-08-26) comparing Evolent source files against 1up's V2 0057 Extract Guides to scope contracting. The Provider Access + P2P 0057 SOW is in Salesforce awaiting customer signature (#sows-inflight, \"In SF - waiting for customer response\"; Maria Baker notes Empower has an existing order form tying it to a commencement date). A separate Prior Auth (ePA) upsell is targeted for a Sept 2026 start (Pending Prior Auth Upsells list, 2026-05-29). No 0057 go-live yet. An audit request from Empower was routed to CSM Holly Fan in May 2026, indicating the account is active but low-volume. Ongoing files still landing regularly (LastUpdated dates 2025-08-17/18 across all resources per gap analysis).",
      "tech_architecture": "Legacy STE (Standard Transformation Engine) architecture on ElasticSearch — NOT migrated to the new Health Data Engine (HDE). Dedicated AWS environment \"1up-empower-prod\" (own VPC, NiFi EC2 i-0a466e28bf938495a, jump/tunnel servers, Kibana/Grafana for monitoring; Lacework agent installed 2022). Data source is TPA Evolent (formerly branded \"Identifi\"), the same vendor 1up notes also serves Cook County and MPC. Evolent produces JSON extracts (does NOT follow DIMA/1up preferred schema — uses its own schema) dropped to an Empower Prod ingestion S3 bucket, ingested immediately via NiFi into the FHIR server. File examples: evolent_prod_member_v4-3_BHAR (Patient/Coverage/Observation), evolent_prod_eob_v5-2_BHAR (EOB Institutional+Professional), vh_datashare pipe-delimited CSV + RPT (EOB Pharmacy), evolent_prod_provider_v4-1_BHAR (Provider Directory), AR MOB Weekly CSV (FormularyDrug), Evolent_Prod_Clinical_Extract (clinical, paused since 2022-03). Claim types sent: EOB Institutional Inpatient (Y), Professional (Y), Pharmacy (Y); NOT sent: Institutional Outpatient, Oral, Vision. Client verifies via 1up Admin Console. Because 0057 will require Evolent to update/upgrade source files to V2 Extract Guide schemas, Evolent is a critical dependency/gatekeeper for the expansion.",
      "financial_signals": "Original booking (cross-account recon, #arr-services-new-bookings 2021-07-01): $220k ARR (Patient Access, Provider Directory, P2P Send, P2P Request/Ingest) + $125k Services; 25,852 members. No specific dollar amounts found for the in-flight 0057 Provider Access + P2P SOW or the ePA upsell (SOWs not yet signed). CarePlan mapping flagged as a potential additional one-time services fee (un-quantified). Edifecs was the displaced incumbent.",
      "key_people": "Customer side: Joe (Empower PM/technical lead, 2021-2022 go-live), Craig (business/decision), Deb (relationship/business lead, focus on cost containment + member quality + utilization management), Emily and Lee (ops/data). Evolent = data TPA. 1up side: Holly Fan (Primary CSM, current — took audit request May 2026); Annie Kroes (CSM, named in gap analysis); Robert Davis \"Robzzz\" (Implementation/DE lead); Avi Lessure (data/ingestion); Maria Baker (Services/SOW); Jodi Patton (contracts/SOW owner); Stephanie Iheme and Geetika Arora (CSM/account); Frank Nostrame, Gurdeep Singh, Kiki Morgan (CloudOps/infra); original Sales Exec/SAD \"Alex\" (U021G3Q774L) and Nolan Kelly (exec). Chad Clough joined the channel Jul 2025 and left Mar 2026.",
      "risks_and_blockers": "1) Historically difficult/non-communicative customer: 2021 go-live had a near-crisis \"fire drill\" (customer couldn't verify members loaded; leadership described their \"consultant personality\" and communication complaints); 2022 P2P sign-off stalled because customer was \"non-communicative\" (team considered just sending prod links). 2) The 0057 Provider Access + P2P SOW has been sitting in Salesforce awaiting customer response — signature stalled, mirroring past behavior. 3) Evolent dependency: source files use Evolent's own (non-DIMA) schema and must be upgraded to V2 0057 Extract Guides — Empower cannot self-serve; Evolent must do the work. 4) Legacy STE/ElasticSearch stack, not on HDE — modernization/migration risk and higher services overhead. 5) CarePlan/PCSP data still not ingested/mapped despite multiple years of customer interest. 6) ePA Sept-2026 start is tight for 1/1/2027 compliance given ePA's dev complexity and this customer's slow contracting history.",
      "points_of_interest": "Empower is a behavioral-health / Medicaid population (BHAR files; PCSP care plans with Care Coordinators, food pantry / nutrition / risk data) — sensitive-data-tagging (SDT) is a natural fit and a compliance concern for P2P/Provider Access, though no SDT engagement is recorded for Empower yet. The customer explicitly asked (2024) \"how can we improve our utilization management process so we are paying/approving appropriately?\" and 1up floated PopConnect + a regulatory Readiness Assessment — a warm, unclosed expansion thread. Evolent is a shared 1up vendor (also MPC, Cook County), so learnings/schema work are reusable across accounts. Empower was made a \"Level 5 epic\" internally in 2022. Note: profile is inferred from a mix of live 2021-2024 channel history plus 2025-2026 SOW/upsell tracking; the account channel itself is quiet in 2025-2026 (mostly infra/smoke-test alerts).",
      "expansion_plays": [
        {
          "play": "Close the in-flight CMS-0057 Provider Access + P2P SOW, then land the ePA/Prior Auth add-on (Sept 2026 start already tracked)",
          "rationale": "Empower already has P2P Send + Ingest and Provider Directory data flowing from 2021, so Provider Access + P2P is a natural 0057 upgrade on existing pipes; the SOW is drafted and in Salesforce. The ePA upsell is the highest-value follow-on and is already on the pending-upsell list — but both need signature pressure and Evolent's V2 schema upgrades to unblock. Prioritize de-risking the Evolent dependency and the customer's slow-contracting pattern.",
          "fit": "high"
        },
        {
          "play": "Sell Sensitive Data Tagging (SDT) as a required companion to P2P/Provider Access",
          "rationale": "Empower is a behavioral-health/Medicaid plan (BH Arkansas, PCSP care plans) — exactly the population where behavioral-health/substance-use records must be filtered out of P2P Outbound and Provider Access unless the member opts in. 1up is enabling SDT-by-default on P2P in 2H 2026 and is already scoping SDT SOWs at peer accounts (MCS, MMM, JHHP). SDT needs its own SOW/scoping and pairs directly with the 0057 sale.",
          "fit": "high"
        },
        {
          "play": "Revive the CarePlan/PCSP + PopConnect / utilization-management value play",
          "rationale": "Empower has repeatedly signaled interest in ingesting CarePlan/PCSP (risk assessment, nutrition, food-pantry, SDOH data) — never mapped — and explicitly asked how to improve utilization management to 'pay/approve appropriately.' 1up already floated PopConnect + a regulatory Readiness Assessment. Mapping this rich clinical/SDOH data into the FHIR store they already pay for unlocks popconnect/quality-and-risk analytics on data already flowing.",
          "fit": "medium"
        }
      ],
      "plays_hi": 2,
      "sources": [
        "Slack #account-empower-health (C029WBT1DB8) — full channel history 2021-2024 incl. 2021 go-live fire drill, OneRecord live 2021-11-04, Evolent JSON confirmation (Avi Lessure 2025-01-23), CarePlan/PCSP gaps, Health History P2P/Lite pen-test setup",
        "Confluence: Empower - 0057 Gap Analysis, CKB space, page 1445658881 (last modified 2025-08-26) — Evolent file inventory, resource LastUpdated dates, claim types, V2 Extract Guide gap methodology",
        "Confluence: Empower Ongoing File Table, CKB page 304283724 (referenced in channel 2025-01-23)",
        "Slack #sows-inflight — 'Empower - Provider Access, P2P SOW … In SF - waiting for customer response'; Maria Baker note on existing order form/commencement date",
        "Slack Group DM (Jodi Patton/Rachel Schuler/Jeremy Yoon) 2026-05-29 — Pending Prior Auth Upsells: 'Empower - Sept start'",
        "Slack DM (Jodi Patton/Geetika Arora) 2026-05-21 — Empower audit request routed to CSM Holly Fan",
        "Slack Group DM 2024-04-08 (Maria Baker/Robert Davis/Jodi Patton) — CarePlan Risk Assessment data, potential new SOW",
        "Cross-account recon extract: #arr-services-new-bookings 2021-07-01 — $220k ARR + $125k Services, 25,852 members, Edifecs flip",
        "Confluence: Health History (P2P and Lite) Testing Setup, SS page 216006752 — 1up-empower-prod account/env references"
      ],
      "sf": {
        "arr": 73333.33333200001,
        "cumulative": 1214480.41,
        "product_rev": 1089480.41,
        "services_rev": 125000,
        "health": 10,
        "temperature": "Green",
        "nps": null,
        "renewal_sentiment": 5,
        "sentiment_notes": null,
        "flags": [
          "ROI in question",
          "Pricing Concern"
        ],
        "renewal": "2028-09-29",
        "contract_exp": "2024-09-29",
        "customer_since": "2021-09-30",
        "go_live": null,
        "impl_level": "Level V",
        "products_sold": "FHIR Interoperability Platform;Patient Access;Provider Directory;Payer to Payer Send;Request and Ingest",
        "lobs": "Medicaid",
        "members_contracted": 30000,
        "members_current": 31429,
        "competitors": null,
        "pbm": null,
        "owner": "Jodi Patton",
        "csm": "Holly Fan Test",
        "exec_sponsor": "Jodi Patton",
        "tier": "Grow",
        "opps": [
          {
            "name": "Services Empower 10/2021",
            "type": null,
            "closed": "2021-08-01",
            "arr": null,
            "services": 50000,
            "amount": 50000,
            "months": 5.91,
            "owner": "Ariana Zamora",
            "won_because": "recon for finance az 9/2024",
            "competitor": null
          },
          {
            "name": "Empower 2021 120 k new deal",
            "type": null,
            "closed": "2021-08-01",
            "arr": null,
            "services": 0,
            "amount": 120000,
            "months": 10.94,
            "owner": "Ariana Zamora",
            "won_because": "recon with finance az 9/17/2024",
            "competitor": null
          },
          {
            "name": "Empower Arkansas - Platform & CMS APIs",
            "type": "0125f000000iH45AAE",
            "closed": "2021-08-01",
            "arr": null,
            "services": 75000,
            "amount": 175000,
            "months": 11.96,
            "owner": "Ariana Zamora",
            "won_because": null,
            "competitor": null
          },
          {
            "name": "RENEWAL - Empower Health - Patient Access 22",
            "type": "0125f000000iHVSAA2",
            "closed": "2022-11-16",
            "arr": null,
            "services": 0,
            "amount": 100000,
            "months": 11.96,
            "owner": "Ariana Zamora",
            "won_because": null,
            "competitor": null
          },
          {
            "name": "Empower - P2P Send & HH 2022",
            "type": "0125f000000iH45AAE",
            "closed": "2022-12-22",
            "arr": null,
            "services": 0,
            "amount": 109480.41,
            "months": 10.94,
            "owner": "Holly Fan",
            "won_because": null,
            "competitor": null
          },
          {
            "name": "RENEWAL - Empower Health - Patient Access & P2P 2023",
            "type": "0125f000000iHVSAA2",
            "closed": "2023-09-30",
            "arr": null,
            "services": 0,
            "amount": 220000,
            "months": 11.99,
            "owner": "Holly Fan",
            "won_because": "Renewal",
            "competitor": null
          },
          {
            "name": "RENEWAL - Empower Health - Patient Access 2024",
            "type": "0125f000000iHVSAA2",
            "closed": "2024-09-29",
            "arr": null,
            "services": 0,
            "amount": 220000,
            "months": 11.96,
            "owner": "Jessica Candito",
            "won_because": "2024-2025 renewal",
            "competitor": null
          },
          {
            "name": "25-28 Empower Health Renewal",
            "type": "Existing Business",
            "closed": "2025-09-23",
            "arr": null,
            "services": 0,
            "amount": 220000,
            "months": 35.98,
            "owner": "Jodi Patton",
            "won_because": "auto renew",
            "competitor": null
          }
        ]
      }
    },
    {
      "id": 41,
      "name": "Jai Medical Center",
      "quarter": "pend",
      "qlabel": "Pending",
      "seg": "medicaid",
      "seglabel": "Medicaid MCO / CCO",
      "note": "First direct HDE customer",
      "full": "Jai Medical Systems (aka Jai Medical Center) — Maryland Medicaid Managed Care organization",
      "dq": "rich",
      "products_and_scope": "Full CMS-0057 + CMS-9115 suite plus Patient Access. Closed 5/19/2026: $212,500 ARR over 3 years + $85,000 Services [#arr-services-new-bookings 2026-05-20]. Products: Patient Access (+ Provider Directory), Payer-to-Payer, Prior Auth/ePA, Provider Access [same booking; #shout-outs 2026-06-08 confirms \"full offering ... Patient Access/PD, Provider Access, P2P and ePA APIs\"]. Single line of business: Medicaid only (Medicaid Managed Care, State of Maryland) — Maria Baker and Anissa Nashikkar confirmed \"they are only Medicaid\" [C0B731XCE4F 2026-06-30]. (Note: the Handoff-to-CS page still shows placeholder \"1 LOB (QHP)\" — an un-customized template field, contradicted by the Slack confirmation.) SOW Exhibit A crosswalk covers Patient Access (Patient, Coverage, EOB Inpatient/Outpatient/Professional/Pharmacy/Vision/Dental, Organization, Practitioner, RelatedPerson), Prior Auth EOB, Provider Directory + Pharmacy Directory (DaVinci PDex Plan-Net), Formulary (DaVinci Formulary Drug), Member Attribution List (PDex Provider Group), Member Opt-out (PDex Provider Access Consent), Delegate/Personal Rep/Sensitive Data Codes [Confluence: Jai Medical - SOW Details, CKB space].",
      "implementation_status": "Early-stage; go-live NOT yet scheduled (matches roster \"pending/unscheduled\"). Timeline: sales handoff ~Apr 2026; kickoff 6/5/2026 (led by Anissa Nashikkar); post-kickoff data-readiness call and technical review call both held 6/29; onboarding onto STE/MTE began early June. As of 7/9/2026 the team is still building Jai's Data Inventory spreadsheet and chasing source-data schemas — Robert Davis: \"As long as this question is not answered, Core-Data cannot give us timelines for when Jai can go live\" [C0B731XCE4F 2026-07-09]. Named early HDE customer: \"Jai targeted to be first customer onboarding directly to HDE,\" flagged to \"spin off a separate tracking ... as we move through onboarding into HDE for the first time\" [#proj-velocity 2026-06-17]. HDE implementation in Crawl phase starting July 2026; Q3 2026 on the X12 ingestion path [Confluence: HDE Implementation Playbook + DNA weekly update]. Jai/Allcare next in Patient Access config queue behind Yamhill/Zing, pending CX calls + intake confirmation [#proj-velocity 2026-06-24]. Currently onboarded onto an STE and being watched under Project Velocity [#proj-velocity 2026-06-04].",
      "tech_architecture": "File-based SFTP-push ingestion via HDE (Health Data Engine), not API-to-API; MTE partitions provisioned as \"medcare\"/\"medcarepub\" (10-char limit) for the Medicaid Managed Care LOB, plus default customer-shared/auditing/defaultlob partitions [C0B731XCE4F 2026-06-25]. \"Flexible/Flexible Ingest\" strategy because data comes from many source systems [#shout-outs 2026-06-08]. Source systems + formats (from SOW Exhibit A): SS&C (core claims/admin — Patient, Coverage, Organization, Practitioner, EOB Inpatient/Outpatient/Professional as X12 837, CSV); ProCare / ProCare Formulary Navigator (pharmacy — EOB Pharmacy as NCPDP D.0, Formulary + Pharmacy Directory as JSON); Versant Health (Vision EOB, X12 837); Edifecs (Dental EOB, FHIR R4; also holds historical 9115 Patient Access data); AcuityNXT (Prior Auth, X12 278 via SFTP — a Chordline product and Jai's sole UM system); Jai Medical direct (Member Attribution CSV, Member Opt-out X12 834, Sensitive Data Codes CSV). FHIR IGs in scope: CARIN BB, US Core 6.1.0 & 7.0.0, DaVinci ATR, DaVinci PDex PA, DaVinci PDex Plan-Net, DaVinci Formulary Drug. Patient Access uses an IDP integration for member auth (\"they have an IDP that we are integrating with for Patient Access\" [#proj-velocity 2026-06-17]). ePA/DTR policy engine: chose InterQual after evaluating (and rejecting) Itiliti [#epa-adoption-growth 2026-07-06]. Open architecture question: possible API-to-API pull from Edifecs for historical Patient Access data (Andrew Berglund likened it to Clinical Connect/P2P FELP pull-transform pattern) — not in SOW, would need change order [C0B731XCE4F 2026-06-30].",
      "financial_signals": "$212,500 ARR (3-year term) + $85,000 one-time Services. Contract signed/closed 5/19/2026 (sub-2-month sales cycle; Chordline introduced 1up to Jai on 3/31/2026). First partner-driven opportunity led by Chordline Health [#arr-services-new-bookings 2026-05-20]. No renewal/expansion dollar figures found beyond the initial booking.",
      "key_people": "Customer (Jai): Jai Seunarine (President & CEO, project sponsor); Devon Bowers (CIO, project escalation + PM); Sophia Lupinek (COO, escalation + logos); Ankita Patil (Asst. Director of Systems Management — key data/attribution/consent/PA SME); Bob Frey (DBA — SFTP/SSH + clinical data SME); Laurie Hopple (Director of UM — Prior Auth SME); Kelley Shannon (CCO — auth-language approver). 1upHealth: Stephanie Iheme (VP Customer Experience, sponsor); Maria Baker (Sr. Director Professional Services, escalation); Anissa Nashikkar (Implementation Manager — PA/PD/Provider Access/P2P); Rachel Schuler (Sr. Implementation Manager — ePA); Jeremy Yoon (ePA/UM lead); Robert \"Robzzz\" Davis (Sr. Manager Technical Services); Tania Gregory (Sr. Data Engineer, technical lead); Andrew Berglund (Software Engineer); Keyur Master (Core Data); Avi Lessure (Sr. Health Informaticist — claims/clinical data); Rob Bradley (partner/sales lead); Ryan Ingram (solution design + SOW); Juliette Steinkrauss and Jodi Patton (sales/partner support). Partner: Chordline Health (referral partner; maker of AcuityNXT UM). [Confluence: Jai Medical - Stakeholder & Project Participants Register; various Slack]",
      "risks_and_blockers": "1) Go-live timeline is BLOCKED until the full data-set list + schemas are defined and handed to Core-Data; no go-live date can be set until then [C0B731XCE4F 2026-07-09]. 2) First-ever customer to onboard directly into HDE — new/unproven territory; team explicitly wants separate tracking [#proj-velocity 2026-06-17]. 3) Multi-source \"flexible ingest\" complexity (7+ distinct source systems, mixed X12/NCPDP/FHIR/CSV/JSON formats) raises integration risk. 4) Historical 9115 Patient Access data sits in Edifecs; the requested API-to-API pull is outside SOW and would require a change order. 5) Consent/opt-out wrinkle: State of Maryland manages member opt-in/opt-out, and Jai wants a \"middle ground\" experience that 1up's current Provider Access/P2P setup may not support [C0B731XCE4F 2026-06-30]. 6) Prior-auth ingest today is X12 278 via SFTP from AcuityNXT; Jai/Fallon interest in API-based PA ingest is only a future roadmap item, not built [#product 2026-06-30]. 7) Dependency on shared Project Velocity work (FHIR ID rollback, dual UAT/Prod Client ID, AutoMQ streaming) that must land before any MTE go-live.",
      "points_of_interest": "Strategic first for 1up on two fronts: (a) first Chordline Health partner-sourced deal, validating the partner channel (AcuityNXT is a Chordline UM product; more AcuityNXT/Chordline customers may follow); (b) first customer onboarding directly to HDE. 1up referred Jai to Itiliti for DTR/policy management in April; Jai found Itiliti complex and expensive and chose InterQual instead, with Jeremy Yoon smoothing Jai's concerns [#epa-adoption-growth 2026-07-06]. Jai is Medicaid-only in Maryland, a relatively clean single-LOB scope. Dedicated shared inbox 1up-jaimedical-implementation@1up.health created for technical comms.",
      "expansion_plays": [],
      "plays_hi": 0,
      "sources": [
        "Slack #account-jaimedical-implementation-9115-and-0057 (C0B731XCE4F) — channel history 2026-06-01 to 2026-07-09 (kickoff, MTE partition design, data-readiness thread, data-inventory thread)",
        "Slack #account-jaimedical-implementation-0057-epa (C0BFRCDGMCM) — created 2026-07-07, ePA workstream split-out",
        "Slack #arr-services-new-bookings (C01KG7PJEDV) 2026-05-20 — booking $212.5K ARR + $85K services, Chordline partner deal",
        "Slack #shout-outs (C01ES2JGZ7Y) 2026-06-08 — kickoff, full-suite + Flexible Ingest confirmation",
        "Slack #proj-velocity (C08A0QU0733) 2026-06-04/06-17/06-24 — HDE-first onboarding, IDP integration, config queue",
        "Slack #epa-adoption-growth (C0AK3790E3C) 2026-07-06 — Itiliti vs InterQual DTR decision",
        "Slack #prior-auth (C08LCE6JYUD) 2026-05-07 — AcuityNXT as sole UM system, Chordline product",
        "Slack #product (C0102AFFS8J) 2026-06-30 — X12 278 SFTP from AcuityNXT, API-ingest roadmap",
        "Confluence: Jai Medical - SOW Details (CKB, 2439741518) — Exhibit A source-system/format/FHIR crosswalk",
        "Confluence: Jai Medical - Stakeholder & Project Participants Register (CKB, 2439741597)",
        "Confluence: Jai Medical - Handoff to CS and Support (CKB, 2439741712) — mostly template placeholders",
        "Confluence: HDE Implementation Services/Engineering Playbook (DNA, 2391867393) — JAI named in first 2-4 HDE implementations",
        "Confluence: Bi-weekly Product Roadmap Updates (PD, 2341077003) — JAI among 3 new MTE/HDE customers"
      ],
      "sf": {
        "arr": 70833.333336,
        "cumulative": 297500,
        "product_rev": 212500,
        "services_rev": 85000,
        "health": null,
        "temperature": null,
        "nps": null,
        "renewal_sentiment": null,
        "sentiment_notes": null,
        "flags": [],
        "renewal": "2029-05-15",
        "contract_exp": null,
        "customer_since": "2026-05-15",
        "go_live": null,
        "impl_level": null,
        "products_sold": null,
        "lobs": null,
        "members_contracted": null,
        "members_current": 29182,
        "competitors": "Healthx",
        "pbm": null,
        "owner": "Rob Bradley",
        "csm": "Holly Fan",
        "exec_sponsor": null,
        "tier": null,
        "opps": [
          {
            "name": "Jai Medical Systems - 0057 Chordline Referral",
            "type": null,
            "closed": "2026-05-15",
            "arr": null,
            "services": 85000,
            "amount": 297500,
            "months": 36.01,
            "owner": "Rob Bradley",
            "won_because": "referral by chordline health",
            "competitor": null
          }
        ]
      }
    },
    {
      "id": 42,
      "name": "AllCare CCO",
      "quarter": "pend",
      "qlabel": "Pending",
      "seg": "medicaid",
      "seglabel": "Medicaid MCO / CCO",
      "note": "",
      "full": "AllCare CCO (AllCare Health) — Oregon Coordinated Care Organization / Medicaid plan, ~70,000 members",
      "dq": "rich",
      "products_and_scope": "New-logo, full CMS-0057 compliance deal closed June 2026 (Kevin Kowalczyk's first payer deal). SOW objective explicitly names CMS-9115-F, CMS-0057-F, and CMS-4208-F2 [Group DM C0BFLM692CT, 2026-07-07]. Scope = full 0057 suite: Provider Access API, Payer-to-Payer, ePA (electronic prior auth, with CRD + DTR + PAS), Patient Access API, plus 1up Provider Directory (FHIR R4, Da Vinci PDex Plan Net IG, public no-auth API + usage reporting). ePA decisions per implementation canvas: CRD 1up-hosted, DTR 1up-hosted with 1 questionnaire in scope [canvas F0BFSETH6PQ]. Channel names confirm the split: #account-allcare-implementation-9115-0057 (C0BC6A9KS15) and #account-allcare-implementation-0057-epa (C0BFY6Z5AG4). NOTE: MPF (Medicare Plan Finder, the CMS-4208-F2 piece) is NOT in the original SOW — Maria Baker confirmed 2026-07-07 and a change order to add it is in progress; interim plan is to stand up AllCare's Provider Directory URL/index (1up knows the naming conventions) to hit the CMS URL deadline (~7/10) [Group DM C0BFLM692CT, 2026-07-07].",
      "implementation_status": "Early implementation as of July 2026. Commencement 6/29/2026. Environment ticket OPSREQ-10386 created 2026-06-25 (Core Infra needed full product list; no MTE-environment request template existed yet) [#account-allcare-implementation-9115-0057]. Pre-kickoff scoping call held 7/7; formal Kickoff Call and recurring series (one series with Assi/Assiatou Diallo for all 0057 APIs) still to be scheduled; a post-kickoff discovery call was held 7/7 out of order [canvas F0BFSETH6PQ]. ePA scoping call held 7/7 [#...9115-0057, Rachel Schuler]. Patient Access API configuration is queued behind Yamhill/Zing under Project Velocity (\"Jai & Allcare follow-on configuration setup will start ASAP; net-new implementations to be fully MTE\") [#proj-velocity 2026-06-24, #product 2026-06-24]. No go-live announced yet.",
      "tech_architecture": "Net-new implementation being stood up fully on 1up's MTE (multi-tenant environment) / HDE — one of three net-new MTE/HDE customers alongside Jai and Sendero [Confluence: Bi-weekly Product Roadmap Updates; #product 2026-06-24]. Leadership debated STE/MTE hybrid vs. pure MTE; technical onboarding led by Product Dev team (not just Services) due to MTE novelty [#people_leaders, Maria Baker 2026-06-17]. UM vendor: EZ Cap — will likely require X12 conversion for ePA. AI partner Latitude integrates with EZ Cap, NOT directly with 1up [canvas F0BFSETH6PQ]. Notable architecture ask: AllCare's CIO requested using/maintaining their OWN domain for the FHIR API endpoint (vanity URL, e.g. allcarehealth.com/fhir) rather than a 1up-hosted domain; Eng flagged complexity (Gateway/Layer-7 ALB routing, no established precedent), determined it was purely a branding/ownership preference with no compliance/security driver, and Anton Pederson planned to push back [#cloud-devops-core-infra-public thread, 2026-05-28 to 06-02]. \"Endless technical back-and-forth\" characterized the deal cycle.",
      "financial_signals": "$216,750 ARR + $110,000 Services (one-time); 70,000 members; 6/29/2026 commencement [#arr-services-new-bookings, Kevin Kowalczyk 2026-06-17]. Tracked at ~$215k during June close [#sales-team, Nolan Kelly 2026-06-11]. Was a long shot in Q1 (2026-03-30) before closing in June. Additional revenue expected from the in-flight MPF change order (amount not yet stated). Additional compute cost of the fully-MTE net-new build noted generally (prior nuke/rerun jobs ran ~$1,800–$2,300).",
      "key_people": "1upHealth: Kevin Kowalczyk (AE/deal owner — first payer deal); Nolan Kelly (sales leader); Anton Pederson (sales engineer, lead technical/domain negotiation); Ryan Ingram (sales engineer/services); Maria Baker (Services/implementation lead); Rachel Schuler (Implementation Manager, authored the Confluence page + ePA canvas); Stephanie Iheme (contracts); Assiatou \"Assi\" Diallo (0057 API delivery); Robert McClary/Justin Hatem/Michael Perillo/Ilyas Aricanli (infra/security on the domain question). Customer-side: an unnamed CIO (drove the own-domain request); \"Bonnie\" (AllCare contact on SOW/sales process, per Maria Baker); \"Vanessa\" referenced in MPF context (unconfirmed if AllCare-specific). Customer team is working the CMS URL deadline with their current PD vendor / internal data teams.",
      "risks_and_blockers": "1) MPF/CMS-4208-F2 scope gap — not in original SOW; requires a change order, and customer faces a near-term CMS Provider Directory URL/index deadline (~7/10) they are currently trying to meet via their existing vendor. Risk of scope/expectation friction. 2) Aggressive timeline on a net-new, fully-MTE build where MTE tooling is still maturing (Patient Access config still manual; STE→MTE data streaming, dual UAT/Prod client-ID support, and FHIR-ID rollback all in-flight under Project Velocity) — customer go-live in MTE is gated on that platform work. 3) EZ Cap UM vendor likely needs X12 conversion — added ePA integration complexity. 4) Customer's own-domain FHIR endpoint request required push-back; watch for it resurfacing. 5) Deal already described as heavy \"technical back-and-forth\"; customer is technically engaged/demanding. Also flagged for a win/loss review [Leslie Barthel DM].",
      "points_of_interest": "First payer deal for AE Kevin Kowalczyk and part of the quarter where every quota-carrying rep booked a deal [#general Mission Minute 2026-06-30]. AllCare, Cascade, and Yamhill appear together as related Oregon CCOs (Kevin coordinated cross-CCO meetings in April) — suggests regional cluster / reference potential. Confluence page \"AllCare July 2026 - 9115 & 0057\" (CKB space, page 2462416949) exists but is still a skeleton/template (placeholder links only) as of 7/1. In the DIY/competitive analysis, AllCare was bucketed as \"Platform Conversion — in Contracting now, platform sale in motion\" [#sales-marketing, Stevie Watson 2026-06-05], i.e. 1up won a full-platform deal vs. a build-it-yourself posture.",
      "expansion_plays": [
        {
          "play": "Close the MPF / CMS-4208-F2 change order now",
          "rationale": "Already identified as a scope gap with an imminent CMS URL deadline; customer explicitly asked whether MPF is included. Fastest, warmest incremental revenue — 1up already knows their PD URL naming conventions and can stand up the index. Convert the interim favor into a signed change order.",
          "fit": "high"
        },
        {
          "play": "Clinical data / Clinical Connect (DPP) + quality & risk analytics on the FHIR data already flowing",
          "rationale": "AllCare is a Medicaid CCO (value-based, quality-measure heavy) being stood up fully on MTE/HDE with the entire 0057 dataset (claims, clinical, provider) already ingested. Multiple customers (incl. Fallon at $55k) are leaning into Clinical Connect/DPP; the same population-health/quality-analytics motion fits a CCO well once compliance data is live.",
          "fit": "medium"
        },
        {
          "play": "Regional CCO reference / land-and-expand across the Oregon cluster",
          "rationale": "AllCare, Cascade, and Yamhill surface together as related Oregon CCOs and Yamhill is already a 1up customer. Use AllCare's full-0057-on-MTE go-live as a reference to expand product footprint (EOB/Patient Access value-adds, ePA optimization) and win adjacent CCOs.",
          "fit": "medium"
        }
      ],
      "plays_hi": 1,
      "sources": [
        "Slack #arr-services-new-bookings (C01KG7PJEDV) thread 1781730497.050239 — Kevin Kowalczyk 2026-06-17, booking: $216,750 ARR / $110,000 Services / 70,000 members / 6-29 commencement",
        "Slack #account-allcare (C0BCMQ534PL) — channel created 2026-06-23, membership only",
        "Slack #account-allcare-implementation-9115-0057 (C0BC6A9KS15) — OPSREQ-10386 env ticket 6-25; ePA scoping + MPF question 7-7",
        "Slack #account-allcare-implementation-0057-epa (C0BFY6Z5AG4) — created 7-7; canvas F0BFSETH6PQ",
        "Slack canvas F0BFSETH6PQ — ePA scoping BLUF: EZ Cap UM vendor (X12 likely), Latitude AI partner, CRD/DTR 1up-hosted, 1 questionnaire in scope",
        "Slack Group DM C0BFLM692CT — 2026-07-07 MPF-not-in-SOW discussion, SOW objective text (CMS-9115-F/0057-F/4208-F2), Provider Directory product definition",
        "Slack #cloud-devops-core-infra-public (C048KKRA709) thread 1779978356.966539 — own-domain FHIR endpoint request + push-back, 2026-05-28 to 06-02",
        "Slack #people_leaders (C05GYDMMVU4) 1781734970.130029 — Maria Baker, STE/MTE decision, Prod Dev-led onboarding",
        "Slack #proj-velocity (C08A0QU0733) 2026-06-24 and #product (C0102AFFS8J) 2026-06-24 — Allcare queued for MTE Patient Access config under Project Velocity",
        "Slack #sales-team (G01MM5KUS9K) — June close tracking ($215k), Q1 long-shot note",
        "Slack #sales-marketing (C08S2H50TB6) — Stevie Watson 2026-06-05 DIY analysis, AllCare = Platform Conversion / in Contracting",
        "Slack #general (C2YPYSZFF) 2026-06-30 — Mission Minute crediting Kevin/AllCare",
        "Confluence CKB page 2462416949 'AllCare July 2026 - 9115 & 0057' (skeleton/template)",
        "Confluence PD page 2341077003 'Bi-weekly Product Roadmap Updates' — JAI/Allcare/Sendero as net-new MTE/HDE customers"
      ],
      "sf": {
        "arr": 321111.111108,
        "cumulative": 326750,
        "product_rev": 216750,
        "services_rev": 110000,
        "health": null,
        "temperature": null,
        "nps": null,
        "renewal_sentiment": null,
        "sentiment_notes": null,
        "flags": [
          "Known churn"
        ],
        "renewal": "2027-03-02",
        "contract_exp": null,
        "customer_since": "2026-06-30",
        "go_live": null,
        "impl_level": null,
        "products_sold": null,
        "lobs": null,
        "members_contracted": null,
        "members_current": null,
        "competitors": null,
        "pbm": null,
        "owner": "Kevin Kowalczyk",
        "csm": "Geetika Arora",
        "exec_sponsor": null,
        "tier": null,
        "opps": [
          {
            "name": "AllCare - CMS-0057 Compliance",
            "type": null,
            "closed": "2026-06-17",
            "arr": null,
            "services": 110000,
            "amount": 326750,
            "months": 8.05,
            "owner": "Kevin Kowalczyk",
            "won_because": "Functionality, customer references",
            "competitor": null
          }
        ]
      }
    }
  ],
  "topPlays": [
    {
      "rank": 1,
      "account_label": "Fallon",
      "play": "ePA / Prior Auth API suite (CRD/DTR/PAS)",
      "why": "Flagship; ePA discovery done 2023 (TruCare/InterQual/fax pain documented), PA EOB extraction from 5 UM vendors already underway, **1up is actively estimating the PA work *right now* (Hina→Jodi DM 7/8)** — before 1/1/27.",
      "size": "~$530k+ ARR base, 396k members",
      "trigger": "Convert the in-flight estimate into a signed ePA SOW; decide standalone vs. amendment and pre-1/1/27 delivery.",
      "ref": 0
    },
    {
      "rank": 2,
      "account_label": "Capital Blue Cross",
      "play": "Commercial LOB SOW + ePA (digitized policy mgmt)",
      "why": "$995k account; **draft commercial SOW already sent to Todd (1/27)**; ePA unusually advanced pre-contract (sample policies sent, asked twice about InterQual); Dr. Harr \"life beyond compliance\" exec meeting is an open door.",
      "size": "$995k ARR (largest Blues)",
      "trigger": "Push commercial SOW to signature; package ePA policy-digitization; use Harr/Higgins meeting.",
      "ref": 2
    },
    {
      "rank": 3,
      "account_label": "BCBST",
      "play": "SQL-on-FHIR / Tableau analytics + 2027 drug-ePA",
      "why": "$1.6M account, ~627M FHIR resources; **explicit inbound: asked to pull FHIR into Tableau (5/5)**, losing Edifecs search 6/30; **BCBST themselves flagged the 2027 drug-ePA reg (4/13)**.",
      "size": "$1.6M ARR, marquee",
      "trigger": "Scoping call w/ Joey/Jeff post-9115; price STE SQL now, MTE Trino Q3–Q4; scope drug PA as subscription increase.",
      "ref": 4
    },
    {
      "rank": 4,
      "account_label": "Capital Health Plan",
      "play": "Pop Connect commercialization + ePA add",
      "why": "**Demand outrunning contract: 5k contracted vs ~90k pulled**; Eric adding an Athena practice then 4–5 more sites; **CHP already agreed to invoicing (June)**; not contracted for ePA (Jodi already working it).",
      "size": "$300k ARR, fast-mover",
      "trigger": "Formalize scaled Clinical Connectivity contract (per-provider/member) + direct-POST architecture; attach ePA.",
      "ref": 1
    },
    {
      "rank": 5,
      "account_label": "Select Health",
      "play": "ePA (vs ZeOmega) + MPF",
      "why": "Marquee 2026 new logo ($657k), \"best vendor we've ever worked with\"; **proactively asked to meet on medical-policy digitization (6/18)** and about the **MPF endpoint (7/7)**; all FHIR data already flowing.",
      "size": "$657k ARR, ~550k members",
      "trigger": "Lindsay's proposed upsell opp w/ Jodi; MPF is low-lift attach on PD work in flight.",
      "ref": 25
    },
    {
      "rank": 6,
      "account_label": "MMM Holdings",
      "play": "SDT change order + clinical/Blue Flame analytics",
      "why": "$1.9M+ account, Elevance ref; **customer actively wants SDT now** (dispute is pricing emotion, not demand); asked for Bulk FHIR export, has DW budget + documented Blue Flame interest.",
      "size": "~$1.95M ARR",
      "trigger": "Close SDT change order bundled w/ member-consent roadmap; open DW/analytics motion.",
      "ref": 6
    },
    {
      "rank": 7,
      "account_label": "Cook County / CountyCare",
      "play": "Contested-scope change order (CVS PBM reimpl + dental/vision claims)",
      "why": "**Crissy demanded this at June kickoff; Maria drafting; Stephanie called it \"a credible case for upcharge.\"** PBM feeds dead since 2024 CVS switch = real compliance gap they must fix.",
      "size": "$735k+ ARR, ~1.1M lives",
      "trigger": "Finalize change order; add billable direct-SFTP onboarding for EviCore/Avesis + extra Evolent DTRs.",
      "ref": 20
    },
    {
      "rank": 8,
      "account_label": "MCS",
      "play": "AI prior-auth decision support + SDT SOW",
      "why": "**Customer formally asked 1up for AI-enabled PA document analysis (Jan–Feb 2026)**; 4 delegated UM vendors generate heterogeneous PA data; SDT (BH/addiction) needs its own SOW before P2P go-live.",
      "size": "~$1.17M ARR, 400k members",
      "trigger": "Scope AI ePA add-on; time-box SDT SOW to P2P go-live.",
      "ref": 15
    },
    {
      "rank": 9,
      "account_label": "THP (WV)",
      "play": "Paid Helios/Elligint integration change order + analytics",
      "why": "$2M+ account, full 0057 suite complete; **1up already told THP (6/23) the non-standard Helios path requires scoping/charges**; licenses SQL-on-FHIR + 12 new clinical resource types flowing.",
      "size": "~$2M ARR",
      "trigger": "Convert the acknowledged Helios scoping into a change order; queue HEDIS/Stars analytics post-clinical-ingest.",
      "ref": 18
    },
    {
      "rank": 10,
      "account_label": "Hamaspik",
      "play": "ePA multi-vendor expansion SOW",
      "why": "**Customer-initiated: pushing to add Carelon, DentaQuest/EyeQuest, ASH beyond HealthEdge-only scope**; Rachel already framed path as \"expand the SOW\"; Carelon connectivity started.",
      "size": "$215k+ ARR",
      "trigger": "Scope the added UM vendors; also close the unsigned MPF order form.",
      "ref": 3
    },
    {
      "rank": 11,
      "account_label": "JHHP",
      "play": "Close SDT license + ePA at renewal",
      "why": "**Tyler requested the SDT SOW (June); extract guide already forwarded** — directly answers CCO Melissa Mohon's data-integrity concerns; ePA was their stated Priority 1 but excluded from the April deal.",
      "size": "~$680k ARR, 470k members",
      "trigger": "Close SDT SOW now; attach ePA at ~Oct 1 renewal once re-ingestion trust repair lands.",
      "ref": 21
    },
    {
      "rank": 12,
      "account_label": "CCOK",
      "play": "MPF CY2027 hosted solution + managed Formulary/Navitus data services",
      "why": "**CCOK sent detailed MPF requirements (5/15) against a 9/1/26 CMS testing deadline**; Navitus won't send files directly — 8+ months of formulary pain 1up can take over.",
      "size": "$255k ARR",
      "trigger": "Land MPF change order before CMS window; offer \"files as-is + 1up-side mapping\" (MJ AI POC precedent).",
      "ref": 22
    }
  ],
  "synthesisHtml": "<h3>1. Portfolio overview</h3>\n<h4>By segment (primary LOB — many are multi-LOB)</h4>\n<div class=\"tblwrap\"><table><thead><tr><th>Segment</th><th>~Count</th><th>Accounts</th></tr></thead><tbody>\n<tr><td><strong>Medicaid MCO / CCO / LME</strong></td><td>15</td><td>Advanced Health, Partners HM, Trillium, Vaya, HPSM, CountyCare, MPC, Cascade, Yamhill, AllCare, Jai, Empower, UPHP, McLaren (918k Medicaid-dominant), Hamaspik</td></tr>\n<tr><td><strong>Medicare Advantage-primary</strong></td><td>13</td><td>HealthTeam Advantage, BayCare, GlobalHealth, Zing, Cox, AultCare, Mountain Health/Wipro, CCHP, Viva, MCS, MMM, ILS, VNS</td></tr>\n<tr><td><strong>Commercial / Blues / multi-LOB</strong></td><td>14</td><td>Fallon, CHP, CBC, BCBST, Select Health, CCOK, MNSCHA, THP, JHHP, Alliant, WHA, Priority, UCare, AHF</td></tr>\n<tr><td><strong>Bespoke / channel</strong></td><td>1</td><td>CVS (P2P-only Aetna)</td></tr>\n</tbody></table></div>\n<p><strong>Structural notes:</strong> Four accounts are <strong>Evolent-administered</strong> (CountyCare, MPC, Empower, CCOK — plus BCBST/CBC use Evolent as a UM vendor); Jake Haunty says 1up is Evolent's named 0057 vendor at 7+ plans. One true <strong>TPA channel</strong> play: Wipro/Mountain Health. <strong>Three \"payvider\"/system-owned</strong> plans carry churn-to-Epic risk logic: Priority (Corewell → EPP Aug 2026), Viva (UAB), Select Health (Intermountain).</p>\n<h4>By 2026 go-live quarter (roster target vs. reality)</h4>\n<ul>\n<li><strong>Live / earliest cohort (ahead of Q1):</strong> Fallon, CHP, CBC, Hamaspik, BCBST (9115), MMM, Viva</li>\n<li><strong>Q1:</strong> Advanced Health, Partners HM, CVS, Trillium, Vaya, ILS, HPSM, HealthTeam Advantage, MCS, McLaren, VNS</li>\n<li><strong>Q2:</strong> THP, UPHP, CountyCare, JHHP, CCOK, MNSCHA, Select Health, MPC, BayCare, Alliant, Cascade</li>\n<li><strong>Q3:</strong> GlobalHealth, Zing, WHA, Mountain Health, CCHP, AHF, AultCare</li>\n<li><strong>Q4:</strong> Cox, UCare</li>\n<li><strong>Pending/unscheduled:</strong> Yamhill, Jai, AllCare</li>\n<li><strong>Churning:</strong> Priority (Aug 2026, EPP)</li>\n</ul>\n<p>› <strong>The single most important portfolio fact:</strong> the roster quarter is almost always the <em>commencement/kickoff</em> date, not go-live. Actual 0057 go-lives are running <strong>one to two quarters behind</strong> and clustering into H2 2026 against the hard <strong>1/1/2027</strong> CMS deadline. Nearly every account is compressed; expansion conversations must be sequenced <em>after</em> the compliance crunch, which for most means Q4 2026–Q1 2027.</p>\n<h4>By product footprint</h4>\n<ul>\n<li><strong>Full 0057 suite (PA+P2P+ProvAccess+ePA):</strong> BCBST, Viva, Hamaspik, MMM, ILS, MCS, THP, Trillium, Vaya, CCOK, MNSCHA, Jai, AllCare, UPHP, Cascade, GlobalHealth, Zing, AHF, AultCare, HealthTeam Advantage, McLaren, Alliant, MPC — ~23 accounts.</li>\n<li><strong>0057 minus ePA (ePA is open whitespace):</strong> Fallon (estimating now), CHP, CBC (wants it), Select Health, JHHP, Cox, CVS, VNS, Partners, Empower, Mountain Health.</li>\n<li><strong>Clinical Connect / Pop Connect (paid or piloting):</strong> Fallon (first paid, $55.2k), CHP (Pop Connect prod), Viva (#4), Yamhill (#5).</li>\n<li><strong>MPF in flight:</strong> CBC, Hamaspik, Viva, MMM, MCS, HPSM, UPHP, HealthTeam Advantage, GlobalHealth, Zing, BayCare, Cox, Select Health, CCOK, Fallon, AllCare (change order).</li>\n</ul>\n<h3>2. Common patterns</h3>\n<p><strong>Architecture / delivery</strong></p>\n<ul>\n<li><strong>Flat-file CSV/pipe over SFTP→S3→NiFi→FHIR</strong> is the dominant ingest for legacy accounts. The strategic shift is to <strong>HDE/MTE</strong>: net-new accounts (Jai — first <em>direct</em> HDE, AllCare, Sendero, MNSCHA — first X12/HDE, McLaren, BCBST) are the reference builds. Legacy <strong>STE accounts are migration candidates</strong> (Vaya, Empower, Hamaspik, GlobalHealth, Zing, Cascade, AultCare).</li>\n<li><strong>1up-hosted CRD \"front door\" + per-vendor static DTR questionnaires</strong> is the emerging ePA pattern (Trillium, MNSCHA, ILS, Cascade, THP, MPC). PAS lands via FHIR API or the <strong>1up X12 278 converter (GA Aug 2026)</strong> — a hard dependency for Advanced Health, ILS, MCS, CCOK, THP.</li>\n</ul>\n<p><strong>Shared vendor / EHR ecosystems (channel leverage)</strong></p>\n<ul>\n<li><strong>UM vendors:</strong> HealthEdge GuidingCare (Hamaspik, Vaya, UCare, UPHP, VNS), Zyter TruCare (Fallon, MCS, MNSCHA, Priority/GHC), Evolent (MPC, CountyCare, CCOK, THP, MMM-adjacent, MPC), MHK/MedHOK (MMM), InterQual (BCBST, MCS, MNSCHA, HPSM-adjacent, Viva, Jai, AultCare, THP), Essette/Gainwell (Cascade, UPHP, CCHP), HealthAxis (GlobalHealth), Cognizant/QNXT-TTAP (CHP, AultCare, VNS, Fallon), Itiliti (BCBST FEP, MNSCHA, Jai-rejected).</li>\n<li><strong>PBM:</strong> MedImpact recurs heavily (AHF, Advanced Health, MCS, McLaren, BayCare, GlobalHealth, CHG, Cox-adjacent) and is a recurring data-delivery choke point. Navitus (UCare, CCOK), Elixir (Cox, Zing), Prime/Caremark (Hamaspik, CBC).</li>\n<li><strong>Displaced incumbents:</strong> <strong>Change Healthcare</strong> rip-and-replace is the origin story for ~13 accounts (Fallon, Viva, MMM, ILS, JHHP, Alliant, Cascade, GlobalHealth, BayCare, Cox, WHA, UCare, HTA-adjacent). <strong>Edifecs</strong> take-outs: BCBST, CCOK, MNSCHA, Trillium-threat. <strong>MiHIN/MYHIN:</strong> McLaren, UPHP.</li>\n<li><strong>BCBSA Interop Hub</strong> couples the Blues (CBC, BCBST, CHP) — BCBST decisions ripple to CBC.</li>\n</ul>\n<p><strong>Recurring risks</strong></p>\n<p>1. <strong>Customer data-quality / thin engineering benches</strong> — nearly universal; acute at Fallon (one dev, Lucas), Partners (one DBA), Vaya (legacy debt), Zing/HTA (self-generated files post-CHC breach), CCOK, Cascade.</p>\n<p>2. <strong>SOW signature lag</strong> — Vaya (~10 months unsigned), WHA (missing, project due to start), Partners ePA (slipped), VNS (unresponsive on ePA+MPF), Empower (in SF awaiting response).</p>\n<p>3. <strong>Timeline compression to 1/1/2027</strong>, worst where ePA hasn't started: CBC (0057 unscoped), HPSM (ePA kickoff July), Alliant (paused to Oct), CVS (slipped to Q3), Mountain Health (Aug kickoff).</p>\n<p>4. <strong>Usage/contract overages</strong> — CHP (5k→90k Pop Connect), Advanced Health, McLaren, UCare (900k vs 650k), Fallon (395k vs 170k).</p>\n<p>5. <strong>Vendor gatekeeping</strong> — Evolent, MedImpact, Navitus, HealthAxis, Itiliti all control files 1up needs.</p>\n<p>6. <strong>Consent/SDT gaps discovered late</strong> — Vaya (never tagged since 2021), MCS, MMM, Empower (BH population).</p>\n<h3>4. Whitespace themes <em>(plays that repeat across the book)</em></h3>\n<p><strong>A. ePA on P2P/Provider-Access-only accounts</strong> — <em>the biggest single pattern.</em></p>\n<p>Fallon, CHP, CBC, Select Health, JHHP, Cox, CVS, VNS, Partners, Empower, Mountain Health. (All own claims + attribution data already; ePA is the missing 0057 pillar with a 1/1/27 forcing function.)</p>\n<p><strong>B. Clinical Connect / Pop Connect (clinical-data acquisition)</strong> — <em>the flagship growth motion.</em></p>\n<p>Paid/piloting: Fallon, CHP, Viva, Yamhill. Expressed or natural demand: MMM (Blue Flame/DW), MCS, ILS (SNP care mgmt), MPC (zero clinical today), Cascade, HPSM (QHIO wave), Zing (SDOH), Select Health (vendor consolidation), THP, UPHP (Immunizations-only cap), McLaren (labs at scale), AllCare, Alliant (CCDA-to-FHIR asked), CCHP (Stars). Anchor thesis everywhere: replace manual chart-chase for <strong>HEDIS/risk adjustment/Stars</strong>.</p>\n<p><strong>C. Quality/Stars/HEDIS analytics + SQL-on-FHIR on data already flowing.</strong></p>\n<p>BCBST (Tableau), THP, HPSM (NLP query, Tableau/Python), VNS (Snowflake), Select Health (Chief Analytics Officer), CBC (DQM), CHP (project Sapphire), Zing, GlobalHealth, ILS, Cox, AultCare. Same buyer profile: quality/analytics leaders, not IT compliance.</p>\n<p><strong>D. Sensitive Data Tagging (SDT) SOWs</strong> — often a compliance escalation you can monetize.</p>\n<p>Active demand: MMM, MCS, JHHP, Vaya, Empower (BH population, 42 CFR Part 2). Already own it: Fallon, CBC, Trillium, WHA.</p>\n<p><strong>E. Managed consent / opt-in-opt-out screens (product surface).</strong></p>\n<p>Trillium (email-auth opt-out), MNSCHA, UPHP (wants hybrid console opt-out — committed first buyer), CCHP, CVS (external Consent API), Hamaspik + CVS (state Consent API integration).</p>\n<p><strong>F. Vendor-connectivity / X12 conversion services (multi-UM ePA).</strong></p>\n<p>Cook County (EviCore/Avesis direct SFTP), MCS (FHC/TNPR/NetClaim/Zyter), ILS (iCare 278), Advanced Health (Plexis/Essette), CCOK (Evolent), THP (Helios), GlobalHealth (HealthAxis), Viva (home-grown X12).</p>\n<p><strong>G. HDE / Standard-Ingest migration off legacy STE.</strong></p>\n<p>Vaya (drafted), Empower, Hamaspik, GlobalHealth, Zing (HDE POC), Cascade, AultCare, Fallon (Trino/SQL). Cuts 1up COGS <em>and</em> creates a platform-tier uplift at renewal.</p>\n<p><strong>H. Evolent channel replication</strong> (Jake Haunty's list): MPC, CountyCare, CCOK, THP, BCBST, CBC, Blue Shield of CA — productize the Evolent-CRD + 1up-PAS/DTR pattern across all of them.</p>\n<h3>5. Data gaps &amp; Salesforce backfill</h3>\n<p>› <strong>Blanket caveat:</strong> these profiles were built from <strong>Slack/Confluence/Gmail with Salesforce unavailable.</strong> Every ARR/booking figure below (and the many \"likely/inference\" totals — CVS ~$650–700k, Mountain Health ~$150k, Priority churn math, THP ~$2M) should be reconciled against SF before use in QBRs or forecast.</p>\n<p><strong>Financials missing entirely → SF backfill required:</strong></p>\n<ul>\n<li><strong>Advanced Health</strong> — <em>\"No ARR/booking dollar amounts found in Slack/Confluence.\"</em> Only an Order Form date (5/22/25) and 50k-member cap. Highest-priority SF pull.</li>\n<li><strong>0057 add-on ARR not captured:</strong> AultCare 0057 SOW (Provider Access set \"just below P2P,\" ePA \"above calculator\" — no number), WHA ePA SOW (drafted, unsigned, value unknown), BayCare MPF, MCS PD-redo/dental/clinical SOW (6/3), Jai renewal/expansion, AllCare MPF change order.</li>\n<li><strong>Entity/booking conflicts to resolve in SF:</strong> Select Health 2023 $45k booking (may be a different entity vs. \"first new logo of 2026\"); BayCare vs. SelectHealth attribution of the 4/8 $657k and \"split Utah opt-in\" extracts.</li>\n</ul>\n<p><strong>Thin research / near-empty strategy (need discovery, not just SF):</strong></p>\n<ul>\n<li><strong>AHF</strong> and <strong>Jai Medical</strong> — profiles carry <strong>empty <code>plays</code> arrays</strong>; both need play development. AHF is a rare provider+payer (natural clinical <em>and</em> payer buyer) with an Oct 15 kickoff; Jai is the first direct-HDE customer with a Chordline channel angle — both under-worked.</li>\n<li><strong>Empower</strong> — profile explicitly flagged as <strong>inferred</strong> (account channel \"quiet in 2025–2026, mostly infra alerts\"); SOW status and Evolent V2-schema readiness unknown. Fill via the in-SF Provider Access/P2P SOW record + a live Evolent conversation.</li>\n<li><strong>AllCare</strong> — Confluence page still a skeleton template; MPF change-order dollar amount TBD.</li>\n<li><strong>CCHP</strong> — 0057 contracted but implementation-at-risk (customer tried to back out); the $75k 0057 upsell ARR needs SF confirmation it's still booked.</li>\n<li><strong>Mountain Health/Wipro</strong> — total ARR \"verify in Salesforce\"; Wipro's broader book-of-business (the actual channel prize) is undocumented.</li>\n<li><strong>VNS / Cox / Vaya / WHA</strong> — multiple delivered-but-unsigned SOWs (MPF, ePA, 0057); SF opportunity stages will show whether these are real pipeline or stalled.</li>\n</ul>\n<p><strong>Best single source to fill most gaps:</strong> Salesforce opportunity + order-form records for the ARR figures and SOW execution status; then live vendor conversations (Evolent, MedImpact, HealthAxis, Itiliti) for the delivery-dependency risks that gate the top-12 plays.</p>",
  "qorder": [
    "live",
    "q1",
    "q2",
    "q3",
    "q4",
    "pend"
  ],
  "qlabels": {
    "live": "Live / Pre-Q1",
    "q1": "Q1 · Jan–Mar",
    "q2": "Q2 · Apr–Jun",
    "q3": "Q3 · Jul–Sep",
    "q4": "Q4 · Oct–Dec",
    "pend": "Pending"
  },
  "seglabels": {
    "medicaid": "Medicaid MCO / CCO",
    "medadv": "Medicare Advantage",
    "commercial": "Commercial / Blues",
    "bespoke": "Bespoke / Channel"
  },
  "sfSummary": {
    "total_arr": 11514360.625848,
    "matched": 43,
    "flagged_count": 27,
    "known_churn": [
      "Select Health",
      "AllCare CCO"
    ],
    "low_health": [
      "Chinese Community Health Plan",
      "UCare Minnesota",
      "AultCare"
    ],
    "competitor_engaged": [
      "The Health Plan of West Virginia",
      "Cook County Health (CountyCare)",
      "Johns Hopkins HealthCare",
      "Cox HealthPlan",
      "UCare Minnesota",
      "Priority",
      "AultCare"
    ],
    "pulled": "2026-07-09"
  },
  "analytics": {
    "stats": {
      "covered": 43,
      "withSignal": 42,
      "tier1Count": 11,
      "tier1Arr": 2924647.617468,
      "totalArr": 11514360.625848,
      "topThemeLabel": "Operational / compliance dashboards & reporting",
      "topThemeCount": 40
    },
    "themes": [
      {
        "key": "ops",
        "label": "Operational / compliance dashboards & reporting",
        "count": 40,
        "accounts": [
          "AIDS Health Foundation",
          "Advanced Health",
          "AllCare CCO",
          "Alliant Health Plans",
          "AultCare",
          "BCBST",
          "BayCare Select Health Plans",
          "Capital Blue Cross",
          "Capital Health Plan",
          "Cascade Comprehensive Care",
          "Chinese Community Health Plan",
          "Community Care of Oklahoma",
          "Cook County Health (CountyCare)",
          "Cox HealthPlan",
          "Empower",
          "Fallon Community Health Plan",
          "GlobalHealth Holdings",
          "Hamaspik Choice",
          "Health Plan of San Mateo",
          "HealthPlan Services (WiPro)",
          "HealthTeam Advantage",
          "Independent Living Systems",
          "Jai Medical Center",
          "Johns Hopkins HealthCare",
          "MCS Healthcare Holdings",
          "MMM Holdings",
          "Maryland Care (MPC)",
          "McLaren",
          "Partners Health Management",
          "Priority",
          "Select Health",
          "The Health Plan of West Virginia",
          "Trillium",
          "UCare Minnesota",
          "Upper Peninsula Health Plan",
          "VNS Choice",
          "Vaya Health",
          "Viva Health",
          "Western Health Advantage",
          "Yamhill"
        ]
      },
      {
        "key": "quality",
        "label": "Quality measures — HEDIS / Stars / NCQA / DQM",
        "count": 30,
        "accounts": [
          "AIDS Health Foundation",
          "Advanced Health",
          "AllCare CCO",
          "Alliant Health Plans",
          "AultCare",
          "Capital Blue Cross",
          "Capital Health Plan",
          "Cascade Comprehensive Care",
          "Chinese Community Health Plan",
          "Cox HealthPlan",
          "Empower",
          "Fallon Community Health Plan",
          "GlobalHealth Holdings",
          "Hamaspik Choice",
          "HealthPlan Services (WiPro)",
          "Independent Living Systems",
          "Jai Medical Center",
          "MMM Holdings",
          "Maryland Care (MPC)",
          "Partners Health Management",
          "Priority",
          "Select Health",
          "South Country Health Alliance",
          "The Health Plan of West Virginia",
          "Trillium",
          "UCare Minnesota",
          "VNS Choice",
          "Viva Health",
          "Yamhill",
          "Zing Health"
        ]
      },
      {
        "key": "risk",
        "label": "Risk adjustment / HCC analytics",
        "count": 25,
        "accounts": [
          "AIDS Health Foundation",
          "Advanced Health",
          "Alliant Health Plans",
          "AultCare",
          "Capital Blue Cross",
          "Capital Health Plan",
          "Cascade Comprehensive Care",
          "Chinese Community Health Plan",
          "Cook County Health (CountyCare)",
          "Cox HealthPlan",
          "Hamaspik Choice",
          "HealthPlan Services (WiPro)",
          "HealthTeam Advantage",
          "Jai Medical Center",
          "Johns Hopkins HealthCare",
          "MMM Holdings",
          "Maryland Care (MPC)",
          "Partners Health Management",
          "Priority",
          "Select Health",
          "UCare Minnesota",
          "VNS Choice",
          "Viva Health",
          "Yamhill",
          "Zing Health"
        ]
      },
      {
        "key": "query",
        "label": "Self-service SQL / data-query / warehouse access",
        "count": 18,
        "accounts": [
          "AIDS Health Foundation",
          "Advanced Health",
          "BCBST",
          "BayCare Select Health Plans",
          "Capital Health Plan",
          "Chinese Community Health Plan",
          "Empower",
          "Fallon Community Health Plan",
          "Independent Living Systems",
          "Johns Hopkins HealthCare",
          "MCS Healthcare Holdings",
          "Partners Health Management",
          "The Health Plan of West Virginia",
          "UCare Minnesota",
          "VNS Choice",
          "Vaya Health",
          "Viva Health",
          "Zing Health"
        ]
      },
      {
        "key": "predictive",
        "label": "Predictive modeling / AI-ML",
        "count": 9,
        "accounts": [
          "Advanced Health",
          "Alliant Health Plans",
          "Community Care of Oklahoma",
          "Fallon Community Health Plan",
          "Jai Medical Center",
          "MMM Holdings",
          "Select Health",
          "UCare Minnesota",
          "Zing Health"
        ]
      }
    ],
    "tiers": [
      {
        "tier": 1,
        "label": "Design-Partner Ready",
        "desc": "Strong, specific, dated customer asks (named stakeholders, concrete tooling) with no disqualifying caveat — approach first for an analytics beta/design-partner cohort.",
        "count": 11,
        "arr": 2924647.617468,
        "items": [
          {
            "ref": 4,
            "name": "BCBST",
            "seg": "commercial",
            "arr": 536259.999996,
            "health": 10,
            "gongSignal": "strong",
            "internalFit": "high",
            "score": 17,
            "tier": 1,
            "ask": "SQL on FHIR named by customer; ePA reporting demo targeted Q3",
            "evidence": [
              "Jeff Jacobs (Team Lead, Interoperability): requested “SQL on FHIR” by name, product team “looking into sequel on fire”",
              "Rachel Schuler (1up): SQL on FHIR workstream pending once current project concludes",
              "Rachel Schuler: ePA Reporting in the 1up Console targeted for a Q3 demo"
            ],
            "caveats": []
          },
          {
            "ref": 16,
            "name": "McLaren",
            "seg": "medicaid",
            "arr": 342741.935484,
            "health": 10,
            "gongSignal": "strong",
            "internalFit": "high",
            "score": 17,
            "tier": 1,
            "ask": "Dedicated BI Director + a second BI hire evaluating API needs",
            "evidence": [
              "Maria Sergent (BI Director) asked about downstream payer-to-payer workflows and provided a user list including a BI Manager for Console access — Jul 17, 2026 / Dec 10, 2025",
              "A dedicated BI resource was reported learning “Jeeva” and evaluating API needs — Jun 30, 2026",
              "Patrick Stevenson asked about Prior Auth metrics for CMS reporting — May 27, 2026"
            ],
            "caveats": []
          },
          {
            "ref": 23,
            "name": "South Country Health Alliance",
            "seg": "commercial",
            "arr": 56916.66667200001,
            "health": 9,
            "gongSignal": "strong",
            "internalFit": "high",
            "score": 17,
            "tier": 1,
            "ask": "No attribution model today — explicit HEDIS + claims-fraud analytics need",
            "evidence": [
              "Matt Hoenck (Dir. IT & Analytics): claims-based attribution model called “amazing” — they lack one today — Jul 22, 2026",
              "Matt Hoenck: “have to get data electronically now for HEDIS for the first time,” very complicated attribution conversations — Jul 21, 2026",
              "Alana Deranek (Sr. Business Systems Analyst): separate project doing “analytics on our claims for looking for fraud” — Nov 4, 2025"
            ],
            "caveats": []
          },
          {
            "ref": 27,
            "name": "Alliant Health Plans",
            "seg": "commercial",
            "arr": 132500.00000400003,
            "health": 10,
            "gongSignal": "strong",
            "internalFit": "high",
            "score": 17,
            "tier": 1,
            "ask": "Dedicated Director of Risk Adjustment + COO-level ask, 5 stakeholders",
            "evidence": [
              "Phil Fehlinger (Director of Risk Adjustment and Data Engineering) engaged directly on UAT console reporting — May 18, 2026",
              "Stephanie Belue (Dir. QA) discussed algorithms for risk adjustment and quality — May 4/18, 2026",
              "Richards Celeste (COO) asked about payer-to-payer timeline for risk adjustment/HEDIS use and CMS-0057 reporting — Aug 1, 2025"
            ],
            "caveats": []
          },
          {
            "ref": 6,
            "name": "MMM Holdings",
            "seg": "medadv",
            "arr": 603654.746148,
            "health": 10,
            "gongSignal": "strong",
            "internalFit": "high",
            "score": 16.5,
            "tier": 1,
            "ask": "Confirmed interest in a quality/risk/predictive-modeling data warehouse",
            "evidence": [
              "Ana Gil and team affirmed interest when 1up (Kyle Brew) proposed a “warehouse of quality measures, care gaps, risk adjustment, and predictive modeling” — Jun 4, 2026",
              "Marian De Jesus repeatedly asked about Console API-metric reporting across Patient Access/P2P/Provider Access",
              "Gladys W. Santos Burgos asked about operational metrics, audit data, and FHIR Provenance roadmap — Jul 9, 2026"
            ],
            "caveats": [
              "Analytics/predictive-modeling framing was raised by 1up (Kyle Brew), not volunteered cold"
            ]
          },
          {
            "ref": 0,
            "name": "Fallon Community Health Plan",
            "seg": "commercial",
            "arr": 309813.50000400003,
            "health": 10,
            "gongSignal": "strong",
            "internalFit": "high",
            "score": 15,
            "tier": 1,
            "ask": "Predictive modeling, Power BI, and direct FHIR/SQL query — 3+ stakeholders",
            "evidence": [
              "Irma Murillo: need to “do analytics and predictive modeling” and “see all of the data” for “heavy lifting type of reporting” using tools like Power BI",
              "Alicia Ernst: wants an “easier method to query into the FHIR repository”; tried Postman/DBeaver to query 1up's FHIR data directly",
              "Sarah Panock: needs to “fully re-run and load the predictions engines” after data updates"
            ],
            "caveats": []
          },
          {
            "ref": 2,
            "name": "Capital Blue Cross",
            "seg": "commercial",
            "arr": 432307.6923,
            "health": 7,
            "gongSignal": "strong",
            "internalFit": "medium",
            "score": 15,
            "tier": 1,
            "ask": "HEDIS/Stars, risk/HCC optimization, advanced analytics — 3 dated Jul 2026 asks",
            "evidence": [
              "Matthew Snyder asked about analytics/reporting re: member mismatches and report access — Jul 8, 2026",
              "Jordan Barbour asked about HEDIS/Stars reporting support and risk use cases — Jul 2, 2026",
              "Achhar Singh: interest in strategic opportunities beyond compliance — risk/HCC optimization, Stars/HEDIS, advanced analytics — Jun 4, 2026"
            ],
            "caveats": []
          },
          {
            "ref": 5,
            "name": "Viva Health",
            "seg": "medadv",
            "arr": 78899.191224,
            "health": 10,
            "gongSignal": "strong",
            "internalFit": "high",
            "score": 15,
            "tier": 1,
            "ask": "DQM transition, risk adjustment, and SQL/data-table access",
            "evidence": [
              "Consistent interest in HEDIS/Stars reporting and a transition to digital quality measures (DQMs)",
              "Interest in risk adjustment analytics using payer-to-payer data",
              "Anna Stroede: wants data fed into internal “member profile” systems and visualized in a “readable format” for the quality team"
            ],
            "caveats": []
          },
          {
            "ref": 11,
            "name": "Vaya Health",
            "seg": "medicaid",
            "arr": 172471.26436799997,
            "health": 10,
            "gongSignal": "strong",
            "internalFit": "high",
            "score": 15,
            "tier": 1,
            "ask": "“SQL on FHIR” requested by name",
            "evidence": [
              "Explicit request: “viewing data in a readable format, accessing SQL on FHIR”",
              "Interest in Console usage reports, patient-access reporting, and API metrics for CMS-0057 compliance",
              "Requests to verify patient counts and understand data discrepancies via analysis"
            ],
            "caveats": []
          },
          {
            "ref": 18,
            "name": "The Health Plan of West Virginia",
            "seg": "commercial",
            "arr": 185749.28793600004,
            "health": 10,
            "gongSignal": "strong",
            "internalFit": "high",
            "score": 15,
            "tier": 1,
            "ask": "Self-service API-usage/audit downloads — recurring ask, 8 months",
            "evidence": [
              "Jill Medley: recurring, specific self-service asks over 8 months — detailed API-usage spreadsheets, total resources loaded, “self-service” audit downloads — Nov 2025–May 2026",
              "Jill Medley: “currently has to consult three different sites” — wants it consolidated — May 13, 2026",
              "Jill Medley referenced HEDIS claims in context of member attribution — Apr 17, 2026"
            ],
            "caveats": []
          },
          {
            "ref": 40,
            "name": "Empower",
            "seg": "medicaid",
            "arr": 73333.33333200001,
            "health": 10,
            "gongSignal": "strong",
            "internalFit": "medium",
            "score": 15,
            "tier": 1,
            "ask": "Hired a Sr. Director of Data & Analytics; 1up SQL endpoint already confirmed",
            "evidence": [
              "Ray Seggelke (CIO): hired a new Senior Director of Data & Analytics to build reporting/dashboards in their data mart — Jul 2026",
              "Ray Seggelke: data-mart use for “extracts, queries, and reporting,” building HEDIS extracts, referenced a “clinical analytics package” — May 2026",
              "Anton Pederson (1up) confirmed normalized FHIR data available via read-only APIs and a SQL endpoint for analytics/reporting/BI — Jan 2025"
            ],
            "caveats": []
          }
        ]
      },
      {
        "tier": 2,
        "label": "Strong Expansion Wave",
        "desc": "Real, corroborated demand — either thematic Gong signal backed by a high-fit internal research play, or a dated ask without a matching internal play yet. Sequence right behind Tier 1.",
        "count": 19,
        "arr": 5356908.506076001,
        "items": [
          {
            "ref": 21,
            "name": "Johns Hopkins HealthCare",
            "seg": "commercial",
            "arr": 232043.010756,
            "health": 7,
            "gongSignal": "strong",
            "internalFit": "medium",
            "score": 14.5,
            "tier": 2,
            "ask": "Databricks + SQL-table ingestion for risk-adjustment analysis",
            "evidence": [
              "Alwin Joy asked about pushing new member data into their “Databricks environment” for analysis (risk-adjustment framing) — Apr 15, 2026",
              "Osman Arbab proposed loading all files into a SQL table for processing — Apr 14, 2026",
              "Cheri Lamasa: team “has been building queries” and asked about reporting/dashboards — May 18, 2026"
            ],
            "caveats": [
              "Evidence merges two related CRM entities (Johns Hopkins Health Plan + Johns Hopkins Medicine) — same relationship family, confirm exact account before quoting externally"
            ]
          },
          {
            "ref": 1,
            "name": "Capital Health Plan",
            "seg": "commercial",
            "arr": 283250.00000400003,
            "health": 10,
            "gongSignal": "strong",
            "internalFit": "medium",
            "score": 13,
            "tier": 2,
            "ask": "Native SQL/JSON query access; HEDIS/Stars and risk-profile focus",
            "evidence": [
              "Built internal dashboards (“Impact/in power”) to track value-based incentives and gaps; also asked about capacity/resource dashboards",
              "Eric Smith (CIO): asked to learn how to query the repository directly, noted “native SQL with JSON coding” worked well for pulling data",
              "Consistently cited HEDIS/Stars/NCQA measures (incl. PHQ-2/PHQ-9 depression screening) as a primary driver to streamline QI chart review"
            ],
            "caveats": []
          },
          {
            "ref": 8,
            "name": "Advanced Health",
            "seg": "medicaid",
            "arr": 50669.354832,
            "health": 10,
            "gongSignal": "strong",
            "internalFit": "medium",
            "score": 13,
            "tier": 2,
            "ask": "SQL + Tableau explicitly requested for predictive modeling, care gaps",
            "evidence": [
              "Chris Wilson (Dir. Health Information Systems): recurring requests for console reports, data visibility, downloadable opt-out reports since early 2025",
              "Explicit ask to leverage “SQL queries and Tableau for advanced analytics, predictive modeling, and identifying care gaps” to reduce manual workloads",
              "Explicit interest in HEDIS/Stars reporting and risk adjustment analytics"
            ],
            "caveats": []
          },
          {
            "ref": 12,
            "name": "Independent Living Systems",
            "seg": "medadv",
            "arr": 69801.84744000001,
            "health": 10,
            "gongSignal": "strong",
            "internalFit": "high",
            "score": 13,
            "tier": 2,
            "ask": "Custom dashboards + data extraction into customer's own BI tools",
            "evidence": [
              "Yamir Armas (VP, App Development): frequently asked about visibility, custom reporting, and data dashboards",
              "Mayda Antun & Michael Paseltiner inquired about HEDIS/Stars-style ECDS reporting solutions",
              "Yamir Armas asked about querying questionnaire responses and extracting data for their own BI tools"
            ],
            "caveats": []
          },
          {
            "ref": 14,
            "name": "HealthTeam Advantage",
            "seg": "medadv",
            "arr": 329426.912568,
            "health": 10,
            "gongSignal": "strong",
            "internalFit": "medium",
            "score": 13,
            "tier": 2,
            "ask": "Dedicated Data Analytics manager driving dashboard/KPI requests",
            "evidence": [
              "Alan Blalock (Manager, Data Analytics) repeatedly asked about dashboards: usage stats, KPIs, ingestion metrics, audit docs",
              "Deanna Pearson (Dir. Provider Services): asked about using other-payer data for analytics — risk adjustment and utilization management, dashboard-viewable",
              "Adam Tate (Data Engineer): requested direct API access for validation and a Postman package"
            ],
            "caveats": []
          },
          {
            "ref": 34,
            "name": "AIDS Health Foundation",
            "seg": "commercial",
            "arr": 46742.020944,
            "health": 9,
            "gongSignal": "strong",
            "internalFit": null,
            "score": 13,
            "tier": 2,
            "ask": "“Lakehouse model” curiosity; HEDIS + risk-adjustment scrutiny",
            "evidence": [
              "Mohandoss Tychicus found the “lakehouse model” for v2 Platform “intriguing,” eager to learn more — Oct 14, 2024",
              "Matteo Salvalaggio: “Is the console like a dashboard where we can track how the flow is going?” — Feb 27, 2026",
              "Xing Liu referenced “our HEDIS measures” and processing data into “tables for reporting” — Nov 2025/Jun 2026"
            ],
            "caveats": []
          },
          {
            "ref": 37,
            "name": "Yamhill",
            "seg": "medicaid",
            "arr": 356604.83334,
            "health": 9,
            "gongSignal": "strong",
            "internalFit": "high",
            "score": 13,
            "tier": 2,
            "ask": "Patient risk-score custom field; HEDIS + care-management focus",
            "evidence": [
              "Asked about adding “patient risk score” as a custom field and prior-auth reporting visibility",
              "Strong interest in clinical data for care management, risk adjustment, HEDIS quality measures, and actionable-insight detection",
              "Interested in the new console (replacing Kibana) for consolidated cross-API reporting/export"
            ],
            "caveats": []
          },
          {
            "ref": 9,
            "name": "Partners Health Management",
            "seg": "medicaid",
            "arr": 188507.584416,
            "health": 9,
            "gongSignal": "strong",
            "internalFit": "medium",
            "score": 12.5,
            "tier": 2,
            "ask": "“SQL fire component” requested; HEDIS quality reporting",
            "evidence": [
              "Wake Young asked about an “SQL fire component” for data validation and cross-member queries; Adam Nixon separately noted SQL-access struggles",
              "Timothy Hunt & Wake Young frequently discussed HEDIS measures and using claims data for quality reporting",
              "New data described as “fueling downstream risk adjustment, care management, and quality measures”"
            ],
            "caveats": [
              "Resolved as ‘Partners Behavioral Health Management’ in CRM/Gong"
            ]
          },
          {
            "ref": 13,
            "name": "Health Plan of San Mateo",
            "seg": "medicaid",
            "arr": 69666.66666,
            "health": 7,
            "gongSignal": "strong",
            "internalFit": "high",
            "score": 12.5,
            "tier": 2,
            "ask": "Star Ratings via CMS APIs; new dashboard interest (email-based)",
            "evidence": [
              "Requested date-span columns on reports and help completing Q4 DHCS metrics reports; noted difficulty pulling data from Kibana",
              "Asked about the new reporting console and Patient Access API utilization metrics for CMS reporting",
              "Interested in prior-auth data on a new dashboard and a “Patient Viewer” tool for support/troubleshooting"
            ],
            "caveats": [
              "Signal drawn entirely from emails (0 calls matched) — written record, not verbal quotes"
            ]
          },
          {
            "ref": 15,
            "name": "MCS Healthcare Holdings",
            "seg": "medadv",
            "arr": 687600,
            "health": 10,
            "gongSignal": "strong",
            "internalFit": "medium",
            "score": 12.5,
            "tier": 2,
            "ask": "SQL on FHIR named for population-level analysis",
            "evidence": [
              "Explicit need for “complex queries using SQL on FHIR for population analysis and comparison with their data sources”",
              "Repeated requests for detailed ingestion reporting, daily error reviews, SFTP-accessible error reports",
              "Interest in API monitoring (Provider Directory, Payer-to-Payer) for visibility into external data consumers"
            ],
            "caveats": [
              "Skews operational/ingestion-monitoring; no explicit HEDIS/Stars mention surfaced"
            ]
          },
          {
            "ref": 17,
            "name": "VNS Choice",
            "seg": "medadv",
            "arr": 185000.00000400003,
            "health": 9,
            "gongSignal": "strong",
            "internalFit": "medium",
            "score": 12.5,
            "tier": 2,
            "ask": "HEDIS/Stars + SQL-on-FHIR into a data warehouse",
            "evidence": [
              "Angela Suriano, Chantal Louisma, Kathleen Baer, Robert Orlando: frequently raised HEDIS/Stars to close care gaps and meet regulatory requirements",
              "Interest in ad hoc reporting, pre-built analytics, and dashboards integrated into existing systems (e.g., Salesforce)",
              "Multiple stakeholders asked about SQL / SQL-on-FHIR for data query access into a data warehouse"
            ],
            "caveats": [
              "Gong's answer referred to ‘VNS Health’ (parent brand) throughout — confirm the CRM ID maps to the VNS Choice health-plan subsidiary before citing externally"
            ]
          },
          {
            "ref": 25,
            "name": "Select Health",
            "seg": "commercial",
            "arr": 219000,
            "health": null,
            "gongSignal": "strong",
            "internalFit": "medium",
            "score": 12.5,
            "tier": 2,
            "ask": "AI-audited risk scoring; wants to consolidate multiple analytics vendors",
            "evidence": [
              "Dedicated “analytic and reporting team” needing data across business areas for NCQA accreditation and HEDIS reporting",
              "Jennifer Newton floated an “AI model over the top” for auditing risk scoring",
              "Karen Rosen asked about sharing data with an “analytics vendor for risk adjustment”"
            ],
            "caveats": [
              "Marquee new logo (Intermountain) — fit signal is strong despite health/tier fields not yet populated in SF"
            ]
          },
          {
            "ref": 26,
            "name": "Maryland Care (MPC)",
            "seg": "medicaid",
            "arr": 936352.7691600001,
            "health": 10,
            "gongSignal": "strong",
            "internalFit": "high",
            "score": 12.5,
            "tier": 2,
            "ask": "Risk-adjustment + HEDIS reviewed live in the UAT console",
            "evidence": [
              "Andrea Day & Jeff Lazar asked about reviewing UAT-console reporting and API-call metrics (unique beneficiaries accessing data)",
              "Interest in risk-adjustment analytics and how new data fuels downstream risk-adjustment/care-management workflows",
              "Interest in HEDIS quality measures"
            ],
            "caveats": [
              "No specific dates surfaced"
            ]
          },
          {
            "ref": 28,
            "name": "Cascade Comprehensive Care",
            "seg": "medicaid",
            "arr": 256233.547164,
            "health": 10,
            "gongSignal": "strong",
            "internalFit": "high",
            "score": 12.5,
            "tier": 2,
            "ask": "Risk stratification + HEDIS benchmarking against industry data",
            "evidence": [
              "Interest in population management, risk stratification, risk adjustment, and HEDIS reporting, with questions about industry benchmarks",
              "Customer's BI team involved in gap-analysis and data-pipeline work",
              "Multiple team members asked about report specs and granularity of reporting for dual-eligible/Medicaid members"
            ],
            "caveats": [
              "No individual names/dates surfaced despite 15 calls/265 emails searched"
            ]
          },
          {
            "ref": 30,
            "name": "Western Health Advantage",
            "seg": "commercial",
            "arr": 390178.66666800005,
            "health": 10,
            "gongSignal": "strong",
            "internalFit": "medium",
            "score": 12.5,
            "tier": 2,
            "ask": "“Actionable insights” / BI console ask (compliance-flavored)",
            "evidence": [
              "S. Owens (CORE Director) & Glenn Hamburg (CIO): want “actionable insights” and “business driven metrics” in a future console — Jun 3, 2026",
              "Thomas Leon (Solutions Delivery Director): requested a “data pipeline dashboard” for dropped records/mismatches — Apr 15, 2026",
              "Thomas Leon: wants flexibility to customize regulatory reporting programs in console — Dec 4, 2025"
            ],
            "caveats": [
              "Interest is heavily compliance/API-usage dashboard focused rather than clinical (HEDIS/risk) analytics specifically"
            ]
          },
          {
            "ref": 31,
            "name": "Zing Health",
            "seg": "medadv",
            "arr": 131893.999992,
            "health": 10,
            "gongSignal": "strong",
            "internalFit": "high",
            "score": 12.5,
            "tier": 2,
            "ask": "HEDIS/Stars + risk-adjustment framed as competitive advantage",
            "evidence": [
              "Consistent interest in HEDIS/Stars and risk-adjustment analytics for competitive advantage",
              "Desire to integrate with their data warehouse; roadmap interest in analytics/AI capabilities for care-gap identification"
            ],
            "caveats": [
              "Returned as synthesized themes, not individually attributed quotes"
            ]
          },
          {
            "ref": 36,
            "name": "UCare Minnesota",
            "seg": "commercial",
            "arr": 769651.577844,
            "health": 2,
            "gongSignal": "strong",
            "internalFit": "low",
            "score": 11.5,
            "tier": 2,
            "ask": "Explicit gen-AI/ML analytics ask — but mid-acquisition by Medica",
            "evidence": [
              "Phou Soundara asked specifically about 1up's AI/gen-AI/ML capabilities for analytics, wanting data processed where it resides",
              "Team members asked about SQL/data-query access and FHIR resource mapping for internal modeling/analytics",
              "Inquired about HEDIS/Stars quality-measure reporting and risk-adjustment analytics support"
            ],
            "caveats": [
              "Account is health=2 with an active M&A transfer to Medica — sequence any analytics conversation around the acquisition, not as a standalone expansion"
            ]
          },
          {
            "ref": 19,
            "name": "Upper Peninsula Health Plan",
            "seg": "medicaid",
            "arr": 110000.00000400002,
            "health": 9,
            "gongSignal": "strong",
            "internalFit": "high",
            "score": 11,
            "tier": 2,
            "ask": "Ingestion/report validation; risk-adjustment framing was vendor-led",
            "evidence": [
              "Nathan Larson (IT Business Systems Analyst): repeated inquiries on data validation, UAT/prod report availability, opt-status visibility",
              "Kris Lein (Data Infrastructure Manager) asked about load/ingestion reports; interest in viewing data in Kibana to confirm loaded resources",
              "Jill Chipelewski (Dir. Info Systems) & Claudia Chavez-Rhoades (Strategic Initiatives Mgr) asked about reporting for admin access and data gaps"
            ],
            "caveats": [
              "Risk-adjustment/quality-measure framing was 1up-initiated (Assiatou Diallo/Kyle Brew), weight lower"
            ]
          },
          {
            "ref": 35,
            "name": "Cox HealthPlan",
            "seg": "medadv",
            "arr": 44285.71428,
            "health": 9,
            "gongSignal": "strong",
            "internalFit": "medium",
            "score": 11,
            "tier": 2,
            "ask": "Beyond-compliance care management, risk adjustment, quality reporting",
            "evidence": [
              "Susan Sanchez & unnamed caller asked about “beyond compliance” use cases: care management, risk adjustment, quality measures, provider/diagnosis search reporting",
              "Rachel Blair (1up) highlighted a new dashboard (replacing Kibana) for regulatory reporting, resource counts, usage, auth/opt-in metrics",
              "Multiple stakeholders (Susan, Pat, Darren, Alyssa, Rose Daron, Traci Rhodes) asked for more frequent usage reports"
            ],
            "caveats": []
          }
        ]
      },
      {
        "tier": 3,
        "label": "Real, Needs Qualification",
        "desc": "Genuine interest exists but is thin, single-voiced, undated, or partly served by an existing in-house tool — worth a discovery call before committing a build slot.",
        "count": 5,
        "arr": 866161.285236,
        "items": [
          {
            "ref": 3,
            "name": "Hamaspik Choice",
            "seg": "medicaid",
            "arr": 84823.008852,
            "health": 9,
            "gongSignal": "strong",
            "internalFit": "medium",
            "score": 10.5,
            "tier": 3,
            "ask": "Consolidated dashboard + risk-adjustment ask (single voice: CIO)",
            "evidence": [
              "Emily Manning repeatedly asked for a consolidated ingestion dashboard, ePA status, error indicators, and API usage reporting",
              "Emily Manning: risk-adjustment analytics — noted Wolters Kluwer is helping and a need to “glean CCDs for risk adjustment”",
              "Emily Manning: interest in HEDIS use cases from clinical data"
            ],
            "caveats": [
              "Signal concentrated in a single voice (Emily Manning, CIO/CTO/CISO)"
            ]
          },
          {
            "ref": 22,
            "name": "Community Care of Oklahoma",
            "seg": "commercial",
            "arr": 91666.66666799999,
            "health": 10,
            "gongSignal": "strong",
            "internalFit": "medium",
            "score": 10.5,
            "tier": 3,
            "ask": "AI-assisted data mapping + schema/table visualization",
            "evidence": [
              "Interest in CMS annual reporting downloadable as PDF/CSV within the Console",
              "Dashboard for API usage counts, delivered during ePA implementation — Rachel Schuler (1up)",
              "Interest in an AI solution to improve data-mapping accuracy (formulary/third-party discrepancies)"
            ],
            "caveats": [
              "Resolved via CRM name ‘CommunityCare’; dates largely not surfaced"
            ]
          },
          {
            "ref": 24,
            "name": "BayCare Select Health Plans",
            "seg": "medadv",
            "arr": 209721.42856799997,
            "health": 9,
            "gongSignal": "strong",
            "internalFit": "medium",
            "score": 10.5,
            "tier": 3,
            "ask": "0057 reporting + Star Ratings interest (undated, thematic)",
            "evidence": [
              "Requests for Patient Access API usage metrics, interoperability reports, general API metrics",
              "Interest in accessing data via UI/query, plus audit trails and member-attribution reports",
              "Explicit interest in “0057 Reporting” and Star Ratings"
            ],
            "caveats": [
              "Resolved to ‘BayCare Health Plans’; no individual speaker names/dates surfaced despite 6 calls/500 emails searched"
            ]
          },
          {
            "ref": 33,
            "name": "Chinese Community Health Plan",
            "seg": "medadv",
            "arr": 53333.33332800001,
            "health": 1,
            "gongSignal": "strong",
            "internalFit": "medium",
            "score": 10.5,
            "tier": 3,
            "ask": "HEDIS/risk curiosity, but analytics still done in-house today",
            "evidence": [
              "Christopher Aguirre & Harry Mankabady: need to report usage metrics to CMS and asked about analytics for risk scores; acknowledged clinical-data benefit for HEDIS metrics",
              "Discussed current in-house analytics stack and potential move to Tableau"
            ],
            "caveats": [
              "No direct ask yet for 1up-provided BI/SQL access — analytics currently done in-house (SSRS/SIS/SQL Server, evaluating Tableau)"
            ]
          },
          {
            "ref": 39,
            "name": "AultCare",
            "seg": "medadv",
            "arr": 426616.84781999997,
            "health": 2,
            "gongSignal": "strong",
            "internalFit": "medium",
            "score": 8.5,
            "tier": 3,
            "ask": "Risk-adjustment interest present, but predictive-modeling framing was vendor-led",
            "evidence": [
              "Explicitly asked about using Payer-to-Payer data for risk-adjustment analytics",
              "Inquired about HEDIS electronic measures and how their data can fuel downstream quality analytics",
              "Multiple inquiries about console dashboards and CMS/regulatory tracking metrics"
            ],
            "caveats": [
              "Predictive-modeling/AI mention was vendor-led (1up), not customer-initiated",
              "Health=2, tier=Retain — approach as retention-adjacent, not pure growth"
            ]
          }
        ]
      },
      {
        "tier": 4,
        "label": "Not Yet / Watchlist",
        "desc": "Either no Gong data, an explicit scope exclusion, unresolved account attribution, or a churn/competitor/M&A risk that should be resolved before pitching new spend.",
        "count": 8,
        "arr": 2366643.2170679998,
        "items": [
          {
            "ref": 10,
            "name": "Trillium",
            "seg": "medicaid",
            "arr": 371572.5,
            "health": 10,
            "gongSignal": "moderate",
            "internalFit": "medium",
            "score": 7.5,
            "tier": 4,
            "ask": "Reporting-extract accuracy fixes, not clearly new-product demand",
            "evidence": [
              "Theresa Clark asked for Extract Guides and raised accuracy concerns on report numbers — May 29/Jun 1, 2026",
              "Theresa Clark engaged with a 1up-invited Digital Quality Measurement webinar (chart-chasing → continuous DQM, care-gap closure) — Jun 3, 2026",
              "Theresa Clark requested Console access for colleagues responsible for the “annual report” — May 7, 2026"
            ],
            "caveats": [
              "Signal is mostly about reporting-extract accuracy/access, not a customer-originated ask for a new analytics product",
              "Quality-measurement webinar interest was 1up-initiated (Geetika Arora), not volunteered"
            ]
          },
          {
            "ref": 20,
            "name": "Cook County Health (CountyCare)",
            "seg": "medicaid",
            "arr": 245000.00000400003,
            "health": 8,
            "gongSignal": "moderate",
            "internalFit": "medium",
            "score": 7.5,
            "tier": 4,
            "ask": "CDO-level interest, but undated and thinly evidenced",
            "evidence": [
              "Jeff Lazar (Chief Data Officer) asked how they'd access API-received data and where it lands for their use",
              "Jeff Lazar asked about using other-payer data to fuel downstream risk adjustment and care management workflows",
              "Interest in reporting tied to Patient Access API usage / CMS-0057 annual reporting"
            ],
            "caveats": [
              "No specific dates surfaced"
            ]
          },
          {
            "ref": 42,
            "name": "AllCare CCO",
            "seg": "medicaid",
            "arr": 321111.111108,
            "health": null,
            "gongSignal": "moderate",
            "internalFit": "medium",
            "score": 7.5,
            "tier": 4,
            "ask": "Customer said “custom reporting or analytics” is explicitly out of scope now",
            "evidence": [
              "Amy Burns (SVP Clinical Ops) explicitly asked about “reporting dashboards” — Nov 25, 2025",
              "John Eyman (Lead Developer): data lake used for “a fair amount of our reporting”; CCDAs feed their HEDIS vendor's data sets — Mar 18, 2026",
              "Bonnie Walker noted a director (Ben Cannon) leads the team that “does all the dashboarding for the organization” — Mar 13, 2026"
            ],
            "caveats": [
              "Customer explicitly stated ‘custom reporting or analytics’ is OUT OF SCOPE for the current project even while voicing interest",
              "Known-churn flag in SF — sequence carefully"
            ]
          },
          {
            "ref": 32,
            "name": "HealthPlan Services (WiPro)",
            "seg": "medadv",
            "arr": 66227.637264,
            "health": 10,
            "gongSignal": "strong",
            "internalFit": null,
            "score": 7,
            "tier": 4,
            "ask": "Evidence found under a channel partner — account attribution unconfirmed",
            "evidence": [
              "Hozefa Attarwala (Wipro): CMS Patient Access API utilization reporting, geographic reporting scope, viewing claims data in console",
              "Asked value of payer-to-payer data for risk adjustment/HEDIS; 1up confirmed HEDIS pilots elsewhere"
            ],
            "caveats": [
              "Account name did not resolve directly in Gong; queried via ‘WiPro’ fallback and evidence mixed in another org (CHRISTUS Health Plan) — treat attribution as UNCONFIRMED until the correct CRM account is verified"
            ]
          },
          {
            "ref": 29,
            "name": "GlobalHealth Holdings",
            "seg": "medadv",
            "arr": 159585.635352,
            "health": 10,
            "gongSignal": "moderate",
            "internalFit": "medium",
            "score": 6,
            "tier": 4,
            "ask": "Aspirational Stars-team comment only, no firm ask",
            "evidence": [
              "Kevin Adhia asked if data could be used for “stars or something else” — most value if data reaches where the stars/clinical teams already look",
              "Samuel Rivera Anglero & Migdalia Vazquez Rivera asked about file-transfer confirmation; 1up referenced future operational dashboards/reporting metrics"
            ],
            "caveats": [
              "Stars-team comment is aspirational (‘could this be used for stars?’), not a firm ask"
            ]
          },
          {
            "ref": 38,
            "name": "Priority",
            "seg": "commercial",
            "arr": 637313.000004,
            "health": 8,
            "gongSignal": "moderate",
            "internalFit": "medium",
            "score": 5.5,
            "tier": 4,
            "ask": "Analytics floated by 1up only — and mid-migration to Epic (churn risk)",
            "evidence": [
              "Consistent interest in analytics/reporting/dashboards for CMS Patient Access API compliance",
              "Requested breakdowns of unique/multiple member access by contract ID, state-level ACA/Medicaid templates",
              "Asked about HCCs (risk adjustment) for new Medicare members; 1up proactively offered a HEDIS webinar"
            ],
            "caveats": [
              "No explicit customer-initiated ask for SQL/data-query access or predictive modeling — 1up has floated these as roadmap items only",
              "Churn risk: migrating to Epic EPP Aug 2026 — sequence as a retention/carve-out play, not pure expansion"
            ]
          },
          {
            "ref": 41,
            "name": "Jai Medical Center",
            "seg": "medicaid",
            "arr": 70833.333336,
            "health": null,
            "gongSignal": "moderate",
            "internalFit": null,
            "score": 5.5,
            "tier": 4,
            "ask": "Compliance/audit reporting interest, not BI/analytics specifically",
            "evidence": [
              "Sophia Lloyd (COO): interest in reporting/quality measures citing NCQA accreditation, needs encounter-data reporting to Maryland",
              "Customer showed interest in AI integration, advanced analytics, and quality measurement with potential risk-adjustment applications"
            ],
            "caveats": [
              "Resolved via ‘Jai Medical Systems’; signal centers on compliance/audit reporting more than analytics/BI"
            ]
          },
          {
            "ref": 7,
            "name": "CVS Health",
            "seg": "bespoke",
            "arr": 495000,
            "health": 10,
            "gongSignal": "none",
            "internalFit": "medium",
            "score": 0,
            "tier": 4,
            "ask": "No Gong call or message activity found for this account at all",
            "evidence": [],
            "caveats": [
              "No Gong call/message activity found for this CRM account in the window — bespoke P2P-only deal, likely thin Gong coverage rather than true lack of interest"
            ]
          }
        ]
      }
    ],
    "briefingHtml": "<h3>Methodology</h3>\n<p>Every one of the 43 CMS-0057 portfolio accounts was queried directly in <strong>Gong</strong> (call and message intelligence, Jan 2023–Jul 2026) with the same question: has this customer voiced interest in analytics, reporting, dashboards, BI, SQL/data-query access, quality-measure (HEDIS/Stars) reporting, risk-adjustment analytics, or predictive modeling. That customer-voiced signal was then combined with the account-specific expansion plays already surfaced in the <span class=\"cite\">[Jul 2026 portfolio research]</span> — several of which independently named a “quality/risk analytics,” “SQL on FHIR,” or “HDE-style analytics” play before Gong was ever consulted. A account's <strong>fit score</strong> weights the Gong signal (2/3 of the score) over the internal research fit (1/3), then adds credit for evidence that is <em>named and dated</em> (a real stakeholder, a real quarter) and for <em>concrete tooling</em> mentions (SQL on FHIR, Databricks, Tableau, Power BI, a named analytics hire) — and subtracts for disqualifying caveats such as an explicit scope exclusion, unresolved account attribution, or signal that turned out to be vendor-initiated rather than customer-voiced. Scores sort accounts into four tiers; the full evidence trail (quotes, speakers, dates, caveats) is preserved per account below and is meant to be spot-checked, not taken on faith.</p>\n\n<h3>Headline finding</h3>\n<p><strong>42 of 43 active customers (98%)</strong> surfaced a live, customer-voiced analytics ask in Gong — only CVS Health returned zero matching activity (a bespoke, P2P-only relationship with thin Gong coverage generally, not necessarily thin interest). Even AllCare CCO, which explicitly scoped “custom reporting or analytics” out of its current SOW, had individual stakeholders raising dashboard and reporting needs on calls. This is a portfolio-wide signal, not a handful of anecdotes — it shows up across Medicaid MCOs, Medicare Advantage plans, and Commercial/Blues accounts alike, and across small and large ARR accounts.</p>\n\n<h3>What customers are actually asking for</h3>\n<p>Reading across all 43 accounts, the asks cluster into five themes, ranked by how many distinct accounts raised each one (an account can appear in more than one theme):</p>\n<ul>\n<li><strong>Operational/compliance dashboards &amp; reporting</strong> — the broadest and most universal ask: API usage metrics, ingestion status, opt-in/opt-out visibility, CMS-report exports. This is table stakes, not the differentiated product, but it's the on-ramp: almost every account that later asks for HEDIS or SQL access started here.</li>\n<li><strong>Quality measures (HEDIS / Stars / NCQA / DQM)</strong> — the single most common <em>clinical</em> ask. Payers are under real pressure to move from manual chart-chasing to digital quality measurement, and see 1up's clinical + claims data as the fastest path there.</li>\n<li><strong>Risk adjustment / HCC analytics</strong> — close behind quality measures, frequently voiced by the same stakeholders (dedicated “Director of Risk Adjustment” roles appear at Alliant, Johns Hopkins, and elsewhere) and often explicitly tied to payer-to-payer data.</li>\n<li><strong>Self-service SQL / data-query / warehouse access</strong> — a smaller but very concrete group of customers (BCBST, Vaya, MCS, Partners, Fallon, VNS Choice) named “SQL on FHIR” or an equivalent query layer specifically, several already piping data into their own Databricks/Tableau/Power BI/Snowflake environments and wanting a supported path instead of ad hoc Postman/DBeaver workarounds.</li>\n<li><strong>Predictive modeling / AI-ML</strong> — the least mature ask today, but a live one: Fallon, Select Health, UCare, and Community Care of Oklahoma each raised AI/predictive-modeling use cases unprompted, and 1up's own reps have started proposing them (MMM, Upper Peninsula, AultCare) — worth tracking as the wedge to premium-tier pricing once the base product exists.</li>\n</ul>\n\n<h3>Recommended shape of the offering</h3>\n<p>The evidence points to a <strong>two-layer product</strong>, not one: (1) an operational reporting/console layer that is close to compliance-reporting work 1up is already doing (near-zero net-new build, mostly packaging), and (2) a genuinely new analytics layer — SQL-on-FHIR / self-service query plus a quality-and-risk measures package (HEDIS/Stars + HCC) — that is the actual expansion product. BCBST's and Empower's asks are the cleanest MVP scope: both have named the exact capability (“SQL on FHIR,” a confirmed SQL endpoint) and have internal owners (a data team, a newly-hired Director of Data &amp; Analytics) ready to consume it on day one.</p>\n<p>This lines up closely with <strong>Project Prism</strong> (Team Mimir, Hack 26-11) — the internal hackathon proposal for exactly this layer: an embeddable analytics/visualization product joining claims with Clinical Connect/Payer-to-Payer clinical data, packaged as reusable measure libraries ($10–15k/yr bundles) plus à la carte custom queries ($1,000/query). Prism's own “Why Us/Why Now” section asserted 1up's interoperability-hub position without market evidence — this analysis is that evidence: the demand it hypothesized is real and portfolio-wide. Of Prism's five example measures, the risk-continuity (PDEX) and quality-gap-closure (HEDIS/Stars) measures have the strongest direct Gong precedent across the portfolio; the network-leakage/ghost-provider measure has a near-literal match at South Country Health Alliance and Cook County Health; the 30-day-readmissions measure has no direct customer precedent yet in this sweep, and should be validated with a discovery call before being sold as a launch measure. See the measure-by-measure account mapping below.</p>\n\n<h3>Go-to-market sequencing</h3>\n<p>Start design-partner conversations with <strong>Tier 1</strong> (11 accounts, <span class=\"cite\">[combined ARR below]</span>) — these combine the strongest, most specific, most recently-dated Gong asks with independently-derived high-fit research plays and healthy account status (no known-churn or competitor-engaged flags in this group). Move to <strong>Tier 2</strong> (19 accounts) as the beta widens — the demand is just as real, evidence is simply thinner (undated, thematic, or 1up-initiated framing the customer then confirmed). Treat <strong>Tier 3</strong> (5 accounts) as discovery-call candidates before committing anything, and hold <strong>Tier 4</strong> (8 accounts) — including two known-churn accounts, one mid-acquisition, one mid-competitor-migration, and one that explicitly declined analytics scope — until their underlying account situation is resolved. As with the rest of this portfolio, sequence every analytics conversation <em>after</em> the CMS-0057 compliance crunch for that account, not competing with it.</p>",
    "product": {
      "team": "Team Mimir · Hack 26-11",
      "name": "Project Prism",
      "tagline": "Data Analytics and Visualization",
      "pitch": "The 1up Platform is largely a “black box” to customers today — data flows in and out, but with limited utility behind compliance-based API access. Project Prism proposes an embeddable analytics/visualization layer — charts, graphs, heat maps — on high-value payer metrics, merging claims with Clinical Connect / Payer-to-Payer supplemental data to close blind spots the FHIR data model alone can't show. A library of reusable, cross-customer measures, plus a la carte custom queries for unique use cases.",
      "roi": [
        "Network leakage costs payers an estimated 10–20% of revenue; 1 in 5 healthcare executives surveyed don’t understand exactly where or why it happens, and roughly 1 in 4 organizations don’t track or quantify patient leakage at all.",
        "Out-of-network care decisions can negate potential Star Ratings increases and ultimately drive a member to switch plans.",
        "A 2020 Health Affairs study found that MSSP ACOs reducing out-of-network utilization by just one tenth of a percentage point per year would save an estimated $45M across the program population.",
        "Reducing avoidable out-of-network / low-value spend also directly improves MLR."
      ],
      "pricing": [
        {
          "name": "Initial query bundle",
          "scope": "10 query requests / year",
          "price": "$10,000/yr"
        },
        {
          "name": "Network Performance package",
          "scope": "10 graphics on provider network performance & health",
          "price": "$15,000/yr"
        },
        {
          "name": "High-Cost Members package",
          "scope": "10 graphics identifying high-cost chronic / at-risk patients",
          "price": "$15,000/yr"
        },
        {
          "name": "Custom à la carte",
          "scope": "per bespoke query + graphic",
          "price": "$1,000/query"
        }
      ],
      "measures": [
        {
          "key": "pdex_risk",
          "name": "Payer-to-Payer Historical Risk Continuity (PDEX)",
          "question": "\"When a new member joins, what high-cost chronic conditions exist in their PDEX history that haven’t shown up in our claims yet?\"",
          "data": "Condition / Observation (PDEX / US Core) + Coverage (CarinBB)",
          "takeaway": "Score a newly-enrolled member’s historical clinical severity from transferred PDEX records before their first claim ever hits the system."
        },
        {
          "key": "hba1c",
          "name": "HbA1c Control (Diabetes)",
          "question": "Evaluate patients where claims confirm testing occurred, supplemented with the clinical data where the actual lab value was measured — who is out of control (≫8%)?",
          "data": "Claims: EOB.item.productOrService = CPT 83036 (confirms a test was billed, not the result). Clinical: Observation.code = LOINC 4548-4, Observation.valueQuantity (the actual %).",
          "takeaway": "Claims give you the numerator-eligible event; only the clinical Observation.valueQuantity lets you classify controlled (<8%) vs. not."
        },
        {
          "key": "leakage",
          "name": "Network Leakage / “Ghost Providers”",
          "question": "Which in-network, accepting providers have filed no claims in ~12 months? Which ACO/VBC members have claims from non-ACO or out-of-network providers? Which ED visits have no PCP assigned?",
          "data": "Provider directory/network status + Claims + Coverage (VBC/ACO arrangement)",
          "takeaway": "Out-of-network claims cost health plans more; ghost providers and ED-without-PCP are leading indicators worth flagging upstream."
        },
        {
          "key": "readmit",
          "name": "Network Performance — High Re-admissions",
          "question": "Which providers/hospitals have patients admitted, then readmitted to the hospital within 30 days of discharge?",
          "data": "Claims (admission / discharge / readmission encounters)",
          "takeaway": "Surfaces provider- and hospital-level quality problems, not just member-level ones."
        },
        {
          "key": "bp",
          "name": "Blood Pressure Control",
          "question": "Which members have received a high blood-pressure measurement in the last N months?",
          "data": "Claims: CPT 99214 office visit (confirms an encounter, no vitals). Clinical: Observation LOINC 85354-9 panel (systolic 8480-6 / diastolic 8462-4), valueQuantity in mmHg — the only place this exists at all.",
          "takeaway": "No claims-side element exists for this measure at all — the Observation resource is the entire data source. Enables early identification of members at risk of heart attack, stroke, CAD, kidney disease, and more."
        }
      ],
      "pricingNote": "1up internal account management / customer care can also consume this data for strategic business reviews or a yearly/quarterly customer summary (“a la Spotify Wrapped”).",
      "implementation": "Trino access for internal users (customer care, implementation), paired with a Claude artifact that turns plain-text questions into SQL against the 1up Model. The internal user runs the generated query in Trino/DBeaver to confirm accuracy, then builds the visualization in Console. Demo flow: a customer-care rep gets a network-leakage question from a health plan → asks the Claude artifact in plain text → validates the SQL output in Trino/DBeaver → builds the visual in Console → shows 2–3 more measures → (stretch) exports the sub-population as CSV. Open question in the source doc: how visualization gets decided and rendered at scale is not yet specified — today’s flow is human-in-the-loop, not a supported self-serve product."
    },
    "measureMap": {
      "pdex_risk": {
        "accounts": [
          "Alliant Health Plans",
          "Johns Hopkins HealthCare",
          "MMM Holdings",
          "Maryland Care (MPC)",
          "AultCare",
          "UCare Minnesota",
          "Select Health"
        ],
        "note": "Accounts with a named risk-adjustment stakeholder or an explicit risk-adjustment/predictive-modeling ask — the closest Gong-voiced match to PDEX-driven risk continuity scoring."
      },
      "hba1c_bp": {
        "accounts": [
          "Capital Health Plan",
          "Capital Blue Cross",
          "Viva Health",
          "VNS Choice",
          "Empower",
          "South Country Health Alliance",
          "Fallon Community Health Plan"
        ],
        "note": "No account named HbA1c or blood pressure specifically — this groups accounts whose HEDIS/Stars/digital-quality-measure asks are the broader category these two measures sit inside. Capital Health Plan is the strongest single match (PHQ-2/9 depression screening + explicit QI chart-review pain)."
      },
      "leakage": {
        "accounts": [
          "South Country Health Alliance",
          "Cook County Health (CountyCare)"
        ],
        "note": "The one measure with a near-literal match: South Country Health Alliance's Alana Deranek is running a separate project doing “analytics on our claims for looking for fraud,” and Matt Hoenck called out having “no attribution model” today — both are direct precursors to a network-leakage/ghost-provider product."
      },
      "readmit": {
        "accounts": [],
        "note": "No account in the Gong sweep named 30-day readmissions specifically — an honest gap, not a forced match. HealthTeam Advantage, Western Health Advantage, and Alliant show general provider-performance-dashboard appetite that this measure could be pitched into, but there is no direct customer precedent yet."
      }
    },
    "gaps": {
      "market": {
        "funnel": [
          {
            "label": "TAM — all CMS-0057-impacted payer orgs nationally",
            "value": "365 orgs",
            "note": "CMS-0057-F final rule: MA orgs, State Medicaid FFS, Medicaid MCOs/PIHPs/PAHPs, State CHIP FFS, CHIP MCEs, QHP issuers on the FFEs."
          },
          {
            "label": "SAM — 1up’s realistic near-term reach",
            "value": "43 active accounts",
            "note": "This analysis’s roster. 174 total historical 1up customer relationships exist in Salesforce, but how many of the other 131 have Clinical Connect/Payer-to-Payer data flowing is unverified — treat as unconfirmed upside, not counted."
          },
          {
            "label": "OAM — Tier 1 + Tier 2 fit-scored accounts",
            "value": "30 accounts · $8.28M existing ARR",
            "note": "The realistic 3-year obtainable base from the fit analysis above."
          }
        ],
        "revenue": [
          {
            "year": "Year 1",
            "desc": "~6 of 11 Tier 1 accounts convert as design partners",
            "value": "~$72k"
          },
          {
            "year": "Year 2",
            "desc": "Full Tier 1 + ~9 of 19 Tier 2, some multi-package upsell",
            "value": "~$270k"
          },
          {
            "year": "Year 3",
            "desc": "Full Tier 1+2 (30 accts), à la carte layering, 2–3 new-logo wins",
            "value": "~$500–550k"
          }
        ],
        "finding": "Even a clean 3-year build-out at current list pricing adds only ~4–5% to today’s $11.5M portfolio ARR. As priced, this is a retention/stickiness and competitive-differentiation play, not a material new revenue line — unless pricing or go-to-market widens (see Pricing, below)."
      },
      "pricing": {
        "anchor": "Manual HEDIS/Stars chart abstraction costs a mid-sized MA plan an estimated $150,000–$500,000/year for reviewing ~10,000 records (industry figures, pre-staff-time) — exactly the workflow this product claims to replace. Current $10–15k/yr pricing isn’t being compared to that number.",
        "tiers": [
          {
            "seg": "Small (<100k members)",
            "bundle": "$8,000/yr",
            "pkg": "$10,000/yr"
          },
          {
            "seg": "Mid (100k–400k members)",
            "bundle": "$15,000/yr",
            "pkg": "$20,000/yr"
          },
          {
            "seg": "Large (400k+ members)",
            "bundle": "$25,000/yr",
            "pkg": "$35,000/yr"
          }
        ],
        "gainshare": "Optional rider for large plans: 5% of quantified network-leakage dollars identified in Year 1, capped, credited toward Year 2 — ties pricing directly to the proposal’s own $45M MSSP / 10–20%-of-revenue leakage stats instead of leaving them as unconnected slide color.",
        "reposition": "Reposition the quality-gap package (HbA1c / BP / PHQ-2-9) explicitly as a chart-abstraction replacement at $25–40k/yr — still an 85–90%+ discount to manual abstraction cost, but 2–3x current list price."
      },
      "measureSwap": {
        "add": {
          "name": "PHQ-2/PHQ-9 Depression Screening Control",
          "why": "Capital Health Plan explicitly asked to streamline PHQ-2/9 chart review — identical claims-vs-clinical structure to HbA1c/BP (CPT confirms the visit; only the Observation resource carries the score), so it’s nearly free to build once that pipeline exists."
        },
        "defer": {
          "name": "30-Day Re-admissions",
          "why": "No account in the Gong sweep named this measure. Don’t kill it — reposition as “Wave 2, pending discovery validation” rather than a launch measure with equal billing to the other four."
        }
      },
      "implRoadmap": [
        {
          "phase": "Phase 0 — today",
          "desc": "Human-in-the-loop, as written in the source doc: Claude artifact → Trino/DBeaver validation → manual Console build."
        },
        {
          "phase": "Phase 1 — Tier 1 design partners",
          "desc": "Validated measures become pre-built query + vis-spec pairs (SQL bundled with a small declarative chart spec), rendered through 4–6 fixed Console chart components — not a general-purpose charting engine. Custom asks route through the human-in-the-loop path behind a real intake ticket to a named owner (Data Engineering Manager, Interoperability)."
        },
        {
          "phase": "Phase 2 — Tier 1+2 scale",
          "desc": "Library moves to self-service in Console — parameterized queries, no engineering per request — reserving the Claude-artifact pipeline only for genuinely bespoke asks."
        }
      ],
      "personaReorder": {
        "lead": [
          "Quality/Stars team",
          "Clinical Informatics / Data team"
        ],
        "proof": "CMO / Care Management (“here’s who acts on it”)",
        "roi": "Actuarial / Finance (QBP-dollar-impact translator — what actually unlocks budget)",
        "appendix": [
          "Compliance / Regulatory Affairs",
          "Provider Network / Value-Based Care"
        ]
      }
    }
  }
};
