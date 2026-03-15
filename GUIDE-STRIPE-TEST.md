# Guide: Configurer Stripe en Mode Test

## ⚠️ IMPORTANT : Vous êtes actuellement en MODE PRODUCTION

Vos clés Stripe dans `.env.local` sont en **LIVE** (production) :
```env
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

## Comment passer en mode TEST

### 1. Récupérer vos clés de test Stripe

1. Allez sur [dashboard.stripe.com](https://dashboard.stripe.com)
2. En haut à gauche, **activez le mode "Test"** (toggle switch)
3. Allez dans **Developers → API Keys**
4. Copiez :
   - **Publishable key** (commence par `pk_test_...`)
   - **Secret key** (commence par `sk_test_...`)

### 2. Mettre à jour `.env.local`

Remplacez temporairement vos clés LIVE par les clés TEST :

```env
# MODE TEST - Ne charge pas les cartes réelles
STRIPE_SECRET_KEY=sk_test_VOTRE_CLE_TEST
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_VOTRE_CLE_TEST

# Le webhook test sera différent aussi
STRIPE_WEBHOOK_SECRET=whsec_VOTRE_WEBHOOK_TEST
```

### 3. Configurer le webhook de test

#### Option A : Stripe CLI (recommandé pour test local)

1. Installer Stripe CLI : https://stripe.com/docs/stripe-cli
2. Se connecter : `stripe login`
3. Écouter les webhooks localement :
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```
4. Copier le webhook secret qui apparaît (commence par `whsec_`)
5. L'ajouter dans `.env.local` : `STRIPE_WEBHOOK_SECRET=whsec_...`

#### Option B : Ngrok (pour test depuis un domaine)

1. Installer ngrok : https://ngrok.com/download
2. Lancer ngrok : `ngrok http 3000`
3. Copier l'URL HTTPS (ex: https://abc123.ngrok.io)
4. Aller sur Stripe Dashboard → Developers → Webhooks
5. Cliquer "Add endpoint"
6. URL : `https://abc123.ngrok.io/api/webhooks/stripe`
7. Events : sélectionner `checkout.session.completed`
8. Copier le webhook secret et l'ajouter dans `.env.local`

### 4. Tester un paiement

Utilisez les **cartes de test Stripe** :

#### Cartes qui fonctionnent :
- **Visa** : `4242 4242 4242 4242`
- **Mastercard** : `5555 5555 5555 4444`
- **Amex** : `3782 822463 10005`

Remplissez :
- Date : n'importe quelle date future (ex: 12/28)
- CVC : n'importe quel 3 chiffres (ex: 123)
- Code postal : n'importe quoi (ex: 75001)

#### Cartes qui échouent (pour tester les erreurs) :
- **Carte refusée** : `4000 0000 0000 0002`
- **Fonds insuffisants** : `4000 0000 0000 9995`
- **3D Secure requis** : `4000 0027 6000 3184`

### 5. Vérifier que ça marche

1. Relancez votre serveur Next.js : `npm run dev`
2. Allez sur votre page formation : http://localhost:3000/formations/technique-niveau-2
3. Remplissez le formulaire d'inscription
4. Utilisez une carte de test (4242 4242 4242 4242)
5. Vérifiez :
   - ✓ Redirection vers page de succès
   - ✓ Email reçu avec lien d'accès
   - ✓ Token créé dans Supabase (table `formation_access_tokens`)
   - ✓ Paiement visible dans Stripe Dashboard (mode Test)

### 6. Revenir en PRODUCTION

Quand vous avez fini de tester, remettez vos clés LIVE :

```env
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_... (webhook de production)
```

## Webhook de Production

Pour configurer le webhook en production (sur votre vrai domaine) :

1. Allez sur Stripe Dashboard (mode LIVE)
2. Developers → Webhooks
3. Add endpoint
4. URL : `https://emmy-cils.fr/api/webhooks/stripe`
5. Events : `checkout.session.completed`
6. Copier le webhook secret → `.env.local` (ou variables d'env de production)

## Commandes Utiles

```bash
# Lancer le serveur de dev
npm run dev

# Écouter les webhooks Stripe (avec Stripe CLI)
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Voir les événements Stripe
stripe events list

# Déclencher un événement manuellement
stripe trigger checkout.session.completed
```

## Troubleshooting

### Le webhook ne fonctionne pas
- Vérifiez que `STRIPE_WEBHOOK_SECRET` correspond à votre endpoint
- Vérifiez les logs Stripe CLI ou Dashboard Webhooks
- Vérifiez que le serveur est bien accessible (ngrok pour test local)

### L'email n'est pas envoyé
- Vérifiez les credentials SMTP dans `.env.local`
- Regardez les logs de l'API : `/api/webhooks/stripe`

### Le token n'est pas créé
- Vérifiez la connexion Supabase
- Regardez les erreurs dans les logs serveur

---

**Note** : En mode test, aucun argent réel n'est débité. Les paiements sont simulés.
