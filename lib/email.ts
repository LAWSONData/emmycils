import nodemailer from 'nodemailer'
import type { Formation } from './formations'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

const BASE_URL = process.env.FORMATION_CONTENT_BASE_URL || 'https://storage.emmycils.fr/formations'

export async function sendFormationEmail({
  to,
  formation,
  sessionId,
}: {
  to: string
  formation: Formation
  sessionId: string
}) {
  const pdfLinks = formation.includes.pdfs
    .map(
      (pdf) =>
        `<tr>
          <td style="padding:8px 0;">
            <a href="${BASE_URL}/${formation.slug}/${pdf.filename}" style="color:#c8a97e;text-decoration:none;font-size:14px;">
              📄 ${pdf.name}
            </a>
          </td>
        </tr>`
    )
    .join('')

  const videoLinks = formation.includes.videos
    .map(
      (video) =>
        `<tr>
          <td style="padding:8px 0;">
            <a href="${BASE_URL}/${formation.slug}/${video.filename}" style="color:#c8a97e;text-decoration:none;font-size:14px;">
              🎬 ${video.name}
            </a>
          </td>
        </tr>`
    )
    .join('')

  const html = `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background-color:#faf9f7;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#faf9f7;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.06);">

          <!-- Header -->
          <tr>
            <td style="background-color:#0a0a0a;padding:40px 40px 30px;text-align:center;">
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;">
                <tr>
                  <td style="width:40px;height:40px;border-radius:50%;border:1px solid rgba(200,169,126,0.4);text-align:center;vertical-align:middle;">
                    <span style="font-family:Georgia,serif;font-weight:bold;font-size:14px;color:#c8a97e;">E</span>
                  </td>
                  <td style="padding-left:12px;">
                    <span style="font-family:Georgia,serif;font-weight:600;font-size:18px;color:#ffffff;letter-spacing:1px;">Emmy Cils</span>
                  </td>
                </tr>
              </table>
              <p style="color:#c8a97e;font-size:12px;letter-spacing:3px;text-transform:uppercase;margin:20px 0 0;">Votre formation est prête</p>
            </td>
          </tr>

          <!-- Welcome -->
          <tr>
            <td style="padding:40px 40px 20px;">
              <h1 style="font-family:Georgia,serif;font-size:24px;color:#0a0a0a;margin:0 0 16px;">Merci pour votre achat !</h1>
              <p style="font-size:15px;color:#666;line-height:1.6;margin:0;">
                Vous avez acquis la formation <strong style="color:#0a0a0a;">${formation.title}</strong>.
                Retrouvez ci-dessous l'ensemble de votre contenu de formation.
              </p>
            </td>
          </tr>

          <!-- Gold divider -->
          <tr>
            <td style="padding:0 40px;">
              <div style="height:1px;background:linear-gradient(90deg,transparent,#c8a97e,transparent);"></div>
            </td>
          </tr>

          <!-- PDFs Section -->
          <tr>
            <td style="padding:30px 40px 10px;">
              <h2 style="font-family:Georgia,serif;font-size:18px;color:#0a0a0a;margin:0 0 16px;">Documents PDF</h2>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#faf9f7;border-radius:6px;padding:16px;">
                <tr><td style="padding:16px;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                    ${pdfLinks}
                  </table>
                </td></tr>
              </table>
            </td>
          </tr>

          <!-- Videos Section -->
          <tr>
            <td style="padding:20px 40px 10px;">
              <h2 style="font-family:Georgia,serif;font-size:18px;color:#0a0a0a;margin:0 0 16px;">Vidéos de Formation</h2>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#faf9f7;border-radius:6px;padding:16px;">
                <tr><td style="padding:16px;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                    ${videoLinks}
                  </table>
                </td></tr>
              </table>
            </td>
          </tr>

          <!-- Order Reference -->
          <tr>
            <td style="padding:30px 40px;">
              <div style="height:1px;background:linear-gradient(90deg,transparent,#c8a97e,transparent);margin-bottom:20px;"></div>
              <p style="font-size:12px;color:#999;margin:0;">
                Référence commande : <span style="color:#666;">${sessionId}</span>
              </p>
              <p style="font-size:12px;color:#999;margin:4px 0 0;">
                Formation : ${formation.title} — ${formation.priceDisplay}
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#0a0a0a;padding:30px 40px;text-align:center;">
              <p style="font-size:12px;color:rgba(255,255,255,0.4);margin:0 0 8px;">
                © 2026 Emmy Cils — Extensions de cils professionnelles
              </p>
              <p style="font-size:12px;color:rgba(255,255,255,0.25);margin:0;">
                Besoin d'aide ? Contactez-nous à <a href="mailto:contact@emmycils.fr" style="color:#c8a97e;text-decoration:none;">contact@emmycils.fr</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`

  await transporter.sendMail({
    from: `"Emmy Cils Formations" <${process.env.GMAIL_USER}>`,
    to,
    subject: `Votre formation : ${formation.title} — Emmy Cils`,
    html,
  })
}
