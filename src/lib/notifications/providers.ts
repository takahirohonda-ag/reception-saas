import { NotificationPayload, NotificationProvider } from "./types";

// ===== Slack =====
const slackProvider: NotificationProvider = {
  type: "SLACK",
  async send(config, payload) {
    const webhookUrl = config.webhookUrl as string;
    const channelMention = config.mentionUserId
      ? `<@${config.mentionUserId}> `
      : "";

    const text = `🏢 来客通知 / Visitor Notification\n${channelMention}${payload.staffName} さん宛にお客様がお見えです。\n${payload.companyName ? `🏢 ${payload.companyName}` : ""}${payload.visitorName ? ` ${payload.visitorName} 様` : ""}\nVisitor for ${payload.staffNameEn || payload.staffName} — please come to reception.`;

    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    return { success: res.ok, error: res.ok ? undefined : await res.text() };
  },
};

// ===== Microsoft Teams =====
const teamsProvider: NotificationProvider = {
  type: "TEAMS",
  async send(config, payload) {
    const webhookUrl = config.webhookUrl as string;

    const card = {
      type: "message",
      attachments: [
        {
          contentType: "application/vnd.microsoft.card.adaptive",
          content: {
            $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
            type: "AdaptiveCard",
            version: "1.4",
            body: [
              {
                type: "TextBlock",
                text: "🏢 来客通知 / Visitor Notification",
                weight: "Bolder",
                size: "Medium",
              },
              {
                type: "TextBlock",
                text: `${payload.staffName} さん宛にお客様がお見えです。`,
                wrap: true,
              },
              ...(payload.companyName || payload.visitorName
                ? [
                    {
                      type: "TextBlock",
                      text: `${payload.companyName || ""} ${payload.visitorName ? `${payload.visitorName} 様` : ""}`,
                      wrap: true,
                    },
                  ]
                : []),
            ],
          },
        },
      ],
    };

    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(card),
    });

    return { success: res.ok, error: res.ok ? undefined : await res.text() };
  },
};

// ===== Google Chat =====
const googleChatProvider: NotificationProvider = {
  type: "GOOGLE_CHAT",
  async send(config, payload) {
    const webhookUrl = config.webhookUrl as string;

    const message = {
      text: `🏢 *来客通知*\n${payload.staffName} さん宛にお客様がお見えです。\n${payload.companyName ? `🏢 ${payload.companyName}` : ""} ${payload.visitorName ? `${payload.visitorName} 様` : ""}`,
    };

    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
    });

    return { success: res.ok, error: res.ok ? undefined : await res.text() };
  },
};

// ===== Discord =====
const discordProvider: NotificationProvider = {
  type: "DISCORD",
  async send(config, payload) {
    const webhookUrl = config.webhookUrl as string;

    const content = `🏢 **来客通知**\n${payload.staffName} さん宛にお客様がお見えです。\n${payload.companyName ? `🏢 ${payload.companyName}` : ""} ${payload.visitorName ? `${payload.visitorName} 様` : ""}`;

    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });

    return { success: res.ok, error: res.ok ? undefined : await res.text() };
  },
};

// ===== Email (via Resend) =====
const emailProvider: NotificationProvider = {
  type: "EMAIL",
  async send(config, payload) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) return { success: false, error: "RESEND_API_KEY not configured" };

    const to = config.email as string;
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: `${payload.tenantName} Reception <reception@${process.env.RESEND_DOMAIN || "notifications.example.com"}>`,
        to,
        subject: `🏢 来客通知: ${payload.staffName} さん宛`,
        html: `
          <h2>来客通知 / Visitor Notification</h2>
          <p><strong>${payload.staffName}</strong> さん宛にお客様がお見えです。</p>
          ${payload.companyName ? `<p>🏢 ${payload.companyName}</p>` : ""}
          ${payload.visitorName ? `<p>👤 ${payload.visitorName} 様</p>` : ""}
          <p style="color:#666;font-size:12px;">Sent from ${payload.tenantName} Reception</p>
        `,
      }),
    });

    return { success: res.ok, error: res.ok ? undefined : await res.text() };
  },
};

