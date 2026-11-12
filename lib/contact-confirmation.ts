import type { ContactInquiry } from "@/lib/contact-inquiry"

const FROM = "Scubafy Solutions <noreply@scubafysolutions.com>"

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")
}

export function contactConfirmation(inquiry: ContactInquiry) {
  const name = inquiry.name.trim()
  const note = inquiry.note.trim()
  const subject = "We received your message — Scubafy Solutions"
  const preheader = `We'll reply by email about your ${inquiry.service.toLowerCase()} project.`

  const text = [
    `Hi ${name},`,
    "",
    "We received your message. Someone from Scubafy Solutions will reply by email.",
    "",
    `Project: ${inquiry.service}`,
    `Budget: ${inquiry.budget}`,
    note ? `Note: ${note}` : "",
    "",
    "Scubafy Solutions",
    "Singapore",
  ]
    .filter((line, index, lines) => line !== "" || lines[index - 1] !== "")
    .join("\n")

  const noteBlock = note
    ? `<tr><td style="padding:16px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#5c6570;">Note</td></tr>
       <tr><td style="padding:6px 0 0;font-family:Georgia,serif;font-size:16px;line-height:1.5;color:#111111;">${escapeHtml(note).replaceAll("\n", "<br>")}</td></tr>`
    : ""

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f2;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preheader)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f2;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;">
          <tr>
            <td style="padding:32px 32px 8px;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:#0a5f78;">Scubafy Solutions</td>
          </tr>
          <tr>
            <td style="padding:8px 32px 0;font-family:Georgia,serif;font-size:28px;line-height:1.2;color:#111111;">We received your message.</td>
          </tr>
          <tr>
            <td style="padding:16px 32px 0;font-family:Georgia,serif;font-size:16px;line-height:1.5;color:#111111;">Hi ${escapeHtml(name)}, someone from the team will reply by email.</td>
          </tr>
          <tr>
            <td style="padding:8px 32px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr><td style="padding:16px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#5c6570;">Project</td></tr>
                <tr><td style="padding:6px 0 0;font-family:Georgia,serif;font-size:16px;line-height:1.5;color:#111111;">${escapeHtml(inquiry.service)}</td></tr>
                <tr><td style="padding:16px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#5c6570;">Budget</td></tr>
                <tr><td style="padding:6px 0 0;font-family:Georgia,serif;font-size:16px;line-height:1.5;color:#111111;">${escapeHtml(inquiry.budget)}</td></tr>
                ${noteBlock}
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`

  return {
    from: FROM,
    to: inquiry.email,
    subject,
    html,
    text,
  }
}
