/**
 * Barrel of every /dashboard/<tab> page renderer, plus the ROUTE_LIST used
 * both to mount them in dashboard.ts and to drive the roster-gate test
 * across every route (test/dashboard.test.ts).
 */
import { renderOverviewPage } from "./overview.js";
import { renderDealLookupPage } from "./dealLookup.js";
import { renderRecentActivityPage } from "./recentActivity.js";
import { renderCoverageCheckPage } from "./coverageCheck.js";
import { renderPipelinePulsePage } from "./pipelinePulse.js";
import { renderPortfolioPage } from "./portfolio.js";
import { renderCustomersPage } from "./customers.js";
import { renderAnalyticsFitPage } from "./analyticsFit.js";
import { renderClinicalConnectPage } from "./clinicalConnect.js";
import { renderAdminPage } from "./admin.js";
import { renderL10Page } from "./l10.js";

export {
  renderOverviewPage,
  renderDealLookupPage,
  renderRecentActivityPage,
  renderCoverageCheckPage,
  renderPipelinePulsePage,
  renderPortfolioPage,
  renderCustomersPage,
  renderAnalyticsFitPage,
  renderClinicalConnectPage,
  renderAdminPage,
  renderL10Page,
};

/** path segment (under /dashboard/) -> page renderer, in nav order. */
export const DASHBOARD_ROUTES: Array<{ path: string; render: () => string }> = [
  { path: "overview", render: renderOverviewPage },
  { path: "deal-lookup", render: renderDealLookupPage },
  { path: "recent-activity", render: renderRecentActivityPage },
  { path: "coverage-check", render: renderCoverageCheckPage },
  { path: "pipeline-pulse", render: renderPipelinePulsePage },
  { path: "portfolio", render: renderPortfolioPage },
  { path: "customers", render: renderCustomersPage },
  { path: "analytics-fit", render: renderAnalyticsFitPage },
  { path: "clinical-connect", render: renderClinicalConnectPage },
  { path: "admin", render: renderAdminPage },
  { path: "l10", render: renderL10Page },
];
