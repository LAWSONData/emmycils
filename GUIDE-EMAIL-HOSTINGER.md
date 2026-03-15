# Guide: Configurer l'Email Hostinger

## Problème Actuel

L'envoi d'email échoue avec l'erreur : `Missing credentials for "PLAIN"`

Cela signifie que soit :
1. Le mot de passe est incorrect
2. Le compte email n'existe pas ou n'est pas configuré
3. Les paramètres SMTP sont incorrects

## Comment vérifier et corriger

### 1. Vérifier que l'email existe sur Hostinger

1. Connectez-vous à [hpanel.hostinger.com](https://hpanel.hostinger.com)
2. Allez dans **Emails** dans le menu gauche
3. Vérifiez que **contact@emmy-cils.fr** existe
4. Si non, créez-le :
   - Cliquez "Créer un compte email"
   - Email : `contact@emmy-cils.fr`
   - Créez un mot de passe fort
   - Notez bien ce mot de passe

### 2. Obtenir le bon mot de passe

**Option A : Réinitialiser le mot de passe**
1. Dans Emails → Sélectionnez `contact@emmy-cils.fr`
2. Cliquez "Gérer" ou "Modifier"
3. Réinitialisez le mot de passe
4. **Copiez exactement le nouveau mot de passe** (sans espaces avant/après)

**Option B : Utiliser le mot de passe actuel**
- Si vous connaissez déjà le mot de passe, assurez-vous qu'il est exact

### 3. Mettre à jour `.env.local`

Ouvrez `.env.local` et mettez le bon mot de passe :

```env
SMTP_USER=contact@emmy-cils.fr
SMTP_PASSWORD=VotreMot2PasseExact
```

**⚠️ Important** :
- Pas de guillemets autour du mot de passe
- Pas d'espaces avant/après
- Copiez-collez directement depuis Hostinger

### 4. Vérifier les paramètres SMTP Hostinger

Les paramètres actuellement configurés :

```
Serveur SMTP : smtp.hostinger.com
Port : 587
Sécurité : TLS (STARTTLS)
Utilisateur : contact@emmy-cils.fr
Mot de passe : (votre mot de passe)
```

Si ça ne marche pas, essayez les paramètres alternatifs :

#### Configuration Alternative 1 (SSL)
```
Port : 465
Sécurité : SSL
```

#### Configuration Alternative 2 (selon votre domaine)
Parfois Hostinger utilise un serveur SMTP spécifique par datacenter :
- `smtp.hostinger.com` (défaut)
- `smtp.titan.email` (si vous utilisez Titan Email)

Pour vérifier le bon serveur :
1. Allez dans Emails sur Hostinger
2. Cliquez sur "Configuration"
3. Regardez "Serveur SMTP sortant"

### 5. Tester la connexion email manuellement

Vous pouvez tester depuis n'importe quel client email (Outlook, Gmail, Thunderbird) :

**Configuration manuelle** :
- IMAP : `imap.hostinger.com:993` (SSL)
- SMTP : `smtp.hostinger.com:587` (TLS)
- Nom d'utilisateur : `contact@emmy-cils.fr`
- Mot de passe : votre mot de passe

Si la connexion fonctionne dans le client, elle devrait fonctionner dans le code.

### 6. Relancer le test

Une fois `.env.local` mis à jour :

```bash
npx tsx scripts/test-email.ts
```

Vous devriez voir :
```
✅ Email envoyé avec succès!
📧 Destinataire: contact@emmy-cils.fr
🔗 Lien de test: https://emmy-cils.fr/formation/test_xxx
```

Vérifiez votre boîte email (et spam) pour voir si l'email est arrivé.

### 7. Activer l'envoi SMTP externe (si bloqué)

Certains hébergeurs bloquent l'envoi SMTP par défaut :

1. Dans Hostinger → Emails
2. Cherchez "Paramètres SMTP" ou "Relais SMTP"
3. Activez l'option "Autoriser l'envoi externe" ou "Relais SMTP"

### 8. Vérifier les limites d'envoi

Hostinger a des limites d'envoi :
- **Limite quotidienne** : généralement 100-500 emails/jour selon le plan
- Si dépassée, attendez 24h ou contactez le support

## Troubleshooting Spécifique

### Erreur : "Missing credentials for PLAIN"
→ Le mot de passe dans `.env.local` est vide ou incorrect

**Solution** :
```env
# ❌ Mauvais
SMTP_PASSWORD=

# ✅ Bon
SMTP_PASSWORD=VotreMotDePasse123
```

### Erreur : "Invalid login"
→ Email ou mot de passe incorrect

**Solution** : Réinitialiser le mot de passe sur Hostinger

### Erreur : "Connection timeout"
→ Le port ou serveur SMTP est bloqué

**Solution** : Essayer port 465 au lieu de 587, ou vérifier le firewall

### Erreur : "Relay access denied"
→ L'envoi SMTP externe n'est pas activé

**Solution** : Activer dans les paramètres Hostinger

## Configuration Actuelle du Code

Fichier : `/lib/email.ts`

```typescript
const transporter = nodemailer.createTransport({
  host: 'smtp.hostinger.com',
  port: 587,                    // Ou 465 si SSL
  secure: false,                // false = TLS, true = SSL
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
})
```

Pour changer vers SSL (port 465) :
```typescript
port: 465,
secure: true,
```

## Checklist de Vérification

- [ ] L'email `contact@emmy-cils.fr` existe sur Hostinger
- [ ] Le mot de passe dans `.env.local` est exact (copié-collé)
- [ ] Pas d'espaces ou guillemets autour du mot de passe
- [ ] Le serveur SMTP est bien `smtp.hostinger.com`
- [ ] L'envoi SMTP externe est activé sur Hostinger
- [ ] Le test avec `npx tsx scripts/test-email.ts` fonctionne
- [ ] L'email de test arrive bien dans la boîte

## Prochaines Étapes

Une fois l'email qui fonctionne :
1. L'envoi automatique après paiement Stripe fonctionnera aussi
2. Chaque client recevra son lien d'accès unique
3. Le système sera complètement opérationnel

## Support

Si rien ne fonctionne :
- Contactez le support Hostinger via chat
- Demandez à vérifier que l'envoi SMTP est bien activé pour `contact@emmy-cils.fr`
- Demandez les paramètres SMTP exacts pour votre datacenter
