import { loadConfig } from "./config.js";
import { stdoutAudit } from "./audit.js";
import { MockSalesforce } from "./salesforce/mock.js";
import { LiveSalesforce } from "./salesforce/live.js";
import { createApp } from "./http/app.js";

const cfg = loadConfig();

const sf =
  cfg.SF_MODE === "live"
    ? new LiveSalesforce({
        loginUrl: cfg.SF_LOGIN_URL,
        clientId: cfg.SF_CLIENT_ID!,
        username: cfg.SF_USERNAME!,
        privateKeyPem: cfg.SF_PRIVATE_KEY!,
      })
    : new MockSalesforce();

const app = createApp(cfg, { sf, audit: stdoutAudit });

app.listen(cfg.PORT, () => {
  process.stdout.write(
    JSON.stringify({
      ts: new Date().toISOString(),
      kind: "startup",
      port: cfg.PORT,
      resource: cfg.PUBLIC_URL,
      authMode: cfg.AUTH_MODE,
      sfMode: cfg.SF_MODE,
    }) + "\n",
  );
});
