import nodemailer from 'nodemailer';
import type { SendMailOptions, Transporter } from 'nodemailer';
import type { SiteSurveyData, OfflinePdfSubmission } from '@/data/survey-schema';

export interface BookingLeadPayload {
  name: string;
  business: string;
  pumps?: string;
  phone: string;
  email?: string;
  location?: string;
  subject?: string;
  details?: string;
}

export interface SmtpConfig {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  from: string;
  to: string[];
}

/**
 * Parses and returns SMTP configuration from environment variables.
 * Supports multiple recipient emails in MAIL_TO (comma-separated, e.g. "sales@pergamongroup.com, info@easyfuelpro.com").
 */
export function getSmtpConfig(): SmtpConfig | null {
  const host = process.env.SMTP_HOST || 'mail.easyfuelpro.com';
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    return null;
  }

  const port = parseInt(process.env.SMTP_PORT || '465', 10);
  const secure = process.env.SMTP_SECURE !== undefined
    ? process.env.SMTP_SECURE === 'true'
    : port === 465;

  const from = process.env.MAIL_FROM || `"EasyFuel Pro Notifications" <${user}>`;
  const rawTo = process.env.MAIL_TO || user;
  const to = rawTo
    .split(/[,;]/)
    .map((e) => e.trim())
    .filter(Boolean);

  return { host, port, secure, user, pass, from, to: to.length > 0 ? to : [user] };
}

/**
 * Creates a reusable Nodemailer transporter instance.
 */
