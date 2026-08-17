import { loadConfig } from "./config.js";
import { stdoutAudit } from "./audit.js";
import { MockSalesforce } from "./salesforce/mock.js";
import { LiveSalesforce } from "./salesforce/live.js";
import { MockSlack } from "./slack/mock.js";
import { LiveSlack } from "./slack/live.js";
import { MockGong } from "./gong/mock.js";
import { LiveGong } from "./gong/live.js";
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

const slack =
  cfg.SLACK_MODE === "live"
    ? new LiveSlack({ botToken: cfg.SLACK_BOT_TOKEN! })
    : new MockSlack();

const gong =
  cfg.GONG_MODE === "live"
    ? new LiveGong({
        accessKey: cfg.GONG_ACCESS_KEY!,
        accessKeySecret: cfg.GONG_ACCESS_KEY_SECRET!,
        contentMode: cfg.GONG_CONTENT,
        lookbackDays: cfg.GONG_LOOKBACK_DAYS,
      })
    : new MockGong(cfg.GONG_CONTENT);

const app = createApp(cfg, { sf, slack, gong, audit: stdoutAudit });

app.listen(cfg.PORT, () => {
  process.stdout.write(
    JSON.stringify({
      ts: new Date().toISOString(),
      kind: "startup",
      port: cfg.PORT,
      resource: cfg.PUBLIC_URL,
      authMode: cfg.AUTH_MODE,
      sfMode: cfg.SF_MODE,
      slackMode: cfg.SLACK_MODE,
      gongMode: cfg.GONG_MODE,
      gongContent: cfg.GONG_CONTENT,
    }) + "\n",
  );
});
