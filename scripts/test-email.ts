import { config } from 'dotenv'
import { sendFormationAccessEmail } from '../lib/email'
import { getFormationById } from '../lib/formations'

// Charger les variables d'environnement
config({ path: '.env.local' })

/**
 * Script de test pour l'envoi d'email
 * Usage: npx tsx scripts/test-email.ts
 */
async function testEmail() {
  console.log('🧪 Test d\'envoi d\'email...\n')

  // Vérifier les credentials
  if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
    console.error('❌ Variables SMTP_USER ou SMTP_PASSWORD manquantes dans .env.local')
    process.exit(1)
  }

  console.log(`📧 Serveur SMTP: smtp.hostinger.com:465 (SSL)`)
  console.log(`👤 Utilisateur: ${process.env.SMTP_USER}`)
  console.log(`🔑 Password: ${process.env.SMTP_PASSWORD ? '✓ (masqué)' : '✗ manquant'}`)
  console.log(`🔑 Password length: ${process.env.SMTP_PASSWORD?.length || 0}\n`)

  // Récupérer la formation de test
  const formation = getFormationById('form-technique-niveau-2')

  if (!formation) {
    console.error('❌ Formation non trouvée')
    process.exit(1)
  }

  // Générer un token de test
  const testToken = 'test_' + Math.random().toString(36).substring(2, 15)
  const accessUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/formation/${testToken}`

  try {
    await sendFormationAccessEmail({
      to: process.env.SMTP_USER || 'contact@emmy-cils.fr', // Envoie à vous-même
      formation,
      accessUrl,
      sessionId: 'test_session_' + Date.now(),
    })

    console.log('✅ Email envoyé avec succès!')
    console.log(`📧 Destinataire: ${process.env.SMTP_USER}`)
    console.log(`🔗 Lien de test: ${accessUrl}`)
    console.log('\n⚠️  Vérifiez votre boîte email (et spam)')
  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi:', error)
    process.exit(1)
  }
}

testEmail()