// ===== LINE Notify =====
const lineProvider: NotificationProvider = {
  type: "LINE",
  async send(config, payload) {
    const token = config.accessToken as string;

    const message = `\n🏢 来客通知\n${payload.staffName} さん宛にお客様がお見えです。\n${payload.companyName ? `🏢 ${payload.companyName}` : ""} ${payload.visitorName ? `${payload.visitorName} 様` : ""}`;

    const res = await fetch("https://notify-api.line.me/api/notify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`,
      },
      body: new URLSearchParams({ message }),
    });

    return { success: res.ok, error: res.ok ? undefined : await res.text() };
  },
};

// ===== LINE WORKS =====
const lineWorksProvider: NotificationProvider = {
  type: "LINE_WORKS",
  async send(config, payload) {
    const botId = config.botId as string;
    const channelId = config.channelId as string;
    const accessToken = config.accessToken as string;

    const content = {
      content: {
        type: "text",
        text: `🏢 来客通知\n${payload.staffName} さん宛にお客様がお見えです。\n${payload.companyName ? `🏢 ${payload.companyName}` : ""} ${payload.visitorName ? `${payload.visitorName} 様` : ""}`,
      },
    };

    const res = await fetch(
      `https://www.worksapis.com/v1.0/bots/${botId}/channels/${channelId}/messages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(content),
      }
    );

    return { success: res.ok, error: res.ok ? undefined : await res.text() };
  },
};

// ===== Custom Webhook =====
const webhookProvider: NotificationProvider = {
  type: "WEBHOOK",
  async send(config, payload) {
    const url = config.url as string;
    const headers = (config.headers as Record<string, string>) || {};

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify({
        event: "visitor.arrived",
        staff: {
          name: payload.staffName,
          nameEn: payload.staffNameEn,
        },
        visitor: {
          name: payload.visitorName,
          company: payload.companyName,
        },
        tenant: payload.tenantName,
        timestamp: payload.timestamp.toISOString(),
      }),
    });

    return { success: res.ok, error: res.ok ? undefined : await res.text() };
  },
};

// ===== SMS (Twilio) =====
const smsProvider: NotificationProvider = {
  type: "SMS",
  async send(config, payload) {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const fromNumber = process.env.TWILIO_PHONE_NUMBER;
    if (!accountSid || !authToken || !fromNumber) {
      return { success: false, error: "Twilio not configured" };
    }

    const to = config.phoneNumber as string;
    const body = `🏢 来客通知: ${payload.staffName} さん宛にお客様がお見えです。${payload.companyName ? ` (${payload.companyName})` : ""}`;

    const res = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString("base64")}`,
        },
        body: new URLSearchParams({ To: to, From: fromNumber, Body: body }),
      }
    );

    return { success: res.ok, error: res.ok ? undefined : await res.text() };
  },
};

// ===== Registry =====
const providers: Record<string, NotificationProvider> = {
  SLACK: slackProvider,
  TEAMS: teamsProvider,
  GOOGLE_CHAT: googleChatProvider,
  DISCORD: discordProvider,
  EMAIL: emailProvider,
  LINE: lineProvider,
  LINE_WORKS: lineWorksProvider,
  WEBHOOK: webhookProvider,
  SMS: smsProvider,
};

export function getProvider(type: string): NotificationProvider | undefined {
  return providers[type];
}

export async function sendNotifications(
  channels: { type: string; config: Record<string, unknown> }[],
  payload: NotificationPayload
): Promise<{ type: string; success: boolean; error?: string }[]> {
  const results = await Promise.allSettled(
    channels.map(async (ch) => {
      const provider = getProvider(ch.type);
      if (!provider) return { type: ch.type, success: false, error: "Unknown provider" };
      const result = await provider.send(ch.config, payload);
      return { type: ch.type, ...result };
    })
  );

  return results.map((r) =>
    r.status === "fulfilled"
      ? r.value
      : { type: "unknown", success: false, error: String(r.reason) }
  );
}
