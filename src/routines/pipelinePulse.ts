import type { SalesforceClient } from "../salesforce/types.js";
import type { PlanhatClient, PlanhatProjectDraft } from "../planhat/types.js";
import { detectFictions, DEFAULT_DETECTOR_CONFIG } from "../fictions/detect.js";
import type { DetectorConfig, Fiction } from "../fictions/types.js";

const SCAN_LIMIT = 200;

export interface PipelinePulseDeps {
  sf: SalesforceClient;
  planhat: PlanhatClient;
  /** Confirm-first: real Planhat writes only ever happen when this is false. */
  dryRun: boolean;
  detectorConfig?: DetectorConfig;
  asOf?: Date;
}

export interface PipelinePulseResult {
  generatedAt: string;
  dryRun: boolean;
  candidateCount: number;
  candidates: Fiction[];
  proposedProjects: PlanhatProjectDraft[];
  createdProjects: { fictionId: string; planhatProjectId: string }[];
}

/**
 * Always used for both the dry-run preview and a real write, so the preview
 * can never drift from what an actual write would send.
 */
function toProjectDraft(fiction: Fiction): PlanhatProjectDraft {
  return {
    companyId: fiction.planhatCompanyId as string,
    name: `[DRAFT] ${fiction.summary}`.slice(0, 120),
    description:
      `${fiction.summary}\n\nEvidence: ${JSON.stringify(fiction.evidence)}\n\n` +
      "This project was proposed automatically by the pipeline-pulse routine " +
      "and has not yet been reviewed by a human.",
  };
}

export async function runPipelinePulse(
  deps: PipelinePulseDeps,
): Promise<PipelinePulseResult> {
  const [opportunities, companies] = await Promise.all([
    deps.sf.listOpportunities(SCAN_LIMIT),
    deps.planhat.listCompanies(SCAN_LIMIT),
  ]);

  const candidates = detectFictions(
    { opportunities, companies },
    deps.detectorConfig ?? DEFAULT_DETECTOR_CONFIG,
    deps.asOf,
  );

  const projectCandidates = candidates.filter(
    (c) => c.suggestedAction === "planhat_project" && c.planhatCompanyId !== null,
  );
  const proposedProjects = projectCandidates.map(toProjectDraft);
  const createdProjects: { fictionId: string; planhatProjectId: string }[] = [];

  if (!deps.dryRun) {
    for (let i = 0; i < projectCandidates.length; i++) {
      const project = await deps.planhat.createProject(proposedProjects[i]);
      createdProjects.push({
        fictionId: projectCandidates[i].id,
        planhatProjectId: project.id,
      });
    }
  }

  return {
    generatedAt: new Date().toISOString(),
    dryRun: deps.dryRun,
    candidateCount: candidates.length,
    candidates,
    proposedProjects,
    createdProjects,
  };
}
