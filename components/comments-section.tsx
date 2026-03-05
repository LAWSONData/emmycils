'use client'

import { useEffect, useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

type CommentType = 'formation' | 'prestation'

interface Comment {
  id: string
  first_name: string
  last_name: string
  comment: string
  created_at: string
}

interface CommentsSectionProps {
  type: CommentType
  targetId: string
  title?: string
}

export function CommentsSection({ type, targetId, title }: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(
          `/api/comments?type=${encodeURIComponent(type)}&targetId=${encodeURIComponent(targetId)}`
        )
        if (!res.ok) return
        const data = await res.json()
        setComments(data.comments || [])
      } catch {
        // silent fail
      }
    }

    fetchComments()
  }, [type, targetId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!firstName || !lastName || !email || !comment) {
      setError('Merci de remplir tous les champs.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          targetId,
          firstName,
          lastName,
          email,
          comment,
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Une erreur est survenue.')
      } else {
        setComments((prev) => [data.comment, ...prev])
        setFirstName('')
        setLastName('')
        setEmail('')
        setComment('')
      }
    } catch {
      setError('Une erreur est survenue.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h3 className="font-playfair text-2xl sm:text-3xl text-foreground">
          {title || 'Ils donnent leur avis'}
        </h3>
        <p className="text-sm text-muted-foreground max-w-2xl">
          Partage ton ressenti pour aider les autres à se projeter.
        </p>
      </div>

      {/* Formulaire */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl border border-border p-5 sm:p-6 space-y-4"
      >
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground" htmlFor="comment-first-name">
              Prénom
            </label>
            <Input
              id="comment-first-name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Prénom"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground" htmlFor="comment-last-name">
              Nom
            </label>
            <Input
              id="comment-last-name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Nom"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-foreground" htmlFor="comment-email">
            Adresse email
          </label>
          <Input
            id="comment-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ton.email@example.com"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-foreground" htmlFor="comment-content">
            Ton avis
          </label>
          <Textarea
            id="comment-content"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Partage ton expérience ou ton ressenti…"
            rows={4}
          />
        </div>

        {error && (
          <p className="text-xs text-red-500">
            {error}
          </p>
        )}

        <Button
          type="submit"
          disabled={loading}
          className="bg-gold hover:bg-gold-dark text-white text-xs sm:text-sm tracking-[0.08em] uppercase rounded-full px-6 h-10"
        >
          {loading ? 'Envoi…' : 'Publier mon avis'}
        </Button>
      </form>

      {/* Liste des avis */}
      {comments.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">
            Avis récents
          </h4>
          <div className="space-y-3">
            {comments.map((c) => (
              <div
                key={c.id}
                className="bg-white rounded-2xl border border-border px-4 py-3 sm:px-5 sm:py-4"
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <p className="text-sm font-semibold text-foreground">
                    {c.first_name} {c.last_name}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    {new Date(c.created_at).toLocaleDateString('fr-FR')}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground whitespace-pre-line">
                  {c.comment}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

