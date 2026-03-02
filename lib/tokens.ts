import crypto from 'crypto'

/**
 * Génère un token d'accès sécurisé de 64 caractères hexadécimaux
 * 256 bits d'entropie - impossible à deviner par brute force
 */
export function generateAccessToken(): string {
  return crypto.randomBytes(32).toString('hex')
}

/**
 * Vérifie si un token a le bon format (64 caractères hex)
 */
export function isValidTokenFormat(token: string): boolean {
  return /^[a-f0-9]{64}$/.test(token)
}

/**
 * Génère l'URL complète d'accès à la formation
 */
export function generateAccessUrl(token: string, baseUrl: string): string {
  return `${baseUrl}/formation/${token}`
}
