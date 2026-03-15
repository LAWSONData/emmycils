import nodemailer from 'nodemailer'
import type { Formation } from './formations'

/**
 * Crée le transporter de manière lazy pour s'assurer que les variables d'environnement sont chargées
 */
function getTransporter() {
  return nodemailer.createTransport({
    host: 'smtp.hostinger.com',
    port: 465,
    secure: true, // SSL
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  })
}

/**
 * Email envoyé après achat avec le lien d'accès à la formation
 */
export async function sendFormationAccessEmail({
  to,
  formation,
  accessUrl,
  sessionId,
}: {
  to: string
  formation: Formation
  accessUrl: string
  sessionId: string
}) {
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
                Cliquez sur le bouton ci-dessous pour accéder à votre espace de formation.
              </p>
            </td>
          </tr>

          <!-- Gold divider -->
          <tr>
            <td style="padding:0 40px;">
              <div style="height:1px;background:linear-gradient(90deg,transparent,#c8a97e,transparent);"></div>
            </td>
          </tr>

          <!-- Access Button -->
          <tr>
            <td style="padding:40px 40px;text-align:center;">
              <a href="${accessUrl}" style="display:inline-block;background-color:#c8a97e;color:#ffffff;font-family:Arial,sans-serif;font-size:16px;font-weight:bold;text-decoration:none;padding:18px 48px;border-radius:50px;letter-spacing:1px;text-transform:uppercase;">
                Accéder à ma formation
              </a>
              <p style="font-size:13px;color:#999;margin:20px 0 0;line-height:1.6;">
                Ce lien est personnel et vous donne accès à l'intégralité de votre formation.<br>
                <strong style="color:#666;">Ne le partagez pas.</strong>
              </p>
            </td>
          </tr>

          <!-- Formation Details -->
          <tr>
            <td style="padding:0 40px 30px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#faf9f7;border-radius:8px;">
                <tr>
                  <td style="padding:24px;">
                    <h3 style="font-family:Georgia,serif;font-size:16px;color:#0a0a0a;margin:0 0 12px;">Contenu inclus</h3>
                    <p style="font-size:14px;color:#666;margin:0;line-height:1.8;">
                      ✓ ${formation.includes.videos.length} vidéos de formation<br>
                      ✓ ${formation.modulesCount} modules complets<br>
                      ✓ Suivi de progression personnalisé<br>
                      ✓ Accès illimité pendant 1 an
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Order Reference -->
          <tr>
            <td style="padding:0 40px 30px;">
              <div style="height:1px;background:linear-gradient(90deg,transparent,#c8a97e,transparent);margin-bottom:20px;"></div>
              <p style="font-size:12px;color:#999;margin:0;">
                Référence commande : <span style="color:#666;">${sessionId}</span>
              </p>
              <p style="font-size:12px;color:#999;margin:4px 0 0;">
                Formation : ${formation.title} — ${formation.priceDisplay}
              </p>
            </td>
          </tr>

          <!-- Backup Link -->
          <tr>
            <td style="padding:0 40px 30px;">
              <p style="font-size:11px;color:#999;margin:0;line-height:1.6;">
                Si le bouton ne fonctionne pas, copiez ce lien dans votre navigateur :<br>
                <a href="${accessUrl}" style="color:#c8a97e;word-break:break-all;">${accessUrl}</a>
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
                Besoin d'aide ? Contactez-nous à <a href="mailto:contact@emmy-cils.fr" style="color:#c8a97e;text-decoration:none;">contact@emmy-cils.fr</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`

  const transporter = getTransporter()

  await transporter.sendMail({
    from: `"Emmy Cils Formations" <${process.env.SMTP_USER}>`,
    to,
    subject: `Accès à votre formation : ${formation.title} — Emmy Cils`,
    html,
  })
}
