import { config } from 'dotenv'
import nodemailer from 'nodemailer'

// Charger les variables d'environnement
config({ path: '.env.local' })

/**
 * Script de test de connexion SMTP basique
 */
async function testSMTPConnection() {
  console.log('🔍 Test de connexion SMTP Hostinger\n')

  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASSWORD

  if (!user || !pass) {
    console.error('❌ Variables SMTP manquantes!')
    console.log('SMTP_USER:', user || 'MANQUANT')
    console.log('SMTP_PASSWORD:', pass ? '✓ présent' : 'MANQUANT')
    process.exit(1)
  }

  console.log('📋 Configuration:')
  console.log('  Host: smtp.hostinger.com')
  console.log('  Port: 465 (SSL)')
  console.log('  User:', user)
  console.log('  Pass:', pass.substring(0, 2) + '*'.repeat(pass.length - 2))
  console.log()

  // Test avec port 465 SSL
  console.log('🧪 Test 1: Port 465 (SSL)...')
  try {
    const transporter465 = nodemailer.createTransport({
      host: 'smtp.hostinger.com',
      port: 465,
      secure: true,
      auth: { user, pass },
      logger: true,
      debug: true,
    })

    await transporter465.verify()
    console.log('✅ Port 465 fonctionne!\n')

    // Essayer d'envoyer un email de test
    console.log('📧 Envoi email de test...')
    await transporter465.sendMail({
      from: `"Emmy Cils Test" <${user}>`,
      to: user,
      subject: 'Test Email Hostinger',
      text: 'Si vous recevez cet email, la configuration fonctionne!',
      html: '<p>Si vous recevez cet email, <strong>la configuration fonctionne!</strong></p>',
    })
    console.log('✅ Email envoyé avec succès!')
    process.exit(0)
  } catch (error) {
    console.log('❌ Port 465 échoué:', error.message)
  }

  // Test avec port 587 TLS
  console.log('\n🧪 Test 2: Port 587 (TLS)...')
  try {
    const transporter587 = nodemailer.createTransport({
      host: 'smtp.hostinger.com',
      port: 587,
      secure: false,
      auth: { user, pass },
      logger: true,
      debug: true,
    })

    await transporter587.verify()
    console.log('✅ Port 587 fonctionne!\n')

    console.log('📧 Envoi email de test...')
    await transporter587.sendMail({
      from: `"Emmy Cils Test" <${user}>`,
      to: user,
      subject: 'Test Email Hostinger',
      text: 'Si vous recevez cet email, la configuration fonctionne!',
      html: '<p>Si vous recevez cet email, <strong>la configuration fonctionne!</strong></p>',
    })
    console.log('✅ Email envoyé avec succès!')
    process.exit(0)
  } catch (error) {
    console.log('❌ Port 587 échoué:', error.message)
  }

  console.log('\n❌ Aucune configuration ne fonctionne')
  console.log('\n💡 Vérifiez:')
  console.log('  1. L\'email contact@emmy-cils.fr existe sur Hostinger')
  console.log('  2. Le mot de passe est correct (sans espaces)')
  console.log('  3. L\'envoi SMTP est activé dans Hostinger')
  console.log('  4. Le bon serveur SMTP pour votre datacenter')
  process.exit(1)
}

testSMTPConnection()