export function createMailTransporter(config: SmtpConfig): Transporter {
  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Dispatches a booking/contact inquiry email to the operations/sales team and a customer confirmation.
 */
export async function sendBookingEmail(payload: BookingLeadPayload): Promise<{ success: boolean; error?: string }> {
  const config = getSmtpConfig();
  if (!config) {
    console.warn('[Mail Service] SMTP_USER or SMTP_PASS not set. Logging lead payload to console:', payload);
    return { success: true };
  }

  try {
    const transporter = createMailTransporter(config);

    const htmlContent = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #131b2e;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #dae2fd; overflow: hidden;">
    <div style="background: #00658d; color: #ffffff; padding: 24px;">
      <h2 style="margin: 0; font-size: 20px;">New Forecourt Inquiry / Contact Request</h2>
      <p style="margin: 6px 0 0; opacity: 0.9; font-size: 14px;">EasyFuel Pro Management Portal</p>
    </div>
    <div style="padding: 24px;">
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr><td style="padding: 8px 0; color: #565d79; width: 140px;"><strong>Client Name:</strong></td><td>${escapeHtml(payload.name)}</td></tr>
        <tr><td style="padding: 8px 0; color: #565d79;"><strong>Business / Station:</strong></td><td>${escapeHtml(payload.business)}</td></tr>
        ${payload.email ? `<tr><td style="padding: 8px 0; color: #565d79;"><strong>Email:</strong></td><td><a href="mailto:${escapeHtml(payload.email)}" style="color: #00658d;">${escapeHtml(payload.email)}</a></td></tr>` : ''}
        <tr><td style="padding: 8px 0; color: #565d79;"><strong>Phone:</strong></td><td><a href="tel:${escapeHtml(payload.phone)}" style="color: #00658d;">${escapeHtml(payload.phone)}</a></td></tr>
        ${payload.subject ? `<tr><td style="padding: 8px 0; color: #565d79;"><strong>Inquiry Topic:</strong></td><td>${escapeHtml(payload.subject)}</td></tr>` : ''}
        ${payload.location ? `<tr><td style="padding: 8px 0; color: #565d79;"><strong>Location:</strong></td><td>${escapeHtml(payload.location)}</td></tr>` : ''}
        ${payload.pumps ? `<tr><td style="padding: 8px 0; color: #565d79;"><strong>Pump Count:</strong></td><td>${escapeHtml(payload.pumps)}</td></tr>` : ''}
        ${payload.details ? `<tr><td style="padding: 8px 0; color: #565d79; vertical-align: top;"><strong>Message:</strong></td><td style="padding: 8px 0;">${escapeHtml(payload.details)}</td></tr>` : ''}
      </table>
    </div>
    <div style="background: #f2f3ff; padding: 16px 24px; font-size: 12px; color: #565d79; border-top: 1px solid #dae2fd;">
      Pergamon Group &bull; EasyFuel Pro Automation Dispatch
    </div>
  </div>
</body>
</html>
    `.trim();

    const mailOptions: SendMailOptions = {
      from: config.from,
      to: config.to,
      subject: `[EasyFuel Pro Inquiry] ${payload.subject ? `${payload.subject} - ` : ''}${payload.business}`,
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown mail error';
    console.error('[Mail Service Error] Failed to send booking notification:', errorMsg);
    return { success: false, error: errorMsg };
  }
}

export interface SendSurveyEmailOptions {
  survey: SiteSurveyData;
  referenceCode: string;
  pdfBuffer?: Buffer;
  imageSignedUrls?: string[];
}

/**
 * Dispatches the comprehensive site survey submission to all operations/sales team recipients
 * with the completed survey PDF attached and image links provided.
 */
export async function sendSiteSurveyNotificationEmail(options: SendSurveyEmailOptions): Promise<{ success: boolean; error?: string }> {
  const config = getSmtpConfig();
  const { survey, referenceCode, pdfBuffer, imageSignedUrls = [] } = options;
  const { businessInfo, scheduling, infrastructure, compliance, readiness } = survey;

  if (!config) {
    console.warn('[Mail Service] SMTP_USER or SMTP_PASS not set. Logging survey payload:', {
      referenceCode,
      station: businessInfo.siteName,
      customer: businessInfo.customerName,
    });
    return { success: true };
  }

  try {
    const transporter = createMailTransporter(config);

    const pumpRows = infrastructure.pumps
      .map(
        (p, idx) => `
        <tr style="border-bottom: 1px solid #e0e3e0;">
          <td style="padding: 8px;"><strong>Pump ${idx + 1}</strong></td>
          <td style="padding: 8px;">${escapeHtml(p.makeModel || 'N/A')}</td>
          <td style="padding: 8px;">${p.nozzleCount} Nozzles</td>
          <td style="padding: 8px;">${escapeHtml(p.fuelTypes.join(', ') || 'N/A')}</td>
          <td style="padding: 8px; text-transform: capitalize;">${escapeHtml(p.meterType || 'N/A')}</td>
          <td style="padding: 8px;">${p.pulseOutputAvailable === 'yes' ? 'Yes' : 'No'}</td>
        </tr>
      `
      )
      .join('');

    const imageLinksHtml = imageSignedUrls.length > 0
      ? `
        <div style="margin-top: 16px;">
          <strong>Uploaded Station Assets (${imageSignedUrls.length}):</strong>
          <ul style="padding-left: 20px; margin: 8px 0;">
            ${imageSignedUrls
              .map(
                (url, i) =>
                  `<li><a href="${escapeHtml(url)}" target="_blank" rel="noopener" style="color: #00658d;">View Asset ${i + 1} (Secure Signed URL)</a></li>`
              )
              .join('')}
          </ul>
        </div>
      `
      : '';

    const htmlContent = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #131b2e;">
  <div style="max-width: 680px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #dae2fd; overflow: hidden;">
    <div style="background: #00658d; color: #ffffff; padding: 24px;">
      <span style="background: rgba(255,255,255,0.2); padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: bold;">
        ${escapeHtml(referenceCode)}
      </span>
      <h2 style="margin: 12px 0 4px; font-size: 22px;">New Site Survey Submission</h2>
      <p style="margin: 0; opacity: 0.9; font-size: 14px;">${escapeHtml(businessInfo.siteName)} &bull; ${escapeHtml(businessInfo.county)} County</p>
    </div>

    <div style="padding: 24px;">
      <h3 style="color: #00658d; border-bottom: 2px solid #00658d; padding-bottom: 6px; margin-top: 0;">1. Business & Contact</h3>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 16px;">
        <tr><td style="padding: 6px 0; width: 180px; color: #565d79;"><strong>Station Name:</strong></td><td>${escapeHtml(businessInfo.siteName)}</td></tr>
        <tr><td style="padding: 6px 0; color: #565d79;"><strong>Company Name:</strong></td><td>${escapeHtml(businessInfo.customerName)}</td></tr>
        <tr><td style="padding: 6px 0; color: #565d79;"><strong>Physical Location:</strong></td><td>${escapeHtml(businessInfo.physicalLocation)}, ${escapeHtml(businessInfo.county)}</td></tr>
        <tr><td style="padding: 6px 0; color: #565d79;"><strong>KRA PIN:</strong></td><td><strong>${escapeHtml(businessInfo.kraPin)}</strong></td></tr>
        <tr><td style="padding: 6px 0; color: #565d79;"><strong>Contact Person:</strong></td><td>${escapeHtml(businessInfo.contactPersonName)}</td></tr>
        <tr><td style="padding: 6px 0; color: #565d79;"><strong>Contact Phone:</strong></td><td><a href="tel:${escapeHtml(businessInfo.contactPhone)}" style="color: #00658d;">${escapeHtml(businessInfo.contactPhone)}</a></td></tr>
        <tr><td style="padding: 6px 0; color: #565d79;"><strong>Contact Email:</strong></td><td><a href="mailto:${escapeHtml(businessInfo.contactEmail)}" style="color: #00658d;">${escapeHtml(businessInfo.contactEmail)}</a></td></tr>
      </table>

      <h3 style="color: #00658d; border-bottom: 2px solid #00658d; padding-bottom: 6px;">2. Scheduling Preferences</h3>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 16px;">
        <tr><td style="padding: 6px 0; width: 180px; color: #565d79;"><strong>Preferred Dates:</strong></td><td>${escapeHtml(scheduling.preferredDates.join(', ') || 'Flexible')}</td></tr>
        <tr><td style="padding: 6px 0; color: #565d79;"><strong>Operating Hours:</strong></td><td>${escapeHtml(scheduling.operatingHours === 'custom' ? scheduling.customOperatingHours : scheduling.operatingHours)}</td></tr>
        ${scheduling.schedulingNotes ? `<tr><td style="padding: 6px 0; color: #565d79;"><strong>Notes:</strong></td><td>${escapeHtml(scheduling.schedulingNotes)}</td></tr>` : ''}
      </table>

      <h3 style="color: #00658d; border-bottom: 2px solid #00658d; padding-bottom: 6px;">3. Fueling & Pump Infrastructure</h3>
      <p style="font-size: 14px; margin: 4px 0 10px;">
        <strong>Total Pumps:</strong> ${infrastructure.totalPumpCount} &bull; 
        <strong>Site Automated:</strong> ${infrastructure.isSiteAutomated === 'yes' ? 'Yes' : 'No'} &bull; 
        <strong>Mode:</strong> ${escapeHtml(infrastructure.operationMode || 'N/A')}
      </p>
      <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 16px; background: #fafafa; border: 1px solid #e0e3e0;">
        <thead>
          <tr style="background: #f1f5f2; text-align: left;">
            <th style="padding: 8px;">Pump</th>
            <th style="padding: 8px;">Make/Model</th>
            <th style="padding: 8px;">Nozzles</th>
            <th style="padding: 8px;">Fuels</th>
            <th style="padding: 8px;">Meter</th>
            <th style="padding: 8px;">Pulse</th>
          </tr>
        </thead>
        <tbody>
          ${pumpRows || '<tr><td colspan="6" style="padding: 8px; text-align: center;">No individual pump cards specified</td></tr>'}
        </tbody>
      </table>

      <h3 style="color: #00658d; border-bottom: 2px solid #00658d; padding-bottom: 6px;">4. eTIMS & Network Connectivity</h3>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 16px;">
        <tr><td style="padding: 6px 0; width: 180px; color: #565d79;"><strong>eTIMS Solution:</strong></td><td style="text-transform: uppercase;">${escapeHtml(compliance.etimsSolutionType || 'N/A')}</td></tr>
        <tr><td style="padding: 6px 0; color: #565d79;"><strong>POS System:</strong></td><td>${escapeHtml(compliance.posSystem || 'None / In Planning')}</td></tr>
        <tr><td style="padding: 6px 0; color: #565d79;"><strong>Internet Available:</strong></td><td>${compliance.internetAvailable === 'yes' ? 'Yes' : 'No'} (${escapeHtml(compliance.connectionType || 'N/A')})</td></tr>
        <tr><td style="padding: 6px 0; color: #565d79;"><strong>Redundancy:</strong></td><td>${compliance.networkRedundancy === 'yes' ? 'Yes' : 'No'}</td></tr>
        <tr><td style="padding: 6px 0; color: #565d79;"><strong>UPS / Backup Power:</strong></td><td>${compliance.upsPowerBackup === 'yes' ? 'Yes' : 'No'}</td></tr>
      </table>

      ${readiness.siteNotes ? `
        <h3 style="color: #00658d; border-bottom: 2px solid #00658d; padding-bottom: 6px;">5. Additional Site Notes</h3>
        <p style="font-size: 14px; background: #f8fafc; padding: 12px; border-radius: 8px; border: 1px solid #dae2fd;">${escapeHtml(readiness.siteNotes)}</p>
      ` : ''}

      ${imageLinksHtml}

      <div style="margin-top: 20px; padding: 14px; background: #eaedff; border-radius: 8px; font-size: 13px; color: #00354b;">
        Attached: Official generated PDF site survey report for internal engineering sign-off.
      </div>
    </div>

    <div style="background: #f1f5f2; padding: 16px 24px; font-size: 12px; color: #747775; border-top: 1px solid #e0e3e0;">
      EasyFuel Pro Forecourt Telemetry &bull; Pergamon Group &bull; Sent to operations, sales, and intake channels.
    </div>
  </div>
</body>
</html>
    `.trim();

    const mailOptions: SendMailOptions = {
      from: config.from,
      to: config.to,
      subject: `[Site Survey #${referenceCode}] ${businessInfo.siteName} (${businessInfo.county}) - ${businessInfo.customerName}`,
      html: htmlContent,
      attachments: pdfBuffer
        ? [
            {
              filename: `Site-Survey-${referenceCode}.pdf`,
              content: pdfBuffer,
              contentType: 'application/pdf',
            },
          ]
        : undefined,
    };

    await transporter.sendMail(mailOptions);

    // Also send customer confirmation acknowledgment
    if (businessInfo.contactEmail && process.env.SEND_CUSTOMER_CONFIRMATION !== 'false') {
      await sendCustomerSurveyConfirmation({
        to: businessInfo.contactEmail,
        customerName: businessInfo.contactPersonName || businessInfo.customerName,
        siteName: businessInfo.siteName,
        referenceCode,
      });
    }

    return { success: true };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown mail error';
    console.error('[Mail Service Error] Failed to send site survey notification:', errorMsg);
    return { success: false, error: errorMsg };
  }
}

/**
 * Dispatches notification for an uploaded offline PDF/scan.
 */
export async function sendOfflinePdfNotificationEmail(options: {
  submission: OfflinePdfSubmission;
  referenceCode: string;
  fileBuffer?: Buffer;
  fileName?: string;
  fileUrl?: string;
}): Promise<{ success: boolean; error?: string }> {
  const config = getSmtpConfig();
  const { submission, referenceCode, fileBuffer, fileName, fileUrl } = options;

  if (!config) {
    console.warn('[Mail Service] SMTP unconfigured. Logging offline submission:', {
      referenceCode,
      submission,
    });
    return { success: true };
  }

  try {
    const transporter = createMailTransporter(config);

    const htmlContent = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #131b2e;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #dae2fd; overflow: hidden;">
    <div style="background: #00658d; color: #ffffff; padding: 24px;">
      <span style="background: rgba(255,255,255,0.2); padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: bold;">
        ${escapeHtml(referenceCode)}
      </span>
      <h2 style="margin: 12px 0 4px; font-size: 20px;">Offline Completed Checklist Uploaded</h2>
      <p style="margin: 0; opacity: 0.9; font-size: 14px;">Customer uploaded filled/handwritten PDF</p>
    </div>
    <div style="padding: 24px;">
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr><td style="padding: 8px 0; color: #565d79; width: 160px;"><strong>Client Name:</strong></td><td>${escapeHtml(submission.customerName)}</td></tr>
        <tr><td style="padding: 8px 0; color: #565d79;"><strong>Site / Station:</strong></td><td>${escapeHtml(submission.siteName)}</td></tr>
        <tr><td style="padding: 8px 0; color: #565d79;"><strong>Contact Person:</strong></td><td>${escapeHtml(submission.contactPersonName)}</td></tr>
        <tr><td style="padding: 8px 0; color: #565d79;"><strong>Phone:</strong></td><td><a href="tel:${escapeHtml(submission.contactPhone)}" style="color: #00658d;">${escapeHtml(submission.contactPhone)}</a></td></tr>
        <tr><td style="padding: 8px 0; color: #565d79;"><strong>Email:</strong></td><td><a href="mailto:${escapeHtml(submission.contactEmail)}" style="color: #00658d;">${escapeHtml(submission.contactEmail)}</a></td></tr>
        <tr><td style="padding: 8px 0; color: #565d79;"><strong>County:</strong></td><td>${escapeHtml(submission.county)}</td></tr>
        <tr><td style="padding: 8px 0; color: #565d79;"><strong>Preferred Dates:</strong></td><td>${escapeHtml(submission.preferredDates.join(', ') || 'Flexible')}</td></tr>
        ${submission.notes ? `<tr><td style="padding: 8px 0; color: #565d79; vertical-align: top;"><strong>Notes:</strong></td><td>${escapeHtml(submission.notes)}</td></tr>` : ''}
        ${fileUrl ? `<tr><td style="padding: 8px 0; color: #565d79;"><strong>Private Document URL:</strong></td><td><a href="${escapeHtml(fileUrl)}" target="_blank" rel="noopener" style="color: #00658d;">View Uploaded File</a></td></tr>` : ''}
      </table>
    </div>
    <div style="background: #f2f3ff; padding: 16px 24px; font-size: 12px; color: #565d79; border-top: 1px solid #dae2fd;">
      Pergamon Group &bull; EasyFuel Pro Offline Document Intake
    </div>
  </div>
</body>
</html>
    `.trim();

    const mailOptions: SendMailOptions = {
      from: config.from,
      to: config.to,
      subject: `[Offline Survey Upload #${referenceCode}] ${submission.siteName} - ${submission.customerName}`,
      html: htmlContent,
      attachments: fileBuffer && fileName
        ? [
            {
              filename: fileName,
              content: fileBuffer,
            },
          ]
        : undefined,
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown mail error';
    console.error('[Mail Service Error] Failed to send offline survey email:', errorMsg);
    return { success: false, error: errorMsg };
  }
}

/**
 * Sends a confirmation email to the customer who submitted the survey.
 */
export async function sendCustomerSurveyConfirmation(options: {
  to: string;
  customerName: string;
  siteName: string;
  referenceCode: string;
}): Promise<{ success: boolean; error?: string }> {
  const config = getSmtpConfig();
  const { to, customerName, siteName, referenceCode } = options;

  if (!config) return { success: true };

  try {
    const transporter = createMailTransporter(config);
    const htmlContent = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #131b2e;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #dae2fd; overflow: hidden;">
    <div style="background: #00658d; color: #ffffff; padding: 24px;">
      <h2 style="margin: 0; font-size: 20px;">Site Survey Received</h2>
      <p style="margin: 6px 0 0; opacity: 0.9; font-size: 14px;">EasyFuel Pro &bull; Pergamon Group</p>
    </div>
    <div style="padding: 24px; font-size: 14px; line-height: 1.6; color: #131b2e;">
      <p>Dear <strong>${escapeHtml(customerName)}</strong>,</p>
      <p>Thank you for submitting your site technical survey for <strong>${escapeHtml(siteName)}</strong>.</p>
      <div style="background: #eaedff; border: 1px solid #dae2fd; border-radius: 8px; padding: 14px; margin: 18px 0;">
        <span style="font-size: 12px; color: #00658d; text-transform: uppercase; font-weight: bold;">Survey Reference Code</span>
        <div style="font-size: 20px; font-weight: bold; color: #00354b; margin-top: 4px;">${escapeHtml(referenceCode)}</div>
      </div>
      <p>Our forecourt deployment engineers are currently reviewing your station's pump, automation, and eTIMS parameters. We will contact you shortly to confirm the scheduled visit time.</p>
      <p>If you have any urgent inquiries, feel free to reply directly to this email or reach our operations desk at <a href="mailto:info@easyfuelpro.com" style="color: #00658d;">info@easyfuelpro.com</a>.</p>
      <p style="margin-top: 24px;">Warm regards,<br><strong>EasyFuel Pro Forecourt Operations Team</strong><br>Pergamon Group</p>
    </div>
    <div style="background: #f2f3ff; padding: 16px 24px; font-size: 12px; color: #565d79; border-top: 1px solid #dae2fd;">
      &copy; ${new Date().getFullYear()} EasyFuel Pro by Pergamon Group. All rights reserved.
    </div>
  </div>
</body>
</html>
    `.trim();

    await transporter.sendMail({
      from: config.from,
      to,
      subject: `Site Survey Received - ${siteName} [Ref: ${referenceCode}]`,
      html: htmlContent,
    });

    return { success: true };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown mail error';
    console.warn('[Mail Service Warning] Customer confirmation email skipped/failed:', errorMsg);
    return { success: false, error: errorMsg };
  }
}
